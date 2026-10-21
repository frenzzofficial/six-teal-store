import type { CartItem, CartTotals } from "./cart";

/**
 * order.ts
 * --------------------------------------------------------------
 * No backend exists yet, so an "order" is created entirely client-side
 * (see packages/data/orders.ts) rather than fetched — but the shape here
 * is what a real order-creation endpoint would return, so swapping in a
 * real backend later changes how an Order is created, not what one is.
 */

export interface ShippingAddress {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export type PaymentMethodId = "card" | "upi" | "cod";

export interface PaymentMethodOption {
  id: PaymentMethodId;
  name: string;
  description: string;
  icon: string;
}

export type OrderStatus = "confirmed" | "processing" | "shipped" | "delivered";

export interface Order {
  id: string;
  items: CartItem[];
  totals: CartTotals;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodId;
  status: OrderStatus;
  createdAt: string;
  /** Delivery estimate — a fixed offset from createdAt until a real
   * logistics integration can supply a real one. */
  estimatedDeliveryAt: string;
}
