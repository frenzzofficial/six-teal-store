import Link from "next/link";
import { ProductCard } from "@/components/features/product/ProductCard";
import { ProductDetailInteractive } from "@/components/features/products/ProductDetailInteractive";
import { Icon } from "@/components/ui";
import type { Product } from "@/types/product";

type ProductDetailPageProps = {
  product: Product;
  related: Product[];
};

/**
 * No Figma reference exists for the PDP (see the build plan's open
 * questions) — this is designed directly against the existing design
 * system (tokens, ProductCard, RatingStars, Button variants) rather than
 * from a mockup. Worth a design pass once one exists.
 */
export function ProductDetailPage({
  product,
  related,
}: ProductDetailPageProps) {
  const categoryLabel =
    product.category[0].toUpperCase() + product.category.slice(1);

  return (
    <div className="pdp">
      <nav className="pdp__breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <Icon name="chevron-right" />
        <Link href={`/products?category=${product.category}`}>
          {categoryLabel}
        </Link>
        <Icon name="chevron-right" />
        <span aria-current="page">{product.name}</span>
      </nav>

      <ProductDetailInteractive product={product} />

      {related.length > 0 && (
        <section className="pdp-related">
          <h2 className="home-section__title">You Might Also Like</h2>
          <p className="home-section__subtitle">
            More picks from the Six Teal collection.
          </p>
          <div className="pdp-related__grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
