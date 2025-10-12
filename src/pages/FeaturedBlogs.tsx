import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import organicImage from "@/assets/organic.jpg";

const FeaturedBlogs = () => {
  const navigate = useNavigate();
  
  const blogs = [
    {
      id: "organic-gardening-tips",
      title: "Organic Gardening Tips",
      category: "GARDENING",
      description: "Learn essential techniques for growing your own organic vegetables and herbs at home.",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop&crop=center",
    },
    {
      id: "superfood-nutrition",
      title: "Superfood Nutrition Guide",
      category: "NUTRITION",
      description: "Discover the power of superfoods and how to incorporate them into your daily diet.",
      date: "March 12, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=300&fit=crop&crop=center",
    },
    {
      id: "sustainable-farming",
      title: "Sustainable Farming Practices",
      category: "SUSTAINABILITY",
      description: "Explore eco-friendly farming methods that protect our planet while producing quality food.",
      date: "March 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop&crop=center",
    },
    {
      id: "organic-cooking-basics",
      title: "Organic Cooking Basics",
      category: "COOKING",
      description: "Master the fundamentals of cooking with organic ingredients for maximum flavor and nutrition.",
      date: "March 8, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop&crop=center",
    },
    {
      id: "wellness-trends",
      title: "Organic Wellness Trends",
      category: "WELLNESS",
      description: "Exploring the latest trends in organic living and sustainable wellness practices.",
      date: "March 5, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop&crop=center",
    },
    {
      id: "sustainable-living-guide",
      title: "Sustainable Living Guide",
      category: "LIFESTYLE",
      description: "A comprehensive guide to adopting sustainable practices in your daily life.",
      date: "March 3, 2024",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop&crop=center",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          {/* Background image */}
          <img
            src={organicImage}
            alt="Organic products and fresh vegetables"
            className="w-full h-full object-cover"
          />
          {/* Organic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/20"></div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/30 blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-secondary/40 blur-3xl"></div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl md:text-7xl font-heading font-bold mb-6 tracking-tight drop-shadow-lg">
              FEATURED BLOGS
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Insights, trends, and expert knowledge from the world of organic living and wellness
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                OUR MISSION
              </h2>
              <p className="text-2xl md:text-3xl font-heading font-medium text-foreground italic leading-relaxed">
                "Bridging the gap between consumers and organic living."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <article
                key={blog.id}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Blog Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  {/* Category Tag */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded-full">
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
                  >
                    <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 group-hover/btn:after:scale-x-100 group-hover/btn:after:origin-bottom-left">
                      READ MORE
                    </span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest organic living insights and wellness trends delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturedBlogs;
