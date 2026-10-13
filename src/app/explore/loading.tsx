import { Skeleton } from "@/components/ui/shadcn/skeleton";

export default function Loading() {
  return (
    <div className="page-skeleton">
      <div className="page-skeleton__grid page-skeleton__grid--3col">
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder grid, never reordered
          <Skeleton key={i} className="page-skeleton__tile" />
        ))}
      </div>
    </div>
  );
}
