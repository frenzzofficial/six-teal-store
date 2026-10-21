"use client";

import { Icon, Link } from "@/components/ui";
import { useOrdersStore } from "@/packages/store/orders.store";
import { formatPrice } from "@/packages/utils/format";

const STATUS_LABEL: Record<string, string> = {
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * No auth system exists (deliberately not built yet), so there's no
 * concept of "this user's orders" vs. "everyone's orders" — this simply
 * lists every order placed from this browser, read from the persisted
 * orders.store.ts. Once real accounts exist, this becomes a per-user
 * server query instead; the page itself barely changes.
 */
export function OrdersPage() {
  const orders = useOrdersStore((s) => s.orders);

  return (
    <div className="orders-page section-bleed__inner">
      <div className="orders-page__header">
        <h1 className="orders-page__title">Your Orders</h1>
        <p className="orders-page__count">
          {orders.length} {orders.length === 1 ? "order" : "orders"} placed
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="cart-page__empty">
          <Icon name="package" className="cart-page__empty-icon" />
          <h2 className="cart-page__empty-title">No orders yet</h2>
          <p className="cart-page__empty-description">
            Orders you place will show up here.
          </p>
          <Link href="/products" variant="primary-button">
            Browse Products
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      ) : (
        <ul className="orders-page__list">
          {orders.map((order) => (
            <li key={order.id} className="order-card">
              <div className="order-card__header">
                <div>
                  <p className="order-card__id">{order.id}</p>
                  <p className="order-card__date">
                    Placed {formatDate(order.createdAt)}
                  </p>
                </div>
                <span className="order-card__status">
                  {STATUS_LABEL[order.status]}
                </span>
              </div>
              <p className="order-card__items">
                {order.items.map((i) => i.name).join(", ")}
              </p>
              <div className="order-card__footer">
                <span>
                  {/* {
                    PAYMENT_METHODS.find((m) => m.id === order.paymentMethod)
                      ?.name
                  } */}
                </span>
                <span className="order-card__total">
                  {formatPrice(order.totals.total)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
