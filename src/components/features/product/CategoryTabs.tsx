import Link from "next/link";
import { Icon, type IconName } from "@/components/ui";
import { cn } from "@/packages/utils/cn";
import { withParams } from "@/packages/utils/query-string";
import type { Category } from "@/types/product";

type CategoryTabsProps = {
  categories: Category[];
  activeCategory?: string;
  searchParams: URLSearchParams;
  /** Which page these tabs navigate within — "/products" or "/trending",
   * both use the same `?category=` filter pattern. */
  basePath: string;
  /** Label for the unfiltered "all" tab — "All Products" vs "All Trends". */
  allLabel: string;
};

/** Plain links with a query-string change — no client JS needed for the
 * tabs themselves, the server just re-renders with the new filter. */
export function CategoryTabs({
  categories,
  activeCategory,
  searchParams,
  basePath,
  allLabel,
}: CategoryTabsProps) {
  return (
    <div className="category-tabs" role="tablist" aria-label="Category">
      <Link
        href={`${basePath}${withParams(searchParams, { category: null })}`}
        className={cn(
          "category-tabs__tab",
          !activeCategory && "category-tabs__tab--active",
        )}
        role="tab"
        aria-selected={!activeCategory}
      >
        <Icon name="grid-small" />
        {allLabel}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`${basePath}${withParams(searchParams, { category: category.slug })}`}
          className={cn(
            "category-tabs__tab",
            activeCategory === category.slug && "category-tabs__tab--active",
          )}
          role="tab"
          aria-selected={activeCategory === category.slug}
        >
          <Icon name={category.icon as IconName} />
          {category.name}
        </Link>
      ))}
    </div>
  );
}
