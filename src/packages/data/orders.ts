import type { CartItem, CartTotals } from "@/types/cart";
import type {
  Order,
  PaymentMethodId,
  PaymentMethodOption,
  ShippingAddress,
} from "@/types/order";

/**
 * orders.ts
 * --------------------------------------------------------------
 * Same "mock now, swap later" contract as packages/data/products.ts —
 * the checkout flow calls createOrder() rather than building an Order
 * object inline, so when a real order-creation endpoint exists, only
 * this function's body changes (sync → an awaited network call); nothing
 * that calls it needs to.
 */

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: "card",
    name: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: "credit-card",
  },
  {
    id: "upi",
    name: "UPI",
    description: "Google Pay, PhonePe, Paytm",
    icon: "smartphone",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "truck",
  },
];

function generateOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ST-${stamp}-${random}`;
}

const DELIVERY_WINDOW_DAYS = 5;

export function createOrder(input: {
  items: CartItem[];
  totals: CartTotals;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodId;
}): Order {
  const createdAt = new Date();
  const estimatedDeliveryAt = new Date(createdAt);
  estimatedDeliveryAt.setDate(
    estimatedDeliveryAt.getDate() + DELIVERY_WINDOW_DAYS,
  );

  return {
    id: generateOrderId(),
    items: input.items,
    totals: input.totals,
    shippingAddress: input.shippingAddress,
    paymentMethod: input.paymentMethod,
    status: "confirmed",
    createdAt: createdAt.toISOString(),
    estimatedDeliveryAt: estimatedDeliveryAt.toISOString(),
  };
}
