import { AppPromo } from "@/components/features/home/AppPromo";
import { CategoryGrid } from "@/components/features/home/CategoryGrid";
import { ProductRail } from "@/components/features/home/ProductRail";
import { Testimonials } from "@/components/features/home/Testimonials";
import { WellnessBanner } from "@/components/features/home/WellnessBanner";
import { NewsletterForm } from "@/components/features/newsletter/NewsletterForm";
import {
  getCategories,
  getFeatured,
  getTrending,
} from "@/packages/data/products";
import Hero from "./Hero";

const HomePage = async () => {
  const [categories, featured, trending] = await Promise.all([
    getCategories(),
    getFeatured(6),
    getTrending(6),
  ]);

  return (
    <div className="home-page">
      <Hero categories={categories} />

      <ProductRail
        title="Featured Collections"
        subtitle="Handpicked collections for a modern lifestyle"
        products={featured}
        viewAllHref="/products"
      />

      <WellnessBanner />

      <ProductRail
        title="Trending Now"
        subtitle="Popular choices, loved by our community"
        products={trending}
        viewAllHref="/trending"
      />

      <CategoryGrid categories={categories} />

      <Testimonials />

      <AppPromo />

      <section className="home-newsletter">
        <div className="home-newsletter__inner section-bleed__inner">
          <div className="home-newsletter__content">
            <p className="home-newsletter__eyebrow">Stay in the loop</p>
            <h2 className="home-newsletter__title">Join Our Community</h2>
            <p className="home-newsletter__description">
              Get the latest collections, trends and exclusive offers straight
              to your inbox.
            </p>
          </div>
          <NewsletterForm className="home-newsletter__form" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
