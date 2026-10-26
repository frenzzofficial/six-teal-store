/**
 * format.ts
 * --------------------------------------------------------------
 * Display-formatting helpers for numbers, currency, and text — the
 * "make raw data presentable in JSX" layer. Validation (is this a valid
 * email?) belongs in validators.ts / packages/schemas instead; this file
 * only ever transforms already-valid data for display.
 */

/** e.g. formatNumber(12345.6) -> "12,345.6" */
export const formatNumber = (value: number, locale = "en-US"): string =>
  new Intl.NumberFormat(locale).format(value);

const _FILE_SIZE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

/** e.g. getInitials("") -> "VK" (first letter of the first two words) */
export const getInitials = (fullName: string, maxInitials = 2): string =>
  fullName
    .trim()
    .split(/\s+/)
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

/**
 * format.ts
 * --------------------------------------------------------------
 * Every price across the Figma screens is shown as whole rupees with
 * Indian digit grouping and no decimals — "₹2,499", "₹1,20,000", never
 * "₹2,499.00". `Intl.NumberFormat("en-IN", ...)` gets both the grouping
 * and the currency symbol right in one call; this wraps it so every price
 * in the app is formatted identically.
 */
const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

/** "29% OFF" style badge text from a price and its compare-at price. */
export function discountPercent(price: number, compareAtPrice: number): number {
  if (compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

const ratingFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
});

export function formatRating(average: number): string {
  return ratingFormatter.format(average);
}

const countFormatter = new Intl.NumberFormat("en-IN", { notation: "compact" });

/** "(1.5K)" style review-count formatting for large counts, plain for small. */
export function formatCount(count: number): string {
  return count < 1000 ? String(count) : countFormatter.format(count);
}
