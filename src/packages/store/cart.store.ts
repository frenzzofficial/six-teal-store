import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type Coupon,
  couponDiscountAmount,
  validateCoupon,
} from "@/packages/data/coupons";
import type { CartItem, CartTotals } from "@/types/cart";
import type { Product } from "@/types/product";

/**
 * cart.store.ts
 * --------------------------------------------------------------
 * Global cart state, persisted to localStorage so a refresh doesn't
 * empty someone's cart. Lines are keyed by product + selected variants —
 * the same product with a different size/color is a separate line.
 *
 * Quantities are clamped to each line's `maxQuantity` (a snapshot of the
 * product's stock at add-to-cart time, see types/cart.ts) wherever the
 * quantity can change — addItem, setQuantity, and the merge-into-existing
 * path when adding an already-in-cart product again.
 */

function lineKey(
  productId: string,
  selectedVariants?: Record<string, string>,
): string {
  if (!selectedVariants) return productId;
  const sorted = Object.entries(selectedVariants).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  return `${productId}::${sorted.map(([k, v]) => `${k}=${v}`).join(",")}`;
}

function clamp(quantity: number, max?: number): number {
  return max !== undefined ? Math.min(quantity, max) : quantity;
}

/** Free above this subtotal, flat fee below it — matches the "Free
 * Shipping on orders above ₹999" trust badge shown on the Products/Cart
 * Figma screens. */
const FREE_SHIPPING_THRESHOLD = 999;
const FLAT_SHIPPING_FEE = 79;
/** Simplified flat-rate GST stand-in — a real integration would vary
 * this by product category/HSN code. */
const TAX_RATE = 0.05;

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  couponError: string | null;
  addItem: (
    product: Product,
    quantity?: number,
    selectedVariants?: Record<string, string>,
  ) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  totals: () => CartTotals;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      couponError: null,

      addItem: (product, quantity = 1, selectedVariants) => {
        const id = lineKey(product.id, selectedVariants);
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id
                  ? {
                      ...i,
                      quantity: clamp(i.quantity + quantity, i.maxQuantity),
                    }
                  : i,
              ),
            };
          }
          const newItem: CartItem = {
            id,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            category: product.category,
            image: product.image,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            quantity: clamp(quantity, product.stockCount),
            maxQuantity: product.stockCount,
            selectedVariants,
          };
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      setQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id
                    ? { ...i, quantity: clamp(quantity, i.maxQuantity) }
                    : i,
                ),
        })),

      clear: () => set({ items: [], coupon: null, couponError: null }),

      applyCoupon: (code) => {
        const subtotal = get().items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );
        const result = validateCoupon(code, subtotal);
        if (result.ok) {
          set({ coupon: result.coupon, couponError: null });
        } else {
          set({ couponError: result.reason });
        }
      },

      removeCoupon: () => set({ coupon: null, couponError: null }),

      totals: () => {
        const { items, coupon } = get();
        const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
        const subtotal = items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );
        const discount = items.reduce((sum, i) => {
          if (!i.compareAtPrice) return sum;
          return sum + (i.compareAtPrice - i.price) * i.quantity;
        }, 0);
        const couponDiscount = coupon
          ? couponDiscountAmount(coupon, subtotal)
          : 0;
        const taxable = Math.max(0, subtotal - couponDiscount);
        const tax = items.length > 0 ? Math.round(taxable * TAX_RATE) : 0;
        const shipping =
          items.length === 0
            ? 0
            : subtotal >= FREE_SHIPPING_THRESHOLD
              ? 0
              : FLAT_SHIPPING_FEE;
        return {
          itemCount,
          subtotal,
          discount,
          couponDiscount,
          couponCode: coupon?.code,
          tax,
          shipping,
          total: subtotal - couponDiscount + tax + shipping,
        };
      },
    }),
    { name: "sixteal-cart" },
  ),
);
