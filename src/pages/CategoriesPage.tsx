import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

interface ProductImage {
  image_id: string;
  image_url: string;
  alt_text: string;
  is_primary: boolean;
}

interface Product {
  product_id: string;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  sku: string;
  category_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    products: Product[];
  };
  timestamp: string;
}

interface CategoryGroup {
  id: string;
  name: string;
  products: Product[];
}

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Category mapping - fetched from API
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

  // Placeholder image generator
  const getPlaceholderImage = (name: string) => {
    const encodedName = encodeURIComponent(name.replace(/\s+/g, '-').toLowerCase());
    return `https://via.placeholder.com/300x300/4F46E5/white?text=${encodedName}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, fetch categories to build the category map
        let map: Record<string, string> = {};
        const categoriesResponse = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/categories');
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          if (categoriesData.success && categoriesData.data.categories) {
            categoriesData.data.categories.forEach((cat: any) => {
              map[cat.category_id] = cat.name;
            });
            setCategoryMap(map);
          }
        }

        // Then fetch products
        const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/products?page=1&limit=200&search=&category=');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: ApiResponse = await response.json();
        if (data.success && data.data.products) {
          // Filter active products
          const activeProducts = data.data.products.filter(product => product.is_active);

          // Group products by category_id
          const grouped: Record<string, Product[]> = {};
          activeProducts.forEach(product => {
            const catId = product.category_id;
            if (!grouped[catId]) {
              grouped[catId] = [];
            }
            grouped[catId].push(product);
          });
          
          // Sort products within each category by created_at (newest first)
          Object.keys(grouped).forEach(catId => {
            grouped[catId].sort((a, b) => {
              const dateA = new Date(a.created_at || 0).getTime();
              const dateB = new Date(b.created_at || 0).getTime();
              return dateB - dateA; // Descending order
            });
          });

          // Transform to CategoryGroup array - use the map we just built
          const categoryGroups: CategoryGroup[] = Object.entries(grouped).map(([id, products]) => ({
            id,
            name: map[id] || `Category ${id.slice(0, 8)}...`,
            products,
          }));

          // Sort categories by number of products (descending)
          categoryGroups.sort((a, b) => b.products.length - a.products.length);

          setCategories(categoryGroups);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        // Fallback to hardcoded categories if API fails
        setCategories([
          { id: '1', name: 'Weight Management Products', products: [] },
          { id: '2', name: 'Yoni & Female Fertility Care', products: [] },
          // Add more as needed
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter categories/products by search term
  const filteredCategories = categories.map(cat => ({
    ...cat,
    products: cat.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.products.length > 0 || searchTerm === ""); // Hide empty if searching

  // Transform products for ProductCard
  const transformedProducts = (catProducts: Product[], categoryName: string) =>
    catProducts.map(product => {
      // Use the first available image, or get primary image, or fallback to placeholder
      let imageUrl = getPlaceholderImage(product.name);
      if (product.images && product.images.length > 0) {
        const primaryImage = product.images.find(img => img.is_primary);
        imageUrl = (primaryImage || product.images[0]).image_url;
      }
      
      return {
        id: product.product_id,
        name: product.name,
        price: `Ksh ${parseFloat(product.price).toFixed(2)}`,
        image: imageUrl,
        category: categoryName || categoryMap[product.category_id] || 'Uncategorized',
        stockQuantity: product.stock_quantity,
        categoryId: product.category_id,
      };
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-lg">Loading categories...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
            Explore Our Categories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover organic products tailored to your wellness needs across various categories
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search products across categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>
      </section>

      {/* Categories Sections */}
      <section className="container mx-auto px-4 py-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              {searchTerm ? 'No products found matching your search.' : 'No categories available at the moment.'}
            </p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Back to Home
            </Button>
          </div>
        ) : (
          <div className="space-y-16">
            {filteredCategories.map((category) => (
              <div key={category.id} className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-heading font-bold text-foreground">
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {category.products.length} {category.products.length === 1 ? 'product' : 'products'} available
                    </p>
                  </div>
                  {category.products.length > 4 && (
                    <Button variant="outline" onClick={() => navigate(`/products/${encodeURIComponent((categoryMap[category.id] || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''))}`)}>
                      View All
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {transformedProducts(category.products.slice(0, 8), category.name).map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
                {category.products.length > 8 && (
                  <div className="text-center mt-8">
                    <Button onClick={() => navigate(`/products/${encodeURIComponent((categoryMap[category.id] || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''))}`)}>
                      View More in {category.name}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default CategoriesPage;