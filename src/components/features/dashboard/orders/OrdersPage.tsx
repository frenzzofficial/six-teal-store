"use client";

import { useState } from "react";
import { useDashboardQuery } from "@/packages/hooks/useDashboardQuery";
import {
  getOrderCounts,
  listOrders,
  updateOrderStatus,
} from "@/packages/services/dashboard.services";
import { formatRelativeTime } from "@/packages/utils/date";
import { formatPrice } from "@/packages/utils/format";
import type {
  DashboardOrderQuery,
  DashboardOrderStatus,
} from "@/types/dashboard";
import PageHeader from "../shared/PageHeader";
import Pagination from "../shared/Pagination";
import { OrderStatusBadge } from "../shared/StatusBadge";
import OrderDetail from "./OrderDetail";

type Tab = DashboardOrderStatus | "all";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

const PAGE_SIZE = 8;

const OrdersPage = () => {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const query: DashboardOrderQuery = {
    status: tab,
    search,
    page,
    limit: PAGE_SIZE,
  };
  const orders = useDashboardQuery(
    () => listOrders(query),
    JSON.stringify(query),
  );
  const counts = useDashboardQuery(getOrderCounts, "order-counts");

  const items = orders.data?.items ?? [];
  const active = items.find((o) => o.id === activeId) ?? items[0] ?? null;
  const allSelected =
    items.length > 0 && items.every((o) => selected.includes(o.id));

  const resetView = () => {
    setPage(1);
    setSelected([]);
  };

  const apply = async (ids: string[], status: DashboardOrderStatus) => {
    setBusy(true);
    await updateOrderStatus(ids, status);
    setSelected([]);
    orders.refetch();
    counts.refetch();
    setBusy(false);
  };

  const toggle = (id: string) =>
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );

  return (
    <>
      <PageHeader
        title="Orders"
        description="Pack, ship and track every order in one place."
      />

      <div className="dash-tabs" role="tablist" aria-label="Order status">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className="dash-tab"
            onClick={() => {
              setTab(t.id);
              resetView();
            }}
          >
            {t.label}
            <span className="dash-tab__count">
              {counts.data?.[t.id] ?? "–"}
            </span>
          </button>
        ))}
      </div>

      <div className="dash-split">
        <section className="dash-card dash-card--flush">
          <div className="dash-toolbar">
            <label className="dash-search">
              <span className="dash-sr-only">Search orders</span>
              <input
                type="search"
                placeholder="Search by order number, customer or city"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetView();
                }}
              />
            </label>
          </div>

          {selected.length > 0 ? (
            <output className="dash-bulk">
              <strong>{selected.length} selected</strong>
              <button
                type="button"
                className="dash-btn dash-btn--sm"
                disabled={busy}
                onClick={() => apply(selected, "processing")}
              >
                Mark as processing
              </button>
              <button
                type="button"
                className="dash-btn dash-btn--sm"
                disabled={busy}
                onClick={() => apply(selected, "shipped")}
              >
                Mark as shipped
              </button>
              <button
                type="button"
                className="dash-bulk__clear"
                onClick={() => setSelected([])}
              >
                Clear
              </button>
            </output>
          ) : null}

          <div className="dash-table-wrap">
            <table className="dash-table dash-table--orders">
              <thead>
                <tr>
                  <th scope="col" className="dash-table__check">
                    <input
                      type="checkbox"
                      aria-label="Select all orders on this page"
                      checked={allSelected}
                      onChange={() =>
                        setSelected(allSelected ? [] : items.map((o) => o.id))
                      }
                    />
                  </th>
                  <th scope="col">Order</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((order) => (
                  <tr
                    key={order.id}
                    className={
                      order.id === active?.id ? "is-active" : undefined
                    }
                  >
                    <td className="dash-table__check">
                      <input
                        type="checkbox"
                        aria-label={`Select order ${order.id}`}
                        checked={selected.includes(order.id)}
                        onChange={() => toggle(order.id)}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="dash-rowlink"
                        onClick={() => setActiveId(order.id)}
                      >
                        <strong>{order.id}</strong>
                        <small>
                          {formatRelativeTime(order.createdAt, "en-IN")}
                        </small>
                      </button>
                    </td>
                    <td>
                      {order.customerName}
                      <small>{order.city}</small>
                    </td>
                    <td>
                      <span
                        className={`dash-pay dash-pay--${order.paymentStatus}`}
                      >
                        {order.paymentMethod.toUpperCase()} ·{" "}
                        {order.paymentStatus === "paid" ? "paid" : "due"}
                      </span>
                    </td>
                    <td className="dash-num">{formatPrice(order.total)}</td>
                    <td>
                      <OrderStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.data && items.length === 0 ? (
              <p className="dash-empty">No orders match this view.</p>
            ) : null}
          </div>

          {orders.data ? (
            <Pagination
              page={orders.data.page}
              totalPages={orders.data.totalPages}
              total={orders.data.total}
              limit={orders.data.limit}
              noun="orders"
              onChange={(next) => {
                setPage(next);
                setSelected([]);
              }}
            />
          ) : null}
        </section>

        {active ? (
          <OrderDetail
            order={active}
            busy={busy}
            onStatus={(status) => apply([active.id], status)}
          />
        ) : (
          <div className="dash-card dash-skeleton dash-skeleton--detail" />
        )}
      </div>
    </>
  );
};

export default OrdersPage;
