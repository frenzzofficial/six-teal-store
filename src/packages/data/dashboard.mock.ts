import type {
  DashboardOrder,
  DashboardOrderItem,
  DashboardOrderStatus,
} from "@/types/dashboard";
import type { PaymentMethodId } from "@/types/order";
import { categories, products } from "./products.mock";

/**
 * dashboard.mock.ts
 * --------------------------------------------------------------
 * Sample shop data for the owner dashboard while there is no backend. Everything is derived
 * from the storefront catalog (products.mock.ts) with a fixed seed, so the numbers are the
 * same on every load. The lists below are module-level state on purpose: an edit made in the
 * dashboard (marking an order shipped, hiding a product) survives navigating between pages
 * until the tab is reloaded, which is what testing the screens needs.
 *
 * Nothing outside src/packages/ should import this file; go through dashboard.services.ts.
 */

export const DAY_MS = 86_400_000;
export const HISTORY_DAYS = 30;

/** Fixed stock overrides so the "needs restocking" views always have something to show. */
const STOCK_OVERRIDES: Record<string, number> = {
  "p-aerobuds-pro": 3,
  "p-nova-smartwatch": 4,
  "p-minimal-desk-lamp": 0,
  "p-woven-leather-belt": 5,
};

export const LOW_STOCK_THRESHOLD = 5;

export interface MockProductState {
  stock: number;
  visible: boolean;
}

/** Hidden by default so the Active/Hidden toggle shows both states. */
const HIDDEN_PRODUCTS = new Set(["p-indoor-plant", "p-almanack-naval"]);

export const productState = new Map<string, MockProductState>(
  products.map((p) => [
    p.id,
    {
      stock: STOCK_OVERRIDES[p.id] ?? p.stockCount ?? (p.inStock ? 20 : 0),
      visible: !HIDDEN_PRODUCTS.has(p.id),
    },
  ]),
);

export const categoryNames = new Map(categories.map((c) => [c.slug, c.name]));

// ── Orders ─────────────────────────────────────────────────

const CUSTOMERS: Array<[name: string, city: string, state: string]> = [
  ["Meera Nair", "Bengaluru", "Karnataka"],
  ["Rohan Das", "Kolkata", "West Bengal"],
  ["Isha Kapoor", "Mumbai", "Maharashtra"],
  ["Vikram Rao", "Hyderabad", "Telangana"],
  ["Sana Khan", "New Delhi", "Delhi"],
  ["Arjun Pillai", "Kochi", "Kerala"],
  ["Neha Joshi", "Pune", "Maharashtra"],
  ["Dev Malhotra", "Jaipur", "Rajasthan"],
  ["Ananya Iyer", "Chennai", "Tamil Nadu"],
  ["Kabir Sethi", "Chandigarh", "Punjab"],
  ["Pooja Menon", "Thiruvananthapuram", "Kerala"],
  ["Aditya Verma", "Lucknow", "Uttar Pradesh"],
];

const STREETS = [
  "14 Lake View Road",
  "7 Park Street",
  "22 Linking Road",
  "5 Jubilee Hills Road",
  "31 Connaught Place",
  "9 MG Road",
  "18 Koregaon Park",
  "3 C-Scheme",
];

const PAYMENTS: PaymentMethodId[] = ["upi", "cod", "card", "upi", "cod"];

/** A small, repeatable pseudo-random generator, so the sample data never changes between loads. */
const createRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 1_664_525 + 1_013_904_223) % 4_294_967_296;
    return state / 4_294_967_296;
  };
};

const statusForAge = (ageDays: number, roll: number): DashboardOrderStatus => {
  if (ageDays < 1) return roll < 0.55 ? "pending" : "processing";
  if (ageDays < 3) return roll < 0.35 ? "processing" : "shipped";
  if (roll < 0.05) return "cancelled";
  return ageDays < 5 && roll < 0.3 ? "shipped" : "delivered";
};

const buildOrders = (): DashboardOrder[] => {
  const random = createRandom(2026);
  const now = Date.now();
  const orders: DashboardOrder[] = [];
  const count = 96;

  for (let i = 0; i < count; i += 1) {
    // Older orders first in the loop; the newest ends up with the highest number.
    const ageDays = ((count - 1 - i) / count) * HISTORY_DAYS;
    const createdAt = new Date(
      now - ageDays * DAY_MS - random() * 3 * 3_600_000,
    );
    const [name, city, state] =
      CUSTOMERS[Math.floor(random() * CUSTOMERS.length)];
    const lineCount = random() < 0.6 ? 1 : 2;
    const items: DashboardOrderItem[] = [];

    for (let l = 0; l < lineCount; l += 1) {
      const product = products[Math.floor(random() * products.length)];
      if (items.some((item) => item.productId === product.id)) continue;
      items.push({
        productId: product.id,
        name: product.name,
        quantity: random() < 0.8 ? 1 : 2,
        price: product.price,
      });
    }

    const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const shipping = subtotal >= 999 ? 0 : 79;
    const status = statusForAge(ageDays, random());
    const paymentMethod = PAYMENTS[Math.floor(random() * PAYMENTS.length)];
    const paid =
      paymentMethod !== "cod" || status === "delivered" || status === "shipped";

    orders.push({
      id: `#ST-${10_385 + i}`,
      createdAt: createdAt.toISOString(),
      customerName: name,
      customerEmail: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: `+91 98${Math.floor(10_000 + random() * 89_999)} ${Math.floor(10_000 + random() * 89_999)}`,
      city,
      address: `${STREETS[Math.floor(random() * STREETS.length)]}, ${city}, ${state}`,
      paymentMethod,
      paymentStatus: paid ? "paid" : "due",
      status,
      items,
      shipping,
      total: subtotal + shipping,
    });
  }

  // Newest first, which is how every order list reads.
  return orders.reverse();
};

export const orderStore: DashboardOrder[] = buildOrders();
