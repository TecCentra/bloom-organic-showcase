// // // import { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Leaf, Shield, Heart, Star, Truck, RotateCcw, Award, Plus, Minus, ShoppingCart, Check, ArrowLeft, XCircle } from "lucide-react";
// // // import Header from "@/components/Header";
// // // import Footer from "@/components/Footer";
// // // import productHoney from "@/assets/product-honey.jpg";
// // // import productTea from "@/assets/product-tea.jpg";
// // // import productGranola from "@/assets/product-granola.jpg";
// // // import productOil from "@/assets/product-oil.jpg";

// // // // Product database
// // // const productsData = {
// // //   "raw-organic-honey": {
// // //     name: "Raw Organic Honey",
// // //     price: 2499,
// // //     originalPrice: 3299,
// // //     rating: 4.8,
// // //     reviews: 127,
// // //     category: "Sweeteners",
// // //     inStock: true,
// // //     images: [productHoney, productHoney, productHoney, productHoney],
// // //     shortDescription: "Pure, unfiltered raw honey harvested from organic wildflower meadows. Rich in natural enzymes, antioxidants, and nutrients.",
// // //     description: "Our Raw Organic Honey is a pure gift from nature, harvested from pristine wildflower meadows where bees roam freely without exposure to pesticides or chemicals. Unlike processed honey, our raw honey retains all its natural enzymes, vitamins, minerals, and antioxidants. Each jar captures the authentic taste of the flowers our bees visit, creating a unique flavor profile that changes subtly with the seasons.",
// // //     advantages: [
// // //       { icon: Leaf, title: "100% Pure & Unfiltered", description: "Never heated, processed, or diluted - just pure honey as nature intended" },
// // //       { icon: Shield, title: "Rich in Antioxidants", description: "Contains powerful antioxidants that support immune health and combat free radicals" },
// // //       { icon: Heart, title: "Natural Energy Boost", description: "Natural sugars provide sustained energy without the crash of refined sweeteners" },
// // //       { icon: Award, title: "Antibacterial Properties", description: "Natural enzymes and compounds that support wound healing and digestive health" }
// // //     ],
// // //     benefits: ["Supports immune system function", "Natural cough and sore throat remedy", "Promotes digestive health", "Rich source of vitamins and minerals", "May help with seasonal allergies", "Natural sweetener with lower glycemic index"],
// // //     nutritionInfo: [
// // //       { label: "Serving Size", value: "1 tbsp (21g)" },
// // //       { label: "Calories", value: "64" },
// // //       { label: "Total Carbs", value: "17g" },
// // //       { label: "Sugars", value: "16g" },
// // //       { label: "Protein", value: "0.1g" }
// // //     ],
// // //     certifications: ["USDA Organic", "Non-GMO", "Raw & Unfiltered", "Sustainably Sourced"],
// // //     usage: ["Perfect natural sweetener for tea, coffee, and smoothies", "Delicious spread on toast, pancakes, or yogurt", "Natural ingredient for baking and cooking", "Use in homemade face masks and skin care", "Soothe sore throats by mixing with warm lemon water"]
// // //   },
// // //   "premium-green-tea": {
// // //     name: "Premium Green Tea",
// // //     price: 1899,
// // //     originalPrice: 2499,
// // //     rating: 4.7,
// // //     reviews: 89,
// // //     category: "Beverages",
// // //     inStock: true,
// // //     images: [productTea, productTea, productTea, productTea],
// // //     shortDescription: "Hand-picked organic green tea leaves with delicate flavor and powerful antioxidants for daily wellness.",
// // //     description: "Our Premium Green Tea is sourced from organic tea gardens nestled in misty mountain valleys. Each leaf is carefully hand-picked at peak freshness to preserve its delicate flavor profile and maximum antioxidant content. Rich in catechins and L-theanine, this tea offers a perfect balance of calm energy and mental clarity.",
// // //     advantages: [
// // //       { icon: Leaf, title: "Antioxidant Rich", description: "Packed with EGCG and catechins for cellular health" },
// // //       { icon: Shield, title: "Metabolism Support", description: "Natural compounds that support healthy metabolism" },
// // //       { icon: Heart, title: "Heart Health", description: "Promotes cardiovascular wellness and healthy cholesterol" },
// // //       { icon: Award, title: "Mental Clarity", description: "L-theanine provides calm, focused energy" }
// // //     ],
// // //     benefits: ["Boosts metabolism naturally", "Rich in powerful antioxidants", "Supports heart health", "Enhances mental focus", "Promotes healthy aging", "Aids in weight management"],
// // //     nutritionInfo: [
// // //       { label: "Serving Size", value: "1 tea bag (2g)" },
// // //       { label: "Calories", value: "0" },
// // //       { label: "Caffeine", value: "25mg" },
// // //       { label: "Total Carbs", value: "0g" },
// // //       { label: "Antioxidants", value: "High" }
// // //     ],
// // //     certifications: ["USDA Organic", "Fair Trade", "Non-GMO", "Plastic-Free Packaging"],
// // //     usage: ["Steep in 175°F water for 2-3 minutes", "Enjoy hot or iced", "Add honey or lemon for flavor", "Perfect morning or afternoon beverage", "Use cooled tea for facial toner"]
// // //   },
// // //   "artisan-granola-mix": {
// // //     name: "Artisan Granola Mix",
// // //     price: 1599,
// // //     originalPrice: 1999,
// // //     rating: 4.9,
// // //     reviews: 156,
// // //     category: "Breakfast",
// // //     inStock: true,
// // //     images: [productGranola, productGranola, productGranola, productGranola],
// // //     shortDescription: "Handcrafted granola with organic oats, nuts, seeds, and a touch of honey for the perfect morning crunch.",
// // //     description: "Our Artisan Granola Mix is lovingly handcrafted in small batches using premium organic ingredients. We combine whole grain oats, crunchy almonds, nutritious seeds, and a hint of organic honey, then bake it to golden perfection. Each cluster delivers satisfying crunch and wholesome nutrition to start your day right.",
// // //     advantages: [
// // //       { icon: Leaf, title: "Whole Grain Goodness", description: "Made with organic rolled oats and ancient grains" },
// // //       { icon: Shield, title: "Protein Packed", description: "Nuts and seeds provide plant-based protein" },
// // //       { icon: Heart, title: "Heart Healthy", description: "Rich in fiber and healthy fats" },
// // //       { icon: Award, title: "Low Sugar", description: "Lightly sweetened with organic honey" }
// // //     ],
// // //     benefits: ["Excellent source of fiber", "Sustained energy for your day", "Supports digestive health", "Rich in vitamins and minerals", "Perfect for on-the-go breakfast", "Satisfying and delicious"],
// // //     nutritionInfo: [
// // //       { label: "Serving Size", value: "1/2 cup (50g)" },
// // //       { label: "Calories", value: "220" },
// // //       { label: "Total Fat", value: "9g" },
// // //       { label: "Total Carbs", value: "31g" },
// // //       { label: "Protein", value: "6g" }
// // //     ],
// // //     certifications: ["USDA Organic", "Non-GMO", "Gluten-Free", "No Refined Sugar"],
// // //     usage: ["Enjoy with milk or yogurt", "Perfect topping for smoothie bowls", "Eat as a healthy snack", "Add to baked goods for crunch", "Mix into homemade trail mix"]
// // //   },
// // //   "cold-pressed-olive-oil": {
// // //     name: "Cold-Pressed Olive Oil",
// // //     price: 2899,
// // //     originalPrice: 3599,
// // //     rating: 4.6,
// // //     reviews: 94,
// // //     category: "Oils",
// // //     inStock: true,
// // //     images: [productOil, productOil, productOil, productOil],
// // //     shortDescription: "Extra virgin olive oil from organic Mediterranean olives, cold-pressed for maximum flavor and nutrients.",
// // //     description: "Our Cold-Pressed Olive Oil is extracted from hand-harvested organic olives grown in sun-drenched Mediterranean groves. Using traditional cold-press methods, we preserve the oil's rich polyphenols, vitamins, and distinctive peppery flavor. This liquid gold is perfect for cooking, drizzling, and promoting heart health.",
// // //     advantages: [
// // //       { icon: Leaf, title: "First Cold Press", description: "Extra virgin quality from the first pressing" },
// // //       { icon: Shield, title: "Polyphenol Rich", description: "High in beneficial plant compounds" },
// // //       { icon: Heart, title: "Heart Healthy Fats", description: "Monounsaturated fats support cardiovascular health" },
// // //       { icon: Award, title: "Authentic Flavor", description: "Rich, peppery taste of premium olives" }
// // //     ],
// // //     benefits: ["Supports heart health", "Anti-inflammatory properties", "Rich in vitamin E", "Promotes healthy skin", "Supports brain function", "May help manage cholesterol"],
// // //     nutritionInfo: [
// // //       { label: "Serving Size", value: "1 tbsp (14g)" },
// // //       { label: "Calories", value: "120" },
// // //       { label: "Total Fat", value: "14g" },
// // //       { label: "Saturated Fat", value: "2g" },
// // //       { label: "Monounsaturated", value: "10g" }
// // //     ],
// // //     certifications: ["USDA Organic", "Extra Virgin", "Cold-Pressed", "Single-Origin"],
// // //     usage: ["Drizzle over salads and vegetables", "Perfect for low-heat cooking", "Use in salad dressings and marinades", "Dip bread for appetizers", "Add to smoothies for healthy fats"]
// // //   }
// // // };

