// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import ProductCard from "@/components/ProductCard";

// interface ProductImage {
//   image_id: string;
//   image_url: string;
//   alt_text: string;
//   is_primary: boolean;
// }

// interface Product {
//   product_id: string;
//   name: string;
//   description: string;
//   price: string;
//   stock_quantity: number;
//   sku: string;
//   category_id: string;
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
//   images?: ProductImage[];
// }

// interface ApiResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     products: Product[];
//     pagination?: {
//       page: number;
//       limit: number;
//       total: number;
//       pages: number;
//     };
//   };
//   timestamp: string;
// }

// const AllProducts = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Category mapping
//   const categoryMap: Record<string, string> = {
//     'fc0ef0fa-db5d-4a32-b051-c90d0cabf525': 'Nutritional Supplements',
//     '261b45ec-a4c0-4e44-92b9-9ad4c2ca1515': 'Natural Skin Care',
//     '6ec176fc-cac4-40ee-b1d1-249e396632a8': 'Mens Boosters & Fertility Support',
//     'f9d5401f-a4f8-46f0-a0f0-2f409287d44a': 'Yoni & Female Fertility Care',
//     'fa289cf9-629d-43fd-ad24-16dc5d5dc363': 'Weight Management Products',
//     '360c510f-8b36-43c0-89bf-81c96a0ea885': 'Pure Honey & Honey Products',
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `https://bloom-backend-2.onrender.com/api/v1/products?page=1&limit=100&search=${searchTerm}&category=`
//         );
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
        
