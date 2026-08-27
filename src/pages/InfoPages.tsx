import React from 'react';

const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="min-h-screen pt-32 pb-20 bg-[#FAF9F6]">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 border border-[#F0EAD6]">
      <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-8 border-b border-[#F0EAD6] pb-4">{title}</h1>
      <div className="font-sans text-neutral-600 space-y-6 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export const ContactUs = () => (
  <PageLayout title="Contact Us">
    <p>We would love to hear from you. For any inquiries, please reach out to us using the contact details below:</p>
    <div className="bg-[#FAF9F6] p-6 border border-[#F0EAD6] mt-6">
      <p className="mb-2"><strong>Address:</strong> Near Asansol Junction, West Bengal, India</p>
      <p className="mb-2"><strong>Phone:</strong> +91 80583 35184</p>
      <p><strong>Email:</strong> Suitauragirls@gmail.com</p>
    </div>
  </PageLayout>
);

export const FAQs = () => (
  <PageLayout title="Frequently Asked Questions">
    <h3 className="font-medium text-[#1A1A1A]">How do I track my order?</h3>
    <p className="mb-6">You can track your order by logging into your account and visiting the 'My Orders' section.</p>
    
    <h3 className="font-medium text-[#1A1A1A]">What payment methods do you accept?</h3>
    <p className="mb-6">We accept all major credit/debit cards, UPI, and NetBanking through our secure Razorpay payment gateway.</p>
    
    <h3 className="font-medium text-[#1A1A1A]">Do you offer Cash on Delivery (COD)?</h3>
    <p>Currently, we only accept prepaid online orders to ensure secure and contactless delivery.</p>
  </PageLayout>
);

export const ShippingReturns = () => (
  <PageLayout title="Shipping & Returns">
    <h3 className="font-medium text-[#1A1A1A]">Shipping Policy</h3>
    <p className="mb-6">We offer free shipping on all orders above ₹999. For orders below this amount, a flat delivery charge of ₹99 applies. Orders are typically processed and dispatched within 1-2 business days.</p>
    
    <h3 className="font-medium text-[#1A1A1A]">Return Policy</h3>
    <p>We accept returns within 7 days of delivery. The items must be unused, in their original packaging, and with all tags intact. To initiate a return, please contact our support team.</p>
  </PageLayout>
);

export const SizeGuide = () => (
  <PageLayout title="Size Guide">
    <p className="mb-6">Use the chart below to find your perfect fit. Measurements are in inches.</p>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse border border-[#F0EAD6]">
        <thead>
          <tr className="bg-[#FAF9F6]">
            <th className="border border-[#F0EAD6] p-3">Size</th>
            <th className="border border-[#F0EAD6] p-3">Bust</th>
            <th className="border border-[#F0EAD6] p-3">Waist</th>
            <th className="border border-[#F0EAD6] p-3">Hip</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-[#F0EAD6] p-3">S</td><td className="border border-[#F0EAD6] p-3">34"</td><td className="border border-[#F0EAD6] p-3">28"</td><td className="border border-[#F0EAD6] p-3">36"</td></tr>
          <tr><td className="border border-[#F0EAD6] p-3">M</td><td className="border border-[#F0EAD6] p-3">36"</td><td className="border border-[#F0EAD6] p-3">30"</td><td className="border border-[#F0EAD6] p-3">38"</td></tr>
          <tr><td className="border border-[#F0EAD6] p-3">L</td><td className="border border-[#F0EAD6] p-3">38"</td><td className="border border-[#F0EAD6] p-3">32"</td><td className="border border-[#F0EAD6] p-3">40"</td></tr>
          <tr><td className="border border-[#F0EAD6] p-3">XL</td><td className="border border-[#F0EAD6] p-3">40"</td><td className="border border-[#F0EAD6] p-3">34"</td><td className="border border-[#F0EAD6] p-3">42"</td></tr>
          <tr><td className="border border-[#F0EAD6] p-3">XXL</td><td className="border border-[#F0EAD6] p-3">42"</td><td className="border border-[#F0EAD6] p-3">36"</td><td className="border border-[#F0EAD6] p-3">44"</td></tr>
        </tbody>
      </table>
    </div>
  </PageLayout>
);

export const PrivacyPolicy = () => (
  <PageLayout title="Privacy Policy">
    <p className="mb-4">At Suit Aura Girls, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
    <h3 className="font-medium text-[#1A1A1A] mt-6 mb-2">1. Information We Collect</h3>
    <p className="mb-4">We collect information you provide directly to us when you make a purchase, create an account, or contact customer support. This includes your name, email, phone number, and address.</p>
    <h3 className="font-medium text-[#1A1A1A] mt-6 mb-2">2. How We Use Your Information</h3>
    <p>We use the collected information to process orders, communicate with you regarding your purchase, and improve our services.</p>
  </PageLayout>
);

export const TermsOfService = () => (
  <PageLayout title="Terms of Service">
    <p className="mb-4">Welcome to Suit Aura Girls. By accessing our website, you agree to these Terms of Service.</p>
    <h3 className="font-medium text-[#1A1A1A] mt-6 mb-2">1. General Conditions</h3>
    <p className="mb-4">We reserve the right to refuse service to anyone for any reason at any time.</p>
    <h3 className="font-medium text-[#1A1A1A] mt-6 mb-2">2. Products and Pricing</h3>
    <p>All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any product at any time.</p>
  </PageLayout>
);


export const AboutUs = () => (
  <PageLayout title="Our Story">
    <p className="mb-4">At Suit Aura Girls, we believe in the timeless beauty of Indian textiles. Every piece in our collection is thoughtfully designed with premium fabrics, intricate embellishments, and flawless tailoring to make you feel extraordinary.</p>
    <p>We are a premium women's fashion store bringing you the most elegant ethnic and contemporary wear crafted with love and luxury. Our journey started with a vision to redefine traditional wear for the modern woman, blending timeless heritage with contemporary aesthetics.</p>
  </PageLayout>
);
