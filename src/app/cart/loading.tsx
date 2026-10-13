import { Skeleton } from "@/components/ui/shadcn/skeleton";

export default function Loading() {
  return (
    <div className="page-skeleton">
      <Skeleton className="page-skeleton__hero page-skeleton__hero--short" />
      <div className="page-skeleton__layout">
        <Skeleton className="page-skeleton__panel" />
        <Skeleton className="page-skeleton__sidebar" />
      </div>
    </div>
  );
}
