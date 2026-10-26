"use client";

import { useState } from "react";
import { categories } from "@/packages/data/products.mock";
import { useDashboardQuery } from "@/packages/hooks/useDashboardQuery";
import {
  getProductSummary,
  getStockLevel,
  listProducts,
  setProductVisibility,
} from "@/packages/services/dashboard.services";
import { formatPrice } from "@/packages/utils/format";
import type { DashboardProductQuery } from "@/types/dashboard";
import type { CategorySlug } from "@/types/product";
import PageHeader from "../shared/PageHeader";
import Pagination from "../shared/Pagination";
import { StockBadge } from "../shared/StatusBadge";

const PAGE_SIZE = 8;

const ProductsPage = () => {
  const [category, setCategory] = useState<CategorySlug | "all">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const query: DashboardProductQuery = {
    category,
    search,
    page,
    limit: PAGE_SIZE,
  };
  const products = useDashboardQuery(
    () => listProducts(query),
    JSON.stringify(query),
  );
  const summary = useDashboardQuery(getProductSummary, "product-summary");

  const toggleVisible = async (id: string, visible: boolean) => {
    await setProductVisibility(id, visible);
    products.refetch();
    summary.refetch();
  };

  const cards = [
    {
      label: "Total products",
      value: summary.data?.total,
      note: `${summary.data?.categories ?? "–"} categories`,
    },
    {
      label: "Visible in store",
      value: summary.data?.visible,
      note: "Customers can see these",
      tone: "good",
    },
    {
      label: "Hidden",
      value: summary.data?.hidden,
      note: "Drafts and paused items",
    },
    {
      label: "Low or out of stock",
      value: summary.data?.needsRestock,
      note: "Needs restocking",
      tone: "warn",
    },
  ];

  return (
    <>
      <PageHeader
        title="Products"
        description="Keep prices, stock and visibility up to date."
        actions={
          <>
            <button type="button" className="dash-btn" disabled>
              Import CSV
            </button>
            <button
              type="button"
              className="dash-btn dash-btn--primary"
              disabled
            >
              + Add product
            </button>
          </>
        }
      />

      <div className="dash-kpis">
        {cards.map((card) => (
          <section key={card.label} className="dash-card dash-kpi">
            <span className="dash-kpi__label">{card.label}</span>
            <strong
              className={`dash-kpi__value${card.tone ? ` dash-kpi__value--${card.tone}` : ""}`}
            >
              {card.value ?? "–"}
            </strong>
            <small>{card.note}</small>
          </section>
        ))}
      </div>

      <section className="dash-card dash-card--flush">
        <div className="dash-toolbar">
          <label className="dash-search">
            <span className="dash-sr-only">Search products</span>
            <input
              type="search"
              placeholder="Search by name or SKU"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </label>
          <fieldset className="dash-chips">
            <legend className="dash-sr-only">Category</legend>
            {[{ slug: "all" as const, name: "All" }, ...categories].map((c) => (
              <button
                key={c.slug}
                type="button"
                className="dash-chip"
                aria-pressed={category === c.slug}
                onClick={() => {
                  setCategory(c.slug);
                  setPage(1);
                }}
              >
                {c.name}
              </button>
            ))}
          </fieldset>
        </div>

        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Visible</th>
              </tr>
            </thead>
            <tbody>
              {products.data?.items.map((product) => (
                <tr key={product.id}>
                  <td>
                    <span className="dash-product">
                      <span className="dash-thumb" aria-hidden="true">
                        {product.name.charAt(0)}
                      </span>
                      <span>
                        <strong>{product.name}</strong>
                        <small>SKU {product.sku}</small>
                      </span>
                    </span>
                  </td>
                  <td>{product.categoryName}</td>
                  <td className="dash-num">{formatPrice(product.price)}</td>
                  <td>
                    <span className="dash-stock">
                      {product.stock}
                      <StockBadge level={getStockLevel(product.stock)} />
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={product.visible}
                      aria-label={`${product.name} visible in store`}
                      className="dash-switch"
                      onClick={() =>
                        toggleVisible(product.id, !product.visible)
                      }
                    >
                      <span />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.data && products.data.items.length === 0 ? (
            <p className="dash-empty">No products match this view.</p>
          ) : null}
        </div>

        {products.data ? (
          <Pagination
            page={products.data.page}
            totalPages={products.data.totalPages}
            total={products.data.total}
            limit={products.data.limit}
            noun="products"
            onChange={setPage}
          />
        ) : null}
      </section>
    </>
  );
};

export default ProductsPage;
