import React, { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORIES, PRODUCTS } from '../data';
import { Coupon, Product } from '../types';

interface ProductContextType {
  products: Product[];
  customImages: Record<string, Record<string, string>>;
  uploadCustomImage: (productId: string, color: string, base64Data: string) => Promise<void>;
  saveProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  homeContent: HomeContent;
  saveHomeContent: (content: HomeContent) => void;
  coupons: Coupon[];
  saveCoupon: (coupon: Coupon) => void;
  deleteCoupon: (couponId: string) => void;
  categories: string[];
  saveCategory: (category: string, previous?: string) => void;
  deleteCategory: (category: string) => void;
}

export interface HomeContent {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  buttonLabel: string;
}

const defaultHomeContent: HomeContent = {
  badge: '',
  title: 'Elegance That Feels Like You',
  highlight: '',
  subtitle: '',
  buttonLabel: 'Shop Collection'
};
const defaultCoupons: Coupon[] = [];
const defaultCategories = ['Suits', 'Kurtis', 'Anarkali', 'Dupatta Sets', 'Co-ord Sets', 'Festive Wear', 'Party Wear'];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const getProductImage = (product: Product, customImages: Record<string, Record<string, string>>, color?: string) => {
  if (color && customImages[product.id]?.[color]) return customImages[product.id][color];
  const colorIndex = color ? product.colors.indexOf(color) : -1;
  return product.images[colorIndex >= 0 ? colorIndex : 0] || product.images[0] || '';
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('suit_aura_products');
    if (!saved) return PRODUCTS;
    try {
      const parsed = JSON.parse(saved);
      const demoIds = new Set(['p7', 'p8', 'p9', 'p10', 'p11', 'p12']);
      const realProducts = Array.isArray(parsed) ? parsed.filter(product => !demoIds.has(product.id)) : [];
      localStorage.setItem('suit_aura_products', JSON.stringify(realProducts));
      return realProducts.length ? realProducts : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });
  const [customImages, setCustomImages] = useState<Record<string, Record<string, string>>>({});
  const [homeContent, setHomeContent] = useState<HomeContent>(() => {
    const saved = localStorage.getItem('suit_aura_home_content');
    if (!saved) return defaultHomeContent;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.title === 'Grand Festive' || parsed.badge === 'New Collection 2026') return defaultHomeContent;
      return { ...defaultHomeContent, ...parsed };
    } catch {
      return defaultHomeContent;
    }
  });
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('suit_aura_coupons');
    if (!saved) return defaultCoupons;
    try { return JSON.parse(saved).filter((coupon: Coupon) => coupon.code !== 'FIRST15'); } catch { return defaultCoupons; }
  });
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('suit_aura_categories');
    if (!saved || saved === '[]') return defaultCategories;
    try { return JSON.parse(saved).filter((category: string) => category !== 'Heels'); } catch { return CATEGORIES; }
  });

  useEffect(() => {
    const savedImages = localStorage.getItem('suit_aura_custom_images');
    if (savedImages) {
      try {
        const images = JSON.parse(savedImages);
        ['p7', 'p8', 'p9', 'p10', 'p11', 'p12'].forEach(id => delete images[id]);
        localStorage.setItem('suit_aura_custom_images', JSON.stringify(images));
        setCustomImages(images);
      } catch {
        setCustomImages({});
      }
    }
  }, []);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === 'suit_aura_products' && event.newValue) setProducts(JSON.parse(event.newValue));
      if (event.key === 'suit_aura_categories' && event.newValue) setCategories(JSON.parse(event.newValue));
      if (event.key === 'suit_aura_home_content' && event.newValue) setHomeContent(JSON.parse(event.newValue));
      if (event.key === 'suit_aura_coupons' && event.newValue) setCoupons(JSON.parse(event.newValue));
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    localStorage.setItem('suit_aura_products', JSON.stringify(products));
  }, [products]);

  const uploadCustomImage = async (productId: string, color: string, base64Data: string) => {
    setCustomImages(prev => {
      const next = {
        ...prev,
        [productId]: { ...(prev[productId] || {}), [color]: base64Data }
      };
      localStorage.setItem('suit_aura_custom_images', JSON.stringify(next));
      return next;
    });

    try {
      await fetch('/api/images/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, color, base64Data })
      });
    } catch {
      // The local copy remains available when the optional server sync is offline.
    }
  };

  const saveProduct = (product: Product) => {
    setProducts(prev => {
      const exists = prev.some(item => item.id === product.id);
      return exists ? prev.map(item => item.id === product.id ? product : item) : [product, ...prev];
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const saveHomeContent = (content: HomeContent) => {
    setHomeContent(content);
    localStorage.setItem('suit_aura_home_content', JSON.stringify(content));
  };

  const saveCoupon = (coupon: Coupon) => {
    setCoupons(previous => previous.some(item => item.id === coupon.id) ? previous.map(item => item.id === coupon.id ? coupon : item) : [coupon, ...previous]);
    const next = coupons.some(item => item.id === coupon.id) ? coupons.map(item => item.id === coupon.id ? coupon : item) : [coupon, ...coupons];
    localStorage.setItem('suit_aura_coupons', JSON.stringify(next));
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons(previous => { const next = previous.filter(coupon => coupon.id !== couponId); localStorage.setItem('suit_aura_coupons', JSON.stringify(next)); return next; });
  };

  const saveCategory = (category: string, previous?: string) => {
    const clean = category.trim();
    if (!clean) return;
    if (previous && previous !== clean) {
      setProducts(old => old.map(product => product.category === previous ? { ...product, category: clean } : product));
    }
    setCategories(old => {
      const next = old.includes(previous || '') ? old.map(item => item === previous ? clean : item) : old.includes(clean) ? old : [...old, clean];
      localStorage.setItem('suit_aura_categories', JSON.stringify(next));
      return next;
    });
  };

  const deleteCategory = (category: string) => {
    setCategories(old => { const next = old.filter(item => item !== category); localStorage.setItem('suit_aura_categories', JSON.stringify(next)); return next; });
  };

  return (
    <ProductContext.Provider value={{ products, customImages, uploadCustomImage, saveProduct, deleteProduct, homeContent, saveHomeContent, coupons, saveCoupon, deleteCoupon, categories, saveCategory, deleteCategory }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};
