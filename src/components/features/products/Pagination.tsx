import Link from "next/link";
import { Icon } from "@/components/ui";
import { cn } from "@/packages/utils/cn";
import { withParams } from "@/packages/utils/query-string";

type PaginationProps = {
  page: number;
  totalPages: number;
  searchParams: URLSearchParams;
};

/** Plain server-rendered links, same reasoning as CategoryTabs — the page
 * number is just another URL param. */
export function Pagination({
  page,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (p: number) =>
    `/products${withParams(searchParams, { page: p === 1 ? null : String(p) })}`;

  // Keep it to a handful of page links — first, last, current ± 1 — with
  // a real ellipsis rather than every page number when there are many.
  const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  return (
    <nav className="pagination" aria-label="Pagination">
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={cn(
          "pagination__arrow",
          page === 1 && "pagination__arrow--disabled",
        )}
      >
        <Icon name="chevron-right" className="pagination__prev-icon" />
      </Link>

      {sorted.map((p, i) => (
        <span key={p} className="pagination__item-wrap">
          {i > 0 && p - sorted[i - 1] > 1 && (
            <span className="pagination__ellipsis">…</span>
          )}
          <Link
            href={hrefFor(p)}
            className={cn(
              "pagination__item",
              p === page && "pagination__item--active",
            )}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Link>
        </span>
      ))}

      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={cn(
          "pagination__arrow",
          page === totalPages && "pagination__arrow--disabled",
        )}
      >
        <Icon name="chevron-right" />
      </Link>
    </nav>
  );
}
