import type { PaymentMethodId } from "./order";
import type { CategorySlug } from "./product";

/**
 * dashboard.d.ts
 * --------------------------------------------------------------
 * The shapes the owner dashboard works with. They describe what a real admin API would
 * return, so moving from the mock data layer (packages/data/dashboard.mock.ts) to API
 * calls only changes the bodies in packages/services/dashboard.services.ts.
 */

export type DashboardOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type DashboardPaymentStatus = "paid" | "due";

export interface DashboardOrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface DashboardOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: PaymentMethodId;
  paymentStatus: DashboardPaymentStatus;
  status: DashboardOrderStatus;
  items: DashboardOrderItem[];
  shipping: number;
  total: number;
}

export interface DashboardOrderQuery {
  status?: DashboardOrderStatus | "all";
  search?: string;
  page?: number;
  limit?: number;
}

export type DashboardOrderCounts = Record<DashboardOrderStatus | "all", number>;

export interface DashboardProduct {
  id: string;
  name: string;
  sku: string;
  category: CategorySlug;
  categoryName: string;
  price: number;
  stock: number;
  visible: boolean;
}

export type StockLevel = "in-stock" | "low" | "out";

export interface DashboardProductQuery {
  category?: CategorySlug | "all";
  search?: string;
  page?: number;
  limit?: number;
}

export interface DashboardProductSummary {
  total: number;
  visible: number;
  hidden: number;
  needsRestock: number;
  categories: number;
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardKpi {
  id: "revenue" | "orders" | "average" | "restock";
  label: string;
  value: number;
  format: "currency" | "number";
  /** Percent change against the previous period; omitted when it has no meaning. */
  change?: number;
  note?: string;
  series: number[];
}

export interface RevenuePoint {
  label: string;
  value: number;
}

export interface StatusSlice {
  status: DashboardOrderStatus;
  count: number;
}

export interface DashboardOverview {
  rangeLabel: string;
  kpis: DashboardKpi[];
  revenue: RevenuePoint[];
  statusBreakdown: StatusSlice[];
  recentOrders: DashboardOrder[];
  lowStock: DashboardProduct[];
}
