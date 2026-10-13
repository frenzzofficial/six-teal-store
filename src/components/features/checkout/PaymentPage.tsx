"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { OrderSummaryCard } from "@/components/features/cart/OrderSummaryCard";
import { CheckoutStepper } from "@/components/features/checkout/CheckoutStepper";
import { Button, Icon, type IconName } from "@/components/ui";
import { createOrder, PAYMENT_METHODS } from "@/packages/data/orders";
import { useCartStore } from "@/packages/store/cart.store";
import { useCheckoutStore } from "@/packages/store/checkout.store";
import { useOrdersStore } from "@/packages/store/orders.store";
import { cn } from "@/packages/utils/cn";
import type { PaymentMethodId } from "@/types/order";

export function PaymentPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totals = useCartStore((s) => s.totals());
  const clearCart = useCartStore((s) => s.clear);

  const shippingAddress = useCheckoutStore((s) => s.shippingAddress);
  const savedMethod = useCheckoutStore((s) => s.paymentMethod);
  const setPaymentMethod = useCheckoutStore((s) => s.setPaymentMethod);
  const setLastOrder = useCheckoutStore((s) => s.setLastOrder);
  const addOrder = useOrdersStore((s) => s.addOrder);

  const [selected, setSelected] = useState<PaymentMethodId>(
    savedMethod ?? "upi",
  );
  const [placing, setPlacing] = useState(false);
  // clearCart() below makes items.length hit 0 on the way to the
  // confirmation page — without this flag, the redirect effect below
  // would see the empty cart and bounce back to /cart instead, racing
  // against the navigation to confirmation.
  const orderPlaced = useRef(false);

  // Can't pay for an empty cart, and can't skip straight to payment
  // without an address on file.
  useEffect(() => {
    if (orderPlaced.current) return;
    if (items.length === 0) router.replace("/cart");
    else if (!shippingAddress) router.replace("/checkout/shipping");
  }, [items.length, shippingAddress, router]);

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === selected);

  const handlePlaceOrder = async () => {
    if (!shippingAddress) return;
    setPlacing(true);
    // No payment provider wired up yet — simulate processing time so the
    // loading state is real, then create the (mock) order.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setPaymentMethod(selected);
    const order = createOrder({
      items,
      totals,
      shippingAddress,
      paymentMethod: selected,
    });
    setLastOrder(order);
    addOrder(order);
    orderPlaced.current = true;
    clearCart();
    router.push("/checkout/confirmation");
  };

  // shippingAddress is only ever cleared by reset() on the confirmation
  // page, never here — checking it alone (unconditionally) lets
  // TypeScript narrow it to non-null for the rest of this component.
  if (!shippingAddress) return null;
  if (items.length === 0 && !orderPlaced.current) return null;

  return (
    <div className="checkout-page">
      <div className="checkout-page__inner section-bleed__inner">
        <Link href="/checkout/shipping" className="checkout-page__back">
          <Icon name="chevron-right" className="checkout-page__back-icon" />
          Back to Shipping
        </Link>

        <CheckoutStepper current="payment" />

        <div className="checkout-page__layout">
          <div className="checkout-panel">
            <h1 className="checkout-panel__title">Payment Method</h1>

            <div className="checkout-panel__address-preview">
              <p className="checkout-panel__address-label">Shipping to</p>
              <p className="checkout-panel__address-value">
                {shippingAddress.fullName} · {shippingAddress.line1},{" "}
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.pincode}
              </p>
              <Link
                href="/checkout/shipping"
                className="checkout-panel__address-edit"
              >
                Edit
              </Link>
            </div>

            <div
              className="payment-options"
              role="radiogroup"
              aria-label="Payment method"
            >
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={cn(
                    "payment-option",
                    selected === method.id && "payment-option--active",
                  )}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selected === method.id}
                    onChange={() => setSelected(method.id)}
                    className="payment-option__input"
                  />
                  <Icon name={method.icon as IconName} />
                  <span>
                    <span className="payment-option__name">{method.name}</span>
                    <span className="payment-option__description">
                      {method.description}
                    </span>
                  </span>
                  <span className="payment-option__radio" aria-hidden="true" />
                </label>
              ))}
            </div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing
                ? "Placing Order…"
                : `Place Order via ${selectedMethod?.name ?? "selected method"}`}
            </Button>
            <p className="checkout-panel__note">
              No payment provider is connected yet — this simulates order
              placement so the flow works end to end.
            </p>
          </div>

          <div className="checkout-page__summary">
            <OrderSummaryCard totals={totals} showCheckoutCta={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
