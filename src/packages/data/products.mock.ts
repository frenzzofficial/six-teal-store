import type { Category, Product } from "@/types/product";

/**
 * products.mock.ts
 * --------------------------------------------------------------
 * Stand-in catalog data. Every product/price/rating here is taken
 * directly from figma/homepage.png, products-page.png, trending-page.png,
 * and cart-desktop.png — not invented — so pages built against this
 * dataset already match the designs. A handful of extra items per
 * category (noted below) were added to make filtering/pagination
 * meaningful; those follow the same price/rating ranges as the real ones
 * but aren't pulled from a specific screen.
 *
 * Nothing outside src/packages/data/ should import this file directly —
 * go through products.ts's functions instead (see that file's header).
 */

export const categories: Category[] = [
  { slug: "fashion", name: "Fashion", icon: "shirt" },
  { slug: "tech", name: "Tech", icon: "cpu" },
  { slug: "literature", name: "Literature", icon: "book-open" },
  { slug: "fragrance", name: "Fragrance", icon: "sparkles" },
  { slug: "accessories", name: "Accessories", icon: "watch" },
  { slug: "wellness", name: "Wellness", icon: "heart-pulse" },
];

export const products: Product[] = [
  // ---- Fashion ----
  {
    id: "p-classic-white-shirt",
    slug: "classic-white-shirt",
    name: "Classic White Shirt",
    category: "fashion",
    brand: "SixTeal",
    price: 2499,
    compareAtPrice: 3499,
    rating: { average: 4.8, count: 124 },
    badge: "best-seller",
    description:
      "A tailored, breathable everyday shirt in crisp white cotton — the wardrobe staple the rest of your outfit builds around.",
    inStock: true,
    stockCount: 4,
    onSale: true,
    variants: [
      { name: "Size", values: ["S", "M", "L", "XL"] },
      { name: "Color", values: ["White", "Black"] },
    ],
  },
  {
    id: "p-urban-sneakers",
    slug: "urban-sneakers",
    name: "Urban Sneakers",
    category: "fashion",
    brand: "Nike",
    price: 3499,
    rating: { average: 4.7, count: 96 },
    badge: "trending",
    description:
      "A low-profile sneaker built for daily wear — cushioned sole, breathable upper, pairs with almost everything.",
    inStock: false,
    stockCount: 0,
    variants: [{ name: "Size", values: ["7", "8", "9", "10", "11"] }],
  },
  {
    id: "p-comfort-hoodie",
    slug: "comfort-hoodie",
    name: "Comfort Hoodie",
    category: "fashion",
    brand: "SixTeal",
    price: 2499,
    rating: { average: 4.6, count: 88 },
    description:
      "Heavyweight brushed-fleece hoodie for cooler days — relaxed fit, kangaroo pocket, holds its shape wash after wash.",
    inStock: true,
    stockCount: 12,
    variants: [
      { name: "Size", values: ["S", "M", "L", "XL"] },
      { name: "Color", values: ["Black", "Teal"] },
    ],
  },
  {
    id: "p-linen-trousers",
    slug: "everyday-linen-trousers",
    name: "Everyday Linen Trousers",
    category: "fashion",
    brand: "SixTeal",
    price: 2199,
    rating: { average: 4.5, count: 54 },
    description:
      "Lightweight linen-blend trousers with a relaxed taper — warm-weather comfort that still looks put together.",
    inStock: true,
    stockCount: 25,
    variants: [{ name: "Size", values: ["28", "30", "32", "34", "36"] }],
  },

  // ---- Tech ----
  {
    id: "p-aerobuds-pro",
    slug: "aerobuds-pro",
    name: "AeroBuds Pro",
    category: "tech",
    brand: "Sony",
    price: 4999,
    compareAtPrice: 6999,
    rating: { average: 4.6, count: 98 },
    description:
      "True-wireless earbuds with active noise cancellation and a 30-hour case battery — all-day sound, no cable.",
    inStock: true,
    stockCount: 3,
    onSale: true,
    variants: [{ name: "Color", values: ["Black", "White"] }],
  },
  {
    id: "p-nova-smartwatch",
    slug: "nova-smartwatch",
    name: "Nova Smartwatch",
    category: "tech",
    brand: "Apple",
    price: 5999,
    rating: { average: 4.8, count: 146 },
    badge: "trending",
    description:
      "Health tracking, notifications, and a battery that lasts days, not hours — a smartwatch that stays out of the way.",
    inStock: true,
    stockCount: 40,
    variants: [{ name: "Color", values: ["Midnight", "Starlight"] }],
  },
  {
    id: "p-mechanical-keyboard",
    slug: "mechanical-keyboard",
    name: "Mechanical Keyboard",
    category: "tech",
    brand: "Sony",
    price: 6499,
    rating: { average: 4.8, count: 112 },
    badge: "trending",
    description:
      "Hot-swappable mechanical keyboard with per-key RGB — built for people who notice the difference in a keystroke.",
    inStock: true,
    stockCount: 15,
  },
  {
    id: "p-usbc-charger",
    slug: "usb-c-fast-charger",
    name: "USB-C Fast Charger",
    category: "tech",
    brand: "Apple",
    price: 1499,
    rating: { average: 4.5, count: 142 },
    description:
      "A compact 65W charger that tops up a phone and laptop from the same port — one brick, one bag.",
    inStock: true,
    stockCount: 8,
  },

  // ---- Literature ----
  {
    id: "p-atomic-habits",
    slug: "atomic-habits",
    name: "Atomic Habits",
    category: "literature",
    brand: "SixTeal",
    price: 599,
    rating: { average: 4.9, count: 321 },
    badge: "hot-pick",
    description:
      "James Clear's bestseller on building good habits and breaking bad ones, one small change at a time.",
    inStock: true,
    stockCount: 30,
  },
  {
    id: "p-gratitude-journal",
    slug: "gratitude-journal",
    name: "Gratitude Journal",
    category: "literature",
    brand: "SixTeal",
    price: 799,
    rating: { average: 4.6, count: 203 },
    description:
      "A guided daily journal for reflection and gratitude — simple prompts, no blank-page anxiety.",
    inStock: true,
    stockCount: 6,
  },
  {
    id: "p-deep-work",
    slug: "deep-work",
    name: "Deep Work",
    category: "literature",
    brand: "SixTeal",
    price: 649,
    rating: { average: 4.7, count: 188 },
    description:
      "Cal Newport's case for focused, distraction-free work in a world that keeps interrupting it.",
    inStock: true,
    stockCount: 18,
  },
  {
    id: "p-almanack-naval",
    slug: "the-almanack-of-naval-ravikant",
    name: "The Almanack of Naval Ravikant",
    category: "literature",
    brand: "SixTeal",
    price: 549,
    rating: { average: 4.8, count: 275 },
    description:
      "A compiled guide to wealth and happiness, drawn from Naval Ravikant's essays and interviews.",
    inStock: true,
    stockCount: 2,
  },

  // ---- Fragrance ----
  {
    id: "p-sixteal-signature",
    slug: "sixteal-signature",
    name: "SixTeal Signature",
    category: "fragrance",
    brand: "SixTeal",
    price: 3499,
    rating: { average: 4.7, count: 210 },
    badge: "trending",
    description:
      "The house fragrance — fresh, green top notes over a warm woody base. Understated, long-lasting.",
    inStock: true,
    stockCount: 22,
    variants: [{ name: "Size", values: ["50ml", "100ml"] }],
  },
  {
    id: "p-aroma-diffuser",
    slug: "aroma-diffuser",
    name: "Aroma Diffuser",
    category: "fragrance",
    brand: "The Ordinary",
    price: 2299,
    rating: { average: 4.6, count: 73 },
    badge: "new",
    description:
      "An ultrasonic diffuser with a soft ambient light — fills a room quietly, no smoke, no flame.",
    inStock: true,
    stockCount: 9,
  },
  {
    id: "p-teal-woods-edp",
    slug: "teal-woods-eau-de-parfum",
    name: "Teal Woods Eau de Parfum",
    category: "fragrance",
    brand: "SixTeal",
    price: 3999,
    rating: { average: 4.5, count: 64 },
    description:
      "Cedar, vetiver, and a touch of citrus — a deeper, more resinous take on the SixTeal signature scent.",
    inStock: true,
    stockCount: 14,
    variants: [{ name: "Size", values: ["50ml", "100ml"] }],
  },
  {
    id: "p-citrus-bloom-cologne",
    slug: "citrus-bloom-cologne",
    name: "Citrus Bloom Cologne",
    category: "fragrance",
    brand: "The Ordinary",
    price: 2799,
    rating: { average: 4.4, count: 41 },
    description:
      "A bright, light-wearing citrus cologne for daytime — bergamot and neroli over clean musk.",
    inStock: true,
    stockCount: 7,
  },

  // ---- Accessories ----
  {
    id: "p-premium-wallet",
    slug: "premium-wallet",
    name: "Premium Wallet",
    category: "accessories",
    brand: "SixTeal",
    price: 1299,
    rating: { average: 4.6, count: 87 },
    badge: "popular",
    description:
      "Full-grain leather bifold wallet that only gets better with age — six card slots, a bill pocket, no bulk.",
    inStock: true,
    stockCount: 11,
    variants: [{ name: "Color", values: ["Brown", "Black"] }],
  },
  {
    id: "p-aviator-sunglasses",
    slug: "aviator-sunglasses",
    name: "Aviator Sunglasses",
    category: "accessories",
    brand: "Ray-Ban",
    price: 1999,
    rating: { average: 4.7, count: 102 },
    description:
      "The classic aviator silhouette with polarized lenses — UV protection that doesn't look like protection.",
    inStock: true,
    stockCount: 26,
  },
  {
    id: "p-minimal-desk-lamp",
    slug: "minimal-desk-lamp",
    name: "Minimal Desk Lamp",
    category: "accessories",
    brand: "SixTeal",
    price: 2299,
    rating: { average: 4.6, count: 75 },
    description:
      "A dimmable LED desk lamp with a slim aluminum arm — warm-to-cool color temperature, USB-C powered.",
    inStock: true,
    stockCount: 5,
  },
  {
    id: "p-woven-leather-belt",
    slug: "woven-leather-belt",
    name: "Woven Leather Belt",
    category: "accessories",
    brand: "SixTeal",
    price: 999,
    rating: { average: 4.5, count: 58 },
    description:
      "A hand-woven leather belt with a matte buckle — dresses up or down depending on what it's paired with.",
    inStock: true,
    stockCount: 19,
    variants: [{ name: "Size", values: ["S", "M", "L", "XL"] }],
  },

  // ---- Wellness ----
  {
    id: "p-yoga-essentials-kit",
    slug: "yoga-essentials-kit",
    name: "Yoga Essentials Kit",
    category: "wellness",
    brand: "SixTeal",
    price: 1899,
    compareAtPrice: 2499,
    rating: { average: 4.8, count: 166 },
    description:
      "Everything to start a home practice — non-slip mat, block, and strap, all in SixTeal teal.",
    inStock: true,
    stockCount: 10,
    onSale: true,
    variants: [{ name: "Color", values: ["Teal", "Charcoal"] }],
  },
  {
    id: "p-adjustable-dumbbells",
    slug: "adjustable-dumbbells",
    name: "Adjustable Dumbbells",
    category: "wellness",
    brand: "SixTeal",
    price: 4999,
    rating: { average: 4.7, count: 89 },
    description:
      "A single pair of dumbbells that dial from 2.5kg to 24kg each — a full rack's range without the rack.",
    inStock: true,
    stockCount: 3,
  },
  {
    id: "p-indoor-plant",
    slug: "indoor-plant",
    name: "Indoor Plant",
    category: "wellness",
    brand: "SixTeal",
    price: 1099,
    rating: { average: 4.8, count: 119 },
    description:
      "A low-maintenance potted plant in a ceramic pot — brings some green into a room without asking much back.",
    inStock: true,
    stockCount: 16,
  },
  {
    id: "p-bamboo-yoga-mat",
    slug: "bamboo-yoga-mat",
    name: "Bamboo Yoga Mat",
    category: "wellness",
    brand: "SixTeal",
    price: 1599,
    rating: { average: 4.6, count: 97 },
    description:
      "A natural bamboo-fiber mat with a cork base — better grip the sweatier it gets, not less.",
    inStock: true,
    stockCount: 20,
  },
];
