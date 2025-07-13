export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  deal?: {
    type: string;
    originalPrice: number;
  };
  walmartExclusive?: boolean;
  rating: number;
  reviews: number;
  description?: string;
  specifications?: { [key: string]: string };
  warranty?: string;
  delivery?: string;
  returns?: string;
  stock: number;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export const products: Product[] = [
  // Electronics (15 products)
  {
    id: "WM-IP13-128",
    name: "iPhone 13 (128GB)",
    category: "electronics",
    price: 69900,
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    deal: {
      type: "ROLLBACK",
      originalPrice: 75900
    },
    walmartExclusive: true,
    rating: 4.5,
    reviews: 2847,
    description: "Experience the power of iPhone 13 with A15 Bionic chip, advanced dual-camera system, and all-day battery life.",
    stock: 25,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-SP-N13-256",
    name: "Samsung Galaxy M35 5G (256GB)",
    category: "electronics",
    price: 15999,
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
    deal: {
      type: "DEAL",
      originalPrice: 18999
    },
    rating: 4.3,
    reviews: 1524,
    description: "Powerful 5G smartphone with 108MP camera, 6000mAh battery, and Exynos processor.",
    stock: 42,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-OP-N3L-128",
    name: "OnePlus Nord CE 3 Lite 5G",
    category: "electronics",
    price: 19999,
    image: "https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg",
    rating: 4.2,
    reviews: 892,
    description: "Smooth performance with 120Hz display, 108MP camera, and 67W SUPERVOOC charging.",
    stock: 18,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-LAP-HP-15",
    name: "HP Pavilion 15.6-inch Laptop",
    category: "electronics",
    price: 52990,
    image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
    deal: {
      type: "ROLLBACK",
      originalPrice: 58990
    },
    rating: 4.4,
    reviews: 756,
    description: "Powerful laptop with Intel Core i5, 16GB RAM, and 512GB SSD for work and entertainment.",
    stock: 8,
    stockStatus: 'low-stock'
  },
  {
    id: "WM-TV-SAM-43",
    name: "Samsung 43-inch Smart TV",
    category: "electronics",
    price: 32999,
    image: "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg",
    rating: 4.6,
    reviews: 1234,
    description: "4K Ultra HD Smart TV with HDR and built-in streaming apps.",
    stock: 15,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-TAB-IPAD",
    name: "iPad 10th Generation",
    category: "electronics",
    price: 44900,
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
    rating: 4.7,
    reviews: 892,
    description: "All-new colorful iPad with A14 Bionic chip and 10.9-inch Liquid Retina display.",
    stock: 22,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-WATCH-APPLE",
    name: "Apple Watch Series 9",
    category: "electronics",
    price: 41900,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    rating: 4.5,
    reviews: 567,
    description: "Advanced health features, fitness tracking, and seamless iPhone integration.",
    stock: 31,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-HEADPHONES-SONY",
    name: "Sony WH-1000XM5 Headphones",
    category: "electronics",
    price: 29990,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    rating: 4.8,
    reviews: 1456,
    description: "Industry-leading noise canceling with exceptional sound quality.",
    stock: 19,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-SPEAKER-JBL",
    name: "JBL Charge 5 Bluetooth Speaker",
    category: "electronics",
    price: 12999,
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
    rating: 4.4,
    reviews: 789,
    description: "Powerful portable speaker with 20 hours of playtime and IP67 waterproof rating.",
    stock: 45,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-CAMERA-CANON",
    name: "Canon EOS R50 Mirrorless Camera",
    category: "electronics",
    price: 54999,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
    rating: 4.6,
    reviews: 234,
    description: "24.2MP APS-C sensor with 4K video recording and dual pixel autofocus.",
    stock: 7,
    stockStatus: 'low-stock'
  },
  {
    id: "WM-GAMING-PS5",
    name: "PlayStation 5 Console",
    category: "electronics",
    price: 49990,
    image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg",
    rating: 4.9,
    reviews: 3456,
    description: "Next-gen gaming console with ultra-high speed SSD and ray tracing.",
    stock: 3,
    stockStatus: 'low-stock'
  },
  {
    id: "WM-KEYBOARD-LOGITECH",
    name: "Logitech MX Keys Wireless Keyboard",
    category: "electronics",
    price: 8999,
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
    rating: 4.3,
    reviews: 567,
    description: "Advanced wireless keyboard with smart illumination and multi-device connectivity.",
    stock: 28,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-MOUSE-APPLE",
    name: "Apple Magic Mouse",
    category: "electronics",
    price: 7900,
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
    rating: 4.1,
    reviews: 345,
    description: "Multi-touch surface mouse with rechargeable battery.",
    stock: 34,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-CHARGER-ANKER",
    name: "Anker PowerCore 10000 Power Bank",
    category: "electronics",
    price: 2499,
    image: "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg",
    rating: 4.5,
    reviews: 1234,
    description: "Compact 10000mAh portable charger with PowerIQ technology.",
    stock: 67,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-CABLE-USB-C",
    name: "USB-C to Lightning Cable 2m",
    category: "electronics",
    price: 1999,
    image: "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg",
    rating: 4.2,
    reviews: 890,
    description: "Fast charging cable compatible with iPhone and iPad.",
    stock: 89,
    stockStatus: 'in-stock'
  },

  // Grocery (15 products)
  {
    id: "WM-RICE-BR-5KG",
    name: "Basmati Rice Premium Quality (5kg)",
    category: "grocery",
    price: 525,
    image: "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg",
    rating: 4.6,
    reviews: 3421,
    description: "Premium quality aged basmati rice with long grains and aromatic fragrance.",
    stock: 156,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-PASTA-PEN-500G",
    name: "Whole Wheat Penne Pasta (500g)",
    category: "grocery",
    price: 125,
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
    deal: {
      type: "DEAL",
      originalPrice: 145
    },
    rating: 4.3,
    reviews: 987,
    description: "Nutritious whole wheat pasta made from 100% durum wheat semolina.",
    stock: 234,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-OIL-OLIVE-500ML",
    name: "Extra Virgin Olive Oil (500ml)",
    category: "grocery",
    price: 385,
    image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg",
    rating: 4.5,
    reviews: 1256,
    description: "Cold-pressed extra virgin olive oil perfect for cooking and salads.",
    stock: 78,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-MILK-FULL-1L",
    name: "Full Cream Milk (1 Liter)",
    category: "grocery",
    price: 62,
    image: "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg",
    rating: 4.7,
    reviews: 2134,
    description: "Fresh full cream milk rich in calcium and vitamins.",
    stock: 345,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-BREAD-WHOLE",
    name: "Whole Wheat Bread Loaf",
    category: "grocery",
    price: 45,
    image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg",
    rating: 4.4,
    reviews: 567,
    description: "Fresh baked whole wheat bread with no preservatives.",
    stock: 89,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-EGGS-DOZEN",
    name: "Farm Fresh Eggs (12 count)",
    category: "grocery",
    price: 85,
    image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg",
    rating: 4.6,
    reviews: 1234,
    description: "Grade A large eggs from free-range chickens.",
    stock: 123,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-SUGAR-WHITE-1KG",
    name: "White Sugar (1kg)",
    category: "grocery",
    price: 55,
    image: "https://images.pexels.com/photos/65882/spoon-white-sugar-sweet-65882.jpeg",
    rating: 4.2,
    reviews: 456,
    description: "Pure white refined sugar for cooking and baking.",
    stock: 267,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-SALT-IODIZED",
    name: "Iodized Salt (1kg)",
    category: "grocery",
    price: 25,
    image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg",
    rating: 4.5,
    reviews: 789,
    description: "Pure iodized salt for daily cooking needs.",
    stock: 345,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-TEA-BLACK-250G",
    name: "Premium Black Tea (250g)",
    category: "grocery",
    price: 165,
    image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg",
    rating: 4.4,
    reviews: 678,
    description: "Strong and aromatic black tea leaves from Assam.",
    stock: 145,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-COFFEE-INSTANT",
    name: "Instant Coffee (200g)",
    category: "grocery",
    price: 285,
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    rating: 4.3,
    reviews: 567,
    description: "Rich and smooth instant coffee for quick preparation.",
    stock: 89,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-BISCUITS-DIGESTIVE",
    name: "Digestive Biscuits (400g)",
    category: "grocery",
    price: 95,
    image: "https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg",
    rating: 4.1,
    reviews: 345,
    description: "Wholesome digestive biscuits made with wheat flour.",
    stock: 178,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-SNACKS-DIABETIC",
    name: "Sugar-Free Diabetic Snacks Mix (300g)",
    category: "grocery",
    price: 245,
    image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg",
    rating: 4.2,
    reviews: 234,
    description: "Healthy sugar-free snack mix suitable for diabetics.",
    stock: 67,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-NUTS-ALMONDS",
    name: "Raw Almonds (500g)",
    category: "grocery",
    price: 485,
    image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
    rating: 4.6,
    reviews: 456,
    description: "Premium quality raw almonds rich in protein and healthy fats.",
    stock: 89,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-HONEY-PURE",
    name: "Pure Honey (500g)",
    category: "grocery",
    price: 325,
    image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg",
    rating: 4.5,
    reviews: 678,
    description: "100% pure natural honey with no added sugar.",
    stock: 123,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-OATS-ROLLED",
    name: "Rolled Oats (1kg)",
    category: "grocery",
    price: 185,
    image: "https://images.pexels.com/photos/543730/pexels-photo-543730.jpeg",
    rating: 4.4,
    reviews: 567,
    description: "Nutritious rolled oats perfect for breakfast and baking.",
    stock: 156,
    stockStatus: 'in-stock'
  },

  // Home & Garden (10 products)
  {
    id: "WM-SOFA-3S-GREY",
    name: "3-Seater Fabric Sofa (Grey)",
    category: "home",
    price: 24999,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    deal: {
      type: "ROLLBACK",
      originalPrice: 29999
    },
    walmartExclusive: true,
    rating: 4.4,
    reviews: 567,
    description: "Comfortable 3-seater sofa with premium fabric upholstery and solid wood frame.",
    stock: 12,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-TAB-DIN-4S",
    name: "4-Seater Dining Table Set",
    category: "home",
    price: 18999,
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    rating: 4.2,
    reviews: 324,
    description: "Modern dining table set with 4 chairs, perfect for small families.",
    stock: 8,
    stockStatus: 'low-stock'
  },
  {
    id: "WM-BED-QUEEN",
    name: "Queen Size Bed Frame",
    category: "home",
    price: 15999,
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    rating: 4.3,
    reviews: 234,
    description: "Sturdy wooden queen size bed frame with headboard.",
    stock: 15,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-MATTRESS-MEMORY",
    name: "Memory Foam Mattress Queen",
    category: "home",
    price: 22999,
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    rating: 4.5,
    reviews: 456,
    description: "Premium memory foam mattress for comfortable sleep.",
    stock: 18,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-WARDROBE-3DOOR",
    name: "3-Door Wooden Wardrobe",
    category: "home",
    price: 19999,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    rating: 4.1,
    reviews: 178,
    description: "Spacious 3-door wardrobe with hanging space and shelves.",
    stock: 9,
    stockStatus: 'low-stock'
  },
  {
    id: "WM-CURTAINS-BLACKOUT",
    name: "Blackout Curtains Set",
    category: "home",
    price: 1299,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    rating: 4.2,
    reviews: 345,
    description: "Room darkening blackout curtains for better sleep.",
    stock: 67,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-LAMP-TABLE",
    name: "Modern Table Lamp",
    category: "home",
    price: 2499,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    rating: 4.0,
    reviews: 123,
    description: "Stylish table lamp with adjustable brightness.",
    stock: 34,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-RUG-LIVING",
    name: "Living Room Area Rug",
    category: "home",
    price: 3999,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    rating: 4.3,
    reviews: 234,
    description: "Soft and durable area rug for living room decoration.",
    stock: 23,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-MIRROR-WALL",
    name: "Decorative Wall Mirror",
    category: "home",
    price: 1899,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    rating: 4.1,
    reviews: 156,
    description: "Elegant wall mirror to enhance room aesthetics.",
    stock: 45,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-PLANT-POT",
    name: "Ceramic Plant Pot Set",
    category: "home",
    price: 899,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    rating: 4.4,
    reviews: 89,
    description: "Set of 3 ceramic pots perfect for indoor plants.",
    stock: 78,
    stockStatus: 'in-stock'
  },

  // Clothing (10 products)
  {
    id: "WM-TSHIRT-COT-M",
    name: "Cotton T-Shirt Men's (Pack of 3)",
    category: "clothing",
    price: 799,
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
    deal: {
      type: "DEAL",
      originalPrice: 999
    },
    rating: 4.1,
    reviews: 1847,
    description: "Premium cotton t-shirts in assorted colors, comfortable and breathable.",
    stock: 145,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-JEANS-BL-32",
    name: "Men's Blue Jeans (32 Waist)",
    category: "clothing",
    price: 1299,
    image: "https://images.pexels.com/photos/4210863/pexels-photo-4210863.jpeg",
    rating: 4.3,
    reviews: 923,
    description: "Classic blue jeans with regular fit and premium denim fabric.",
    stock: 67,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-SHIRT-FORMAL",
    name: "Formal White Shirt",
    category: "clothing",
    price: 899,
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
    rating: 4.2,
    reviews: 456,
    description: "Crisp white formal shirt perfect for office wear.",
    stock: 89,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-DRESS-CASUAL",
    name: "Women's Casual Dress",
    category: "clothing",
    price: 1599,
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
    rating: 4.4,
    reviews: 234,
    description: "Comfortable casual dress for everyday wear.",
    stock: 34,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-SHOES-SNEAKERS",
    name: "Running Sneakers",
    category: "clothing",
    price: 2499,
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
    rating: 4.5,
    reviews: 567,
    description: "Comfortable running shoes with cushioned sole.",
    stock: 45,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-JACKET-WINTER",
    name: "Winter Jacket",
    category: "clothing",
    price: 3999,
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
    rating: 4.3,
    reviews: 178,
    description: "Warm winter jacket with water-resistant coating.",
    stock: 23,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-SOCKS-COTTON",
    name: "Cotton Socks (Pack of 6)",
    category: "clothing",
    price: 399,
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
    rating: 4.0,
    reviews: 345,
    description: "Comfortable cotton socks in assorted colors.",
    stock: 156,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-UNDERWEAR-COTTON",
    name: "Cotton Underwear (Pack of 3)",
    category: "clothing",
    price: 599,
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
    rating: 4.1,
    reviews: 234,
    description: "Comfortable cotton underwear for daily wear.",
    stock: 89,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-HAT-BASEBALL",
    name: "Baseball Cap",
    category: "clothing",
    price: 699,
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
    rating: 4.2,
    reviews: 123,
    description: "Adjustable baseball cap for sun protection.",
    stock: 67,
    stockStatus: 'in-stock'
  },
  {
    id: "WM-BELT-LEATHER",
    name: "Genuine Leather Belt",
    category: "clothing",
    price: 1199,
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
    rating: 4.4,
    reviews: 178,
    description: "Premium leather belt with metal buckle.",
    stock: 45,
    stockStatus: 'in-stock'
  }
];

// Generate additional products to reach 50+ total
const additionalProducts: Product[] = [];

// Add more electronics
for (let i = 1; i <= 5; i++) {
  additionalProducts.push({
    id: `WM-EXTRA-ELEC-${i}`,
    name: `Electronic Device ${i}`,
    category: "electronics",
    price: Math.floor(Math.random() * 50000) + 5000,
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    rating: 4.0 + Math.random(),
    reviews: Math.floor(Math.random() * 1000) + 100,
    description: `High-quality electronic device with advanced features.`,
    stock: Math.floor(Math.random() * 100) + 10,
    stockStatus: 'in-stock'
  });
}

// Add more grocery items
for (let i = 1; i <= 5; i++) {
  additionalProducts.push({
    id: `WM-EXTRA-GROCERY-${i}`,
    name: `Grocery Item ${i}`,
    category: "grocery",
    price: Math.floor(Math.random() * 500) + 50,
    image: "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg",
    rating: 4.0 + Math.random(),
    reviews: Math.floor(Math.random() * 1000) + 100,
    description: `Fresh and nutritious grocery item for daily needs.`,
    stock: Math.floor(Math.random() * 200) + 50,
    stockStatus: 'in-stock'
  });
}

export const allProducts = [...products, ...additionalProducts];