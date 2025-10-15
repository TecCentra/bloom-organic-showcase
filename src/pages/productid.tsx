// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Leaf, Shield, Heart, Star, Truck, RotateCcw, Award, Plus, Minus, ShoppingCart, Check, ArrowLeft } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import productHoney from "@/assets/product-honey.jpg";
// import productTea from "@/assets/product-tea.jpg";
// import productGranola from "@/assets/product-granola.jpg";
// import productOil from "@/assets/product-oil.jpg";

// // Product database
// const productsData = {
//   "raw-organic-honey": {
//     name: "Raw Organic Honey",
//     price: 2499,
//     originalPrice: 3299,
//     rating: 4.8,
//     reviews: 127,
//     category: "Sweeteners",
//     inStock: true,
//     images: [productHoney, productHoney, productHoney, productHoney],
//     shortDescription: "Pure, unfiltered raw honey harvested from organic wildflower meadows. Rich in natural enzymes, antioxidants, and nutrients.",
//     description: "Our Raw Organic Honey is a pure gift from nature, harvested from pristine wildflower meadows where bees roam freely without exposure to pesticides or chemicals. Unlike processed honey, our raw honey retains all its natural enzymes, vitamins, minerals, and antioxidants. Each jar captures the authentic taste of the flowers our bees visit, creating a unique flavor profile that changes subtly with the seasons.",
//     advantages: [
//       { icon: Leaf, title: "100% Pure & Unfiltered", description: "Never heated, processed, or diluted - just pure honey as nature intended" },
//       { icon: Shield, title: "Rich in Antioxidants", description: "Contains powerful antioxidants that support immune health and combat free radicals" },
//       { icon: Heart, title: "Natural Energy Boost", description: "Natural sugars provide sustained energy without the crash of refined sweeteners" },
//       { icon: Award, title: "Antibacterial Properties", description: "Natural enzymes and compounds that support wound healing and digestive health" }
//     ],
//     benefits: ["Supports immune system function", "Natural cough and sore throat remedy", "Promotes digestive health", "Rich source of vitamins and minerals", "May help with seasonal allergies", "Natural sweetener with lower glycemic index"],
//     nutritionInfo: [
//       { label: "Serving Size", value: "1 tbsp (21g)" },
//       { label: "Calories", value: "64" },
//       { label: "Total Carbs", value: "17g" },
//       { label: "Sugars", value: "16g" },
//       { label: "Protein", value: "0.1g" }
//     ],
//     certifications: ["USDA Organic", "Non-GMO", "Raw & Unfiltered", "Sustainably Sourced"],
//     usage: ["Perfect natural sweetener for tea, coffee, and smoothies", "Delicious spread on toast, pancakes, or yogurt", "Natural ingredient for baking and cooking", "Use in homemade face masks and skin care", "Soothe sore throats by mixing with warm lemon water"]
//   },
//   "premium-green-tea": {
//     name: "Premium Green Tea",
//     price: 1899,
//     originalPrice: 2499,
//     rating: 4.7,
//     reviews: 89,
//     category: "Beverages",
//     inStock: true,
//     images: [productTea, productTea, productTea, productTea],
//     shortDescription: "Hand-picked organic green tea leaves with delicate flavor and powerful antioxidants for daily wellness.",
//     description: "Our Premium Green Tea is sourced from organic tea gardens nestled in misty mountain valleys. Each leaf is carefully hand-picked at peak freshness to preserve its delicate flavor profile and maximum antioxidant content. Rich in catechins and L-theanine, this tea offers a perfect balance of calm energy and mental clarity.",
//     advantages: [
//       { icon: Leaf, title: "Antioxidant Rich", description: "Packed with EGCG and catechins for cellular health" },
//       { icon: Shield, title: "Metabolism Support", description: "Natural compounds that support healthy metabolism" },
//       { icon: Heart, title: "Heart Health", description: "Promotes cardiovascular wellness and healthy cholesterol" },
//       { icon: Award, title: "Mental Clarity", description: "L-theanine provides calm, focused energy" }
//     ],
//     benefits: ["Boosts metabolism naturally", "Rich in powerful antioxidants", "Supports heart health", "Enhances mental focus", "Promotes healthy aging", "Aids in weight management"],
//     nutritionInfo: [
//       { label: "Serving Size", value: "1 tea bag (2g)" },
//       { label: "Calories", value: "0" },
//       { label: "Caffeine", value: "25mg" },
//       { label: "Total Carbs", value: "0g" },
//       { label: "Antioxidants", value: "High" }
//     ],
//     certifications: ["USDA Organic", "Fair Trade", "Non-GMO", "Plastic-Free Packaging"],
//     usage: ["Steep in 175°F water for 2-3 minutes", "Enjoy hot or iced", "Add honey or lemon for flavor", "Perfect morning or afternoon beverage", "Use cooled tea for facial toner"]
//   },
//   "artisan-granola-mix": {
//     name: "Artisan Granola Mix",
//     price: 1599,
//     originalPrice: 1999,
//     rating: 4.9,
//     reviews: 156,
//     category: "Breakfast",
//     inStock: true,
//     images: [productGranola, productGranola, productGranola, productGranola],
//     shortDescription: "Handcrafted granola with organic oats, nuts, seeds, and a touch of honey for the perfect morning crunch.",
//     description: "Our Artisan Granola Mix is lovingly handcrafted in small batches using premium organic ingredients. We combine whole grain oats, crunchy almonds, nutritious seeds, and a hint of organic honey, then bake it to golden perfection. Each cluster delivers satisfying crunch and wholesome nutrition to start your day right.",
//     advantages: [
//       { icon: Leaf, title: "Whole Grain Goodness", description: "Made with organic rolled oats and ancient grains" },
//       { icon: Shield, title: "Protein Packed", description: "Nuts and seeds provide plant-based protein" },
//       { icon: Heart, title: "Heart Healthy", description: "Rich in fiber and healthy fats" },
//       { icon: Award, title: "Low Sugar", description: "Lightly sweetened with organic honey" }
//     ],
//     benefits: ["Excellent source of fiber", "Sustained energy for your day", "Supports digestive health", "Rich in vitamins and minerals", "Perfect for on-the-go breakfast", "Satisfying and delicious"],
//     nutritionInfo: [
//       { label: "Serving Size", value: "1/2 cup (50g)" },
//       { label: "Calories", value: "220" },
//       { label: "Total Fat", value: "9g" },
//       { label: "Total Carbs", value: "31g" },
//       { label: "Protein", value: "6g" }
//     ],
//     certifications: ["USDA Organic", "Non-GMO", "Gluten-Free", "No Refined Sugar"],
//     usage: ["Enjoy with milk or yogurt", "Perfect topping for smoothie bowls", "Eat as a healthy snack", "Add to baked goods for crunch", "Mix into homemade trail mix"]
//   },
//   "cold-pressed-olive-oil": {
//     name: "Cold-Pressed Olive Oil",
//     price: 2899,
//     originalPrice: 3599,
//     rating: 4.6,
//     reviews: 94,
//     category: "Oils",
//     inStock: true,
//     images: [productOil, productOil, productOil, productOil],
//     shortDescription: "Extra virgin olive oil from organic Mediterranean olives, cold-pressed for maximum flavor and nutrients.",
//     description: "Our Cold-Pressed Olive Oil is extracted from hand-harvested organic olives grown in sun-drenched Mediterranean groves. Using traditional cold-press methods, we preserve the oil's rich polyphenols, vitamins, and distinctive peppery flavor. This liquid gold is perfect for cooking, drizzling, and promoting heart health.",
//     advantages: [
//       { icon: Leaf, title: "First Cold Press", description: "Extra virgin quality from the first pressing" },
//       { icon: Shield, title: "Polyphenol Rich", description: "High in beneficial plant compounds" },
//       { icon: Heart, title: "Heart Healthy Fats", description: "Monounsaturated fats support cardiovascular health" },
//       { icon: Award, title: "Authentic Flavor", description: "Rich, peppery taste of premium olives" }
//     ],
//     benefits: ["Supports heart health", "Anti-inflammatory properties", "Rich in vitamin E", "Promotes healthy skin", "Supports brain function", "May help manage cholesterol"],
//     nutritionInfo: [
//       { label: "Serving Size", value: "1 tbsp (14g)" },
//       { label: "Calories", value: "120" },
//       { label: "Total Fat", value: "14g" },
//       { label: "Saturated Fat", value: "2g" },
//       { label: "Monounsaturated", value: "10g" }
//     ],
//     certifications: ["USDA Organic", "Extra Virgin", "Cold-Pressed", "Single-Origin"],
//     usage: ["Drizzle over salads and vegetables", "Perfect for low-heat cooking", "Use in salad dressings and marinades", "Dip bread for appetizers", "Add to smoothies for healthy fats"]
//   }
// };

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);

