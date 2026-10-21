import type { Metadata } from "next";
import { ContentHero } from "@/components/features/content/ContentHero";
import { InfoCard } from "@/components/features/content/InfoCard";
import { Icon, Link } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Six Teal is a curated online store for fashion, tech, literature, fragrance, accessories and wellness.",
};

const VALUES = [
  {
    icon: "sparkles",
    title: "Curated, not crowded",
    text: "We would rather stock a few things we believe in than everything under the sun. Each product earns its place.",
  },
  {
    icon: "shield",
    title: "Quality you can trust",
    text: "We look at materials, build and reviews before anything reaches the shelf, so you spend less time second-guessing.",
  },
  {
    icon: "truck",
    title: "Honest delivery",
    text: "Clear shipping costs, free delivery above a simple threshold, and no surprises at checkout.",
  },
  {
    icon: "heart-pulse",
    title: "Mindful by design",
    text: "From wellness picks to the way we package, we try to make everyday choices a little kinder.",
  },
] as const;

const CATEGORIES = [
  { icon: "shirt", title: "Fashion", text: "Wardrobe staples built to last." },
  { icon: "cpu", title: "Tech", text: "Everyday gadgets that just work." },
  { icon: "book-open", title: "Literature", text: "Books worth finishing." },
  {
    icon: "sparkles",
    title: "Fragrance",
    text: "Scents with a signature.",
  },
  { icon: "watch", title: "Accessories", text: "The little details." },
  {
    icon: "heart-pulse",
    title: "Wellness",
    text: "Small rituals for a better day.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <ContentHero
        eyebrow="About Six Teal"
        title="A calmer, better-curated way to shop."
        lead="Six Teal brings fashion, tech, books, fragrance, accessories and wellness together in one considered store — so finding something you will actually love feels easy."
      />

      <div className="content-page">
        <section className="content-section">
          <h2 className="content-section__title">What we stand for</h2>
          <p className="content-section__subtitle">
            Four ideas guide every decision we make.
          </p>
          <div className="content-grid content-grid--4">
            {VALUES.map((v) => (
              <InfoCard key={v.title} {...v} />
            ))}
          </div>
        </section>

        <section className="content-section">
          <h2 className="content-section__title">Six categories, one store</h2>
          <p className="content-section__subtitle">
            Explore by what moves you.
          </p>
          <div className="content-grid content-grid--3">
            {CATEGORIES.map((c) => (
              <InfoCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="content-card">
            <h2 className="content-section__title">Ready to take a look?</h2>
            <p className="content-card__text">
              Browse the full collection, or see what everyone is loving right
              now.
            </p>
            <div className="home-hero__actions">
              <Link href="/products" variant="primary-button">
                Shop all products
                <Icon name="arrow-right" size={18} />
              </Link>
              <Link href="/contact" variant="secondary-button">
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