// // // const ProductDetail = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const [quantity, setQuantity] = useState(1);
// // //   const [selectedImage, setSelectedImage] = useState(0);

// // //   const product = productsData[id];

// // //   useEffect(() => {
// // //     window.scrollTo(0, 0);
// // //   }, [id]);

// // //   if (!product) {
// // //     return (
// // //       <div className="min-h-screen bg-background">
// // //         <Header />
// // //         <div className="container mx-auto px-4 py-20 text-center">
// // //           <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
// // //           <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
// // //           <Button onClick={() => navigate("/")}>Return to Home</Button>
// // //         </div>
// // //         <Footer />
// // //       </div>
// // //     );
// // //   }

// // //   const handleQuantityChange = (action) => {
// // //     if (action === "increase") {
// // //       setQuantity(prev => prev + 1);
// // //     } else if (action === "decrease" && quantity > 1) {
// // //       setQuantity(prev => prev - 1);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <Header />

// // //       <div className="container mx-auto px-4 py-8 md:py-12">
// // //         {/* Back Button */}
// // //         <Button
// // //           variant="ghost"
// // //           className="mb-6"
// // //           onClick={() => navigate("/")}
// // //         >
// // //           <ArrowLeft className="w-4 h-4 mr-2" />
// // //           Back to Shop
// // //         </Button>

// // //         {/* Breadcrumb */}
// // //         <div className="text-sm text-muted-foreground mb-6">
// // //           <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/")}>Home</span>
// // //           <span className="mx-2">/</span>
// // //           <span className="hover:text-primary cursor-pointer">Shop</span>
// // //           <span className="mx-2">/</span>
// // //           <span className="hover:text-primary cursor-pointer">{product.category}</span>
// // //           <span className="mx-2">/</span>
// // //           <span className="text-foreground">{product.name}</span>
// // //         </div>

// // //         {/* Main Product Section */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
// // //           {/* Images */}
// // //           <div className="space-y-4">
// // //             <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border">
// // //               <img
// // //                 src={product.images[selectedImage]}
// // //                 alt={product.name}
// // //                 className="w-full h-full object-cover"
// // //               />
// // //               {!product.inStock && (
// // //                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
// // //                   <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
// // //                 </div>
// // //               )}
// // //             </div>
            
// // //             <div className="grid grid-cols-4 gap-3">
// // //               {product.images.map((image, index) => (
// // //                 <button
// // //                   key={index}
// // //                   onClick={() => setSelectedImage(index)}
// // //                   className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
// // //                     selectedImage === index ? "border-primary opacity-100" : "border-border opacity-60"
// // //                   }`}
// // //                 >
// // //                   <img src={image} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Product Info */}
// // //           <div>
// // //             <div className="flex items-start justify-between mb-3">
// // //               <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
// // //                 {product.category}
// // //               </Badge>
// // //               {product.inStock && (
// // //                 <Badge variant="outline" className="border-green-500 text-green-600">
// // //                   <Check className="w-3 h-3 mr-1" />
// // //                   In Stock
// // //                 </Badge>
// // //               )}
// // //             </div>

// // //             <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
// // //               {product.name}
// // //             </h1>

// // //             <div className="flex items-center gap-3 mb-4">
// // //               <div className="flex items-center gap-1">
// // //                 {[...Array(5)].map((_, i) => (
// // //                   <Star
// // //                     key={i}
// // //                     className={`w-5 h-5 ${
// // //                       i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-gray-300"
// // //                     }`}
// // //                   />
// // //                 ))}
// // //               </div>
// // //               <span className="text-sm text-muted-foreground">
// // //                 {product.rating} ({product.reviews} reviews)
// // //               </span>
// // //             </div>

// // //             <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
// // //               {product.shortDescription}
// // //             </p>

// // //             {/* Price */}
// // //             <div className="flex items-baseline gap-3 mb-6">
// // //               <span className="text-4xl font-bold text-foreground">
// // //                 Ksh {(product.price / 100).toFixed(2)}
// // //               </span>
// // //               <span className="text-2xl text-muted-foreground line-through">
// // //                 Ksh {(product.originalPrice / 100).toFixed(2)}
// // //               </span>
// // //               <Badge variant="destructive" className="ml-2">
// // //                 Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
// // //               </Badge>
// // //             </div>

// // //             {/* Certifications */}
// // //             <div className="flex flex-wrap gap-2 mb-6">
// // //               {product.certifications.map((cert, index) => (
// // //                 <Badge key={index} variant="outline" className="border-primary/30 text-primary">
// // //                   <Leaf className="w-3 h-3 mr-1" />
// // //                   {cert}
// // //                 </Badge>
// // //               ))}
// // //             </div>

// // //             {/* Quantity & Add to Cart */}
// // //             <div className="flex items-center gap-4 mb-6">
// // //               <div className="flex items-center border border-border rounded-lg">
// // //                 <button
// // //                   onClick={() => handleQuantityChange("decrease")}
// // //                   className="p-3 hover:bg-secondary transition-colors"
// // //                   disabled={quantity <= 1}
// // //                 >
// // //                   <Minus className="w-4 h-4" />
// // //                 </button>
// // //                 <span className="px-6 py-3 font-semibold">{quantity}</span>
// // //                 <button
// // //                   onClick={() => handleQuantityChange("increase")}
// // //                   className="p-3 hover:bg-secondary transition-colors"
// // //                 >
// // //                   <Plus className="w-4 h-4" />
// // //                 </button>
// // //               </div>

// // //               <Button
// // //                 size="lg"
// // //                 className="flex-1 text-lg py-6 rounded-lg"
// // //                 disabled={!product.inStock}
// // //               >
// // //                 <ShoppingCart className="w-5 h-5 mr-2" />
// // //                 Add to Cart
// // //               </Button>
// // //             </div>

