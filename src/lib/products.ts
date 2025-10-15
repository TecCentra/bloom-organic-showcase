import productHoney from "@/assets/product-honey.jpg";
import productTea from "@/assets/product-tea.jpg";
import productGranola from "@/assets/product-granola.jpg";
import productOil from "@/assets/product-oil.jpg";
import weightGainImg from "@/assets/weight gain .jpg";
import arguajePowderImg from "@/assets/arguaje-powder.jpg";
import buttImg from "@/assets/butt.jpg";
import butTeaImg from "@/assets/buttea.jpg";
import extremeCurveImg from "@/assets/extreme curve.jpg";
import fenugreekImg from "@/assets/fenugreek.jpg";
import macaImg from "@/assets/maca.jpg";

export type ProductRecord = {
  id: string; // slug id
  name: string;
  price: number; // in cents
  originalPrice: number; // in cents
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  images: string[];
  shortDescription: string;
  description: string;
  advantages: { icon: any; title: string; description: string }[];
  benefits: string[];
  nutritionInfo: { label: string; value: string }[];
  certifications: string[];
  usage: string[];
};

// Minimal subset needed for homepage cards
export type ProductCardModel = Pick<ProductRecord, "id" | "name" | "price" | "category"> & { image: string };

export const productsData: Record<string, ProductRecord> = {
  "raw-organic-honey": {
    id: "raw-organic-honey",
    name: "Raw Organic Honey",
    price: 350000, // Ksh 3500.00
    originalPrice: 420000,
    rating: 4.8,
    reviews: 127,
    category: "Sweeteners",
    inStock: true,
    images: [productHoney, productHoney, productHoney, productHoney],
    shortDescription: "Pure, unfiltered raw honey harvested from organic wildflower meadows. Rich in natural enzymes, antioxidants, and nutrients.",
    description: "Our Raw Organic Honey is a pure gift from nature, harvested from pristine wildflower meadows where bees roam freely without exposure to pesticides or chemicals. Unlike processed honey, our raw honey retains all its natural enzymes, vitamins, minerals, and antioxidants. Each jar captures the authentic taste of the flowers our bees visit, creating a unique flavor profile that changes subtly with the seasons.",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  },
  "premium-green-tea": {
    id: "premium-green-tea",
    name: "Premium Green Tea",
    price: 189900, // Ksh 1899.00
    originalPrice: 249900,
    rating: 4.7,
    reviews: 89,
    category: "Beverages",
    inStock: true,
    images: [productTea, productTea, productTea, productTea],
    shortDescription: "Hand-picked organic green tea leaves with delicate flavor and powerful antioxidants for daily wellness.",
    description: "Our Premium Green Tea is sourced from organic tea gardens nestled in misty mountain valleys.",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  },
  "creatine-monohydrate-gummies": {
    id: "creatine-monohydrate-gummies",
    name: "Creatine Monohydrate Gummies",
    price: 189700, // Ksh 1897.00
    originalPrice: 219900,
    rating: 4.7,
    reviews: 64,
    category: "Weight Gain Products",
    inStock: true,
    images: [weightGainImg, weightGainImg, weightGainImg, weightGainImg],
    shortDescription: "Support healthy weight gain with the power of nature.",
    description: "Grow Strong, the Natural Way — Pure Weight Gainer. Pure Weight Gainer combines wholesome proteins, slow-release carbohydrates, and essential nutrients from natural sources — no artificial additives, no shortcuts. Fuel your body for steady, balanced growth, increased energy, and real strength — just the way nature intended. Pure Ingredients. Real Results. Natural Power.",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  },
  "artisan-granola-mix": {
    id: "artisan-granola-mix",
    name: "Artisan Granola Mix",
    price: 270000,
    originalPrice: 319900,
    rating: 4.9,
    reviews: 156,
    category: "Breakfast",
    inStock: true,
    images: [productGranola, productGranola, productGranola, productGranola],
    shortDescription: "Handcrafted granola with organic oats, nuts, seeds, and a touch of honey for the perfect morning crunch.",
    description: "Our Artisan Granola Mix is lovingly handcrafted in small batches using premium organic ingredients.",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  },
  "cold-pressed-olive-oil": {
    id: "cold-pressed-olive-oil",
    name: "Cold-Pressed Olive Oil",
    price: 289900,
    originalPrice: 359900,
    rating: 4.6,
    reviews: 94,
    category: "Oils",
    inStock: true,
    images: [productOil, productOil, productOil, productOil],
    shortDescription: "Extra virgin olive oil from organic Mediterranean olives, cold-pressed for maximum flavor and nutrients.",
    description: "Our Cold-Pressed Olive Oil is extracted from hand-harvested organic olives.",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  },
  "arguaje-powder": {
    id: "arguaje-powder",
    name: "Arguaje Powder",
    price: 189900,
    originalPrice: 219900,
    rating: 4.6,
    reviews: 41,
    category: "Weight Gain Products",
    inStock: true,
    images: [arguajePowderImg, arguajePowderImg, arguajePowderImg, arguajePowderImg],
    shortDescription: "Get the Curves You Desire! ✨",
    description: "Boost your confidence with our Hips & Butt Enhancement Supplements—specially formulated to help you achieve fuller, rounder, and more sculpted curves naturally! Enhances & Lifts Naturally. Supports Firmness & Growth. Packed with Nutrients for Maximum Results. Your dream body is just a supplement away! 💖 Try it now and feel the difference! #CurvesThatTurnHeads #NaturalEnhancement #GlowWithConfidence",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  },
  "natural-hip-up": {
    id: "natural-hip-up",
    name: "Natural HIp Up",
    price: 189900,
    originalPrice: 219900,
    rating: 4.6,
    reviews: 35,
    category: "Weight Gain Products",
    inStock: true,
    images: [buttImg, buttImg, buttImg, buttImg],
    shortDescription: "Get the Curves You Desire! ✨",
    description: "Boost your confidence with our Hips & Butt Enhancement Supplements—specially formulated to help you achieve fuller, rounder, and more sculpted curves naturally! Enhances & Lifts Naturally. Supports Firmness & Growth. Packed with Nutrients for Maximum Results. Your dream body is just a supplement away! 💖 Try it now and feel the difference! #CurvesThatTurnHeads #NaturalEnhancement #GlowWithConfidence",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  },
  "big-but-tea": {
    id: "big-but-tea",
    name: "Big But Tea",
    price: 189900,
    originalPrice: 219900,
    rating: 4.5,
    reviews: 29,
    category: "Weight Gain Products",
    inStock: true,
    images: [butTeaImg, butTeaImg, butTeaImg, butTeaImg],
    shortDescription: "Get the Curves You Desire! ✨",
    description: "Boost your confidence with our Hips & Butt Enhancement Supplements—specially formulated to help you achieve fuller, rounder, and more sculpted curves naturally! Enhances & Lifts Naturally. Supports Firmness & Growth. Packed with Nutrients for Maximum Results. Your dream body is just a supplement away! 💖 Try it now and feel the difference! #CurvesThatTurnHeads #NaturalEnhancement #GlowWithConfidence",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  },
  "extreme-curve": {
    id: "extreme-curve",
    name: "Extreme curve",
    price: 189900,
    originalPrice: 219900,
    rating: 4.5,
    reviews: 32,
    category: "Weight Gain Products",
    inStock: true,
    images: [extremeCurveImg, extremeCurveImg, extremeCurveImg, extremeCurveImg],
    shortDescription: "Get the Curves You Desire! ✨",
    description: "Boost your confidence with our Hips & Butt Enhancement Supplements—specially formulated to help you achieve fuller, rounder, and more sculpted curves naturally! Enhances & Lifts Naturally. Supports Firmness & Growth. Packed with Nutrients for Maximum Results. Your dream body is just a supplement away! 💖 Try it now and feel the difference! #CurvesThatTurnHeads #NaturalEnhancement #GlowWithConfidence",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  },
  "fenugreek-powder": {
    id: "fenugreek-powder",
    name: "Fenugreek powder",
    price: 189900,
    originalPrice: 219900,
    rating: 4.5,
    reviews: 27,
    category: "Weight Gain Products",
    inStock: true,
    images: [fenugreekImg, fenugreekImg, fenugreekImg, fenugreekImg],
    shortDescription: "Get the Curves You Desire! ✨",
    description: "Boost your confidence with our Hips & Butt Enhancement Supplements—specially formulated to help you achieve fuller, rounder, and more sculpted curves naturally! Enhances & Lifts Naturally. Supports Firmness & Growth. Packed with Nutrients for Maximum Results. Your dream body is just a supplement away! 💖 Try it now and feel the difference! #CurvesThatTurnHeads #NaturalEnhancement #GlowWithConfidence",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  },
  "curve-maca": {
    id: "curve-maca",
    name: "curve maca",
    price: 189900,
    originalPrice: 219900,
    rating: 4.5,
    reviews: 22,
    category: "Weight Gain Products",
    inStock: true,
    images: [macaImg, macaImg, macaImg, macaImg],
    shortDescription: "Get the Curves You Desire! ✨",
    description: "Boost your confidence with our Hips & Butt Enhancement Supplements—specially formulated to help you achieve fuller, rounder, and more sculpted curves naturally! Enhances & Lifts Naturally. Supports Firmness & Growth. Packed with Nutrients for Maximum Results. Your dream body is just a supplement away! 💖 Try it now and feel the difference! #CurvesThatTurnHeads #NaturalEnhancement #GlowWithConfidence",
    advantages: [],
    benefits: [],
    nutritionInfo: [],
    certifications: [],
    usage: []
  }
};

export const productList: ProductCardModel[] = Object.values(productsData).map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  category: p.category,
  image: p.images[0]
}));

export function formatKsh(cents: number) {
  return `Ksh ${(cents / 100).toFixed(2)}`;
}


