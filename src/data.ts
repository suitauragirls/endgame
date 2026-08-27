import { Product } from './types';

export const CATEGORIES: string[] = ['Suits', 'Kurtis', 'Anarkali', 'Dupatta Sets', 'Co-ord Sets', 'Festive Wear', 'Party Wear'];

const images = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85'
];

const catalog: Array<[string, string, number, Product['category']]> = [
  ['Gulab Chanderi Embroidered Suit Set', 'Rani Pink', 1499, 'Suits'], ['Jaipur Block Print Cotton Suit', 'Indigo Blue', 999, 'Suits'], ['Banarasi Border Straight Suit', 'Wine', 1799, 'Suits'], ['Mogra Floral Printed Suit Set', 'Ivory', 1199, 'Suits'], ['Zari Stripe Festive Suit', 'Emerald', 1599, 'Suits'],
  ['Chikankari Cotton Lucknowi Kurti', 'White', 799, 'Kurtis'], ['Indigo Dabu Printed Kurti', 'Indigo Blue', 699, 'Kurtis'], ['Aari Work Rayon Long Kurti', 'Maroon', 899, 'Kurtis'], ['Handblock Floral A-line Kurti', 'Mustard', 749, 'Kurtis'], ['Pearl Button Cotton Kurti', 'Rose Pink', 849, 'Kurtis'],
  ['Chanderi Silk Zardozi Anarkali', 'Rani Pink', 2299, 'Anarkali'], ['Gota Patti Floor Length Anarkali', 'Royal Blue', 1999, 'Anarkali'], ['Mirror Work Angrakha Anarkali', 'Bottle Green', 1899, 'Anarkali'], ['Printed Kalidar Anarkali Dress', 'Peach', 1299, 'Anarkali'], ['Velvet Yoke Party Anarkali', 'Wine', 2499, 'Anarkali'],
  ['Banarasi Tissue Dupatta Set', 'Magenta', 1199, 'Dupatta Sets'], ['Organza Phulkari Dupatta Set', 'Yellow', 999, 'Dupatta Sets'], ['Chanderi Gota Border Set', 'Peach', 1099, 'Dupatta Sets'], ['Bandhani Leheriya Dupatta Set', 'Red', 899, 'Dupatta Sets'], ['Kalamkari Cotton Dupatta Set', 'Rust', 799, 'Dupatta Sets'],
  ['Mirror Work Ethnic Co-ord Set', 'Rose Pink', 1599, 'Co-ord Sets'], ['Linen Palazzo Kurta Co-ord', 'Sage Green', 1299, 'Co-ord Sets'], ['Printed Peplum Sharara Co-ord', 'Turquoise', 1399, 'Co-ord Sets'], ['Embroidered Cotton Co-ord', 'Black', 1499, 'Co-ord Sets'], ['Satin Draped Festive Co-ord', 'Wine', 1799, 'Co-ord Sets'],
  ['Gota Patti Celebration Lehenga Set', 'Fuchsia', 2499, 'Festive Wear'], ['Rangoli Embroidered Sharara Set', 'Marigold', 2199, 'Festive Wear'], ['Handloom Silk Festive Set', 'Royal Blue', 2699, 'Festive Wear'], ['Sequin Dupatta Celebration Set', 'Bottle Green', 2399, 'Festive Wear'], ['Kashidaari Chikankari Set', 'Ivory', 1999, 'Festive Wear'],
  ['Royal Velvet Sequin Party Set', 'Wine', 2499, 'Party Wear'], ['Crystal Neckline Georgette Set', 'Black', 2199, 'Party Wear'], ['Satin Cape Sharara Ensemble', 'Emerald', 2299, 'Party Wear'], ['Pearl Embellished Palazzo Set', 'Navy', 1999, 'Party Wear'], ['Draped Pre-Stitched Saree Set', 'Plum', 2799, 'Party Wear']
];

export const PRODUCTS: Product[] = catalog.map(([name, color, price, category], index) => ({
  id: `catalog-${index + 1}`,
  name,
  description: `${name}, designed for modern Indian wardrobes with comfortable drape and occasion-ready detail.`,
  price,
  originalPrice: Math.round(price * 1.35),
  images: [images[index % images.length]],
  category,
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: [color],
  isNewArrival: index < 12,
  isBestSeller: index % 3 === 0,
  inStock: true,
  features: ['Quality checked garment', 'Comfort-first fit', 'Prepaid delivery available']
}));
