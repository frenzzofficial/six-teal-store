import {
  categoryNames,
  DAY_MS,
  HISTORY_DAYS,
  LOW_STOCK_THRESHOLD,
  orderStore,
  productState,
} from "@/packages/data/dashboard.mock";
import { products } from "@/packages/data/products.mock";
import type {
  DashboardKpi,
  DashboardOrder,
  DashboardOrderCounts,
  DashboardOrderQuery,
  DashboardOrderStatus,
  DashboardOverview,
  DashboardProduct,
  DashboardProductQuery,
  DashboardProductSummary,
  Paged,
  StockLevel,
} from "@/types/dashboard";

// ============================================================
// Dashboard services
// ------------------------------------------------------------
// The only place the dashboard reads or writes shop data. Today every function works on the
// in-memory sample data; when the admin API exists, only the BODIES change (an apiClient
// call instead of a filter over the mock lists). Signatures and return shapes stay the same,
// and every function is already async, so no component has to change.
// ============================================================

const paginate = <T>(all: T[], page = 1, limit = 10): Paged<T> => {
  const totalPages = Math.max(1, Math.ceil(all.length / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;
  return {
    items: all.slice(start, start + limit),
    total: all.length,
    page: safePage,
    limit,
    totalPages,
  };
};

export const getStockLevel = (stock: number): StockLevel => {
  if (stock <= 0) return "out";
  return stock <= LOW_STOCK_THRESHOLD ? "low" : "in-stock";
};

// ── Orders ─────────────────────────────────────────────────

const countOrders = (): DashboardOrderCounts => {
  const counts: DashboardOrderCounts = {
    all: orderStore.length,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };
  for (const order of orderStore) counts[order.status] += 1;
  return counts;
};

export const getOrderCounts = async (): Promise<DashboardOrderCounts> =>
  countOrders();

export const listOrders = async (
  query: DashboardOrderQuery = {},
): Promise<Paged<DashboardOrder>> => {
  const { status = "all", search, page, limit = 8 } = query;
  const q = search?.trim().toLowerCase();

  const matches = orderStore.filter((order) => {
    if (status !== "all" && order.status !== status) return false;
    if (!q) return true;
    return (
      order.id.toLowerCase().includes(q) ||
      order.customerName.toLowerCase().includes(q) ||
      order.city.toLowerCase().includes(q)
    );
  });

  return paginate(matches, page, limit);
};

/** Moves orders to a new status. Cash-on-delivery orders count as paid once delivered. */
export const updateOrderStatus = async (
  ids: string[],
  status: DashboardOrderStatus,
): Promise<void> => {
  for (const order of orderStore) {
    if (!ids.includes(order.id)) continue;
    order.status = status;
    if (status === "delivered") order.paymentStatus = "paid";
  }
};

// ── Products ───────────────────────────────────────────────

const toDashboardProduct = (id: string): DashboardProduct | null => {
  const product = products.find((p) => p.id === id);
  const state = productState.get(id);
  if (!product || !state) return null;

  return {
    id: product.id,
    name: product.name,
    sku: `ST-${product.id.replace(/^p-/, "").slice(0, 4).toUpperCase()}${product.id.length}`,
    category: product.category,
    categoryName: categoryNames.get(product.category) ?? product.category,
    price: product.price,
    stock: state.stock,
    visible: state.visible,
  };
};

const allProducts = (): DashboardProduct[] =>
  products
    .map((p) => toDashboardProduct(p.id))
    .filter((p): p is DashboardProduct => p !== null);

export const getProductSummary = async (): Promise<DashboardProductSummary> => {
  const list = allProducts();
  return {
    total: list.length,
    visible: list.filter((p) => p.visible).length,
    hidden: list.filter((p) => !p.visible).length,
    needsRestock: list.filter((p) => getStockLevel(p.stock) !== "in-stock")
      .length,
    categories: categoryNames.size,
  };
};

export const listProducts = async (
  query: DashboardProductQuery = {},
): Promise<Paged<DashboardProduct>> => {
  const { category = "all", search, page, limit = 8 } = query;
  const q = search?.trim().toLowerCase();

  const matches = allProducts().filter((product) => {
    if (category !== "all" && product.category !== category) return false;
    if (!q) return true;
    return (
      product.name.toLowerCase().includes(q) ||
      product.sku.toLowerCase().includes(q)
    );
  });

  return paginate(matches, page, limit);
};

export const setProductVisibility = async (
  id: string,
  visible: boolean,
): Promise<void> => {
  const state = productState.get(id);
  if (state) state.visible = visible;
};

// ── Overview ───────────────────────────────────────────────

const dayKey = (date: Date): string => date.toISOString().slice(0, 10);

const percentChange = (
  current: number,
  previous: number,
): number | undefined =>
  previous > 0 ? ((current - previous) / previous) * 100 : undefined;

export const getOverview = async (): Promise<DashboardOverview> => {
  const now = Date.now();
  const live = orderStore.filter((o) => o.status !== "cancelled");

  // One bucket per day for the last 30 days, oldest first.
  const days = Array.from({ length: HISTORY_DAYS }, (_, i) => {
    const date = new Date(now - (HISTORY_DAYS - 1 - i) * DAY_MS);
    return { key: dayKey(date), date, revenue: 0, orders: 0 };
  });
  const byDay = new Map(days.map((d) => [d.key, d]));

  for (const order of live) {
    const bucket = byDay.get(dayKey(new Date(order.createdAt)));
    if (!bucket) continue;
    bucket.revenue += order.total;
    bucket.orders += 1;
  }

  const half = HISTORY_DAYS / 2;
  const sum = (list: number[]) => list.reduce((a, b) => a + b, 0);
  const revenueSeries = days.map((d) => d.revenue);
  const orderSeries = days.map((d) => d.orders);
  const revenueNow = sum(revenueSeries.slice(half));
  const revenuePrev = sum(revenueSeries.slice(0, half));
  const ordersNow = sum(orderSeries.slice(half));
  const ordersPrev = sum(orderSeries.slice(0, half));

  const totalRevenue = sum(revenueSeries);
  const totalOrders = sum(orderSeries);
  const lowStock = allProducts()
    .filter((p) => getStockLevel(p.stock) !== "in-stock")
    .sort((a, b) => a.stock - b.stock);

  const kpis: DashboardKpi[] = [
    {
      id: "revenue",
      label: "Revenue",
      value: totalRevenue,
      format: "currency",
      change: percentChange(revenueNow, revenuePrev),
      series: revenueSeries,
    },
    {
      id: "orders",
      label: "Orders",
      value: totalOrders,
      format: "number",
      change: percentChange(ordersNow, ordersPrev),
      series: orderSeries,
    },
    {
      id: "average",
      label: "Average order",
      value: totalOrders ? Math.round(totalRevenue / totalOrders) : 0,
      format: "currency",
      series: days.map((d) => (d.orders ? d.revenue / d.orders : 0)),
    },
    {
      id: "restock",
      label: "Needs restocking",
      value: lowStock.length,
      format: "number",
      note: "Low or out of stock",
      series: [],
    },
  ];

  const counts = countOrders();

  return {
    rangeLabel: `Last ${HISTORY_DAYS} days`,
    kpis,
    revenue: days.map((d) => ({
      label: d.date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      value: d.revenue,
    })),
    statusBreakdown: (
      ["delivered", "shipped", "processing", "pending", "cancelled"] as const
    ).map((status) => ({ status, count: counts[status] })),
    recentOrders: orderStore.slice(0, 6),
    lowStock: lowStock.slice(0, 5),
  };
};
