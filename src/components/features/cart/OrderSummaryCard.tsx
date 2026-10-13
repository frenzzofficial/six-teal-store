"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui";
import { useCartStore } from "@/packages/store/cart.store";
import { cn } from "@/packages/utils/cn";
import { formatPrice } from "@/packages/utils/format";
import type { CartTotals } from "@/types/cart";

const PAYMENT_METHODS = ["Google Pay", "Apple Pay", "Paytm"];

type OrderSummaryCardProps = {
  totals: CartTotals;
  checkoutHref?: string;
  /** Cart page (the only place you're not already mid-checkout) shows
   * the full card — CTA, coupon field, payment badges, savings banner.
   * The shipping/payment steps reuse the same component for just the
   * totals, since re-applying a coupon or repeating "Proceed to
   * Checkout" mid-flow would be confusing. */
  showCheckoutCta?: boolean;
};

/**
 * Reused as-is by the checkout flow (see the build plan) — takes totals
 * and nothing cart-specific, so it works from any page that has a
 * CartTotals to show. Payment methods are shown as plain labels rather
 * than the actual Google Pay/Apple Pay/Paytm mark artwork (trademarked,
 * not ours to reproduce) — real integration would replace this block
 * entirely once a payment provider is wired up.
 */
export function OrderSummaryCard({
  totals,
  checkoutHref = "/checkout/shipping",
  showCheckoutCta = true,
}: OrderSummaryCardProps) {
  const coupon = useCartStore((s) => s.coupon);
  const couponError = useCartStore((s) => s.couponError);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const [couponInput, setCouponInput] = useState("");

  const savingsPercent =
    totals.subtotal > 0
      ? Math.round(
          ((totals.discount + totals.couponDiscount) / totals.subtotal) * 100,
        )
      : 0;
  const totalSavings = totals.discount + totals.couponDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput("");
  };

  return (
    <div className="order-summary">
      <h2 className="order-summary__title">Order Summary</h2>

      <dl className="order-summary__rows">
        <div className="order-summary__row">
          <dt>Subtotal ({totals.itemCount} items)</dt>
          <dd>{formatPrice(totals.subtotal)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className="order-summary__row order-summary__row--discount">
            <dt>Discount</dt>
            <dd>− {formatPrice(totals.discount)}</dd>
          </div>
        )}
        {totals.couponDiscount > 0 && (
          <div className="order-summary__row order-summary__row--discount">
            <dt>Coupon ({totals.couponCode})</dt>
            <dd>− {formatPrice(totals.couponDiscount)}</dd>
          </div>
        )}
        <div className="order-summary__row">
          <dt>Tax (GST)</dt>
          <dd>{formatPrice(totals.tax)}</dd>
        </div>
        <div className="order-summary__row">
          <dt>
            Shipping
            <Icon name="circle-check" className="order-summary__info-icon" />
          </dt>
          <dd>
            {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
          </dd>
        </div>
      </dl>

      {showCheckoutCta && (
        <form className="order-summary__coupon" onSubmit={handleApplyCoupon}>
          {coupon ? (
            <div className="order-summary__coupon-applied">
              <Icon name="circle-check" />
              <span>
                <strong>{coupon.code}</strong> applied
              </span>
              <button type="button" onClick={removeCoupon}>
                Remove
              </button>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon code"
                className="order-summary__coupon-input"
              />
              <button type="submit" className="order-summary__coupon-btn">
                Apply
              </button>
            </>
          )}
          {couponError && (
            <p className="order-summary__coupon-error">{couponError}</p>
          )}
        </form>
      )}

      <div className="order-summary__total-row">
        <div>
          <p className="order-summary__total-label">Total</p>
          {totalSavings > 0 && (
            <p className="order-summary__savings">
              You're saving {formatPrice(totalSavings)} ({savingsPercent}%)
            </p>
          )}
        </div>
        <p className="order-summary__total-value">
          {formatPrice(totals.total)}
        </p>
      </div>

      {showCheckoutCta && (
        <>
          <Link
            href={checkoutHref}
            className={cn("order-summary__checkout-btn")}
            aria-disabled={totals.itemCount === 0}
          >
            Proceed to Checkout
            <Icon name="arrow-right" />
          </Link>

          <p className="order-summary__or">or continue with</p>
          <div className="order-summary__payments">
            {PAYMENT_METHODS.map((method) => (
              <span key={method} className="order-summary__payment-badge">
                {method}
              </span>
            ))}
          </div>
        </>
      )}

      {totalSavings > 0 && (
        <div className="order-summary__banner">
          <Icon name="sparkles" />
          <div>
            <p className="order-summary__banner-title">
              You're saving {formatPrice(totalSavings)}!
            </p>
            <p className="order-summary__banner-subtitle">
              Great choices! These products are worth it.
            </p>
          </div>
        </div>
      )}

      <p className="order-summary__confidence">
        <Icon name="lock" />
        <span>
          <strong>Shop with Confidence</strong>
          <br />
          Your information is 100% secure
        </span>
      </p>
    </div>
  );
}
