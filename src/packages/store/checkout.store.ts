import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Order, PaymentMethodId, ShippingAddress } from "@/types/order";

/**
 * checkout.store.ts
 * --------------------------------------------------------------
 * Carries state across the three checkout routes (/checkout/shipping →
 * /checkout/payment → /checkout/confirmation), same reason cart/wishlist
 * are stores rather than page-local state: the data needs to survive a
 * client-side navigation between separate pages.
 *
 * Persisted to sessionStorage, not localStorage — unlike the cart (which
 * should survive days between visits), an in-progress address and
 * payment selection shouldn't linger indefinitely on a shared or public
 * computer. sessionStorage clears when the tab closes.
 */
interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethodId | null;
  lastOrder: Order | null;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: PaymentMethodId) => void;
  setLastOrder: (order: Order) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shippingAddress: null,
      paymentMethod: null,
      lastOrder: null,

      setShippingAddress: (address) => set({ shippingAddress: address }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setLastOrder: (order) => set({ lastOrder: order }),
      reset: () =>
        set({ shippingAddress: null, paymentMethod: null, lastOrder: null }),
    }),
    {
      name: "sixteal-checkout",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
