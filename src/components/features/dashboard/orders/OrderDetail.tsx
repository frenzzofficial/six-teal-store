import { formatDateTime } from "@/packages/utils/date";
import { formatPrice } from "@/packages/utils/format";
import type { DashboardOrder, DashboardOrderStatus } from "@/types/dashboard";
import { OrderStatusBadge } from "../shared/StatusBadge";

const STEPS: Array<{
  status: DashboardOrderStatus;
  label: string;
  hint: string;
}> = [
  { status: "pending", label: "Order placed", hint: "Waiting to be picked up" },
  { status: "processing", label: "Processing", hint: "Being packed" },
  { status: "shipped", label: "Shipped", hint: "On its way to the customer" },
  { status: "delivered", label: "Delivered", hint: "Handed to the customer" },
];

const PAYMENT_LABELS = {
  upi: "UPI",
  card: "Card",
  cod: "Cash on delivery",
} as const;

export const NEXT_STATUS: Partial<
  Record<DashboardOrderStatus, { status: DashboardOrderStatus; label: string }>
> = {
  pending: { status: "processing", label: "Mark as processing" },
  processing: { status: "shipped", label: "Mark as shipped" },
  shipped: { status: "delivered", label: "Mark as delivered" },
};

interface OrderDetailProps {
  order: DashboardOrder;
  busy: boolean;
  onStatus: (status: DashboardOrderStatus) => void;
}

const OrderDetail = ({ order, busy, onStatus }: OrderDetailProps) => {
  const reached = STEPS.findIndex((s) => s.status === order.status);
  const next = NEXT_STATUS[order.status];
  const canCancel = order.status === "pending" || order.status === "processing";
  const subtotal = order.total - order.shipping;

  return (
    <aside className="dash-card dash-detail" aria-label={`Order ${order.id}`}>
      <div className="dash-detail__head">
        <div>
          <h2>{order.id}</h2>
          <small>
            Placed {formatDateTime(order.createdAt, "en-IN")} ·{" "}
            {PAYMENT_LABELS[order.paymentMethod]}
          </small>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {order.status === "cancelled" ? (
        <p className="dash-notice">This order was cancelled.</p>
      ) : (
        <ol className="dash-steps" aria-label="Order progress">
          {STEPS.map((step, i) => {
            const state =
              i < reached ? "done" : i === reached ? "current" : "todo";
            return (
              <li key={step.status} className={`dash-steps__item is-${state}`}>
                <span className="dash-steps__dot" aria-hidden="true">
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span>
                  <strong>{step.label}</strong>
                  <small>{step.hint}</small>
                </span>
              </li>
            );
          })}
        </ol>
      )}

      <section className="dash-detail__section">
        <h3>Items</h3>
        <ul className="dash-list dash-list--tight">
          {order.items.map((item) => (
            <li key={item.productId}>
              <span className="dash-thumb" aria-hidden="true">
                {item.name.charAt(0)}
              </span>
              <span className="dash-list__text">
                <strong>{item.name}</strong>
                <small>Qty {item.quantity}</small>
              </span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </li>
          ))}
        </ul>
        <dl className="dash-totals">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>
              {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
            </dd>
          </div>
          <div className="dash-totals__grand">
            <dt>Total</dt>
            <dd>{formatPrice(order.total)}</dd>
          </div>
          <div>
            <dt>Payment</dt>
            <dd>{order.paymentStatus === "paid" ? "Paid" : "To collect"}</dd>
          </div>
        </dl>
      </section>

      <section className="dash-detail__section">
        <h3>Ship to</h3>
        <address className="dash-address">
          <strong>{order.customerName}</strong>
          <span>{order.address}</span>
          <small>
            {order.phone} · {order.customerEmail}
          </small>
        </address>
      </section>

      {next || canCancel ? (
        <div className="dash-detail__actions">
          {next ? (
            <button
              type="button"
              className="dash-btn dash-btn--primary"
              disabled={busy}
              onClick={() => onStatus(next.status)}
            >
              {next.label}
            </button>
          ) : null}
          {canCancel ? (
            <button
              type="button"
              className="dash-btn"
              disabled={busy}
              onClick={() => onStatus("cancelled")}
            >
              Cancel order
            </button>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
};

export default OrderDetail;
