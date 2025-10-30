import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import organicImage from "@/assets/organic.jpg";
import { buildApiUrl, API_CONFIG } from "@/lib/config";

const FeaturedBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.LIST)}?page=1&limit=9&status=published`);
        const data = await res.json().catch(() => ({}));
        if (res.ok && data?.success) {
          setBlogs(data.data?.posts || []);
        } else {
          setBlogs([]);
        }
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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
                "Inspire natural wellness and sustainable living through pure, organic products that nurture balance, enhance vitality, and celebrate the beauty of a healthy lifestyle."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-muted-foreground">Loading blogs…</div>
            ) : blogs.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">No blog posts found.</div>
            ) : blogs.map((blog: any, index: number) => (
              <article
                key={blog.id}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Blog Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={blog.featured_image || organicImage}
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
                      {blog.status?.toUpperCase() || 'PUBLISHED'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : '-'}</span>
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
