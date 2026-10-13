import Link from "next/link";
import { ProductCard } from "@/components/features/product/ProductCard";
import { Icon } from "@/components/ui";
import type { Product } from "@/types/product";

type ProductRailProps = {
  title: string;
  subtitle: string;
  products: Product[];
  viewAllHref: string;
};

export function ProductRail({
  title,
  subtitle,
  products,
  viewAllHref,
}: ProductRailProps) {
  return (
    <section className="home-rail">
      <div className="home-rail__header">
        <div>
          <h2 className="home-section__title">{title}</h2>
          <p className="home-section__subtitle">{subtitle}</p>
        </div>
        <Link href={viewAllHref} className="home-rail__view-all">
          View All
          <Icon name="arrow-right" />
        </Link>
      </div>
      <div className="home-rail__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
