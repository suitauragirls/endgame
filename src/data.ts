import { Product } from './types';








export const CATEGORIES = ['Full Combo Set', 'Suits', 'Kurtis', 'Dresses', 'Dupattas', 'Heels'];

// High-quality placeholder images for the premium look
export const PRODUCTS: Product[] = [
  {
    id: 'p7',
    name: '6 Pcs Full Combo Set',
    description: 'Complete your festive and party look with this stylish Full Combo Set from Suit Aura Girls. The set features an elegant embroidered Rayon Kurti paired with a flowing Palazzo and coordinated accessories for a complete ready-to-wear look. Available in multiple attractive colours and sizes S to 4XL, this combo is designed for stylish festive, party and special-occasion wear.',
    price: 599,
    originalPrice: 1699,
    images: [
      '/custom_images/p7_light_blue.png',
      '/custom_images/p7_baby_pink.png',
      '/custom_images/p7_red.png',
      '/custom_images/p7_royal_blue.png',
      '/custom_images/p7_hot_pink.png',
      '/custom_images/p7_black.png',
      '/custom_images/p7_ivory.png',
      '/custom_images/p7_orange.png',
      '/custom_images/p7_yellow.png',
      '/custom_images/p7_light_green.png'
    ],
    category: 'Full Combo Set',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    colors: ['Light Blue', 'Baby Pink', 'Red', 'Royal Blue', 'Hot Pink', 'Black', 'Ivory', 'Orange', 'Yellow', 'Light Green'],
    features: [
      'Premium-looking embroidered design',
      'Comfortable Rayon fabric',
      'Flowing Palazzo',
      'Matching earrings',
      'Matching handbag',
      'Matching heels',
      'Multiple colour options',
      'Sizes S to 4XL',
      'Suitable for festive, party and special occasions',
      'Complete coordinated look'
    ],
    includes: [
      'Embroidered Kurti',
      'Palazzo',
      'Matching Earrings',
      'Matching Handbag',
      'Matching Heels'
    ],
    isNewArrival: true,
    inStock: true,
  },
  {
    id: 'p8',
    name: 'Premium 3D Floral Georgette Anarkali Gown',
    description: 'Premium Georgette with Soft Inner featuring 3D Floral Embroidery with Pearls, Sequins & Crystal Work.',
    price: 900,
    originalPrice: 2499,
    images: [
      '/custom_images/p8_hot_pink.png',
      '/custom_images/p8_royal_blue.png',
      '/custom_images/p8_light_blue.png',
      '/custom_images/p8_black.png',
      '/custom_images/p8_peach.png',
      '/custom_images/p8_wine.png',
      '/custom_images/p8_bottle_green.png',
      '/custom_images/p8_red.png'
    ],
    category: 'Suits',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    colors: ['Hot Pink', 'Royal Blue', 'Light Blue', 'Black', 'Peach', 'Wine', 'Bottle Green', 'Red'],
    features: [
      'Fabric: Premium Georgette with Soft Inner',
      'Work: 3D Floral Embroidery with Pearls, Sequins & Crystal Work',
      'Elegant V-neckline with pearl and crystal outlining',
      '3D floral shoulder detailing',
      'Jewellery-style waist dori with floral pendant and pearl tassels',
      'Asymmetric floral trail',
      '3-layer transparent flared sleeves',
      'Heavy floral work toward the lower flare',
      'Pearl and crystal drop detailing on the hem',
      'Care: Dry Clean Only'
    ],
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'p9',
    name: 'Premium Casual Shirt & Jeans Set',
    description: 'Stylish casual shirt with inner top and denim jeans, perfect for everyday wear and casual outings.',
    price: 600,
    originalPrice: 999,
    images: [
      '/custom_images/p9_beige.png',
      '/custom_images/p9_brown.png',
      '/custom_images/p9_royal_blue.png',
      '/custom_images/p9_black.png',
      '/custom_images/p9_yellow.png',
      '/custom_images/p9_navy_blue.png'
    ],
    category: 'Dresses',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige', 'Brown', 'Royal Blue', 'Black', 'Yellow', 'Navy Blue'],
    features: [
      'Material: Premium Cotton Blend',
      'Stylish casual shirt with inner top',
      'Denim jeans included',
      'Perfect for everyday wear and casual outings'
    ],
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'p10',
    name: 'Elegant Pearl Border Flared Anarkali Gown',
    description: 'Elegant Pearl Border Flared Anarkali Gown',
    price: 719,
    originalPrice: 1299,
    images: [
      '/custom_images/p10_maroon.png',
      '/custom_images/p10_ivory.png',
      '/custom_images/p10_navy_blue.png',
      '/custom_images/p10_peach.png',
      '/custom_images/p10_red.png',
      '/custom_images/p10_black.png',
      '/custom_images/p10_rani_pink.png'
    ],
    category: 'Suits',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Maroon', 'Ivory', 'Navy Blue', 'Peach', 'Red', 'Black', 'Rani Pink'],
    features: [
      'Elegant Pearl Border Flared Anarkali Gown',
      'Premium quality fabric',
      'Flared design with pearl border',
      'Perfect for festive occasions'
    ],
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'p11',
    name: 'Elegant Pearl Border Flared Anarkali Gown',
    description: 'Elegant Pearl Border Flared Anarkali Gown',
    price: 649,
    originalPrice: 1299,
    images: [
      '/custom_images/p11_navy_blue.png',
      '/custom_images/p11_yellow.png',
      '/custom_images/p11_brown.png',
      '/custom_images/p11_rani_pink.png',
      '/custom_images/p11_peach.png',
      '/custom_images/p11_black.png',
      '/custom_images/p11_maroon.png'
    ],
    category: 'Suits',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Navy Blue', 'Yellow', 'Brown', 'Rani Pink', 'Peach', 'Black', 'Maroon'],
    features: [
      'Elegant Pearl Border Flared Anarkali Gown',
      'Premium quality fabric',
      'Flared design with pearl border',
      'Perfect for festive occasions'
    ],
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'p12',
    name: 'Elegant Flared Anarkali Gown',
    description: 'Elegant flared Anarkali gown with V-neck design, full flared sleeves and delicate pearl-style border detailing. Beautiful flowing design, perfect for festive, party and wedding wear.',
    price: 800,
    originalPrice: 1599,
    images: [
      '/custom_images/p12_pink.png',
      '/custom_images/p12_purple.png',
      '/custom_images/p12_red.png',
      '/custom_images/p12_yellow.png',
      '/custom_images/p12_rani_pink.png',
      '/custom_images/p12_green.png',
      '/custom_images/p12_peach.png',
      '/custom_images/p12_maroon.png',
      '/custom_images/p12_black.png'
    ],
    category: 'Suits',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Pink', 'Purple', 'Red', 'Yellow', 'Rani Pink', 'Green', 'Peach', 'Maroon', 'Black'],
    features: [
      'V-neck design',
      'Full flared sleeves',
      'Delicate pearl-style border detailing',
      'Beautiful flowing design',
      'Perfect for festive, party and wedding wear'
    ],
    isNewArrival: true,
    inStock: true
  }
];