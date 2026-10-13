import { CategoryTile } from "@/components/features/product/CategoryTile";
import { Link } from "@/components/ui";
import IconsLibrary from "@/components/ui/icon/IconsLibrary";
import type { Category } from "@/types/product";

const HERO_TAGLINES: Record<string, string> = {
  fashion: "Express Yourself",
  tech: "Stay Connected",
  literature: "Feed your mind",
  fragrance: "Leave an Impression",
  accessories: "Perfect Details",
  wellness: "Nurture yourself",
};

const STATS = [
  { value: "50K+", label: "Happy Customers" },
  { value: "6", label: "Lifestyle Categories" },
  { value: "Premium", label: "Quality Assured" },
];

type HeroProps = {
  categories: Category[];
};

const Hero = ({ categories }: HeroProps) => {
  return (
    <section className="home-hero">
      <div className="home-hero__inner section-bleed__inner">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">
            <IconsLibrary name="sparkles" />
            Six Teal Collection
          </p>
          <h1 className="home-hero__title">Define Your Style</h1>
          <p className="home-hero__description">
            Discover curated collections that speak to every facet of your
            personality. From fashion to wellness, technology to literature —
            express yourself authentically.
          </p>
          <Link href="/products">
            Explore Collections
            <IconsLibrary name="arrow-right" />
          </Link>

          <dl className="home-hero__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="home-hero__stat">
                <dt className="home-hero__stat-value">{stat.value}</dt>
                <dd className="home-hero__stat-label">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="home-hero__tiles">
          {categories.map((category) => (
            <CategoryTile
              key={category.slug}
              category={category}
              tagline={HERO_TAGLINES[category.slug]}
              size="sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
