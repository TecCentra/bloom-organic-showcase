// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Search, Filter } from "lucide-react";
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
//   };
//   timestamp: string;
// }

// interface CategoryGroup {
//   id: string;
//   name: string;
//   products: Product[];
// }

// const CategoriesPage = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState<CategoryGroup[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Category mapping - fetched from API
//   const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

//   // Placeholder image generator
//   const getPlaceholderImage = (name: string) => {
//     const encodedName = encodeURIComponent(name.replace(/\s+/g, '-').toLowerCase());
//     return `https://via.placeholder.com/300x300/4F46E5/white?text=${encodedName}`;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // First, fetch categories to build the category map
//         let map: Record<string, string> = {};
//         const categoriesResponse = await fetch('https://bloom-backend-2.onrender.com/api/v1/categories');
//         if (categoriesResponse.ok) {
//           const categoriesData = await categoriesResponse.json();
//           if (categoriesData.success && categoriesData.data.categories) {
//             categoriesData.data.categories.forEach((cat: any) => {
//               map[cat.category_id] = cat.name;
//             });
//             setCategoryMap(map);
//           }
//         }

//         // Then fetch products
//         const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/products?page=1&limit=200&search=&category=');
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         const data: ApiResponse = await response.json();
//         if (data.success && data.data.products) {
//           // Filter active products
//           const activeProducts = data.data.products.filter(product => product.is_active);

//           // Group products by category_id
//           const grouped: Record<string, Product[]> = {};
//           activeProducts.forEach(product => {
//             const catId = product.category_id;
//             if (!grouped[catId]) {
//               grouped[catId] = [];
//             }
//             grouped[catId].push(product);
//           });
          
//           // Sort products within each category by created_at (newest first)
//           Object.keys(grouped).forEach(catId => {
//             grouped[catId].sort((a, b) => {
//               const dateA = new Date(a.created_at || 0).getTime();
//               const dateB = new Date(b.created_at || 0).getTime();
//               return dateB - dateA; // Descending order
//             });
//           });

//           // Transform to CategoryGroup array - use the map we just built
//           const categoryGroups: CategoryGroup[] = Object.entries(grouped).map(([id, products]) => ({
//             id,
//             name: map[id] || `Category ${id.slice(0, 8)}...`,
//             products,
//           }));

//           // Sort categories by number of products (descending)
//           categoryGroups.sort((a, b) => b.products.length - a.products.length);

//           setCategories(categoryGroups);
//         }
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         // Fallback to hardcoded categories if API fails
//         setCategories([
//           { id: '1', name: 'Weight Management Products', products: [] },
//           { id: '2', name: 'Yoni & Female Fertility Care', products: [] },
//           // Add more as needed
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter categories/products by search term
//   const filteredCategories = categories.map(cat => ({
//     ...cat,
//     products: cat.products.filter(product =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })).filter(cat => cat.products.length > 0 || searchTerm === ""); // Hide empty if searching

//   // Transform products for ProductCard
//   const transformedProducts = (catProducts: Product[], categoryName: string) =>
//     catProducts.map(product => {
//       // Use the first available image, or get primary image, or fallback to placeholder
//       let imageUrl = getPlaceholderImage(product.name);
//       if (product.images && product.images.length > 0) {
//         const primaryImage = product.images.find(img => img.is_primary);
//         imageUrl = (primaryImage || product.images[0]).image_url;
//       }
      
//       return {
//         id: product.product_id,
//         name: product.name,
//         price: `Ksh ${parseFloat(product.price).toFixed(2)}`,
//         image: imageUrl,
//         category: categoryName || categoryMap[product.category_id] || 'Uncategorized',
//         stockQuantity: product.stock_quantity,
//         categoryId: product.category_id,
//       };
//     });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-20 text-center">
//           <div className="text-lg">Loading categories...</div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       {/* Header Section */}
//       <section className="container mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
//             Explore Our Categories
//           </h1>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Discover organic products tailored to your wellness needs across various categories
//           </p>
//         </div>

