import type { DashboardOrderStatus, StockLevel } from "@/types/dashboard";

const ORDER_LABELS: Record<DashboardOrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STOCK_LABELS: Record<StockLevel, string> = {
  "in-stock": "In stock",
  low: "Low",
  out: "Out of stock",
};

export const ORDER_STATUS_LABELS = ORDER_LABELS;

export const OrderStatusBadge = ({
  status,
}: {
  status: DashboardOrderStatus;
}) => (
  <span className={`dash-badge dash-badge--${status}`}>
    {ORDER_LABELS[status]}
  </span>
);

export const StockBadge = ({ level }: { level: StockLevel }) => (
  <span className={`dash-badge dash-badge--stock-${level}`}>
    {STOCK_LABELS[level]}
  </span>
);
