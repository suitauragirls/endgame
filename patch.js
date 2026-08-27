const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  `} else if (event === "payment.failed") {`,
  `} else if (event === "payment.failed") {`
);

const newLogic = `
      if (event === "payment.captured" || event === "order.paid") {
        const payment = payload.payment.entity;
        const rzpOrderId = payment.order_id;
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
`;

code = code.replace(/if \(event === "payment\.captured" \|\| event === "order\.paid"\) \{[\s\S]*?\} else if \(event === "payment\.failed"\) \{[\s\S]*?\}\s*\}/, newLogic.trim());

fs.writeFileSync('server.ts', code);
