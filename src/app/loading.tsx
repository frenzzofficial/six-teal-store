"use client";

import { Skeleton } from "@/components/ui/shadcn/skeleton";

const Loading = () => {
  return (
    <div className="page-skeleton">
      <Skeleton className="page-skeleton__hero" />
      <div className="page-skeleton__grid">
        {Array.from({ length: 6 }).map((icon, i) => (
          <Skeleton
            key={`icon-${icon}${i * 5}`}
            className="page-skeleton__card"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