// // //             {/* Trust Badges */}
// // //             <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
// // //               <div className="flex flex-col items-center text-center p-3">
// // //                 <Truck className="w-6 h-6 text-primary mb-2" />
// // //                 <span className="text-xs font-medium">Free Shipping</span>
// // //                 <span className="text-xs text-muted-foreground">Orders over Ksh50</span>
// // //               </div>
// // //               <div className="flex flex-col items-center text-center p-3">
// // //                 <RotateCcw className="w-6 h-6 text-primary mb-2" />
// // //                 <span className="text-xs font-medium">Easy Returns</span>
// // //                 <span className="text-xs text-muted-foreground">30-day guarantee</span>
// // //               </div>
// // //               <div className="flex flex-col items-center text-center p-3">
// // //                 <Shield className="w-6 h-6 text-primary mb-2" />
// // //                 <span className="text-xs font-medium">Secure Payment</span>
// // //                 <span className="text-xs text-muted-foreground">100% protected</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Product Details Tabs */}
// // //         <div className="space-y-12">
// // //           {/* Description */}
// // //           <section>
// // //             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
// // //               Product Description
// // //             </h2>
// // //             <p className="text-muted-foreground leading-relaxed text-lg">
// // //               {product.description}
// // //             </p>
// // //           </section>

// // //           {/* Key Advantages */}
// // //           <section className="bg-gradient-to-b from-secondary/20 to-transparent rounded-2xl p-8 md:p-12">
// // //             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
// // //               Key Advantages
// // //             </h2>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               {product.advantages.map((advantage, index) => (
// // //                 <div key={index} className="flex gap-4 p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
// // //                   <div className="flex-shrink-0">
// // //                     <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
// // //                       <advantage.icon className="w-6 h-6 text-primary" />
// // //                     </div>
// // //                   </div>
// // //                   <div>
// // //                     <h3 className="font-heading font-semibold text-foreground mb-2">
// // //                       {advantage.title}
// // //                     </h3>
// // //                     <p className="text-muted-foreground text-sm">
// // //                       {advantage.description}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </section>

// // //           {/* Health Benefits */}
// // //           <section>
// // //             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
// // //               Health Benefits
// // //             </h2>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //               {product.benefits.map((benefit, index) => (
// // //                 <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-secondary/30 transition-colors">
// // //                   <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
// // //                   <span className="text-muted-foreground">{benefit}</span>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </section>

// // //           {/* How to Use */}
// // //           <section className="bg-card border border-border rounded-2xl p-8 md:p-12">
// // //             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
// // //               How to Use
// // //             </h2>
// // //             <ul className="space-y-3">
// // //               {product.usage.map((use, index) => (
// // //                 <li key={index} className="flex items-start gap-3">
// // //                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center mt-0.5">
// // //                     {index + 1}
// // //                   </span>
// // //                   <span className="text-muted-foreground">{use}</span>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </section>

// // //           {/* Nutrition Information */}
// // //           <section>
// // //             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
// // //               Nutrition Information
// // //             </h2>
// // //             <div className="bg-card border border-border rounded-xl overflow-hidden max-w-md">
// // //               {product.nutritionInfo.map((info, index) => (
// // //                 <div
// // //                   key={index}
// // //                   className={`flex justify-between items-center p-4 ${
// // //                     index !== product.nutritionInfo.length - 1 ? "border-b border-border" : ""
// // //                   }`}
// // //                 >
// // //                   <span className="font-medium text-foreground">{info.label}</span>
// // //                   <span className="text-muted-foreground">{info.value}</span>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </section>
// // //         </div>
// // //       </div>

// // //       <Footer />
// // //     </div>
// // //   );
// // // };

// // // export default ProductDetail;
// // import { useState, useEffect, useMemo } from "react";
// // import { useParams, useNavigate, useLocation } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Leaf, Shield, Heart, Star, Truck, RotateCcw, Award, Plus, Minus, ShoppingCart, Check, ArrowLeft, XCircle } from "lucide-react";
// // import Header from "@/components/Header";
// // import Footer from "@/components/Footer";
// // import productHoney from "@/assets/product-honey.jpg";
// // import productTea from "@/assets/product-tea.jpg";
// // import productGranola from "@/assets/product-granola.jpg";
// // import productOil from "@/assets/product-oil.jpg";
// // import { productsData } from "@/lib/products";
// // import { useCart } from "@/context/CartContext";

