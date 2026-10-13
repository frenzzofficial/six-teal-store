"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui";
import { Slider } from "@/components/ui/shadcn/slider";
import { cn } from "@/packages/utils/cn";
import { formatPrice } from "@/packages/utils/format";
import { parseListParam, withParams } from "@/packages/utils/query-string";
import type { Category } from "@/types/product";

const PRICE_MIN = 0;
const PRICE_MAX = 10000;
const RATING_OPTIONS = [4, 3, 2, 1];

type FilterSidebarProps = {
  categories: Category[];
  brands: string[];
};

/**
 * Every control here reads and writes the URL directly (via
 * useSearchParams/useRouter) rather than local component state that then
 * syncs to the URL — one source of truth, and the filters survive a
 * refresh or a shared link for free. The price slider is the one
 * exception: it tracks a local value while dragging and only pushes to
 * the URL once the drag ends, so the product grid doesn't re-fetch on
 * every pixel of movement.
 */
export function FilterSidebar({ categories, brands }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? undefined;
  const activeBrands = parseListParam(searchParams.get("brands") ?? undefined);
  const activeRating = searchParams.get("minRating");
  const inStockOnly = searchParams.get("inStockOnly") === "1";
  const onSaleOnly = searchParams.get("onSaleOnly") === "1";

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice")) || PRICE_MIN,
    Number(searchParams.get("maxPrice")) || PRICE_MAX,
  ]);

  useEffect(() => {
    setPriceRange([
      Number(searchParams.get("minPrice")) || PRICE_MIN,
      Number(searchParams.get("maxPrice")) || PRICE_MAX,
    ]);
  }, [searchParams]);

  const go = (updates: Record<string, string | string[] | null>) => {
    router.push(`/products${withParams(searchParams, updates)}`);
  };

  const hasActiveFilters =
    activeCategory ||
    activeBrands.length > 0 ||
    activeRating ||
    inStockOnly ||
    onSaleOnly ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice");

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <h2 className="filter-sidebar__title">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            className="filter-sidebar__reset"
            onClick={() => router.push("/products")}
          >
            <Icon name="close" />
            Reset
          </button>
        )}
      </div>

      <div className="filter-sidebar__group">
        <h3 className="filter-sidebar__group-title">Category</h3>
        <div className="filter-sidebar__options">
          {categories.map((category) => (
            <label key={category.slug} className="filter-checkbox">
              <input
                type="checkbox"
                checked={activeCategory === category.slug}
                onChange={(e) =>
                  go({ category: e.target.checked ? category.slug : null })
                }
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-sidebar__group">
        <h3 className="filter-sidebar__group-title">Price Range</h3>
        <Slider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={100}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          onValueCommitted={(value) => {
            const [min, max] = value as [number, number];
            go({
              minPrice: min > PRICE_MIN ? String(min) : null,
              maxPrice: max < PRICE_MAX ? String(max) : null,
            });
          }}
        />
        <div className="filter-sidebar__price-labels">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <div className="filter-sidebar__group">
        <h3 className="filter-sidebar__group-title">Brand</h3>
        <div className="filter-sidebar__options">
          {brands.map((brand) => (
            <label key={brand} className="filter-checkbox">
              <input
                type="checkbox"
                checked={activeBrands.includes(brand)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...activeBrands, brand]
                    : activeBrands.filter((b) => b !== brand);
                  go({ brands: next });
                }}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-sidebar__group">
        <h3 className="filter-sidebar__group-title">Rating</h3>
        <div className="filter-sidebar__options">
          {RATING_OPTIONS.map((r) => (
            <label key={r} className="filter-checkbox">
              <input
                type="checkbox"
                checked={activeRating === String(r)}
                onChange={(e) =>
                  go({ minRating: e.target.checked ? String(r) : null })
                }
              />
              <span className="filter-checkbox__rating">
                {Array.from({ length: 5 }).map((icon, i) => (
                  <Icon
                    key={`icon-${icon}-${i * 57}`}
                    name="star"
                    className={cn(
                      "filter-checkbox__star",
                      i < r && "filter-checkbox__star--filled",
                    )}
                  />
                ))}
                & up
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-sidebar__group">
        <h3 className="filter-sidebar__group-title">Availability</h3>
        <div className="filter-sidebar__options">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) =>
                go({ inStockOnly: e.target.checked ? "1" : null })
              }
            />
            <span>In Stock</span>
          </label>
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={onSaleOnly}
              onChange={(e) =>
                go({ onSaleOnly: e.target.checked ? "1" : null })
              }
            />
            <span>On Sale</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
