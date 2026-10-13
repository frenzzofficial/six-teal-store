import Link from "next/link";
import { Icon, type IconName } from "@/components/ui";
import { formatPrice } from "@/packages/utils/format";
import type { Product } from "@/types/product";

/**
 * The "↑120% in the last week" callouts are purely decorative flavor for
 * this section — there's no real trend-velocity metric in the data model
 * (and shouldn't be; it'd need real time-series order data, not a static
 * mock catalog). Kept local to this component rather than bolted onto
 * the core Product type.
 */
const TREND_DELTAS: Record<string, string> = {
  "urban-sneakers": "+120%",
  "aroma-diffuser": "+98%",
  "mechanical-keyboard": "+76%",
  "adjustable-dumbbells": "+64%",
  "gratitude-journal": "+52%",
};

const CATEGORY_ICON: Record<Product["category"], string> = {
  fashion: "shirt",
  tech: "cpu",
  literature: "book-open",
  fragrance: "sparkles",
  accessories: "watch",
  wellness: "heart-pulse",
};

type RisingFastProps = {
  products: Product[];
};

export function RisingFast({ products }: RisingFastProps) {
  const items = products.filter((p) => TREND_DELTAS[p.slug]);
  if (items.length === 0) return null;

  return (
    <section className="home-section">
      <div className="home-rail__header">
        <div>
          <h2 className="home-section__title">Rising Fast</h2>
          <p className="home-section__subtitle">
            These products are gaining popularity quickly
          </p>
        </div>
      </div>
      <div className="rising-fast">
        {items.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="rising-fast__card"
          >
            <span className="rising-fast__media" aria-hidden="true">
              <Icon name={CATEGORY_ICON[product.category] as IconName} />
            </span>
            <span className="rising-fast__delta">
              <Icon name="trending-up" />
              {TREND_DELTAS[product.slug]}
            </span>
            <p className="rising-fast__name">{product.name}</p>
            <p className="rising-fast__price">{formatPrice(product.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
