/**
 * commerce.config.ts
 * --------------------------------------------------------------
 * Storefront business rules in one place, so the cart maths, the
 * announcement bar, the free-shipping progress meter and the trust badges
 * can never drift out of sync with each other.
 */

/** Orders at or above this subtotal ship free (₹). */
export const FREE_SHIPPING_THRESHOLD = 999;

/** Flat shipping fee charged below the free-shipping threshold (₹). */
export const FLAT_SHIPPING_FEE = 79;

/** Simplified flat-rate GST stand-in — a real integration would vary this
 * by product category/HSN code. */
export const TAX_RATE = 0.05;

/** Days customers have to return an order. */
export const RETURN_WINDOW_DAYS = 7;
