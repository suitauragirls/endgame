import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Wishlist } from './pages/Wishlist';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';

import { Orders } from './pages/Orders';
import { OrderDetails } from './pages/OrderDetails';
import { Admin } from './pages/Admin';
import { ContactUs, FAQs, ShippingReturns, SizeGuide, PrivacyPolicy, TermsOfService, AboutUs } from './pages/InfoPages';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/faq" element={<FAQs />} />
                <Route path="/shipping" element={<ShippingReturns />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                {/* Fallback route */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </Router>
              </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  );
}
