import { Skeleton } from "@/components/ui/shadcn/skeleton";

type PageSkeletonProps = {
  /** Two-column layout (content + summary), as used by cart/checkout. */
  withSidebar?: boolean;
};

/**
 * Placeholder shown while a page is loading, and while a page that depends
 * on browser-persisted state (cart, wishlist, orders) waits for the client
 * to mount — so it never flashes an empty state at someone who has items.
 */
const PageSkeleton = ({ withSidebar = true }: PageSkeletonProps) => (
  <div className="page-skeleton" aria-busy="true" aria-live="polite">
    <Skeleton className="page-skeleton__hero page-skeleton__hero--short" />
    {withSidebar ? (
      <div className="page-skeleton__layout">
        <Skeleton className="page-skeleton__panel" />
        <Skeleton className="page-skeleton__sidebar" />
      </div>
    ) : (
      <Skeleton className="page-skeleton__panel" />
    )}
  </div>
);

export default PageSkeleton;
