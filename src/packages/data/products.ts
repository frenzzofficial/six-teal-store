import type {
  Category,
  Product,
  ProductFilters,
  ProductListResult,
} from "@/types/product";
import { categories, products } from "./products.mock";

/**
 * products.ts
 * --------------------------------------------------------------
 * The only place the rest of the app should read product data from.
 * Pages/components call these functions, never products.mock.ts directly.
 *
 * Right now every function reads the in-memory mock array. When a real
 * backend exists (appConfig.api.base is already wired up for this — see
 * app.config.ts), only the *bodies* of these functions change to fetch
 * over the network — the signatures and return shapes stay the same, so
 * nothing calling them needs to change.
 *
 * All of these are `async` even though the mock implementation is
 * synchronous, so call sites already await them and won't need touching
 * when a real network call replaces the mock read.
 */

export async function getCategories(): Promise<Category[]> {
  return categories;
}

/** Distinct brand names present in the catalog, alphabetized — powers the
 * Products page's brand filter checkboxes without hardcoding a list that
 * could drift from the actual data. */
export async function getBrands(): Promise<string[]> {
  return Array.from(new Set(products.map((p) => p.brand))).sort();
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

/** Resolves wishlist store IDs (or any product ids) into full Product
 * objects, in the same order they were requested — the wishlist store
 * only ever persists ids, never full snapshots (see wishlist.store.ts),
 * so its page needs this to render anything. */
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  const byId = new Map(products.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter((p): p is Product => !!p);
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<ProductListResult> {
  const {
    category,
    search,
    minPrice,
    maxPrice,
    brands,
    minRating,
    inStockOnly,
    onSaleOnly,
    sort = "popular",
    page = 1,
    limit = 12,
  } = filters;

  let items = products.slice();

  if (category) items = items.filter((p) => p.category === category);
  if (search) {
    const q = search.trim().toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q),
    );
  }
  if (minPrice !== undefined) items = items.filter((p) => p.price >= minPrice);
  if (maxPrice !== undefined) items = items.filter((p) => p.price <= maxPrice);
  if (brands?.length) items = items.filter((p) => brands.includes(p.brand));
  if (minRating !== undefined) {
    items = items.filter((p) => p.rating.average >= minRating);
  }
  if (inStockOnly) items = items.filter((p) => p.inStock);
  if (onSaleOnly) items = items.filter((p) => p.onSale);

  switch (sort) {
    case "price-asc":
      items.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      items.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      items.sort((a, b) => b.rating.average - a.rating.average);
      break;
    case "newest":
      // The mock data has no createdAt — approximate with array order
      // reversed (last added = newest) until a real backend supplies it.
      items.reverse();
      break;
    default:
      // "popular" — rating count is the closest signal the mock data has.
      items.sort((a, b) => b.rating.count - a.rating.count);
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;
  const pageItems = items.slice(start, start + limit);

  return { items: pageItems, total, page: safePage, limit, totalPages };
}

/** Homepage "Featured Collections" / cart "You Might Also Like" rails. */
export async function getFeatured(limit = 6): Promise<Product[]> {
  return products.slice(0, limit);
}

/** Homepage/trending "Trending Now" rails — anything carrying a badge. */
export async function getTrending(limit = 6): Promise<Product[]> {
  return products.filter((p) => p.badge).slice(0, limit);
}

/** PDP "You Might Also Like" — same category, excluding the product itself. */
export async function getRelated(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  const current = products.find((p) => p.id === productId);
  if (!current) return products.slice(0, limit);
  const sameCategory = products.filter(
    (p) => p.id !== productId && p.category === current.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  // A category with few products would leave the row short and lopsided —
  // top it up with the best-rated products from elsewhere.
  const fillers = products
    .filter((p) => p.id !== productId && p.category !== current.category)
    .sort((a, b) => b.rating.average - a.rating.average);
  return [...sameCategory, ...fillers].slice(0, limit);
}
