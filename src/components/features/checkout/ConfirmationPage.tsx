"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Icon } from "@/components/ui";
import { PAYMENT_METHODS } from "@/packages/data/orders";
import { useCheckoutStore } from "@/packages/store/checkout.store";
import { formatPrice } from "@/packages/utils/format";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ConfirmationPage() {
  const router = useRouter();
  const order = useCheckoutStore((s) => s.lastOrder);
  const reset = useCheckoutStore((s) => s.reset);

  // No order in the store means someone landed here directly, not via
  // checkout — nothing to confirm, send them somewhere useful instead.
  useEffect(() => {
    if (!order) router.replace("/products");
  }, [order, router]);

  if (!order) return null;

  const paymentLabel = PAYMENT_METHODS.find(
    (m) => m.id === order.paymentMethod,
  )?.name;

  return (
    <div className="confirmation-page">
      <div className="confirmation-page__inner section-bleed__inner">
        <div className="confirmation-page__icon">
          <Icon name="circle-check" />
        </div>
        <p className="confirmation-page__eyebrow">Order confirmed</p>
        <h1 className="confirmation-page__title">Thank you for your order!</h1>
        <p className="confirmation-page__description">
          A confirmation has been placed for order <strong>{order.id}</strong>.
          Estimated delivery by {formatDate(order.estimatedDeliveryAt)}.
        </p>

        <div className="confirmation-page__details">
          <div className="confirmation-page__detail">
            <p className="confirmation-page__detail-label">Shipping to</p>
            <p className="confirmation-page__detail-value">
              {order.shippingAddress.fullName}
              <br />
              {order.shippingAddress.line1}
              {order.shippingAddress.line2
                ? `, ${order.shippingAddress.line2}`
                : ""}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.pincode}
            </p>
          </div>
          <div className="confirmation-page__detail">
            <p className="confirmation-page__detail-label">Payment</p>
            <p className="confirmation-page__detail-value">{paymentLabel}</p>
          </div>
          <div className="confirmation-page__detail">
            <p className="confirmation-page__detail-label">Order total</p>
            <p className="confirmation-page__detail-value confirmation-page__detail-value--total">
              {formatPrice(order.totals.total)}
            </p>
          </div>
        </div>

        <ul className="confirmation-page__items">
          {order.items.map((item) => (
            <li key={item.id} className="confirmation-page__item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="confirmation-page__actions">
          <Link href="/products" onClick={() => reset()}>
            Continue Shopping
            <Icon name="arrow-right" />
          </Link>
          <Link href="/account/orders">View Order History</Link>
        </div>
      </div>
    </div>
  );
}
