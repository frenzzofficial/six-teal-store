import { Skeleton } from "@/components/ui/shadcn/skeleton";

export default function Loading() {
  return (
    <div className="page-skeleton">
      <Skeleton className="page-skeleton__hero" />
      <div className="page-skeleton__layout">
        <Skeleton className="page-skeleton__sidebar" />
        <div className="page-skeleton__grid page-skeleton__grid--4col">
          {Array.from({ length: 12 }).map((icon, i) => (
            <Skeleton
              key={`icon-${icon}-${i * 7}`}
              className="page-skeleton__card"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
