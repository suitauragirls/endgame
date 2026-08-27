import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  customImages: Record<string, Record<string, string>>;
  uploadCustomImage: (productId: string, color: string, base64Data: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customImages, setCustomImages] = useState<Record<string, Record<string, string>>>({});

  

  const uploadCustomImage = async (productId: string, color: string, base64Data: string) => {
    const response = await fetch('/api/images/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, color, base64Data })
    });
    const data = await response.json();
    if (data.success) {
      setCustomImages(prev => ({
        ...prev,
        [productId]: {
          ...(prev[productId] || {}),
          [color]: base64Data
        }
      }));
    }
  };

  return (
    <ProductContext.Provider value={{ products: PRODUCTS, customImages, uploadCustomImage }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};
