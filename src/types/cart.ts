import type { Product } from "./product";

/**
 * cart.ts
 * --------------------------------------------------------------
 * A cart line is a snapshot, not a live reference to a Product — price,
 * name, and image are copied in at add-to-cart time. That's deliberate:
 * if a product's price changes later, items already in someone's cart
 * shouldn't silently reprice out from under them. `productId` is kept
 * only to re-link back to the catalog (e.g. for the "You Might Also
 * Like" rail).
 */
export interface CartItem {
  /** Unique per line, not per product — the same product with a
   * different variant selection (size/color) is a separate line, matching
   * how the Figma cart page lists "Classic White Shirt — Size L, Color
   * White" as one line among others. */
  id: string;
  productId: string;
  slug: string;
  name: string;
  category: string;
  image?: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  /** Snapshot of the product's stock at add-to-cart time — caps the
   * quantity stepper on the cart page without needing to re-fetch the
   * live product. Undefined means untracked/unlimited. */
  maxQuantity?: number;
  /** Selected variant values, e.g. { Size: "L", Color: "White" }. */
  selectedVariants?: Record<string, string>;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  couponCode?: string;
  tax: number;
  shipping: number;
  total: number;
}

export function pickCartItem(
  product: Product,
  selectedVariants?: Record<string, string>,
): Omit<CartItem, "id" | "quantity"> {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    image: product.image,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    maxQuantity: product.stockCount,
    selectedVariants,
  };
}
