import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

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

const slugToCategoryId: Record<string, { id: string; name: string }> = {
  "weight-management": { id: "fa289cf9-629d-43fd-ad24-16dc5d5dc363", name: "Weight Management Products" },
  "female-care": { id: "f9d5401f-a4f8-46f0-a0f0-2f409287d44a", name: "Yoni & Female Fertility Care" },
  "mens-health": { id: "6ec176fc-cac4-40ee-b1d1-249e396632a8", name: "Men's Boosters & Fertility Support" },
  "skin-care": { id: "261b45ec-a4c0-4e44-92b9-9ad4c2ca1515", name: "Natural Skin Care" },
  "supplements": { id: "fc0ef0fa-db5d-4a32-b051-c90d0cabf525", name: "Nutritional Supplements" }
};

const getPlaceholderImage = (name: string) => {
  const encodedName = encodeURIComponent(name.replace(/\s+/g, '-').toLowerCase());
  return `https://via.placeholder.com/300x300/4F46E5/white?text=${encodedName}`;
};

const CategoryProducts = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const targetCategory = useMemo(() => (slug ? slugToCategoryId[slug] : undefined), [slug]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryParam = targetCategory ? encodeURIComponent(targetCategory.id) : '';
        const response = await fetch(`https://bloom-backend-2.onrender.com/api/v1/products?page=1&limit=200&search=&category=${categoryParam}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: ApiResponse = await response.json();
        if (!data.success || !data.data?.products) throw new Error('Invalid response');

        const active = data.data.products.filter(p => p.is_active);
        const clientFiltered = targetCategory
          ? active.filter(p => p.category_id === targetCategory.id)
          : active;
        
        // Sort by created_at descending (newest first)
        const sortedProducts = [...clientFiltered].sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA; // Descending order
        });
        
        setProducts(sortedProducts);
      } catch (e) {
        console.error(e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (targetCategory) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [targetCategory]);

  const transformed = products.map(product => {
    let imageUrl = getPlaceholderImage(product.name);
    if (product.images && product.images.length > 0) {
      const primary = product.images.find(img => img.is_primary) || product.images[0];
      imageUrl = primary.image_url;
    }
    return {
      id: product.product_id,
      name: product.name,
      price: `Ksh ${parseFloat(product.price).toFixed(2)}`,
      image: imageUrl,
      category: targetCategory?.name || 'Category',
      stockQuantity: product.stock_quantity,
    };
  });

  if (!targetCategory) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-lg text-muted-foreground mb-6">Unknown category.</div>
          <Button onClick={() => navigate('/products')}>Browse all categories</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground">{targetCategory.name}</h1>
            <p className="text-muted-foreground">{products.length} {products.length === 1 ? 'product' : 'products'}</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/products')}>All Categories</Button>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading products...</div>
        ) : transformed.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">No products found in this category yet.</p>
            <Button onClick={() => navigate('/products')}>Browse other categories</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {transformed.map(p => (
              <div key={p.id} className="h-full">
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default CategoryProducts;


