"use client";

import NextLink from "next/link";
import { useDashboardQuery } from "@/packages/hooks/useDashboardQuery";
import { getOverview } from "@/packages/services/dashboard.services";
import { formatRelativeTime } from "@/packages/utils/date";
import { formatNumber, formatPrice } from "@/packages/utils/format";
import type { DashboardKpi } from "@/types/dashboard";
import PageHeader from "../shared/PageHeader";
import Sparkline from "../shared/Sparkline";
import { OrderStatusBadge, StockBadge } from "../shared/StatusBadge";
import RevenueChart from "./RevenueChart";
import StatusDonut from "./StatusDonut";

const formatKpi = (kpi: DashboardKpi): string =>
  kpi.format === "currency"
    ? formatPrice(kpi.value)
    : formatNumber(kpi.value, "en-IN");

const Change = ({ value }: { value: number | undefined }) => {
  if (value === undefined) return null;
  const up = value >= 0;
  return (
    <span
      className={`dash-change ${up ? "dash-change--up" : "dash-change--down"}`}
    >
      {up ? "▲" : "▼"} {Math.abs(value).toFixed(1)}%
      <span className="dash-sr-only">
        {" "}
        {up ? "up" : "down"} on the previous period
      </span>
    </span>
  );
};

const OverviewPage = () => {
  const { data, isLoading, error } = useDashboardQuery(getOverview, "overview");

  if (error) return <p className="dash-error">{error}</p>;

  return (
    <>
      <PageHeader
        title="Overview"
        description="How the shop is doing at a glance."
        actions={
          <span className="dash-chip-static">
            {data?.rangeLabel ?? "Last 30 days"}
          </span>
        }
      />

      <div className="dash-kpis" aria-busy={isLoading}>
        {(data?.kpis ?? Array.from({ length: 4 }, () => null)).map((kpi, i) =>
          kpi ? (
            <section key={kpi.id} className="dash-card dash-kpi">
              <span className="dash-kpi__label">{kpi.label}</span>
              <strong className="dash-kpi__value">{formatKpi(kpi)}</strong>
              <span className="dash-kpi__meta">
                <Change value={kpi.change} />
                {kpi.note ? <small>{kpi.note}</small> : null}
              </span>
              <Sparkline values={kpi.series} />
            </section>
          ) : (
            // biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
            <div key={i} className="dash-card dash-kpi dash-skeleton" />
          ),
        )}
      </div>

      <div className="dash-grid-2">
        <section className="dash-card">
          <h2 className="dash-card__title">Revenue</h2>
          {data ? (
            <RevenueChart data={data.revenue} />
          ) : (
            <div className="dash-skeleton dash-skeleton--chart" />
          )}
        </section>
        <section className="dash-card">
          <h2 className="dash-card__title">Orders by status</h2>
          {data ? (
            <StatusDonut slices={data.statusBreakdown} />
          ) : (
            <div className="dash-skeleton dash-skeleton--chart" />
          )}
        </section>
      </div>

      <div className="dash-grid-2 dash-grid-2--wide-left">
        <section className="dash-card dash-card--flush">
          <div className="dash-card__head">
            <h2 className="dash-card__title">Recent orders</h2>
            <NextLink href="/dashboard/orders" className="dash-link">
              View all
            </NextLink>
          </div>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                      <small>
                        {formatRelativeTime(order.createdAt, "en-IN")}
                      </small>
                    </td>
                    <td>{order.customerName}</td>
                    <td className="dash-num">{formatPrice(order.total)}</td>
                    <td>
                      <OrderStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dash-card dash-card--flush">
          <div className="dash-card__head">
            <h2 className="dash-card__title">Needs restocking</h2>
            <NextLink href="/dashboard/products" className="dash-link">
              Manage
            </NextLink>
          </div>
          <ul className="dash-list">
            {data?.lowStock.map((product) => (
              <li key={product.id}>
                <span className="dash-thumb" aria-hidden="true">
                  {product.name.charAt(0)}
                </span>
                <span className="dash-list__text">
                  <strong>{product.name}</strong>
                  <small>{product.stock} left</small>
                </span>
                <StockBadge level={product.stock <= 0 ? "out" : "low"} />
              </li>
            ))}
            {data && data.lowStock.length === 0 ? (
              <li className="dash-empty">Everything is well stocked.</li>
            ) : null}
          </ul>
        </section>
      </div>
    </>
  );
};

export default OverviewPage;
