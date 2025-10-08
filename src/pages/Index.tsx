import { Button } from "@/components/ui/button";
import { Leaf, Shield, Heart, Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import heroImage from "@/assets/hero-organic.jpg";
import productHoney from "@/assets/product-honey.jpg";
import productTea from "@/assets/product-tea.jpg";
import productGranola from "@/assets/product-granola.jpg";
import productOil from "@/assets/product-oil.jpg";
import categoryHerbs from "@/assets/category-herbs.jpg";
import categoryWeightLoss from "@/assets/category-weightloss.jpg";
import categoryCleansers from "@/assets/category-cleansers.jpg";
import categoryGutHealth from "@/assets/category-guthealth.jpg";

const Index = () => {
  const products = [
    {
      name: "Raw Organic Honey",
      price: "$24.99",
      image: productHoney,
      category: "Sweeteners",
    },
    {
      name: "Premium Green Tea",
      price: "$18.99",
      image: productTea,
      category: "Beverages",
    },
    {
      name: "Artisan Granola Mix",
      price: "$15.99",
      image: productGranola,
      category: "Breakfast",
    },
    {
      name: "Cold-Pressed Olive Oil",
      price: "$28.99",
      image: productOil,
      category: "Oils",
    },
  ];

  const categories = [
    {
      title: "Herbs",
      description: "Discover our curated selection of organic herbs, grown naturally to enhance your wellness journey with pure botanical goodness.",
      image: categoryHerbs,
    },
    {
      title: "Weight Loss",
      description: "Support your health goals with our carefully selected organic products designed to naturally complement your balanced lifestyle.",
      image: categoryWeightLoss,
    },
    {
      title: "Cleansers",
      description: "Purify naturally with our organic cleansing products, formulated with gentle botanicals for radiant, healthy skin.",
      image: categoryCleansers,
    },
    {
      title: "Gut Health",
      description: "Nurture your digestive wellness with our range of organic products rich in natural probiotics and fiber for optimal gut balance.",
      image: categoryGutHealth,
    },
  ];

  const benefits = [
    {
      icon: Leaf,
      title: "100% Organic",
      description: "Certified organic ingredients sourced from sustainable farms",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Rigorous testing ensures premium quality in every product",
    },
    {
      icon: Heart,
      title: "Health First",
      description: "Nutritious products that support your wellness journey",
    },
    {
      icon: Sparkles,
      title: "Pure & Natural",
      description: "No artificial additives, preservatives, or chemicals",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Organic products in natural setting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/30"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Nurture Life, Naturally
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 font-body">
              Discover premium organic products that bring the pure essence of nature to your daily life. Handpicked, packaged with care, and delivered to your door.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 rounded-full hover-scale"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked selections from our organic collection, crafted with care for your wellbeing
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      {/* Shop By Lifestyle Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-transparent to-secondary/30">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Shop By Lifestyle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect organic solutions tailored to your unique wellness needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Organic Bloom Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Why Choose Organic Bloom
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to bringing you the finest organic products with unwavering quality and care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-all duration-300 hover-scale">
                <benefit.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
