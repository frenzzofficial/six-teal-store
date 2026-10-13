import { NewsletterForm } from "@/components/features/newsletter/NewsletterForm";
import { CategoryTabs } from "@/components/features/product/CategoryTabs";
import { ProductCard } from "@/components/features/product/ProductCard";
import { FilterSidebar } from "@/components/features/products/FilterSidebar";
import { Pagination } from "@/components/features/products/Pagination";
import { ProductsHero } from "@/components/features/products/ProductsHero";
import { SortDropdown } from "@/components/features/products/SortDropdown";
import { TrustBadgeRow } from "@/components/features/products/TrustBadgeRow";
import {
  getBrands,
  getCategories,
  getProducts,
} from "@/packages/data/products";
import type { CategorySlug, ProductFilters } from "@/types/product";

type SearchParamsRecord = Record<string, string | string[] | undefined>;

type ProductsPageProps = {
  searchParams: SearchParamsRecord;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

// Matches the 4-columns-by-3-rows grid shown in figma/products-page.png —
// with 24 mock products total that's exactly two full pages, a clean
// demonstration of pagination without an awkward partial last page.
const PAGE_SIZE = 12;

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const category = first(searchParams.category) as CategorySlug | undefined;
  const sort = (first(searchParams.sort) ?? "popular") as NonNullable<
    ProductFilters["sort"]
  >;
  const page = Number(first(searchParams.page)) || 1;
  const minPriceRaw = first(searchParams.minPrice);
  const maxPriceRaw = first(searchParams.maxPrice);
  const minRatingRaw = first(searchParams.minRating);
  const brands = first(searchParams.brands)?.split(",").filter(Boolean);
  const inStockOnly = first(searchParams.inStockOnly) === "1";
  const onSaleOnly = first(searchParams.onSaleOnly) === "1";

  const [allCategories, allBrands, result] = await Promise.all([
    getCategories(),
    getBrands(),
    getProducts({
      category,
      sort,
      page,
      limit: PAGE_SIZE,
      minPrice: minPriceRaw ? Number(minPriceRaw) : undefined,
      maxPrice: maxPriceRaw ? Number(maxPriceRaw) : undefined,
      brands,
      minRating: minRatingRaw ? Number(minRatingRaw) : undefined,
      inStockOnly,
      onSaleOnly,
    }),
  ]);

  // CategoryTabs/Pagination are plain server-rendered links — they only
  // need to read and rewrite the query string, so a URLSearchParams built
  // from the raw record is enough; they don't need the parsed/typed
  // filter values above.
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const v of value) urlSearchParams.append(key, v);
    } else if (value) {
      urlSearchParams.set(key, value);
    }
  }

  const activeCategoryLabel = category
    ? (allCategories.find((c) => c.slug === category)?.name ?? "Products")
    : "All Products";

  return (
    <div className="products-page">
      <ProductsHero />

      <div
        id="product-grid"
        className="products-page__tabs-wrap section-bleed__inner"
      >
        <CategoryTabs
          categories={allCategories}
          activeCategory={category}
          searchParams={urlSearchParams}
          basePath="/products"
          allLabel="All Products"
        />
      </div>

      <div className="products-page__layout section-bleed__inner">
        <FilterSidebar categories={allCategories} brands={allBrands} />

        <main className="products-page__main">
          <div className="products-page__toolbar">
            <div>
              <h1 className="products-page__heading">{activeCategoryLabel}</h1>
              <p className="products-page__count">
                Showing {result.items.length} of {result.total} products
              </p>
            </div>
            <SortDropdown value={sort} />
          </div>

          {result.items.length === 0 ? (
            <p className="products-page__empty">
              No products match these filters — try clearing a few.
            </p>
          ) : (
            <div className="products-page__grid">
              {result.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            searchParams={urlSearchParams}
          />
        </main>
      </div>

      <TrustBadgeRow />

      <section className="home-newsletter">
        <div className="home-newsletter__inner section-bleed__inner">
          <div className="home-newsletter__content">
            <p className="home-newsletter__eyebrow">Stay in the loop</p>
            <h2 className="home-newsletter__title">Get Exclusive Offers</h2>
            <p className="home-newsletter__description">
              Subscribe to get updates on new products, trending collections and
              special discounts.
            </p>
          </div>
          <NewsletterForm className="home-newsletter__form" />
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
