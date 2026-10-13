import { Skeleton } from "@/components/ui/shadcn/skeleton";

export default function Loading() {
  return (
    <div className="pdp">
      <Skeleton className="page-skeleton__breadcrumb" />
      <div className="pdp__layout">
        <Skeleton className="page-skeleton__pdp-image" />
        <div className="page-skeleton__pdp-info">
          <Skeleton className="page-skeleton__line page-skeleton__line--wide" />
          <Skeleton className="page-skeleton__line page-skeleton__line--narrow" />
          <Skeleton className="page-skeleton__line page-skeleton__line--medium" />
          <Skeleton className="page-skeleton__block" />
        </div>
      </div>
    </div>
  );
}