//   const product = productsData[id];

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [id]);

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-20 text-center">
//           <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
//           <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
//           <Button onClick={() => navigate("/")}>Return to Home</Button>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const handleQuantityChange = (action) => {
//     if (action === "increase") {
//       setQuantity(prev => prev + 1);
//     } else if (action === "decrease" && quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <div className="container mx-auto px-4 py-8 md:py-12">
//         {/* Back Button */}
//         <Button
//           variant="ghost"
//           className="mb-6"
//           onClick={() => navigate("/")}
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Shop
//         </Button>

//         {/* Breadcrumb */}
//         <div className="text-sm text-muted-foreground mb-6">
//           <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/")}>Home</span>
//           <span className="mx-2">/</span>
//           <span className="hover:text-primary cursor-pointer">Shop</span>
//           <span className="mx-2">/</span>
//           <span className="hover:text-primary cursor-pointer">{product.category}</span>
//           <span className="mx-2">/</span>
//           <span className="text-foreground">{product.name}</span>
//         </div>

//         {/* Main Product Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
//           {/* Images */}
//           <div className="space-y-4">
//             <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border">
//               <img
//                 src={product.images[selectedImage]}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//               {!product.inStock && (
//                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                   <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
//                 </div>
//               )}
//             </div>
            
//             <div className="grid grid-cols-4 gap-3">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
//                     selectedImage === index ? "border-primary opacity-100" : "border-border opacity-60"
//                   }`}
//                 >
//                   <img src={image} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div>
//             <div className="flex items-start justify-between mb-3">
//               <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
//                 {product.category}
//               </Badge>
//               {product.inStock && (
//                 <Badge variant="outline" className="border-green-500 text-green-600">
//                   <Check className="w-3 h-3 mr-1" />
//                   In Stock
//                 </Badge>
//               )}
//             </div>

