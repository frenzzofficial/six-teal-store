/**
 * coupons.ts
 * --------------------------------------------------------------
 * Mock coupon catalog — same "mock now, swap later" contract as the rest
 * of packages/data/: a real backend would validate/apply coupons
 * server-side (so people can't read the discount logic out of client
 * JS), but the shape callers use (validateCoupon(code) -> result) stays
 * the same either way.
 */
type CouponType = "percent" | "flat";

export interface Coupon {
  code: string;
  type: CouponType;
  value: number;
  description: string;
  minSubtotal?: number;
}

const COUPONS: Coupon[] = [
  {
    code: "WELCOME10",
    type: "percent",
    value: 10,
    description: "10% off your order",
  },
  {
    code: "FLAT200",
    type: "flat",
    value: 200,
    description: "₹200 off orders above ₹1,999",
    minSubtotal: 1999,
  },
];

export type CouponValidation =
  | { ok: true; coupon: Coupon }
  | { ok: false; reason: string };

export function validateCoupon(
  code: string,
  subtotal: number,
): CouponValidation {
  const coupon = COUPONS.find(
    (c) => c.code.toLowerCase() === code.trim().toLowerCase(),
  );
  if (!coupon) return { ok: false, reason: "That coupon code isn't valid." };
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      ok: false,
      reason: `Add ₹${coupon.minSubtotal - subtotal} more to use this coupon.`,
    };
  }
  return { ok: true, coupon };
}

export function couponDiscountAmount(coupon: Coupon, subtotal: number): number {
  if (coupon.type === "percent") {
    return Math.round((subtotal * coupon.value) / 100);
  }
  return Math.min(coupon.value, subtotal);
}
