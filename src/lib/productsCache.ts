// lib/productCache.ts
// Module-level cache — survives navigation, resets on full page reload

interface ProductImage {
  image_id: string;
  image_url: string;
  alt_text: string;
  is_primary: number | boolean;
  created_at: string;
  updated_at: string;
  storage_path: string;
}

export interface Product {
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

const API_URL =
  "https://bloom-backend-2.onrender.com/api/v1/products?page=1&limit=200&search=&category=";
const TTL = 5 * 60 * 1000; // 5 minutes

let cache: Product[] | null = null;
let cacheTime = 0;
let inflightRequest: Promise<Product[]> | null = null;

// Call this as early as possible (e.g. main.tsx) to wake Render's free-tier server.
export function warmServer(): void {
  fetch(
    "https://bloom-backend-2.onrender.com/api/v1/products?page=1&limit=1"
  ).catch(() => {});
}

// Returns cached products if still fresh, otherwise fetches.
// Multiple callers that arrive while a fetch is in-flight share the same Promise.
export async function fetchProducts(): Promise<Product[]> {
  if (cache && Date.now() - cacheTime < TTL) return cache;

  if (inflightRequest) return inflightRequest;

  inflightRequest = (async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && data.data?.products) {
        cache = data.data.products as Product[];
        cacheTime = Date.now();
        return cache;
      }
      return cache ?? [];
    } finally {
      inflightRequest = null;
    }
  })();

  return inflightRequest;
}

// Call this if you ever need to bust the cache (e.g. after an admin action).
export function bustCache(): void {
  cache = null;
  cacheTime = 0;
}