// // // Product database
// // const productsDataLocal = {
// //   "raw-organic-honey": {
// //     name: "Himalayan Weight Loss package",
// //     price: 2499,
// //     originalPrice: 3299,
// //     rating: 4.8,
// //     reviews: 127,
// //     category: "Sweeteners",
// //     inStock: true,
// //     images: [productHoney, productHoney, productHoney, productHoney],
// //     shortDescription: "Pure, unfiltered raw honey harvested from organic wildflower meadows. Rich in natural enzymes, antioxidants, and nutrients.",
// //     description: "Our Raw Organic Honey is a pure gift from nature, harvested from pristine wildflower meadows where bees roam freely without exposure to pesticides or chemicals. Unlike processed honey, our raw honey retains all its natural enzymes, vitamins, minerals, and antioxidants. Each jar captures the authentic taste of the flowers our bees visit, creating a unique flavor profile that changes subtly with the seasons.",
// //     advantages: [
// //       { icon: Leaf, title: "100% Pure & Unfiltered", description: "Never heated, processed, or diluted - just pure honey as nature intended" },
// //       { icon: Shield, title: "Rich in Antioxidants", description: "Contains powerful antioxidants that support immune health and combat free radicals" },
// //       { icon: Heart, title: "Natural Energy Boost", description: "Natural sugars provide sustained energy without the crash of refined sweeteners" },
// //       { icon: Award, title: "Antibacterial Properties", description: "Natural enzymes and compounds that support wound healing and digestive health" }
// //     ],
// //     benefits: ["Supports immune system function", "Natural cough and sore throat remedy", "Promotes digestive health", "Rich source of vitamins and minerals", "May help with seasonal allergies", "Natural sweetener with lower glycemic index"],
// //     nutritionInfo: [
// //       { label: "Serving Size", value: "1 tbsp (21g)" },
// //       { label: "Calories", value: "64" },
// //       { label: "Total Carbs", value: "17g" },
// //       { label: "Sugars", value: "16g" },
// //       { label: "Protein", value: "0.1g" }
// //     ],
// //     certifications: ["USDA Organic", "Non-GMO", "Raw & Unfiltered", "Sustainably Sourced"],
// //     usage: ["Perfect natural sweetener for tea, coffee, and smoothies", "Delicious spread on toast, pancakes, or yogurt", "Natural ingredient for baking and cooking", "Use in homemade face masks and skin care", "Soothe sore throats by mixing with warm lemon water"]
// //   },
// //   "premium-green-tea": {
// //     name: "Premium Green Tea",
// //     price: 1899,
// //     originalPrice: 2499,
// //     rating: 4.7,
// //     reviews: 89,
// //     category: "Beverages",
// //     inStock: true,
// //     images: [productTea, productTea, productTea, productTea],
// //     shortDescription: "Hand-picked organic green tea leaves with delicate flavor and powerful antioxidants for daily wellness.",
// //     description: "Our Premium Green Tea is sourced from organic tea gardens nestled in misty mountain valleys. Each leaf is carefully hand-picked at peak freshness to preserve its delicate flavor profile and maximum antioxidant content. Rich in catechins and L-theanine, this tea offers a perfect balance of calm energy and mental clarity.",
// //     advantages: [
// //       { icon: Leaf, title: "Antioxidant Rich", description: "Packed with EGCG and catechins for cellular health" },
// //       { icon: Shield, title: "Metabolism Support", description: "Natural compounds that support healthy metabolism" },
// //       { icon: Heart, title: "Heart Health", description: "Promotes cardiovascular wellness and healthy cholesterol" },
// //       { icon: Award, title: "Mental Clarity", description: "L-theanine provides calm, focused energy" }
// //     ],
// //     benefits: ["Boosts metabolism naturally", "Rich in powerful antioxidants", "Supports heart health", "Enhances mental focus", "Promotes healthy aging", "Aids in weight management"],
// //     nutritionInfo: [
// //       { label: "Serving Size", value: "1 tea bag (2g)" },
// //       { label: "Calories", value: "0" },
// //       { label: "Caffeine", value: "25mg" },
// //       { label: "Total Carbs", value: "0g" },
// //       { label: "Antioxidants", value: "High" }
// //     ],
// //     certifications: ["USDA Organic", "Fair Trade", "Non-GMO", "Plastic-Free Packaging"],
// //     usage: ["Steep in 175°F water for 2-3 minutes", "Enjoy hot or iced", "Add honey or lemon for flavor", "Perfect morning or afternoon beverage", "Use cooled tea for facial toner"]
// //   },
// //   "artisan-granola-mix": {
// //     name: "Himalayn weight loss package",
// //     price: 1599,
// //     originalPrice: 1999,
// //     rating: 4.9,
// //     reviews: 156,
// //     category: "Breakfast",
// //     inStock: true,
// //     images: [productGranola, productGranola, productGranola, productGranola],
// //     shortDescription: "Handcrafted granola with organic oats, nuts, seeds, and a touch of honey for the perfect morning crunch.",
// //     description: "Our Artisan Granola Mix is lovingly handcrafted in small batches using premium organic ingredients. We combine whole grain oats, crunchy almonds, nutritious seeds, and a hint of organic honey, then bake it to golden perfection. Each cluster delivers satisfying crunch and wholesome nutrition to start your day right.",
// //     advantages: [
// //       { icon: Leaf, title: "Whole Grain Goodness", description: "Made with organic rolled oats and ancient grains" },
// //       { icon: Shield, title: "Protein Packed", description: "Nuts and seeds provide plant-based protein" },
// //       { icon: Heart, title: "Heart Healthy", description: "Rich in fiber and healthy fats" },
// //       { icon: Award, title: "Low Sugar", description: "Lightly sweetened with organic honey" }
// //     ],
// //     benefits: ["Excellent source of fiber", "Sustained energy for your day", "Supports digestive health", "Rich in vitamins and minerals", "Perfect for on-the-go breakfast", "Satisfying and delicious"],
// //     nutritionInfo: [
// //       { label: "Serving Size", value: "1/2 cup (50g)" },
// //       { label: "Calories", value: "220" },
// //       { label: "Total Fat", value: "9g" },
// //       { label: "Total Carbs", value: "31g" },
// //       { label: "Protein", value: "6g" }
// //     ],
// //     certifications: ["USDA Organic", "Non-GMO", "Gluten-Free", "No Refined Sugar"],
// //     usage: ["Enjoy with milk or yogurt", "Perfect topping for smoothie bowls", "Eat as a healthy snack", "Add to baked goods for crunch", "Mix into homemade trail mix"]
// //   },
// //   "cold-pressed-olive-oil": {
// //     name: "Cold-Pressed Olive Oil",
// //     price: 2899,
// //     originalPrice: 3599,
// //     rating: 4.6,
// //     reviews: 94,
// //     category: "Oils",
// //     inStock: true,
// //     images: [productOil, productOil, productOil, productOil],
// //     shortDescription: "Extra virgin olive oil from organic Mediterranean olives, cold-pressed for maximum flavor and nutrients.",
// //     description: "Our Cold-Pressed Olive Oil is extracted from hand-harvested organic olives grown in sun-drenched Mediterranean groves. Using traditional cold-press methods, we preserve the oil's rich polyphenols, vitamins, and distinctive peppery flavor. This liquid gold is perfect for cooking, drizzling, and promoting heart health.",
// //     advantages: [
// //       { icon: Leaf, title: "First Cold Press", description: "Extra virgin quality from the first pressing" },
// //       { icon: Shield, title: "Polyphenol Rich", description: "High in beneficial plant compounds" },
// //       { icon: Heart, title: "Heart Healthy Fats", description: "Monounsaturated fats support cardiovascular health" },
// //       { icon: Award, title: "Authentic Flavor", description: "Rich, peppery taste of premium olives" }
// //     ],
// //     benefits: ["Supports heart health", "Anti-inflammatory properties", "Rich in vitamin E", "Promotes healthy skin", "Supports brain function", "May help manage cholesterol"],
// //     nutritionInfo: [
// //       { label: "Serving Size", value: "1 tbsp (14g)" },
// //       { label: "Calories", value: "120" },
// //       { label: "Total Fat", value: "14g" },
// //       { label: "Saturated Fat", value: "2g" },
// //       { label: "Monounsaturated", value: "10g" }
// //     ],
// //     certifications: ["USDA Organic", "Extra Virgin", "Cold-Pressed", "Single-Origin"],
// //     usage: ["Drizzle over salads and vegetables", "Perfect for low-heat cooking", "Use in salad dressings and marinades", "Dip bread for appetizers", "Add to smoothies for healthy fats"]
// //   }
// // };

// // const ProductDetail = () => {
// //   const { id } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedImage, setSelectedImage] = useState(0);
// //   const [apiProduct, setApiProduct] = useState<any>(null);
// //   const [apiImages, setApiImages] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const { addToCart } = useCart();

// //   // Fetch product from API
// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const response = await fetch(`https://bloom-backend-hqu8.onrender.com/api/v1/products/${id}`);
// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.success && data.data) {
// //             setApiProduct(data.data.product);
// //             setApiImages(data.data.images || []);
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error fetching product:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProduct();
// //   }, [id]);

// //   const product = apiProduct || (productsData as any)[id] || (productsDataLocal as any)[id];
// //   const initialImageFromState = (location.state as any)?.image as string | undefined;

// //   const displayImages = useMemo(() => {
// //     if (!product) return [] as string[];
    
// //     // If navigated from homepage with a chosen image, replicate that image across up to 4 slots
// //     if (initialImageFromState) {
// //       return Array(4).fill(initialImageFromState) as string[];
// //     }
    
// //     // For API products, use the apiImages directly
// //     if (apiProduct && apiImages.length > 0) {
// //       const imageUrls = apiImages.map(img => img.image_url);
// //       console.log('API Images found:', imageUrls.length, imageUrls);
// //       // Pad to 4 images or return what we have
// //       return imageUrls.slice(0, 4);
// //     }
    
// //     // Handle local products with image_url property
// //     const base = (product.images || []).filter(Boolean);
// //     const imageUrls = base.map((img: any) => {
// //       // If it's a string, return it (local images)
// //       if (typeof img === 'string') return img;
// //       // If it's an object with image_url, return that
// //       if (img && typeof img === 'object' && img.image_url) return img.image_url;
// //       return null;
// //     }).filter(Boolean);
    
// //     console.log('Product images:', base.length, imageUrls.length);
// //     // Show up to first 4 available product images
// //     return imageUrls.slice(0, 4);
// //   }, [product, apiProduct, apiImages, initialImageFromState]);

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, [id]);

// //   // Transform API product to match local product format
// //   const transformedProduct = useMemo(() => {
// //     if (!product) return null;
    
// //     // If it's an API product, transform it
// //     if (apiProduct) {
// //       // Convert images array format: [{image_url: "..."}] to ["url1", "url2"]
// //       const imageUrls = apiImages.map(img => img.image_url);
      
// //       return {
// //         ...product,
// //         images: imageUrls.length > 0 ? imageUrls : product.images || [],
// //         price: parseFloat(product.price) * 100, // Convert Ksh to cents
// //         originalPrice: parseFloat(product.price) * 100 * 1.2, // 20% discount
// //         inStock: product.stock_quantity > 0,
// //         category: 'Category',
// //         rating: 4.5,
// //         reviews: 0,
// //         shortDescription: product.description || '',
// //         description: product.description || '',
// //         advantages: [],
// //         benefits: [],
// //         nutritionInfo: [],
// //         certifications: [],
// //         usage: []
// //       };
// //     }
    
