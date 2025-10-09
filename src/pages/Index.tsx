import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, Shield, Heart, Sparkles, ArrowRight, Star, Quote } from "lucide-react";
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
      price: "Ksh24.99",
      image: productHoney,
      category: "Sweeteners",
    },
    {
      name: "Premium Green Tea",
      price: "Ksh18.99",
      image: productTea,
      category: "Beverages",
    },
    {
      name: "Artisan Granola Mix",
      price: "Ksh15.99",
      image: productGranola,
      category: "Breakfast",
    },
    {
      name: "Cold-Pressed Olive Oil",
      price: "Ksh28.99",
      image: productOil,
      category: "Oils",
    },
    {
      name: "Raw Organic Honey",
      price: "Ksh24.99",
      image: productHoney,
      category: "Sweeteners",
    },
    {
      name: "Premium Green Tea",
      price: "Ksh18.99",
      image: productTea,
      category: "Beverages",
    },
    {
      name: "Artisan Granola Mix",
      price: "Ksh15.99",
      image: productGranola,
      category: "Breakfast",
    },
    {
      name: "Cold-Pressed Olive Oil",
      price: "Ksh28.99",
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

  const testimonials = [
    {
      name: "Jennifer Martinez",
      role: "Wellness Enthusiast",
      content: "Organic Bloom has transformed my approach to healthy living. The quality is exceptional and I can taste the difference in every product.",
      rating: 5,
    },
    {
      name: "Robert Kim",
      role: "Nutrition Coach",
      content: "I recommend Organic Bloom to all my clients. Their commitment to pure, organic ingredients aligns perfectly with my philosophy of natural wellness.",
      rating: 5,
    },
    {
      name: "Amanda Foster",
      role: "Busy Mom of Three",
      content: "Finally, organic products that don't compromise on taste or quality. My whole family loves the selection, and I love knowing what we're consuming.",
      rating: 5,
    },
  ];

  const certifications = [
    { name: "USDA Organic", description: "Certified organic standards" },
    { name: "Non-GMO", description: "Verified non-GMO products" },
    { name: "Gluten-Free", description: "Certified gluten-free options" },
    { name: "Fair Trade", description: "Ethically sourced ingredients" },
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
      <section className="relative h-[800px] md:h-[920px] overflow-hidden">
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

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-transparent py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from people who've embraced organic living with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-8 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-heading font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Certified Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our commitment to quality is backed by industry-leading certifications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-primary flex items-center justify-center group-hover:bg-primary transition-all duration-300 hover-scale">
                  <Leaf className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {cert.name}
                </h3>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 p-12 md:p-16 text-center animate-fade-in">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <Leaf className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Join Our Organic Community
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Get exclusive offers, wellness tips, and be the first to know about new organic arrivals
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/95 border-white/50 text-foreground placeholder:text-muted-foreground"
                required
              />
              <Button 
                type="submit" 
                className="bg-white text-primary hover:bg-white/90 font-semibold whitespace-nowrap px-8"
              >
                Subscribe
              </Button>
            </form>
            
            <p className="text-sm text-white/70 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
