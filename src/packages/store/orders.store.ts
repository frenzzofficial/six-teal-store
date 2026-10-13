import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/types/order";

/**
 * orders.store.ts
 * --------------------------------------------------------------
 * Real order history, persisted to localStorage — unlike
 * checkout.store.ts (sessionStorage, cleared when the tab closes,
 * because an in-progress address/payment shouldn't linger), a placed
 * order is a permanent record. Closing the tab or coming back weeks
 * later should still show it. This is what `/account/orders` (not yet
 * built) will read from.
 *
 * Still entirely client-side/mock — there's no backend persisting these
 * server-side, so "permanent" here means "survives across sessions on
 * this browser," not "safe against clearing site data." A real backend
 * would replace this store's body with fetch calls, same pattern as
 * packages/data/products.ts and orders.ts.
 */
interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      // Newest first — most recent order is what people look for.
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),

      getOrder: (id) => get().orders.find((o) => o.id === id),
    }),
    { name: "sixteal-orders" },
  ),
);
