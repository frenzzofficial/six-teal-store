import { Skeleton } from "@/components/ui/shadcn/skeleton";

export default function Loading() {
  return (
    <div className="page-skeleton">
      <Skeleton className="page-skeleton__hero" />
      <div className="page-skeleton__grid">
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder grid, never reordered
          <Skeleton key={i} className="page-skeleton__card" />
        ))}
      </div>
    </div>
  );
}
