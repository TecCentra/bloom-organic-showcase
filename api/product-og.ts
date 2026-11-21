import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

const SITE_ORIGIN = "https://organicbloom.co.ke";
const PRODUCTS_API_URL =
  "https://bloom-backend-zzcv.onrender.com/api/v1/products?page=1&limit=200&search=&category=";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/logo.jpeg`;
const INOSITOL_SKUS: Record<string, string> = {
  "france-shgrace-myo-d-chiro-inositol": "MYOD",
  "france-shgrace-myo-d-chiro-inositol-3-bottles": "FMD002",
  "france-shgrace-myo-d-chiro-inositol-6-bottles": "FMD4",
};

interface ProductImage {
  image_url?: string;
  is_primary?: boolean | number;
}

interface Product {
  product_id: string;
  sku?: string;
  name: string;
  description?: string;
  image_url?: string;
  images?: ProductImage[];
}

interface ProductListResponse {
  success?: boolean;
  data?: {
    products?: Product[];
  };
}

type ProductMetadataRequest = IncomingMessage & {
  query: Record<string, string | string[] | undefined>;
};

let indexHtmlPromise: Promise<string> | undefined;

function getIndexHtml(): Promise<string> {
  if (!indexHtmlPromise) {
    indexHtmlPromise = readFile(resolve(process.cwd(), "dist", "index.html"), "utf8");
  }
  return indexHtmlPromise;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#39;");
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function decodeHtmlEntities(value: string): string {
  const entities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x[\da-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/gi, (entity, code: string) => {
    if (code[0] !== "#") return entities[code.toLowerCase()] ?? entity;

    const codePoint = code[1].toLowerCase() === "x"
      ? Number.parseInt(code.slice(2), 16)
      : Number.parseInt(code.slice(1), 10);
    return Number.isInteger(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
      ? String.fromCodePoint(codePoint)
      : entity;
  });
}

function replaceMetaTag(
  html: string,
  attribute: "name" | "property",
  key: string,
  content: string,
): string {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tagPattern = new RegExp(
    `<meta\\s+${attribute}="${escapedKey}"\\s+content="[^"]*"\\s*/?>`,
    "i",
  );
  if (!tagPattern.test(html)) {
    throw new Error(`Base HTML is missing the ${attribute}="${key}" metadata tag.`);
  }
  return html.replace(
    tagPattern,
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
  );
}

function getProductImage(product: Product): string {
  const primaryImage = product.images?.find(
    (image) => image.is_primary === true || image.is_primary === 1,
  );
  const imageUrl = primaryImage?.image_url || product.images?.[0]?.image_url || product.image_url;
  if (!imageUrl) return DEFAULT_IMAGE;

  const absoluteImageUrl = new URL(imageUrl, SITE_ORIGIN);
  if (absoluteImageUrl.protocol !== "http:" && absoluteImageUrl.protocol !== "https:") {
    return DEFAULT_IMAGE;
  }
  return absoluteImageUrl.href;
}

function createProductHtml(template: string, product: Product, productId: string): string {
  const title = `${product.name} | Organic Bloom`;
  const description =
    (product.description &&
      decodeHtmlEntities(product.description.replace(/<[^>]*>/g, " "))
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 300)) ||
    `${product.name} from Organic Bloom.`;
  const imageUrl = getProductImage(product);
  const productUrl = `${SITE_ORIGIN}/product/${encodeURIComponent(productId)}`;

  let html = template.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`,
  );
  html = replaceMetaTag(html, "name", "description", description);
  html = replaceMetaTag(html, "property", "og:title", title);
  html = replaceMetaTag(html, "property", "og:description", description);
  html = replaceMetaTag(html, "property", "og:type", "product");
  html = replaceMetaTag(html, "property", "og:image", imageUrl);
  html = replaceMetaTag(html, "name", "twitter:image", imageUrl);

  const twitterTags =
    `    <meta name="twitter:title" content="${escapeHtml(title)}" />\n` +
    `    <meta name="twitter:description" content="${escapeHtml(description)}" />\n`;
  html = html.replace(/(<meta name="twitter:image")/i, `${twitterTags}    $1`);

  const openGraphUrl = `    <meta property="og:url" content="${escapeHtml(productUrl)}" />\n`;
  return html.replace("</head>", `${openGraphUrl}  </head>`);
}

function sendHtml(response: ServerResponse, statusCode: number, html: string): void {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader(
    "Cache-Control",
    statusCode === 200
      ? "public, s-maxage=300, stale-while-revalidate=600"
      : "no-store",
  );
  response.end(html);
}

export default async function handler(
  request: ProductMetadataRequest,
  response: ServerResponse,
): Promise<void> {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.statusCode = 405;
    response.end("Method not allowed.");
    return;
  }

  let template: string;
  try {
    template = await getIndexHtml();
  } catch (error) {
    console.error("Failed to load the product page HTML template:", error);
    response.statusCode = 500;
    response.end("Product page is temporarily unavailable.");
    return;
  }

  const requestedId = request.query.id;
  if (typeof requestedId !== "string" || !requestedId.trim()) {
    sendHtml(response, 400, template);
    return;
  }

  try {
    const productsResponse = await fetch(PRODUCTS_API_URL);
    if (!productsResponse.ok) {
      throw new Error(`Product API returned HTTP ${productsResponse.status}.`);
    }

    const payload = (await productsResponse.json()) as ProductListResponse;
    if (!payload.success || !Array.isArray(payload.data?.products)) {
      throw new Error("Product API returned an invalid product list.");
    }

    const productId = slugify(requestedId);
    const requestedSku = INOSITOL_SKUS[productId];
    const products = payload.data.products;
    const product =
      products.find((candidate) => requestedSku && candidate.sku === requestedSku) ||
      products.find((candidate) => candidate.product_id === requestedId) ||
      products.find((candidate) => slugify(candidate.name) === productId);

    if (!product) {
      sendHtml(response, 404, template);
      return;
    }

    sendHtml(response, 200, createProductHtml(template, product, requestedId));
  } catch (error) {
    console.error(`Failed to load share metadata for product "${requestedId}":`, error);
    sendHtml(response, 502, template);
  }
}
