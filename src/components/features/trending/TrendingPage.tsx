import { ProductRail } from "@/components/features/home/ProductRail";
import { NewsletterForm } from "@/components/features/newsletter/NewsletterForm";
import { CategoryTabs } from "@/components/features/product/CategoryTabs";
import { CategoryTile } from "@/components/features/product/CategoryTile";
import { RisingFast } from "@/components/features/trending/RisingFast";
import { SocialProofBanner } from "@/components/features/trending/SocialProofBanner";
import { TealEditBanner } from "@/components/features/trending/TealEditBanner";
import { TrendingHero } from "@/components/features/trending/TrendingHero";
import { getCategories, getProducts } from "@/packages/data/products";
import type { CategorySlug } from "@/types/product";

type SearchParamsRecord = Record<string, string | string[] | undefined>;

type TrendingPageProps = {
  searchParams: SearchParamsRecord;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const CATEGORY_TAGLINE: Record<string, string> = {
  fashion: "Style for every you",
  tech: "Innovation in your hands",
  literature: "Ideas for a better tomorrow",
  fragrance: "Scents that stay",
  accessories: "The little things matter",
  wellness: "A healthier, happier you",
};

const TrendingPage = async ({ searchParams }: TrendingPageProps) => {
  const category = first(searchParams.category) as CategorySlug | undefined;

  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const v of value) urlSearchParams.append(key, v);
    } else if (value) {
      urlSearchParams.set(key, value);
    }
  }

  const [categories, thisWeek, risingFastPool, mostLoved] = await Promise.all([
    getCategories(),
    getProducts({ category, sort: "popular", limit: 6 }).then((r) => r.items),
    // Rising Fast picks from the whole catalog, not the category filter
    // — it's a distinct cross-category rail in the Figma, not filtered
    // by the tabs above it.
    getProducts({ limit: 24 }).then((r) => r.items),
    getProducts({ category, sort: "rating", limit: 6 }).then((r) => r.items),
  ]);

  return (
    <div className="trending-page">
      <TrendingHero />

      <div
        id="trending-grid"
        className="products-page__tabs-wrap section-bleed__inner"
      >
        <CategoryTabs
          categories={categories}
          activeCategory={category}
          searchParams={urlSearchParams}
          basePath="/trending"
          allLabel="All Trends"
        />
      </div>

      <ProductRail
        title="Trending This Week"
        subtitle="Most popular products right now, loved by our community."
        products={thisWeek}
        viewAllHref="/products"
      />

      <TealEditBanner />

      <RisingFast products={risingFastPool} />

      <SocialProofBanner />

      <section className="home-section">
        <div className="home-rail__header">
          <div>
            <h2 className="home-section__title">Trending by Category</h2>
            <p className="home-section__subtitle">
              Explore what's trending in every lifestyle.
            </p>
          </div>
        </div>
        <div className="trending-category-row">
          {categories.map((c) => (
            <CategoryTile
              key={c.slug}
              category={c}
              tagline={CATEGORY_TAGLINE[c.slug]}
              size="sm"
            />
          ))}
        </div>
      </section>

      <ProductRail
        title="Most Loved This Month"
        subtitle="Customer favorites, month after month."
        products={mostLoved}
        viewAllHref="/products"
      />

      <section className="home-newsletter">
        <div className="home-newsletter__inner section-bleed__inner">
          <div className="home-newsletter__content">
            <p className="home-newsletter__eyebrow">Stay ahead</p>
            <h2 className="home-newsletter__title">Stay Ahead of the Trends</h2>
            <p className="home-newsletter__description">
              Get trending products, exclusive offers and style inspiration —
              straight to your inbox.
            </p>
          </div>
          <NewsletterForm className="home-newsletter__form" />
        </div>
      </section>
    </div>
  );
};

export default TrendingPage;