//         {/* Search Bar */}
//         <div className="max-w-md mx-auto mb-8">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//             <Input
//               type="search"
//               placeholder="Search products across categories..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Categories Sections */}
//       <section className="container mx-auto px-4 py-12">
//         {filteredCategories.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-lg text-muted-foreground">
//               {searchTerm ? 'No products found matching your search.' : 'No categories available at the moment.'}
//             </p>
//             <Button onClick={() => navigate("/")} className="mt-4">
//               Back to Home
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-16">
//             {filteredCategories.map((category) => (
//               <div key={category.id} className="animate-fade-in">
//                 <div className="flex items-center justify-between mb-8">
//                   <div>
//                     <h2 className="text-3xl font-heading font-bold text-foreground">
//                       {category.name}
//                     </h2>
//                     <p className="text-muted-foreground">
//                       {category.products.length} {category.products.length === 1 ? 'product' : 'products'} available
//                     </p>
//                   </div>
//                   {category.products.length > 4 && (
//                     <Button variant="outline" onClick={() => navigate(`/products/${encodeURIComponent((categoryMap[category.id] || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''))}`)}>
//                       View All
//                     </Button>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {transformedProducts(category.products.slice(0, 8), category.name).map((product) => (
//                     <div key={product.id} className="h-full">
//                       <ProductCard {...product} />
//                     </div>
//                   ))}
//                 </div>
//                 {category.products.length > 8 && (
//                   <div className="text-center mt-8">
//                     <Button onClick={() => navigate(`/products/${encodeURIComponent((categoryMap[category.id] || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''))}`)}>
//                       View More in {category.name}
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default CategoriesPage;
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
  data: { products: Product[] };
}

