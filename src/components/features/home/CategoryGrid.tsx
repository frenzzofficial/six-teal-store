import Link from "next/link";
import { CategoryTile } from "@/components/features/product/CategoryTile";
import { Icon } from "@/components/ui";
import { imagesConfig } from "@/packages/configs/images.config";
import type { ImageProps } from "@/types/app";
import type { Category } from "@/types/product";

const TAGLINES: Record<string, string> = {
  fashion: "Style for every you",
  tech: "Innovation in your hands",
  literature: "Ideas for a better tomorrow",
  fragrance: "Scents that stay",
  accessories: "The little things matter",
  wellness: "A healthier, happier you",
};

type CategoryGridProps = {
  categories: Category[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="home-section">
      <div className="home-rail__header">
        <div>
          <h2 className="home-section__title">Explore by Category</h2>
          <p className="home-section__subtitle">Find what moves you</p>
        </div>
        <Link href="/products" className="home-rail__view-all">
          View All Categories
          <Icon name="arrow-right" />
        </Link>
      </div>
      <div className="category-grid">
        {categories.map((category, index) => (
          <CategoryTile
            key={category.slug}
            category={category}
            tagline={TAGLINES[category.slug]}
            image={imagesConfig.categoryImages[index] as unknown as ImageProps}
            size="lg"
          />
        ))}
      </div>
    </section>
  );
}
