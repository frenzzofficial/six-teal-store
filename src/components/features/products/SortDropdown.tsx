"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { withParams } from "@/packages/utils/query-string";
import type { ProductFilters } from "@/types/product";

const OPTIONS: { value: NonNullable<ProductFilters["sort"]>; label: string }[] =
  [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

type SortDropdownProps = {
  value: string;
};

export function SortDropdown({ value }: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <label className="sort-dropdown">
      <span className="sort-dropdown__label">Sort by</span>
      <select
        className="sort-dropdown__select"
        value={value}
        onChange={(e) => {
          const qs = withParams(searchParams, { sort: e.target.value });
          router.push(`/products${qs}`);
        }}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
