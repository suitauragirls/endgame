export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'Suits' | 'Kurtis' | 'Dresses' | 'Dupattas' | 'Heels' | 'Full Combo Set';
  sizes?: ('S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL' | '4XL')[];
  colors: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  features?: string[];
  includes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface CheckoutData {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  houseFlat: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
  addressType: 'Home' | 'Work';
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  customer: {
    name: string;
    mobile: string;
    email: string;
  };
  address: {
    houseFlat: string;
    area: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    addressType: string;
  };
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: 'Order Placed' | 'Payment Confirmed' | 'Processing' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: number;
  trackingNumber?: string;
}