//         const data: ApiResponse = await response.json();
//         if (data.success && data.data.products) {
//           const activeProducts = data.data.products
//             .filter(product => product.is_active)
//             .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
//           setProducts(activeProducts);
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const debounceTimer = setTimeout(() => {
//       fetchProducts();
//     }, 300);

//     return () => clearTimeout(debounceTimer);
//   }, [searchTerm]);

//   // Placeholder image generator
//   const getPlaceholderImage = (name: string) => {
//     const encodedName = encodeURIComponent(name.replace(/\s+/g, '-').toLowerCase());
//     return `https://via.placeholder.com/300x300/4F46E5/white?text=${encodedName}`;
//   };

//   // Transform API products to match ProductCard props
//   const transformedProducts = products.map(product => {
//     let imageUrl = getPlaceholderImage(product.name);
//     if (product.images && product.images.length > 0) {
//       const primaryImage = product.images.find(img => img.is_primary) || product.images[0];
//       imageUrl = primaryImage.image_url;
//     }
    
//     return {
//       id: product.product_id,
//       name: product.name,
//       price: `Ksh ${parseFloat(product.price).toFixed(2)}`,
//       image: imageUrl,
//       category: categoryMap[product.category_id] || 'Uncategorized',
//       stockQuantity: product.stock_quantity,
//     };
//   });

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       <section className="container mx-auto px-4 py-12">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
//             All Products
//           </h1>
//           <p className="text-lg text-muted-foreground">
//             Discover our complete collection of premium organic products
//           </p>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-8 max-w-2xl">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <Input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 py-6 text-base"
//             />
//           </div>
//         </div>

//         {/* Products Count */}
//         <div className="mb-6 flex items-center justify-between">
//           <p className="text-muted-foreground">
//             {transformedProducts.length} {transformedProducts.length === 1 ? 'product' : 'products'} found
//           </p>
//           <Button variant="outline" onClick={() => navigate('/products')}>
//             Browse by Category
//           </Button>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="text-lg text-muted-foreground">Loading products...</div>
//           </div>
//         ) : transformedProducts.length === 0 ? (
//           <div className="flex flex-col justify-center items-center h-64">
//             <p className="text-lg text-muted-foreground mb-4">
//               {searchTerm ? 'No products found matching your search.' : 'No products available at the moment.'}
//             </p>
//             {searchTerm && (
//               <Button onClick={() => setSearchTerm('')} variant="outline">
//                 Clear Search
//               </Button>
//             )}
//           </div>
//         ) : (
//           /* Products Grid */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {transformedProducts.map(product => (
//               <div key={product.id} className="animate-fade-in h-full">
//                 <ProductCard {...product} />
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default AllProducts;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

interface ProductImage {
  image_id: string;
  image_url: string;
  alt_text: string;
  is_primary: number | boolean;
}

interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number | string;
  stock_quantity: number;
  sku: string;
  category_id: string;
  is_active: number | boolean;
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
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  timestamp: string;
}

const categoryMap: Record<string, string> = {
  "fc0ef0fa-db5d-4a32-b051-c90d0cabf525": "Nutritional Supplements",
  "261b45ec-a4c0-4e44-92b9-9ad4c2ca1515": "Natural Skin Care",
  "6ec176fc-cac4-40ee-b1d1-249e396632a8": "Mens Boosters & Fertility Support",
  "f9d5401f-a4f8-46f0-a0f0-2f409287d44a": "Yoni & Female Fertility Care",
  "fa289cf9-629d-43fd-ad24-16dc5d5dc363": "Weight Management Products",
  "c424a6ed-d2bf-496c-bac9-e1b7ec189233": "Organic Herbs",
  "360c510f-8b36-43c0-89bf-81c96a0ea885": "Pure Honey & Honey Products",
  "d31bcff6-34c8-48d9-a6c4-621d3867436d": "Clearance Sale",
};

const getPlaceholderImage = (name: string) => {
  const encodedName = encodeURIComponent(name.replace(/\s+/g, "-").toLowerCase());
  return `https://via.placeholder.com/300x300/4F46E5/white?text=${encodedName}`;
};

// ── Shimmer ───────────────────────────────────────────────────────────────────
const ShimmerCard = () => (
  <div className="rounded-xl overflow-hidden border border-border bg-card animate-pulse">
    <div className="w-full aspect-square bg-muted" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-1/2" />
      <div className="h-5 bg-muted rounded w-1/3 mt-2" />
      <div className="h-9 bg-muted rounded w-full mt-2" />
    </div>
  </div>
);

const ShimmerGrid = ({ count = 12 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ShimmerCard key={i} />
    ))}
  </div>
);
// ─────────────────────────────────────────────────────────────────────────────

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://bloom-backend-2.onrender.com/api/v1/products?page=1&limit=200&search=${encodeURIComponent(searchTerm)}&category=`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data: ApiResponse = await response.json();
        if (data.success && data.data.products) {
          const activeProducts = data.data.products
            .filter((p) => p.is_active)
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
          setProducts(activeProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const transformedProducts = products.map((product) => {
    let imageUrl = getPlaceholderImage(product.name);
    if (product.images && product.images.length > 0) {
      const primaryImage =
        product.images.find((img) => img.is_primary) || product.images[0];
      imageUrl = primaryImage.image_url;
    }
    return {
      id: product.product_id,
      name: product.name,
      price: `Ksh ${parseFloat(String(product.price)).toFixed(2)}`,
      image: imageUrl,
      category: categoryMap[product.category_id] || "Uncategorized",
      stockQuantity: product.stock_quantity,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="container mx-auto px-4 py-12">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            All Products
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover our complete collection of premium organic products
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>
        </div>

        {/* Count + category link */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            {loading ? (
              <span className="inline-block h-4 w-32 bg-muted rounded animate-pulse" />
            ) : (
              <>
                {transformedProducts.length}{" "}
                {transformedProducts.length === 1 ? "product" : "products"} found
              </>
            )}
          </p>
          <Button variant="outline" onClick={() => navigate("/products")}>
            Browse by Category
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <ShimmerGrid count={12} />
        ) : transformedProducts.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <p className="text-lg text-muted-foreground">
              {searchTerm
                ? "No products found matching your search."
                : "No products available at the moment."}
            </p>
            {searchTerm && (
              <Button onClick={() => setSearchTerm("")} variant="outline">
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {transformedProducts.map((product) => (
              <div key={product.id} className="animate-fade-in h-full">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default AllProducts;