//             <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
//               {product.name}
//             </h1>

//             <div className="flex items-center gap-3 mb-4">
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 ${
//                       i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-muted-foreground">
//                 {product.rating} ({product.reviews} reviews)
//               </span>
//             </div>

//             <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
//               {product.shortDescription}
//             </p>

//             {/* Price */}
//             <div className="flex items-baseline gap-3 mb-6">
//               <span className="text-4xl font-bold text-foreground">
//                 Ksh {(product.price / 100).toFixed(2)}
//               </span>
//               <span className="text-2xl text-muted-foreground line-through">
//                 Ksh {(product.originalPrice / 100).toFixed(2)}
//               </span>
//               <Badge variant="destructive" className="ml-2">
//                 Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
//               </Badge>
//             </div>

//             {/* Certifications */}
//             <div className="flex flex-wrap gap-2 mb-6">
//               {product.certifications.map((cert, index) => (
//                 <Badge key={index} variant="outline" className="border-primary/30 text-primary">
//                   <Leaf className="w-3 h-3 mr-1" />
//                   {cert}
//                 </Badge>
//               ))}
//             </div>

//             {/* Quantity & Add to Cart */}
//             <div className="flex items-center gap-4 mb-6">
//               <div className="flex items-center border border-border rounded-lg">
//                 <button
//                   onClick={() => handleQuantityChange("decrease")}
//                   className="p-3 hover:bg-secondary transition-colors"
//                   disabled={quantity <= 1}
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="px-6 py-3 font-semibold">{quantity}</span>
//                 <button
//                   onClick={() => handleQuantityChange("increase")}
//                   className="p-3 hover:bg-secondary transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>

//               <Button
//                 size="lg"
//                 className="flex-1 text-lg py-6 rounded-lg"
//                 disabled={!product.inStock}
//               >
//                 <ShoppingCart className="w-5 h-5 mr-2" />
//                 Add to Cart
//               </Button>
//             </div>

//             {/* Trust Badges */}
//             <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
//               <div className="flex flex-col items-center text-center p-3">
//                 <Truck className="w-6 h-6 text-primary mb-2" />
//                 <span className="text-xs font-medium">Free Shipping</span>
//                 <span className="text-xs text-muted-foreground">Orders over Ksh50</span>
//               </div>
//               <div className="flex flex-col items-center text-center p-3">
//                 <RotateCcw className="w-6 h-6 text-primary mb-2" />
//                 <span className="text-xs font-medium">Easy Returns</span>
//                 <span className="text-xs text-muted-foreground">30-day guarantee</span>
//               </div>
//               <div className="flex flex-col items-center text-center p-3">
//                 <Shield className="w-6 h-6 text-primary mb-2" />
//                 <span className="text-xs font-medium">Secure Payment</span>
//                 <span className="text-xs text-muted-foreground">100% protected</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Details Tabs */}
//         <div className="space-y-12">
//           {/* Description */}
//           <section>
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
//               Product Description
//             </h2>
//             <p className="text-muted-foreground leading-relaxed text-lg">
//               {product.description}
//             </p>
//           </section>

//           {/* Key Advantages */}
//           <section className="bg-gradient-to-b from-secondary/20 to-transparent rounded-2xl p-8 md:p-12">
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
//               Key Advantages
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {product.advantages.map((advantage, index) => (
//                 <div key={index} className="flex gap-4 p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
//                   <div className="flex-shrink-0">
//                     <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                       <advantage.icon className="w-6 h-6 text-primary" />
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-heading font-semibold text-foreground mb-2">
//                       {advantage.title}
//                     </h3>
//                     <p className="text-muted-foreground text-sm">
//                       {advantage.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Health Benefits */}
//           <section>
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
//               Health Benefits
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {product.benefits.map((benefit, index) => (
//                 <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-secondary/30 transition-colors">
//                   <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
//                   <span className="text-muted-foreground">{benefit}</span>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* How to Use */}
//           <section className="bg-card border border-border rounded-2xl p-8 md:p-12">
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
//               How to Use
//             </h2>
//             <ul className="space-y-3">
//               {product.usage.map((use, index) => (
//                 <li key={index} className="flex items-start gap-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center mt-0.5">
//                     {index + 1}
//                   </span>
//                   <span className="text-muted-foreground">{use}</span>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Nutrition Information */}
//           <section>
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
//               Nutrition Information
//             </h2>
//             <div className="bg-card border border-border rounded-xl overflow-hidden max-w-md">
//               {product.nutritionInfo.map((info, index) => (
//                 <div
//                   key={index}
//                   className={`flex justify-between items-center p-4 ${
//                     index !== product.nutritionInfo.length - 1 ? "border-b border-border" : ""
//                   }`}
//                 >
//                   <span className="font-medium text-foreground">{info.label}</span>
//                   <span className="text-muted-foreground">{info.value}</span>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Shield, Heart, Star, Truck, RotateCcw, Award, Plus, Minus, ShoppingCart, Check, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import productHoney from "@/assets/product-honey.jpg";
import productTea from "@/assets/product-tea.jpg";
import productGranola from "@/assets/product-granola.jpg";
import productOil from "@/assets/product-oil.jpg";
import { productsData } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

// Product database
const productsDataLocal = {
  "raw-organic-honey": {
    name: "Himalayan Weight Loss package",
    price: 2499,
    originalPrice: 3299,
    rating: 4.8,
    reviews: 127,
    category: "Sweeteners",
    inStock: true,
    images: [productHoney, productHoney, productHoney, productHoney],
    shortDescription: "Pure, unfiltered raw honey harvested from organic wildflower meadows. Rich in natural enzymes, antioxidants, and nutrients.",
    description: "Our Raw Organic Honey is a pure gift from nature, harvested from pristine wildflower meadows where bees roam freely without exposure to pesticides or chemicals. Unlike processed honey, our raw honey retains all its natural enzymes, vitamins, minerals, and antioxidants. Each jar captures the authentic taste of the flowers our bees visit, creating a unique flavor profile that changes subtly with the seasons.",
    advantages: [
      { icon: Leaf, title: "100% Pure & Unfiltered", description: "Never heated, processed, or diluted - just pure honey as nature intended" },
      { icon: Shield, title: "Rich in Antioxidants", description: "Contains powerful antioxidants that support immune health and combat free radicals" },
      { icon: Heart, title: "Natural Energy Boost", description: "Natural sugars provide sustained energy without the crash of refined sweeteners" },
      { icon: Award, title: "Antibacterial Properties", description: "Natural enzymes and compounds that support wound healing and digestive health" }
    ],
    benefits: ["Supports immune system function", "Natural cough and sore throat remedy", "Promotes digestive health", "Rich source of vitamins and minerals", "May help with seasonal allergies", "Natural sweetener with lower glycemic index"],
    nutritionInfo: [
      { label: "Serving Size", value: "1 tbsp (21g)" },
      { label: "Calories", value: "64" },
      { label: "Total Carbs", value: "17g" },
      { label: "Sugars", value: "16g" },
      { label: "Protein", value: "0.1g" }
    ],
    certifications: ["USDA Organic", "Non-GMO", "Raw & Unfiltered", "Sustainably Sourced"],
    usage: ["Perfect natural sweetener for tea, coffee, and smoothies", "Delicious spread on toast, pancakes, or yogurt", "Natural ingredient for baking and cooking", "Use in homemade face masks and skin care", "Soothe sore throats by mixing with warm lemon water"]
  },
  "premium-green-tea": {
    name: "Premium Green Tea",
    price: 1899,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 89,
    category: "Beverages",
    inStock: true,
    images: [productTea, productTea, productTea, productTea],
    shortDescription: "Hand-picked organic green tea leaves with delicate flavor and powerful antioxidants for daily wellness.",
    description: "Our Premium Green Tea is sourced from organic tea gardens nestled in misty mountain valleys. Each leaf is carefully hand-picked at peak freshness to preserve its delicate flavor profile and maximum antioxidant content. Rich in catechins and L-theanine, this tea offers a perfect balance of calm energy and mental clarity.",
    advantages: [
      { icon: Leaf, title: "Antioxidant Rich", description: "Packed with EGCG and catechins for cellular health" },
      { icon: Shield, title: "Metabolism Support", description: "Natural compounds that support healthy metabolism" },
      { icon: Heart, title: "Heart Health", description: "Promotes cardiovascular wellness and healthy cholesterol" },
      { icon: Award, title: "Mental Clarity", description: "L-theanine provides calm, focused energy" }
    ],
    benefits: ["Boosts metabolism naturally", "Rich in powerful antioxidants", "Supports heart health", "Enhances mental focus", "Promotes healthy aging", "Aids in weight management"],
    nutritionInfo: [
      { label: "Serving Size", value: "1 tea bag (2g)" },
      { label: "Calories", value: "0" },
      { label: "Caffeine", value: "25mg" },
      { label: "Total Carbs", value: "0g" },
      { label: "Antioxidants", value: "High" }
    ],
    certifications: ["USDA Organic", "Fair Trade", "Non-GMO", "Plastic-Free Packaging"],
    usage: ["Steep in 175°F water for 2-3 minutes", "Enjoy hot or iced", "Add honey or lemon for flavor", "Perfect morning or afternoon beverage", "Use cooled tea for facial toner"]
  },
  "artisan-granola-mix": {
    name: "Himalayn weight loss package",
    price: 1599,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 156,
    category: "Breakfast",
    inStock: true,
    images: [productGranola, productGranola, productGranola, productGranola],
    shortDescription: "Handcrafted granola with organic oats, nuts, seeds, and a touch of honey for the perfect morning crunch.",
    description: "Our Artisan Granola Mix is lovingly handcrafted in small batches using premium organic ingredients. We combine whole grain oats, crunchy almonds, nutritious seeds, and a hint of organic honey, then bake it to golden perfection. Each cluster delivers satisfying crunch and wholesome nutrition to start your day right.",
    advantages: [
      { icon: Leaf, title: "Whole Grain Goodness", description: "Made with organic rolled oats and ancient grains" },
      { icon: Shield, title: "Protein Packed", description: "Nuts and seeds provide plant-based protein" },
      { icon: Heart, title: "Heart Healthy", description: "Rich in fiber and healthy fats" },
      { icon: Award, title: "Low Sugar", description: "Lightly sweetened with organic honey" }
    ],
    benefits: ["Excellent source of fiber", "Sustained energy for your day", "Supports digestive health", "Rich in vitamins and minerals", "Perfect for on-the-go breakfast", "Satisfying and delicious"],
    nutritionInfo: [
      { label: "Serving Size", value: "1/2 cup (50g)" },
      { label: "Calories", value: "220" },
      { label: "Total Fat", value: "9g" },
      { label: "Total Carbs", value: "31g" },
      { label: "Protein", value: "6g" }
    ],
    certifications: ["USDA Organic", "Non-GMO", "Gluten-Free", "No Refined Sugar"],
    usage: ["Enjoy with milk or yogurt", "Perfect topping for smoothie bowls", "Eat as a healthy snack", "Add to baked goods for crunch", "Mix into homemade trail mix"]
  },
  "cold-pressed-olive-oil": {
    name: "Cold-Pressed Olive Oil",
    price: 2899,
    originalPrice: 3599,
    rating: 4.6,
    reviews: 94,
    category: "Oils",
    inStock: true,
    images: [productOil, productOil, productOil, productOil],
    shortDescription: "Extra virgin olive oil from organic Mediterranean olives, cold-pressed for maximum flavor and nutrients.",
    description: "Our Cold-Pressed Olive Oil is extracted from hand-harvested organic olives grown in sun-drenched Mediterranean groves. Using traditional cold-press methods, we preserve the oil's rich polyphenols, vitamins, and distinctive peppery flavor. This liquid gold is perfect for cooking, drizzling, and promoting heart health.",
    advantages: [
      { icon: Leaf, title: "First Cold Press", description: "Extra virgin quality from the first pressing" },
      { icon: Shield, title: "Polyphenol Rich", description: "High in beneficial plant compounds" },
      { icon: Heart, title: "Heart Healthy Fats", description: "Monounsaturated fats support cardiovascular health" },
      { icon: Award, title: "Authentic Flavor", description: "Rich, peppery taste of premium olives" }
    ],
    benefits: ["Supports heart health", "Anti-inflammatory properties", "Rich in vitamin E", "Promotes healthy skin", "Supports brain function", "May help manage cholesterol"],
    nutritionInfo: [
      { label: "Serving Size", value: "1 tbsp (14g)" },
      { label: "Calories", value: "120" },
      { label: "Total Fat", value: "14g" },
      { label: "Saturated Fat", value: "2g" },
      { label: "Monounsaturated", value: "10g" }
    ],
    certifications: ["USDA Organic", "Extra Virgin", "Cold-Pressed", "Single-Origin"],
    usage: ["Drizzle over salads and vegetables", "Perfect for low-heat cooking", "Use in salad dressings and marinades", "Dip bread for appetizers", "Add to smoothies for healthy fats"]
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  const product = (productsData as any)[id] || (productsDataLocal as any)[id];
  const initialImageFromState = (location.state as any)?.image as string | undefined;

  const displayImages = useMemo(() => {
    if (!product) return [] as string[];
    const base = (product.images || []).filter(Boolean);
    // If navigated from homepage with a chosen image, replicate that image across up to 4 slots
    if (initialImageFromState) {
      return Array(4).fill(initialImageFromState) as string[];
    }
    // Otherwise, show up to first 4 available product images
    return base.slice(0, 4);
  }, [product, initialImageFromState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(prev => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!id || !product) return;
    const imageForCart = displayImages[selectedImage] || product.images?.[0];
    addItem({ id, name: product.name, price: product.price, image: imageForCart }, quantity);
    toast({ title: "Added to cart", description: `${product.name} x${quantity} added.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/")}>Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-primary cursor-pointer">Shop</span>
          <span className="mx-2">/</span>
          <span className="hover:text-primary cursor-pointer">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border">
              <img
                src={displayImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
                    selectedImage === index ? "border-primary opacity-100" : "border-border opacity-60"
                  }`}
                >
                  <img src={image} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                {product.category}
              </Badge>
              {product.inStock && (
                <Badge variant="outline" className="border-green-500 text-green-600">
                  <Check className="w-3 h-3 mr-1" />
                  In Stock
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-foreground">
                Ksh {(product.price / 100).toFixed(2)}
              </span>
              <span className="text-2xl text-muted-foreground line-through">
                Ksh {(product.originalPrice / 100).toFixed(2)}
              </span>
              <Badge variant="destructive" className="ml-2">
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="border-primary/30 text-primary">
                  <Leaf className="w-3 h-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-3 hover:bg-secondary transition-colors"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-3 hover:bg-secondary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1 text-lg py-6 rounded-lg"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center p-3">
                <Truck className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs font-medium">Free Shipping</span>
                <span className="text-xs text-muted-foreground">Orders over Ksh50</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <RotateCcw className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs font-medium">Easy Returns</span>
                <span className="text-xs text-muted-foreground">30-day guarantee</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <Shield className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs font-medium">Secure Payment</span>
                <span className="text-xs text-muted-foreground">100% protected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="space-y-12">
          {/* Description */}
          <section>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
              Product Description
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>
          </section>

          {/* Key Advantages */}
          <section className="bg-gradient-to-b from-secondary/20 to-transparent rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Key Advantages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.advantages.map((advantage, index) => (
                <div key={index} className="flex gap-4 p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <advantage.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Health Benefits */}
          <section>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
              Health Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-secondary/30 transition-colors">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* How to Use */}
          <section className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
              How to Use
            </h2>
            <ul className="space-y-3">
              {product.usage.map((use, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{use}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Nutrition Information */}
          <section>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
              Nutrition Information
            </h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden max-w-md">
              {product.nutritionInfo.map((info, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-4 ${
                    index !== product.nutritionInfo.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="font-medium text-foreground">{info.label}</span>
                  <span className="text-muted-foreground">{info.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;