// //     return product;
// //   }, [product, apiProduct, apiImages]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-background">
// //         <Header />
// //         <div className="container mx-auto px-4 py-20 text-center">
// //           <h1 className="text-3xl font-bold mb-4">Loading...</h1>
// //           <p className="text-muted-foreground">Loading product details...</p>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   if (!transformedProduct) {
// //     return (
// //       <div className="min-h-screen bg-background">
// //         <Header />
// //         <div className="container mx-auto px-4 py-20 text-center">
// //           <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
// //           <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
// //           <Button onClick={() => navigate("/")}>Return to Home</Button>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   const handleQuantityChange = (action) => {
// //     if (action === "increase") {
// //       setQuantity(prev => prev + 1);
// //     } else if (action === "decrease" && quantity > 1) {
// //       setQuantity(prev => prev - 1);
// //     }
// //   };

// //   const handleAddToCart = () => {
// //     if (!id || !transformedProduct) return;
// //     // Try multiple sources for the image
// //     const imageForCart = 
// //       displayImages[selectedImage] || 
// //       displayImages[0] || 
// //       transformedProduct.images?.[0] ||
// //       transformedProduct.images?.[selectedImage] ||
// //       (location.state as any)?.image ||
// //       '';
    
// //     console.log('Adding to cart with image:', imageForCart);
// //     console.log('Display images:', displayImages);
// //     console.log('Transformed product images:', transformedProduct.images);
    
// //     addToCart({ id, name: transformedProduct.name, price: transformedProduct.price, image: imageForCart }, quantity);
// //     // Toast notification is handled automatically by CartContext
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Header />

// //       <div className="container mx-auto px-4 py-8 md:py-12">
// //         {/* Back Button */}
// //         <Button
// //           variant="ghost"
// //           className="mb-6"
// //           onClick={() => navigate("/")}
// //         >
// //           <ArrowLeft className="w-4 h-4 mr-2" />
// //           Back to Shop
// //         </Button>

// //         {/* Breadcrumb */}
// //         <div className="text-sm text-muted-foreground mb-6">
// //           <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/")}>Home</span>
// //           <span className="mx-2">/</span>
// //           <span className="hover:text-primary cursor-pointer">Shop</span>
// //           <span className="mx-2">/</span>
// //           <span className="hover:text-primary cursor-pointer">{transformedProduct.category}</span>
// //           <span className="mx-2">/</span>
// //           <span className="text-foreground">{transformedProduct.name}</span>
// //         </div>

// //         {/* Main Product Section */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
// //           {/* Images */}
// //           <div className="space-y-4">
// //             <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border">
// //               {displayImages.length > 0 && displayImages[selectedImage] ? (
// //                 <img
// //                   src={displayImages[selectedImage]}
// //                   alt={transformedProduct.name}
// //                   className="w-full h-full object-cover"
// //                 />
// //               ) : (
// //                 <div className="w-full h-full flex items-center justify-center bg-secondary">
// //                   <span className="text-muted-foreground">No image available</span>
// //                 </div>
// //               )}
// //               {!transformedProduct.inStock && (
// //                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
// //                   <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
// //                 </div>
// //               )}
// //             </div>
            
// //             {displayImages.length > 0 && (
// //               <div className="grid grid-cols-4 gap-3">
// //                 {displayImages.map((image, index) => (
// //                   <button
// //                     key={index}
// //                     onClick={() => setSelectedImage(index)}
// //                     className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
// //                       selectedImage === index ? "border-primary opacity-100" : "border-border opacity-60"
// //                     }`}
// //                   >
// //                     <img src={image} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Product Info */}
// //           <div>
// //             <div className="flex items-start justify-between mb-3">
// //               <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
// //                 {transformedProduct.category}
// //               </Badge>
// //               {transformedProduct.inStock && (
// //                 <Badge variant="outline" className="border-green-500 text-green-600">
// //                   <Check className="w-3 h-3 mr-1" />
// //                   In Stock
// //                 </Badge>
// //               )}
// //             </div>

// //             <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
// //               {transformedProduct.name}
// //             </h1>

// //             <div className="flex items-center gap-3 mb-4">
// //               <div className="flex items-center gap-1">
// //                 {[...Array(5)].map((_, i) => (
// //                   <Star
// //                     key={i}
// //                     className={`w-5 h-5 ${
// //                       i < Math.floor(transformedProduct.rating) ? "fill-primary text-primary" : "text-gray-300"
// //                     }`}
// //                   />
// //                 ))}
// //               </div>
// //               <span className="text-sm text-muted-foreground">
// //                 {transformedProduct.rating} ({transformedProduct.reviews} reviews)
// //               </span>
// //             </div>

// //             <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
// //               {transformedProduct.shortDescription}
// //             </p>

// //             {/* Price */}
// //             <div className="flex items-baseline gap-3 mb-6">
// //               <span className="text-4xl font-bold text-foreground">
// //                 Ksh {(transformedProduct.price / 100).toFixed(2)}
// //               </span>
// //               <span className="text-2xl text-muted-foreground line-through">
// //                 Ksh {(transformedProduct.originalPrice / 100).toFixed(2)}
// //               </span>
// //               <Badge variant="destructive" className="ml-2">
// //                 Save {Math.round(((transformedProduct.originalPrice - transformedProduct.price) / transformedProduct.originalPrice) * 100)}%
// //               </Badge>
// //             </div>

// //             {/* Certifications */}
// //             <div className="flex flex-wrap gap-2 mb-6">
// //               {transformedProduct.certifications.map((cert, index) => (
// //                 <Badge key={index} variant="outline" className="border-primary/30 text-primary">
// //                   <Leaf className="w-3 h-3 mr-1" />
// //                   {cert}
// //                 </Badge>
// //               ))}
// //             </div>

// //             {/* Quantity & Add to Cart */}
// //             <div className="flex items-center gap-4 mb-6">
// //               <div className="flex items-center border border-border rounded-lg">
// //                 <button
// //                   onClick={() => handleQuantityChange("decrease")}
// //                   className="p-3 hover:bg-secondary transition-colors"
// //                   disabled={quantity <= 1}
// //                   aria-label="Decrease quantity"
// //                 >
// //                   <Minus className="w-4 h-4" />
// //                 </button>
// //                 <span className="px-6 py-3 font-semibold">{quantity}</span>
// //                 <button
// //                   onClick={() => handleQuantityChange("increase")}
// //                   className="p-3 hover:bg-secondary transition-colors"
// //                   aria-label="Increase quantity"
// //                 >
// //                   <Plus className="w-4 h-4" />
// //                 </button>
// //               </div>

// //               <Button
// //                 size="lg"
// //                 className="flex-1 text-lg py-6 rounded-lg"
// //                 disabled={!transformedProduct.inStock}
// //                 onClick={handleAddToCart}
// //               >
// //                 <ShoppingCart className="w-5 h-5 mr-2" />
// //                 Add to Cart
// //               </Button>
// //             </div>

// //             {/* Trust Badges */}
// //             <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
// //               <div className="flex flex-col items-center text-center p-3">
// //                 <Truck className="w-6 h-6 text-primary mb-2" />
// //                 <span className="text-xs font-medium">Free Shipping</span>
// //                 <span className="text-xs text-muted-foreground">Orders over Ksh50</span>
// //               </div>
// //               <div className="flex flex-col items-center text-center p-3">
// //                 <RotateCcw className="w-6 h-6 text-primary mb-2" />
// //                 <span className="text-xs font-medium">Easy Returns</span>
// //                 <span className="text-xs text-muted-foreground">30-day guarantee</span>
// //               </div>
// //               <div className="flex flex-col items-center text-center p-3">
// //                 <Shield className="w-6 h-6 text-primary mb-2" />
// //                 <span className="text-xs font-medium">Secure Payment</span>
// //                 <span className="text-xs text-muted-foreground">100% protected</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Product Details Tabs */}
// //         <div className="space-y-12">
// //           {/* Description */}
// //           <section>
// //             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
// //               Product Description
// //             </h2>
// //             <p className="text-muted-foreground leading-relaxed text-lg">
// //               {transformedProduct.description}
// //             </p>
// //           </section>