interface CategoryGroup {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

// Hardcoded so slugs are always stable and match your router paths exactly
const CATEGORY_SLUG_MAP: Record<string, string> = {
  "fc0ef0fa-db5d-4a32-b051-c90d0cabf525": "supplements",
  "261b45ec-a4c0-4e44-92b9-9ad4c2ca1515": "skin-care",
  "6ec176fc-cac4-40ee-b1d1-249e396632a8": "mens-health",
  "f9d5401f-a4f8-46f0-a0f0-2f409287d44a": "female-care",
  "fa289cf9-629d-43fd-ad24-16dc5d5dc363": "weight-management",
  "c424a6ed-d2bf-496c-bac9-e1b7ec189233": "organic-herbs",
  "360c510f-8b36-43c0-89bf-81c96a0ea885": "pure-honey",
  "d31bcff6-34c8-48d9-a6c4-621d3867436d": "clearance",
};

const getPlaceholderImage = (name: string) =>
  `https://via.placeholder.com/300x300/4F46E5/white?text=${encodeURIComponent(
    name.replace(/\s+/g, "-").toLowerCase()
  )}`;

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

const ShimmerSection = () => (
  <div className="animate-pulse">
    {/* Category title shimmer */}
    <div className="flex items-center justify-between mb-8">
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded w-64" />
        <div className="h-4 bg-muted rounded w-32" />
      </div>
      <div className="h-9 bg-muted rounded w-24" />
    </div>
    {/* Cards shimmer */}
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <ShimmerCard key={i} />
      ))}
    </div>
  </div>
);
// ─────────────────────────────────────────────────────────────────────────────

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category names from API
        const nameMap: Record<string, string> = {};
        const catRes = await fetch(
          "https://bloom-backend-2.onrender.com/api/v1/categories"
        );
        if (catRes.ok) {
          const catData = await catRes.json();
          if (catData.success && catData.data?.categories) {
            catData.data.categories.forEach((cat: { category_id: string; name: string }) => {
              nameMap[cat.category_id] = cat.name;
            });
          }
        }

        // Fetch all products
        const prodRes = await fetch(
          "https://bloom-backend-2.onrender.com/api/v1/products?page=1&limit=200&search=&category="
        );
        if (!prodRes.ok) throw new Error("Failed to fetch products");
        const data: ApiResponse = await prodRes.json();

        if (data.success && data.data?.products) {
          // Group active products by category
          const grouped: Record<string, Product[]> = {};
          data.data.products
            .filter((p) => p.is_active)
            .forEach((product) => {
              const catId = product.category_id;
              if (!grouped[catId]) grouped[catId] = [];
              grouped[catId].push(product);
            });

          // Sort products within each category newest first
          Object.values(grouped).forEach((prods) =>
            prods.sort(
              (a, b) =>
                new Date(b.created_at || 0).getTime() -
                new Date(a.created_at || 0).getTime()
            )
          );

          // Build CategoryGroup array
          const groups: CategoryGroup[] = Object.entries(grouped).map(
            ([id, products]) => ({
              id,
              name: nameMap[id] || "Other",
              slug: CATEGORY_SLUG_MAP[id] || id,
              products,
            })
          );

          // Sort: most products first, clearance always last
          groups.sort((a, b) => {
            if (a.id === "d31bcff6-34c8-48d9-a6c4-621d3867436d") return 1;
            if (b.id === "d31bcff6-34c8-48d9-a6c4-621d3867436d") return -1;
            return b.products.length - a.products.length;
          });

          setCategories(groups);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      products: searchTerm
        ? cat.products.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : cat.products,
    }))
    .filter((cat) => cat.products.length > 0);

  const transformProduct = (product: Product, categoryName: string) => {
    let imageUrl = getPlaceholderImage(product.name);
    if (product.images?.length) {
      const primary =
        product.images.find((img) => img.is_primary) || product.images[0];
      imageUrl = primary.image_url;
    }
    return {
      id: product.product_id,
      name: product.name,
      price: `Ksh ${parseFloat(String(product.price)).toFixed(2)}`,
      image: imageUrl,
      category: categoryName,
      stockQuantity: product.stock_quantity,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Page heading ── */}
      <section className="container mx-auto px-4 pt-12 pb-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
            Explore Our Categories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover organic products tailored to your wellness needs
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
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

      {/* ── Category sections ── */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          // Show 3 shimmer sections while loading
          <div className="space-y-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <ShimmerSection key={i} />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-lg text-muted-foreground">
              {searchTerm
                ? "No products found matching your search."
                : "No categories available at the moment."}
            </p>
            {searchTerm ? (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            ) : (
              <Button onClick={() => navigate("/")}>Back to Home</Button>
            )}
          </div>
        ) : (
          <div className="space-y-16">
            {filteredCategories.map((category) => {
              const isHighlighted =
                category.id === "d31bcff6-34c8-48d9-a6c4-621d3867436d";
              const displayProducts = category.products.slice(0, 8);

              return (
                <div key={category.id} className="animate-fade-in">
                  {/* Section header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2
                        className={`text-3xl font-heading font-bold ${
                          isHighlighted ? "text-red-600" : "text-foreground"
                        }`}
                      >
                        {isHighlighted ? "🔥 " : ""}
                        {category.name}
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        {category.products.length}{" "}
                        {category.products.length === 1 ? "product" : "products"} available
                      </p>
                    </div>
                    {category.products.length > 4 && (
                      <Button
                        variant="outline"
                        className={
                          isHighlighted
                            ? "border-red-400 text-red-600 hover:bg-red-50"
                            : ""
                        }
                        onClick={() =>
                          navigate(`/products/${category.slug}`)
                        }
                      >
                        View All
                      </Button>
                    )}
                  </div>

                  {/* Clearance top banner */}
                  {isHighlighted && (
                    <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-3 flex items-center gap-3">
                      <span className="text-red-600 text-sm font-semibold">
                        ⚡ Limited stock — prices slashed for clearance. Grab yours before they're gone.
                      </span>
                    </div>
                  )}

                  {/* Product grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayProducts.map((product) => (
                      <div key={product.product_id} className="h-full animate-fade-in">
                        <ProductCard
                          {...transformProduct(product, category.name)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* View more */}
                  {category.products.length > 8 && (
                    <div className="text-center mt-8">
                      <Button
                        variant="outline"
                        className={
                          isHighlighted
                            ? "border-red-400 text-red-600 hover:bg-red-50"
                            : ""
                        }
                        onClick={() => navigate(`/products/${category.slug}`)}
                      >
                        View All {category.products.length} in {category.name}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default CategoriesPage;