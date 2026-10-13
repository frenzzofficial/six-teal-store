import { cn } from "@/packages/utils/cn";
import { formatCount, formatRating } from "@/packages/utils/format";
import IconsLibrary from "../icon/IconsLibrary";

type RatingStarsProps = {
  average: number;
  count?: number;
  className?: string;
};

/**
 * Read-only rating display — "★★★★★ 4.8 (124)" — used on every
 * ProductCard, the PDP, and testimonials. Renders 5 stars, filled up to
 * `average` (fractional fill via a clipped overlay, not just rounding —
 * a 4.6 average visibly reads as "mostly full 5th star", not identical
 * to a flat 4.5).
 */
export function RatingStars({ average, count, className }: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(5, average));

  return (
    <div className={cn("rating-stars", className)}>
      <span className="rating-stars__icons" aria-hidden="true">
        <span className="rating-stars__icons-track">
          {Array.from({ length: 5 }).map((item, i) => (
            <IconsLibrary
              key={`star-${item}-${i * 5}`}
              name="star"
              className="rating-stars__star rating-stars__star--empty"
            />
          ))}
        </span>
        <span
          className="rating-stars__icons-track rating-stars__icons-track--filled"
          style={{ width: `${(clamped / 5) * 100}%` }}
        >
          {Array.from({ length: 5 }).map((item, i) => (
            <IconsLibrary
              key={`star-${item}-${i * 5}`}
              name="star"
              className="rating-stars__star rating-stars__star--filled"
            />
          ))}
        </span>
      </span>
      <span className="rating-stars__value">
        {formatRating(average)}
        {count !== undefined && (
          <span className="rating-stars__count"> ({formatCount(count)})</span>
        )}
      </span>
    </div>
  );
}
