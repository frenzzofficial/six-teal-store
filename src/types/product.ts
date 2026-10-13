/**
 * product.ts
 * --------------------------------------------------------------
 * Domain types for the catalog. This is the shape every page, component,
 * and data-access function (src/packages/data/products.ts) agrees on —
 * change a field here and TypeScript will point at every call site that
 * needs updating.
 */

/** Matches navigationConfig.explore's category slugs exactly (query param
 * values like `/products?category=fashion`), so nav links, filters, and
 * product data all speak the same category identifiers. */
export type CategorySlug =
  | "fashion"
  | "tech"
  | "literature"
  | "fragrance"
  | "accessories"
  | "wellness";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** LucideLibrary icon key — matches navigationConfig.explore's icons. */
  icon: string;
}

/** Small merchandising callouts shown as a corner badge on ProductCard —
 * "Best Seller", "Trending", "New", etc. in the Figma product grids. */
export type ProductBadge =
  | "best-seller"
  | "trending"
  | "new"
  | "hot-pick"
  | "popular";

export interface ProductVariantOption {
  /** e.g. "Size", "Color" */
  name: string;
  values: string[];
}

export interface ProductRating {
  average: number;
  count: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  brand: string;
  /** Current selling price, in the site's base currency (₹, whole rupees —
   * matches every price shown across the Figma screens, no paise). */
  price: number;
  /** Present only when the product is discounted — enables the "X% OFF" /
   * strike-through price treatment shown on cart and product cards. */
  compareAtPrice?: number;
  rating: ProductRating;
  badge?: ProductBadge;
  description: string;
  /** Path under /public, or a remote URL once a real backend/CDN exists.
   * Optional — ProductCard falls back to a category placeholder when a
   * product has no dedicated photo yet (most of the mock catalog doesn't,
   * see products.mock.ts). */
  image?: string;
  variants?: ProductVariantOption[];
  inStock: boolean;
  /** Units actually available — when set, cart quantity is capped to it
   * (see cart.store.ts). Optional so products can still exist without a
   * tracked count (inStock alone still gates add-to-cart in that case). */
  stockCount?: number;
  /** Whether the discount shown is temporary — controls "Deals" filtering
   * (navigationConfig footer links to /products?filter=deals). */
  onSale?: boolean;
  tags?: string[];
}

export interface ProductFilters {
  category?: CategorySlug;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  minRating?: number;
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  sort?: "popular" | "newest" | "price-asc" | "price-desc" | "rating";
  page?: number;
  limit?: number;
}

export interface ProductListResult {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
