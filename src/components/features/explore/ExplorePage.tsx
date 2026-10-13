import { CategoryGrid } from "@/components/features/home/CategoryGrid";
import { ProductRail } from "@/components/features/home/ProductRail";
import { getCategories, getProducts } from "@/packages/data/products";

/**
 * Resolves an open question from the original build plan: /explore was a
 * distinct nav item and route, but its content (the category flyout)
 * already lived only in the header dropdown — nothing rendered at the
 * route itself. Rather than redirect it into /products (which would make
 * "Explore" indistinguishable from "Products" in the nav), this gives it
 * real, distinct content: a category directory plus a taste of what's
 * popular, positioning it as a discovery/browse-by-interest entry point
 * rather than a duplicate of the full filterable catalog.
 */
const ExplorePage = async () => {
  const [categories, popular] = await Promise.all([
    getCategories(),
    getProducts({ sort: "popular", limit: 8 }).then((r) => r.items),
  ]);

  return (
    <div className="explore-page">
      <div className="explore-page__intro section-bleed__inner">
        <p className="explore-page__eyebrow">Explore SixTeal</p>
        <h1 className="explore-page__title">Find What Moves You</h1>
        <p className="explore-page__description">
          Browse by category, or see what everyone's loving right now.
        </p>
      </div>

      <CategoryGrid categories={categories} />

      <ProductRail
        title="Popular Right Now"
        subtitle="A taste of what's trending across every category"
        products={popular}
        viewAllHref="/products"
      />
    </div>
  );
};

export default ExplorePage;