// //           {/* Key Advantages */}
// //           <section className="bg-gradient-to-b from-secondary/20 to-transparent rounded-2xl p-8 md:p-12">
// //             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
// //               Key Advantages
// //             </h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {transformedProduct.advantages.map((advantage, index) => (
// //                 <div key={index} className="flex gap-4 p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
// //                   <div className="flex-shrink-0">
// //                     <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
// //                       <advantage.icon className="w-6 h-6 text-primary" />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <h3 className="font-heading font-semibold text-foreground mb-2">
// //                       {advantage.title}
// //                     </h3>
// //                     <p className="text-muted-foreground text-sm">
// //                       {advantage.description}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </section>

// //           {/* Health Benefits */}
// //           <section>
// //             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
// //               Health Benefits
// //             </h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               {transformedProduct.benefits.map((benefit, index) => (
// //                 <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-secondary/30 transition-colors">
// //                   <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
// //                   <span className="text-muted-foreground">{benefit}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </section>

// //           {/* How to Use */}
// //           <section className="bg-card border border-border rounded-2xl p-8 md:p-12">
// //             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
// //               How to Use
// //             </h2>
// //             <ul className="space-y-3">
// //               {transformedProduct.usage.map((use, index) => (
// //                 <li key={index} className="flex items-start gap-3">
// //                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center mt-0.5">
// //                     {index + 1}
// //                   </span>
// //                   <span className="text-muted-foreground">{use}</span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </section>

// //           {/* Nutrition Information */}
// //           <section>
// //             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
// //               Nutrition Information
// //             </h2>
// //             <div className="bg-card border border-border rounded-xl overflow-hidden max-w-md">
// //               {transformedProduct.nutritionInfo.map((info, index) => (
// //                 <div
// //                   key={index}
// //                   className={`flex justify-between items-center p-4 ${
// //                     index !== transformedProduct.nutritionInfo.length - 1 ? "border-b border-border" : ""
// //                   }`}
// //                 >
// //                   <span className="font-medium text-foreground">{info.label}</span>
// //                   <span className="text-muted-foreground">{info.value}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </section>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default ProductDetail;
// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Leaf, Shield, Heart, Star, Truck, RotateCcw, Award, Plus, Minus, ShoppingCart, Check, ArrowLeft, XCircle } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { useCart } from "@/context/CartContext";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [apiProduct, setApiProduct] = useState(null);
//   const [apiImages, setApiImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`https://bloom-backend-hqu8.onrender.com/api/v1/products/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           if (data.success && data.data) {
//             setApiProduct(data.data.product);
//             setApiImages(data.data.images || []);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const product = apiProduct; // Removed productsDataLocal reference

//   const initialImageFromState = location.state?.image;

//   const displayImages = useMemo(() => {
//     if (!product) return [];

//     if (apiImages.length > 0) {
//       const imageUrls = apiImages.map(img => img.image_url).filter(Boolean);
//       console.log('API Images:', imageUrls);
//       return imageUrls.slice(0, 4);
//     }

//     if (initialImageFromState) {
//       return Array(4).fill(initialImageFromState);
//     }

//     const base = (product.images || []).filter(Boolean);
//     const imageUrls = base.map(img => (typeof img === 'string' ? img : img?.image_url)).filter(Boolean);
//     console.log('Local Images:', imageUrls);
//     return imageUrls.slice(0, 4);
//   }, [product, apiImages, initialImageFromState]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [id]);

//   useEffect(() => {
//     if (displayImages.length > 0 && selectedImage >= displayImages.length) {
//       setSelectedImage(0);
//     }
//   }, [displayImages, selectedImage]);

//   const transformedProduct = useMemo(() => {
//     if (!product) return null;

//     if (apiProduct) {
//       const imageUrls = apiImages.map(img => img.image_url).filter(Boolean);
//       return {
//         ...product,
//         images: imageUrls.length > 0 ? imageUrls : [],
//         price: parseFloat(product.price) * 100,
//         originalPrice: parseFloat(product.price) * 100 * 1.2,
//         inStock: product.stock_quantity > 0,
//         category: 'Category',
//         rating: 4.5,
//         reviews: 0,
//         shortDescription: product.description || '',
//         description: product.description || '',
//         advantages: [],
//         benefits: [],
//         nutritionInfo: [],
//         certifications: [],
//         usage: []
//       };
//     }

//     return product;
//   }, [product, apiProduct, apiImages]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-20 text-center">
//           <h1 className="text-3xl font-bold mb-4">Loading...</h1>
//           <p className="text-muted-foreground">Loading product details...</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!transformedProduct) {
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

