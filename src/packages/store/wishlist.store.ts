import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * wishlist.store.ts
 * --------------------------------------------------------------
 * Backs the heart icon on every ProductCard across Home, Products,
 * Trending, and Cart. Stores product ids only, not full product
 * snapshots — unlike the cart, a wishlisted item should reflect the
 * product's current price/availability when the wishlist page is built,
 * not a stale copy from when it was added.
 */
interface WishlistState {
  ids: string[];
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],

      has: (productId) => get().ids.includes(productId),

      toggle: (productId) =>
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        })),

      remove: (productId) =>
        set((state) => ({
          ids: state.ids.filter((id) => id !== productId),
        })),

      clear: () => set({ ids: [] }),
    }),
    { name: "sixteal-wishlist" },
  ),
);
