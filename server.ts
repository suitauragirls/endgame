import express from "express";
import path from "path";
import cors from "cors";
import Razorpay from "razorpay";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fs from "fs/promises";
import fsSync from "fs";
import os from "os";

dotenv.config();

// Razorpay Client Lazy Initialization
let razorpayClient = null;
function getRazorpay() {
  if (!razorpayClient) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay API keys missing");
    }
    razorpayClient = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayClient;
}

// Local File-based DB for persistence
const isProdGlobal = process.env.NODE_ENV === "production";
const DB_FILE = isProdGlobal ? path.join(os.tmpdir(), "orders_db.json") : path.join(process.cwd(), "orders_db.json");

async function readDb() {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty db
    return { orders: {} };
  }
}

async function writeDb(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

async function startServer() {
  const isProd = process.env.NODE_ENV === "production";
  const app = express();
  
  // Trust reverse proxy for custom domains (HTTPS/SSL resolution)
  app.set("trust proxy", 1);
  const PORT = 3001;

  app.use(cors());
  
  // Use express.json but keep raw body for webhook verification
  app.use(express.json({ limit: "50mb",
    verify: (req: any, res, buf) => {
      req.rawBody = buf;
    }
  }));

  
// Custom Images DB for persistence
const IMAGES_DB_FILE = isProdGlobal ? path.join(os.tmpdir(), "custom_images.json") : path.join(process.cwd(), "src", "custom_images.json");
async function readImagesDb() {
  try {
    const data = await fs.readFile(IMAGES_DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { images: {} };
  }
}
async function writeImagesDb(data) {
  await fs.writeFile(IMAGES_DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

  // Helper to get or create an order
  const saveOrder = async (orderId, data) => {
    const db = await readDb();
    const existing = db.orders[orderId] || {};
    db.orders[orderId] = { ...existing, ...data };
    await writeDb(db);
  };

  const getOrder = async (orderId) => {
    const db = await readDb();
    return db.orders[orderId] || null;
  };

  const getOrders = async () => {
    const db = await readDb();
    return Object.entries(db.orders)
      .map(([id, data]: [string, any]) => ({ id, ...data }))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  };

  
  // --- Custom Image Routes ---
  app.get("/api/images", async (req, res) => {
    try {
      const db = await readImagesDb();
      res.json({ success: true, images: db.images || {} });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get("/api/images/:productId", async (req, res) => {
    try {
      const db = await readImagesDb();
      res.json({ success: true, images: db.images[req.params.productId] || {} });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post("/api/images/upload", async (req, res) => {
    try {
      const { productId, color, base64Data } = req.body;
      const match = base64Data.match(/^data:image\/([^;]+);base64,(.+)$/);
      if (match) {
        const ext = match[1];
        const data = match[2];
        const colorFormatted = color.toLowerCase().replace(/\s+/g, '_');
        const filename = `${productId}_${colorFormatted}.png`; // Always save as .png or .jpg, we'll assume the client sends what is in data.ts, but data.ts says .png
        // Actually, our data.ts points to .png explicitly. So we'll force save as .png regardless of the mime, though browser might send jpeg. 
        // We can just write the base64 as .png and it works in browsers anyway.
        const filepath = isProd ? path.join(os.tmpdir(), 'custom_images', filename) : path.join(process.cwd(), 'public', 'custom_images', filename);
        
        // Ensure directory exists
        
        await fs.mkdir(path.dirname(filepath), { recursive: true });
        
        await fs.writeFile(filepath, Buffer.from(data, 'base64'));
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // --- API Routes ---

  
  // 1. Create Order
  app.post("/api/orders/create", async (req, res) => {
    try {
      const { items, subtotal, deliveryCharge, discount, total, customer, address } = req.body;
      const razorpay = getRazorpay();

      // Create Razorpay Order first
      const rzpOrder = await razorpay.orders.create({
        amount: Math.round(total * 100), // in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`
      });

      const orderId = `SAG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const orderData = {
        id: orderId,
        items,
        subtotal,
        deliveryCharge,
        discount,
        total,
        customer,
        address,
        razorpayOrderId: rzpOrder.id,
        paymentStatus: "Pending",
        orderStatus: "Order Placed",
        createdAt: Date.now()
      };

      // Save pending order to Database
      await saveOrder(orderId, orderData);

      res.json({
        success: true,
        orderId,
        razorpayOrderId: rzpOrder.id,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        key: process.env.RAZORPAY_KEY_ID // Safe to send to frontend
      });
    } catch (error) {
      console.error("Order creation failed:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // 2. Verify Payment (Client callback)
  app.post("/api/orders/verify", async (req, res) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;
      
      const key_secret = process.env.RAZORPAY_KEY_SECRET;
      if (!key_secret) throw new Error("Razorpay secret not configured");

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", key_secret)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        // Payment verified!
        await saveOrder(orderId, {
          paymentStatus: "Paid",
          orderStatus: "Payment Confirmed",
          razorpayPaymentId: razorpay_payment_id
        });
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        await saveOrder(orderId, {
          paymentStatus: "Failed"
        });
        res.status(400).json({ success: false, message: "Invalid signature" });
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // 3. Webhook for asynchronous updates
  app.post("/api/webhooks/razorpay", async (req, res) => {
    try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
      if (!secret) return res.status(200).send("Webhook ignored (no secret)");

      const signature = req.headers["x-razorpay-signature"];
      const isValid = Razorpay.validateWebhookSignature((req as any).rawBody.toString(), signature as string, secret);
      
      if (!isValid) {
        return res.status(400).send("Invalid signature");
      }

      const event = req.body.event;
      const payload = req.body.payload;
      
      if (event === "payment.captured" || event === "order.paid") {
        const payment = payload.payment.entity;
        const rzpOrderId = payment.order_id;
        
        // Find order by Razorpay order ID
        const allOrders = await getOrders();
        const order = allOrders.find(o => o.razorpayOrderId === rzpOrderId);
        
        if (order && order.paymentStatus !== "Paid") {
          await saveOrder(order.id, {
            paymentStatus: "Paid",
            orderStatus: "Payment Confirmed",
            razorpayPaymentId: payment.id
          });
        }
      } else if (event === "payment.failed") {
        const payment = payload.payment.entity;
        const rzpOrderId = payment.order_id;
        const allOrders = await getOrders();
        const order = allOrders.find(o => o.razorpayOrderId === rzpOrderId);
        
        if (order) {
          await saveOrder(order.id, {
            paymentStatus: "Failed"
          });
        }
      } else if (event === "refund.created" || event === "refund.processed") {
        const refund = payload.refund.entity;
        const paymentId = refund.payment_id;
        const allOrders = await getOrders();
        const order = allOrders.find(o => o.razorpayPaymentId === paymentId);
        
        if (order) {
          await saveOrder(order.id, {
            paymentStatus: "Refunded",
            orderStatus: "Cancelled"
          });
        }
      }

      res.status(200).json({ status: "ok" });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).send("Webhook error");
    }
  });

  // 4. Get all orders (For My Orders / Admin)
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await getOrders();
      res.json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // 5. Get Single Order
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await getOrder(req.params.id);
      if (order) {
        res.json({ success: true, order });
      } else {
        res.status(404).json({ success: false, message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // 6. Update Order Status (Admin)
  app.post("/api/orders/:id/status", async (req, res) => {
    try {
      const { orderStatus, trackingNumber } = req.body;
      const allowedStatuses = ["Order Placed", "Payment Confirmed", "Processing", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];
      const order = await getOrder(req.params.id);
      if (!order) return res.status(404).json({ success: false, message: "Order not found" });
      if (!allowedStatuses.includes(orderStatus)) return res.status(400).json({ success: false, message: "Invalid order status" });
      if (orderStatus !== "Cancelled" && order.paymentStatus !== "Paid") return res.status(400).json({ success: false, message: "Payment must be verified before fulfilment" });
      const updateData: any = { orderStatus };
      if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
      
      await saveOrder(req.params.id, updateData);
      res.json({ success: true, message: "Status updated" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });


  // Vite middleware for development
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