//   const handleAddToCart = () => {
//     if (!id || !transformedProduct) return;
//     const imageForCart =
//       displayImages[selectedImage] ||
//       displayImages[0] ||
//       transformedProduct.images?.[0] ||
//       initialImageFromState ||
//       '';
//     console.log('Adding to cart with image:', imageForCart);
//     addToCart({ id, name: transformedProduct.name, price: transformedProduct.price, image: imageForCart }, quantity);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <div className="container mx-auto px-4 py-8 md:py-12">
//         <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Shop
//         </Button>
//         <div className="text-sm text-muted-foreground mb-6">
//           <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/")}>Home</span>
//           <span className="mx-2">/</span>
//           <span className="hover:text-primary cursor-pointer">Shop</span>
//           <span className="mx-2">/</span>
//           <span className="hover:text-primary cursor-pointer">{transformedProduct.category}</span>
//           <span className="mx-2">/</span>
//           <span className="text-foreground">{transformedProduct.name}</span>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
//           <div className="space-y-4">
//             <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border">
//               {displayImages.length > 0 && displayImages[selectedImage] ? (
//                 <img
//                   src={displayImages[selectedImage]}
//                   alt={transformedProduct.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     console.error('Image failed to load:', displayImages[selectedImage]);
//                     e.currentTarget.src = '/fallback-image.jpg';
//                   }}
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-secondary">
//                   <span className="text-muted-foreground">No image available</span>
//                 </div>
//               )}
//               {!transformedProduct.inStock && (
//                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                   <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
//                 </div>
//               )}
//             </div>
//             {displayImages.length > 0 && (
//               <div className="grid grid-cols-4 gap-3">
//                 {displayImages.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
//                       selectedImage === index ? "border-primary opacity-100" : "border-border opacity-60"
//                     }`}
//                   >
//                     <img
//                       src={image}
//                       alt={`Product view ${index + 1}`}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         console.error('Thumbnail failed to load:', image);
//                         e.currentTarget.src = '/fallback-image.jpg';
//                       }}
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div>
//             <div className="flex items-start justify-between mb-3">
//               <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
//                 {transformedProduct.category}
//               </Badge>
//               {transformedProduct.inStock && (
//                 <Badge variant="outline" className="border-green-500 text-green-600">
//                   <Check className="w-3 h-3 mr-1" />
//                   In Stock
//                 </Badge>
//               )}
//             </div>
//             <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
//               {transformedProduct.name}
//             </h1>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 ${
//                       i < Math.floor(transformedProduct.rating) ? "fill-primary text-primary" : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-muted-foreground">
//                 {transformedProduct.rating} ({transformedProduct.reviews} reviews)
//               </span>
//             </div>
//             <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
//               {transformedProduct.shortDescription}
//             </p>
//             <div className="flex items-baseline gap-3 mb-6">
//               <span className="text-4xl font-bold text-foreground">
//                 Ksh {(transformedProduct.price / 100).toFixed(2)}
//               </span>
//               <span className="text-2xl text-muted-foreground line-through">
//                 Ksh {(transformedProduct.originalPrice / 100).toFixed(2)}
//               </span>
//               <Badge variant="destructive" className="ml-2">
//                 Save {Math.round(((transformedProduct.originalPrice - transformedProduct.price) / transformedProduct.originalPrice) * 100)}%
//               </Badge>
//             </div>
//             <div className="flex flex-wrap gap-2 mb-6">
//               {transformedProduct.certifications.map((cert, index) => (
//                 <Badge key={index} variant="outline" className="border-primary/30 text-primary">
//                   <Leaf className="w-3 h-3 mr-1" />
//                   {cert}
//                 </Badge>
//               ))}
//             </div>
//             <div className="flex items-center gap-4 mb-6">
//               <div className="flex items-center border border-border rounded-lg">
//                 <button
//                   onClick={() => handleQuantityChange("decrease")}
//                   className="p-3 hover:bg-secondary transition-colors"
//                   disabled={quantity <= 1}
//                   aria-label="Decrease quantity"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="px-6 py-3 font-semibold">{quantity}</span>
//                 <button
//                   onClick={() => handleQuantityChange("increase")}
//                   className="p-3 hover:bg-secondary transition-colors"
//                   aria-label="Increase quantity"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>
//               <Button
//                 size="lg"
//                 className="flex-1 text-lg py-6 rounded-lg"
//                 disabled={!transformedProduct.inStock}
//                 onClick={handleAddToCart}
//               >
//                 <ShoppingCart className="w-5 h-5 mr-2" />
//                 Add to Cart
//               </Button>
//             </div>
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
//         <div className="space-y-12">
//           <section>
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
//               Product Description
//             </h2>
//             <p className="text-muted-foreground leading-relaxed text-lg">
//               {transformedProduct.description}
//             </p>
//           </section>
//           <section className="bg-gradient-to-b from-secondary/20 to-transparent rounded-2xl p-8 md:p-12">
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
//               Key Advantages
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {transformedProduct.advantages.map((advantage, index) => (
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
//           <section>
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
//               Health Benefits
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {transformedProduct.benefits.map((benefit, index) => (
//                 <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-secondary/30 transition-colors">
//                   <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
//                   <span className="text-muted-foreground">{benefit}</span>
//                 </div>
//               ))}
//             </div>
//           </section>
//           <section className="bg-card border border-border rounded-2xl p-8 md:p-12">
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
//               How to Use
//             </h2>
//             <ul className="space-y-3">
//               {transformedProduct.usage.map((use, index) => (
//                 <li key={index} className="flex items-start gap-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center mt-0.5">
//                     {index + 1}
//                   </span>
//                   <span className="text-muted-foreground">{use}</span>
//                 </li>
//               ))}
//             </ul>
//           </section>
//           <section>
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
//               Nutrition Information
//             </h2>
//             <div className="bg-card border border-border rounded-xl overflow-hidden max-w-md">
//               {transformedProduct.nutritionInfo.map((info, index) => (
//                 <div
//                   key={index}
//                   className={`flex justify-between items-center p-4 ${
//                     index !== transformedProduct.nutritionInfo.length - 1 ? "border-b border-border" : ""
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
// ProductDetail Component
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Leaf, Shield, Heart, Star, Truck, RotateCcw, Award, Plus, Minus, ShoppingCart, Check, ArrowLeft, XCircle, User, Eye, EyeOff, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { productsData } from "@/lib/products";
import { buildApiUrl, API_CONFIG } from "@/lib/config";
import { useCart } from "@/context/CartContext";
import { useMaterialToast } from "@/hooks/useMaterialToast";
import { useUserAuth } from "@/context/UserAuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const LoginForm = ({ onSuccess, onSwitchToSignup }: { onSuccess: () => void; onSwitchToSignup: () => void }) => {
  const { setToken } = useUserAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const accessToken = data.data?.accessToken;
        const refreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
        const accessTokenExpires = data.data?.accessTokenExpires;
        const refreshTokenExpires = data.data?.refreshTokenExpires;
        if (accessToken) {
          setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
        }
        setMessage({ text: 'Login successful!', type: 'success' });
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setMessage({ text: data.message || 'Login failed. Please check your credentials.', type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ text: 'Network error. Please check your connection.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
              placeholder="Enter your password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <Button 
              type="button" 
              variant="link" 
              size="sm" 
              className="h-auto p-0 text-primary hover:text-primary/80 underline text-xs font-medium" 
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </Button>
          </div>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md text-sm text-center ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-destructive/10 border border-destructive/30 text-destructive'
            }`}
          >
            {message.text}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <div className="text-center pt-6">
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground mb-4">Don't have an account?</p>
        <Button
          variant="outline"
          onClick={onSwitchToSignup}
          className="px-8"
        >
          Sign Up
        </Button>
      </div>
    </>
  );
};

const SignupForm = ({ onSuccess, onSwitchToLogin }: { onSuccess: () => void; onSwitchToLogin: () => void }) => {
  const { setToken } = useUserAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') setShowPassword(!showPassword);
    else setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match!', type: 'error' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        let accessToken = data.data?.accessToken;
        let refreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
        let accessTokenExpires = data.data?.accessTokenExpires;
        let refreshTokenExpires = data.data?.refreshTokenExpires;
        
        if (!accessToken) {
          const loginRes = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
          });
          const loginData = await loginRes.json();
          if (loginRes.ok && loginData.success) {
            accessToken = loginData.data.accessToken;
            refreshToken = loginData.data.refreshToken || loginData.refreshToken || loginData.refresh_token;
            accessTokenExpires = loginData.data?.accessTokenExpires;
            refreshTokenExpires = loginData.data?.refreshTokenExpires;
          }
        }
        if (accessToken) {
          setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
        }
        setMessage({ text: 'Registration successful!', type: 'success' });
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setMessage({ text: data.message || 'Registration failed. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Register error:', error);
      setMessage({ text: 'Network error. Please check your connection.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
            placeholder="e.g., 254114096574"
          />
          <p className="mt-1 text-xs text-muted-foreground">Enter your phone number without spaces</p>
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
              placeholder="Enter your password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
              onClick={() => togglePasswordVisibility('password')}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Must be at least 6 characters</p>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
            Confirm Password <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              minLength={6}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
              placeholder="Confirm your password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md text-sm text-center ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-destructive/10 border border-destructive/30 text-destructive'
            }`}
          >
            {message.text}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Registering...
            </>
          ) : (
            'Register'
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>

      <div className="text-center pt-6">
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground mb-4">Already have an account?</p>
        <Button
          variant="outline"
          onClick={onSwitchToLogin}
          className="px-8"
        >
          Sign In
        </Button>
      </div>
    </>
  );
};

const AuthModalContent = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="p-6">
      <DialogHeader className="mb-6">
        <DialogTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <User className="w-6 h-6 text-primary" />
          {isLogin ? 'Sign In' : 'Sign Up'} to Write a Review
        </DialogTitle>
      </DialogHeader>
      {isLogin ? (
        <LoginForm onSuccess={onSuccess} onSwitchToSignup={() => setIsLogin(false)} />
      ) : (
        <SignupForm onSuccess={onSuccess} onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [apiProduct, setApiProduct] = useState(null);
  const [apiImages, setApiImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useMaterialToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://bloom-backend-hqu8.onrender.com/api/v1/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setApiProduct(data.data.product);
            setApiImages(data.data.images || []);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const product = apiProduct || (productsData as any)[id];

  const initialImageFromState = location.state?.image;

  const displayImages = useMemo(() => {
    if (!product) return [];

    if (apiImages.length > 0) {
      const imageUrls = apiImages.map(img => img.image_url).filter(Boolean);
      console.log('API Images:', imageUrls);
      return imageUrls.slice(0, 4);
    }

    if (initialImageFromState) {
      return Array(4).fill(initialImageFromState);
    }

    const base = (product.images || []).filter(Boolean);
    const imageUrls = base.map(img => (typeof img === 'string' ? img : img?.image_url)).filter(Boolean);
    console.log('Local Images:', imageUrls);
    return imageUrls.slice(0, 4);
  }, [product, apiProduct, apiImages, initialImageFromState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (displayImages.length > 0 && selectedImage >= displayImages.length) {
      setSelectedImage(0);
    }
  }, [displayImages, selectedImage]);

  // Fetch reviews stats for this product (must be before any early returns to keep hook order stable)
  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      try {
        const res = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.REVIEWS.BY_PRODUCT}/${id}`));
        if (!res.ok) return;
        const data = await res.json().catch(() => ({}));
        if (data?.success && data?.data?.stats) {
          setAverageRating(Number(data.data.stats.average_rating) || 0);
          setTotalReviews(Number(data.data.stats.total_reviews) || 0);
        }

        // Determine if current user has already reviewed
        if (typeof window !== 'undefined') {
          const tokenLocal = localStorage.getItem('token');
          if (tokenLocal && data?.data?.reviews?.length) {
            try {
              const meRes = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.ME), {
                headers: { 'Authorization': `Bearer ${tokenLocal}` },
              });
              const meData = await meRes.json().catch(() => ({}));
              const currentEmail = meData?.data?.email || meData?.email;
              const currentUserId = meData?.data?.user_id || meData?.user_id || meData?.id;
              const reviewed = data.data.reviews.some((r: any) =>
                (currentUserId && r.user_id === currentUserId) || (currentEmail && r.email === currentEmail)
              );
              setHasReviewed(!!reviewed);
            } catch {}
          } else {
            setHasReviewed(false);
          }
        }
      } catch (e) {
        console.error('Failed to fetch reviews', e);
      }
    };
    fetchReviews();
  }, [id]);

  const transformedProduct = useMemo(() => {
    if (!product) return null;

    if (apiProduct) {
      const imageUrls = apiImages.map(img => img.image_url).filter(Boolean);
      return {
        ...product,
        images: imageUrls.length > 0 ? imageUrls : [],
        price: parseFloat(product.price) * 100,
        originalPrice: parseFloat(product.price) * 100 * 1.2,
        inStock: product.stock_quantity > 0,
        stockQuantity: product.stock_quantity,
        category: 'Category',
        rating: 4.5,
        reviews: 0,
        shortDescription: product.description || '',
        description: product.description || '',
        advantages: [],
        benefits: [],
        nutritionInfo: [],
        certifications: [],
        usage: []
      };
    }

    return product;
  }, [product, apiProduct, apiImages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!transformedProduct) {
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
    if (!id || !transformedProduct) return;
    const imageForCart = displayImages[selectedImage] || displayImages[0] || '/fallback-image.jpg';
    console.log('Adding to cart with image:', imageForCart);
    addToCart({ id, name: transformedProduct.name, price: transformedProduct.price, image: imageForCart }, quantity);
  };

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;


  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // User is now logged in, can continue with review
  };

  const submitReview = async () => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    if (!id || !reviewRating) return;
    try {
      setIsSubmittingReview(true);
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.REVIEWS.CREATE), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: id,
          rating: reviewRating,
          // comment omitted for star-only reviews
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit review');
      }
      setReviewRating(0);
      // Refresh reviews to update average
      try {
        const refresh = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.REVIEWS.BY_PRODUCT}/${id}`));
        const refreshData = await refresh.json().catch(() => ({}));
        if (refreshData?.success && refreshData?.data?.stats) {
          setAverageRating(Number(refreshData.data.stats.average_rating) || 0);
          setTotalReviews(Number(refreshData.data.stats.total_reviews) || 0);
        }
        setHasReviewed(true);
      } catch {}
      toast({ description: 'Review submitted successfully', variant: 'success', duration: 3000 });
    } catch (e: any) {
      console.error(e);
      toast({ description: e?.message || 'Failed to submit review', variant: 'destructive', duration: 3000 });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>
        <div className="text-sm text-muted-foreground mb-6">
          <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/")}>Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-primary cursor-pointer">Shop</span>
          <span className="mx-2">/</span>
          <span className="hover:text-primary cursor-pointer">{transformedProduct.category}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{transformedProduct.name}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <div className="space-y-4 order-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border">
              {displayImages.length > 0 && displayImages[selectedImage] ? (
                <img
                  src={displayImages[selectedImage]}
                  alt={transformedProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', displayImages[selectedImage]);
                    e.currentTarget.src = '/fallback-image.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <span className="text-muted-foreground">No image available</span>
                </div>
              )}
              {!transformedProduct.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
                </div>
              )}
            </div>
            {displayImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
                      selectedImage === index ? "border-primary opacity-100" : "border-border opacity-60"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Thumbnail failed to load:', image);
                        e.currentTarget.src = '/fallback-image.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="order-2">
            <div className="flex items-start justify-between mb-3">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                {transformedProduct.category}
              </Badge>
              {transformedProduct.inStock ? (
                <Badge variant="outline" className="border-green-500 text-green-600">
                  <Check className="w-3 h-3 mr-1" />
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="border-red-500 text-red-600 bg-red-50">
                  <XCircle className="w-3 h-3 mr-1" />
                  Out of Stock
                </Badge>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
              {transformedProduct.name}
            </h1>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => {
                  const fillPercent = Math.max(0, Math.min(100, (averageRating - i) * 100));
                  return (
                    <div key={i} className="relative w-5 h-5">
                      <Star className="w-5 h-5 text-gray-300" />
                      <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                        <Star className="w-5 h-5 fill-primary text-primary" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <span className="text-xs text-muted-foreground">
                {averageRating.toFixed(1)} ({totalReviews} reviews)
              </span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
              {transformedProduct.shortDescription}
            </p>
            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-3xl md:text-4xl font-bold text-foreground">
                Ksh {(transformedProduct.price / 100).toFixed(2)}
              </span>
              <span className="text-lg md:text-xl text-muted-foreground line-through">
                Ksh {(transformedProduct.originalPrice / 100).toFixed(2)}
              </span>
              <Badge variant="destructive" className="ml-2">
                Save {Math.round(((transformedProduct.originalPrice - transformedProduct.price) / transformedProduct.originalPrice) * 100)}%
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {transformedProduct.certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="border-primary/30 text-primary text-xs md:text-sm py-1">
                  <Leaf className="w-3 h-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-3 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1 || !transformedProduct.inStock}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-3 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!transformedProduct.inStock}
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-3 flex-1">
                <Button
                  size="lg"
                  className="flex-1 text-lg py-6 rounded-lg"
                  disabled={!transformedProduct.inStock}
                  onClick={handleAddToCart}
                >
                  {transformedProduct.inStock ? (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 mr-2" />
                      Out of Stock
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg py-6 rounded-lg"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  View Cart
                </Button>
              </div>
            </div>
            {/* Write a Review (only for logged-in users and not yet reviewed) */}
            {!hasReviewed && (
            <div className="mt-4 border-t border-border pt-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Write a review</h3>
              {token ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Your rating:</span>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(r => (
                        <button
                          key={r}
                          onClick={() => setReviewRating(r)}
                          aria-label={`Rate ${r} star${r>1?'s':''}`}
                          className="p-1"
                        >
                          <Star className={`w-6 h-6 ${r <= reviewRating ? 'fill-primary text-primary' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    disabled={isSubmittingReview || reviewRating === 0}
                    onClick={submitReview}
                  >
                    {isSubmittingReview ? 'Submitting...' : 'Submit Rating'}
                  </Button>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">
                  Please <button className="text-primary underline" onClick={() => setShowAuthModal(true)}>log in</button> to write a review.
                </div>
              )}
            </div>
            )}

            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
              <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
                <AuthModalContent onSuccess={handleAuthSuccess} />
              </DialogContent>
            </Dialog>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center p-3">
                <Truck className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs font-medium">Zone-based Shipping</span>
                <span className="text-xs text-muted-foreground">Calculated at checkout</span>
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
        {/* <div className="space-y-12">
          <section>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
              Product Description
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {transformedProduct.description}
            </p>
          </section>
          
          
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;