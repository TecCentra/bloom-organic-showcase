// import { useEffect, useState } from "react";
// import ProductCard from "@/components/ProductCard";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const API_BASE = "https://bloom-backend-2.onrender.com/api/v1/products";

// // Add/remove the product IDs you want shown on this page.
// const PRODUCT_IDS = [
//   "ad57f03d-e08c-46b0-91c1-2ebaf789ca96",
//   "93fdee11-b27b-446d-a50e-10bbec4cf2d6",
//   "0f3458e1-f609-4579-bd40-b086e5c46567"
// ];

// interface ApiProduct {
//   product_id: string;
//   name: string;
//   price: number;
//   stock_quantity: number;
//   category_id: string;
// }

// interface ApiImage {
//   image_url: string;
//   is_primary: number;
// }

// interface DisplayProduct {
//   id: string;
//   name: string;
//   price: string;
//   image: string;
//   category: string;
//   stockQuantity: number;
// }

// const fetchProduct = async (id: string): Promise<DisplayProduct | null> => {
//   try {
//     const res = await fetch(`${API_BASE}/${id}`);
//     if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
//     const json = await res.json();

//     const product: ApiProduct = json.data.product;
//     const images: ApiImage[] = json.data.images ?? [];
//     const primaryImage =
//       images.find((img) => img.is_primary === 1)?.image_url ??
//       images[0]?.image_url ??
//       "";

//     return {
//       id: product.product_id,
//       name: product.name,
//       price: `Ksh ${product.price.toFixed(2)}`,
//       image: primaryImage,
//       // No category-name endpoint yet — swap this for a real lookup
//       // (e.g. by product.category_id) once you have one.
//       category: "Organic Herbs",
//       stockQuantity: product.stock_quantity,
//     };
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

// const MacaBoostListPage = () => {
//   const [products, setProducts] = useState<DisplayProduct[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadAll = async () => {
//       setLoading(true);
//       setError(null);

//       const results = await Promise.all(PRODUCT_IDS.map(fetchProduct));
//       const valid = results.filter((p): p is DisplayProduct => p !== null);

//       if (valid.length === 0) {
//         setError("Could not load products. Please try again.");
//       }

//       setProducts(valid);
//       setLoading(false);
//     };

//     loadAll();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[50vh]">
//         <p className="text-muted-foreground">Loading products...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[50vh]">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <Header />
//       <h1 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-8">
//         Maca Boost Coffee — Choose Your Pack
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             id={product.id}
//             name={product.name}
//             price={product.price}
//             image={product.image}
//             category={product.category}
//             stockQuantity={product.stockQuantity}
//           />
//         ))}
//       </div>
//         <Footer />
//     </div>
//   );
// };

// export default MacaBoostListPage;
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API_BASE = "https://bloom-backend-2.onrender.com/api/v1/products";

// Add/remove the product IDs you want shown on this page.
const PRODUCT_IDS = [
 "ad57f03d-e08c-46b0-91c1-2ebaf789ca96",
  "93fdee11-b27b-446d-a50e-10bbec4cf2d6",
  "0f3458e1-f609-4579-bd40-b086e5c46567"
];

interface ApiProduct {
  product_id: string;
  name: string;
  price: number;
  stock_quantity: number;
  category_id: string;
}

interface ApiImage {
  image_url: string;
  is_primary: number;
}

interface DisplayProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  stockQuantity: number;
}

const fetchProduct = async (id: string): Promise<DisplayProduct | null> => {
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
    const json = await res.json();

    const product: ApiProduct = json.data.product;
    const images: ApiImage[] = json.data.images ?? [];
    const primaryImage =
      images.find((img) => img.is_primary === 1)?.image_url ??
      images[0]?.image_url ??
      "";

    return {
      id: product.product_id,
      name: product.name,
      price: `Ksh ${product.price.toFixed(2)}`,
      image: primaryImage,
      // No category-name endpoint yet — swap this for a real lookup
      // (e.g. by product.category_id) once you have one.
      category: "Organic Herbs",
      stockQuantity: product.stock_quantity,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

const MacaBoostListPage = () => {
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      setError(null);

      const results = await Promise.all(PRODUCT_IDS.map(fetchProduct));
      const valid = results.filter((p): p is DisplayProduct => p !== null);

      if (valid.length === 0) {
        setError("Could not load products. Please try again.");
      }

      setProducts(valid);
      setLoading(false);
    };

    loadAll();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="h-8 w-72 bg-muted rounded-md animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_IDS.map((id) => (
            <div
              key={id}
              className="bg-card rounded-xl overflow-hidden border border-border h-full flex flex-col"
            >
              <div className="aspect-square bg-muted animate-pulse" />
              <div className="p-5 flex flex-col flex-grow gap-3">
                <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-5 w-1/2 bg-muted rounded animate-pulse" />
                <div className="mt-auto h-6 w-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
        <Header />
      <h1 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-8">
        Maca Boost Coffee — Choose Your Pack
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            category={product.category}
            stockQuantity={product.stockQuantity}
          />
        ))}
      </div>
        <Footer />
    </div>
  );
};

export default MacaBoostListPage;