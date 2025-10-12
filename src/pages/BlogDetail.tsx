import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2, Heart } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock blog data - in a real app, this would come from an API
  const blogData = {
    "organic-gardening-tips": {
      id: "organic-gardening-tips",
      title: "Organic Gardening Tips",
      category: "GARDENING",
      description: "Learn essential techniques for growing your own organic vegetables and herbs at home.",
      date: "March 15, 2024",
      readTime: "5 min read",
      author: "Sarah Green",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=600&fit=crop&crop=center",
      content: `
        <p>Organic gardening is more than just avoiding synthetic pesticides and fertilizers. It's about creating a sustainable ecosystem in your own backyard that works in harmony with nature.</p>
        
        <h2>Getting Started with Organic Gardening</h2>
        <p>Before you plant your first seed, it's important to understand your soil. Healthy soil is the foundation of any successful organic garden. Start by testing your soil's pH levels and nutrient content. Most vegetables prefer a slightly acidic soil with a pH between 6.0 and 7.0.</p>
        
        <h2>Essential Organic Techniques</h2>
        <p>Composting is one of the most important practices in organic gardening. Create your own compost using kitchen scraps, yard waste, and other organic materials. This not only reduces waste but also provides your plants with rich, nutrient-dense soil.</p>
        
        <p>Companion planting is another key technique. Certain plants grow better together, helping each other by repelling pests, improving soil nutrients, or providing shade. For example, planting marigolds near tomatoes can help deter harmful insects.</p>
        
        <h2>Natural Pest Control</h2>
        <p>Instead of reaching for chemical pesticides, try natural alternatives. Neem oil, diatomaceous earth, and beneficial insects like ladybugs can help control pest populations without harming your plants or the environment.</p>
        
        <h2>Water Conservation</h2>
        <p>Efficient watering is crucial for organic gardens. Use drip irrigation systems or soaker hoses to deliver water directly to plant roots, reducing waste and preventing fungal diseases.</p>
      `,
      tags: ["gardening", "organic", "sustainability", "vegetables", "composting"]
    },
    "superfood-nutrition": {
      id: "superfood-nutrition",
      title: "Superfood Nutrition Guide",
      category: "NUTRITION",
      description: "Discover the power of superfoods and how to incorporate them into your daily diet.",
      date: "March 12, 2024",
      readTime: "7 min read",
      author: "Dr. Michael Chen",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop&crop=center",
      content: `
        <p>Superfoods are nutrient-dense foods that offer exceptional health benefits. They're packed with vitamins, minerals, antioxidants, and other compounds that can boost your overall well-being.</p>
        
        <h2>What Makes a Food "Super"?</h2>
        <p>Superfoods are characterized by their high nutrient density relative to their caloric content. They typically contain high levels of antioxidants, healthy fats, fiber, and phytochemicals that support various bodily functions.</p>
        
        <h2>Top Superfoods to Include</h2>
        <p>Berries, especially blueberries and acai berries, are rich in antioxidants that fight free radicals. Leafy greens like kale and spinach provide essential vitamins and minerals. Nuts and seeds offer healthy fats and protein.</p>
        
        <h2>Incorporating Superfoods Daily</h2>
        <p>Start your day with a smoothie bowl topped with berries and chia seeds. Add leafy greens to your salads and sandwiches. Snack on nuts and seeds throughout the day for sustained energy.</p>
      `,
      tags: ["nutrition", "superfoods", "health", "antioxidants", "wellness"]
    },
    "sustainable-farming": {
      id: "sustainable-farming",
      title: "Sustainable Farming Practices",
      category: "SUSTAINABILITY",
      description: "Explore eco-friendly farming methods that protect our planet while producing quality food.",
      date: "March 10, 2024",
      readTime: "6 min read",
      author: "Emma Rodriguez",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=600&fit=crop&crop=center",
      content: `
        <p>Sustainable farming is about meeting today's food needs without compromising the ability of future generations to meet their own needs. It's a holistic approach that considers environmental, social, and economic factors.</p>
        
        <h2>Key Principles of Sustainable Farming</h2>
        <p>Soil health is paramount in sustainable farming. Practices like crop rotation, cover cropping, and reduced tillage help maintain soil structure and fertility while preventing erosion.</p>
        
        <h2>Water Management</h2>
        <p>Efficient water use through drip irrigation, rainwater harvesting, and proper drainage systems helps conserve this precious resource while ensuring crops get the water they need.</p>
        
        <h2>Biodiversity and Ecosystem Health</h2>
        <p>Maintaining diverse ecosystems on farms supports beneficial insects, birds, and other wildlife while naturally controlling pests and diseases.</p>
      `,
      tags: ["farming", "sustainability", "environment", "biodiversity", "conservation"]
    },
    "organic-cooking-basics": {
      id: "organic-cooking-basics",
      title: "Organic Cooking Basics",
      category: "COOKING",
      description: "Master the fundamentals of cooking with organic ingredients for maximum flavor and nutrition.",
      date: "March 8, 2024",
      readTime: "8 min read",
      author: "Chef Maria Santos",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=center",
      content: `
        <p>Cooking with organic ingredients isn't just about health benefits—it's about experiencing the true flavors of food as nature intended. Organic produce often has more intense, complex flavors than conventionally grown alternatives.</p>
        
        <h2>Selecting Quality Organic Ingredients</h2>
        <p>Look for vibrant colors, firm textures, and fresh aromas when selecting organic produce. Seasonal ingredients typically offer the best flavor and nutritional value.</p>
        
        <h2>Cooking Techniques for Organic Foods</h2>
        <p>Gentle cooking methods like steaming, roasting, and sautéing help preserve the nutrients and natural flavors of organic ingredients. Avoid overcooking to maintain texture and taste.</p>
        
        <h2>Building Flavor Profiles</h2>
        <p>Use fresh herbs, spices, and aromatics to enhance the natural flavors of organic ingredients. Simple preparations often highlight the quality of organic produce best.</p>
      `,
      tags: ["cooking", "organic", "flavor", "nutrition", "techniques"]
    },
    "wellness-trends": {
      id: "wellness-trends",
      title: "Organic Wellness Trends",
      category: "WELLNESS",
      description: "Exploring the latest trends in organic living and sustainable wellness practices.",
      date: "March 5, 2024",
      readTime: "4 min read",
      author: "Dr. Lisa Thompson",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop&crop=center",
      content: `
        <p>The wellness industry is evolving rapidly, with more people embracing organic and sustainable approaches to health and well-being. These trends reflect a growing awareness of the connection between personal health and environmental health.</p>
        
        <h2>Plant-Based Nutrition</h2>
        <p>More people are adopting plant-based diets, recognizing the health and environmental benefits of reducing animal product consumption.</p>
        
        <h2>Mindful Eating</h2>
        <p>The practice of mindful eating encourages people to slow down, savor their food, and develop a deeper connection with what they consume.</p>
        
        <h2>Natural Skincare and Beauty</h2>
        <p>Consumers are increasingly choosing organic and natural beauty products, avoiding harsh chemicals and synthetic ingredients.</p>
      `,
      tags: ["wellness", "trends", "health", "sustainability", "lifestyle"]
    },
    "sustainable-living-guide": {
      id: "sustainable-living-guide",
      title: "Sustainable Living Guide",
      category: "LIFESTYLE",
      description: "A comprehensive guide to adopting sustainable practices in your daily life.",
      date: "March 3, 2024",
      readTime: "9 min read",
      author: "Alex Johnson",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop&crop=center",
      content: `
        <p>Sustainable living is about making conscious choices that reduce your environmental impact while improving your quality of life. It's not about perfection, but about progress and making better choices every day.</p>
        
        <h2>Reduce, Reuse, Recycle</h2>
        <p>The classic three R's are still the foundation of sustainable living. Focus on reducing consumption, reusing items whenever possible, and recycling properly.</p>
        
        <h2>Energy Conservation</h2>
        <p>Simple changes like switching to LED bulbs, using programmable thermostats, and unplugging electronics can significantly reduce your energy consumption.</p>
        
        <h2>Waste Reduction</h2>
        <p>Composting food scraps, using reusable containers, and buying in bulk can help minimize waste in your daily life.</p>
        
        <h2>Transportation Choices</h2>
        <p>Walking, biking, carpooling, or using public transportation reduces your carbon footprint while often saving money and improving your health.</p>
      `,
      tags: ["sustainability", "lifestyle", "environment", "conservation", "green-living"]
    }
  };

  const blog = blogData[id as keyof typeof blogData];

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/blogs')} className="bg-primary hover:bg-primary/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="max-w-4xl">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded-full">
                {blog.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 drop-shadow-lg">
              {blog.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 drop-shadow-md">
              {blog.description}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('/blogs')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Save for Later
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetail;
