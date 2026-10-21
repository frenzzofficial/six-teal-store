import Image from "next/image";
import { Icon, type IconName, Link } from "@/components/ui";
import { imagesConfig } from "@/packages/configs/images.config";

const STATS = [
  { icon: "trending-up", value: "12K+", label: "Saves this week" },
  { icon: "trending-up", value: "48%", label: "More popular than last month" },
];

export function TrendingHero() {
  return (
    <section className="trending-hero relative isolate w-full overflow-hidden">
      {/* Left content */}
      <div className="trending-hero__inner section-bleed__inner relative z-10">
        <div className="trending-hero__content">
          <p className="trending-hero__eyebrow">Trending now</p>

          <h1 className="trending-hero__title">
            What's Inspiring <span>Everyone</span>
          </h1>

          <p className="trending-hero__description">
            Discover products, styles and ideas people are loving right now.
            Stay ahead with handpicked trends, updated weekly.
          </p>

          <Link href="#trending-grid" variant="primary-button">
            Explore Trends
            <Icon name="arrow-right" size={18} />
          </Link>

          <dl className="trending-hero__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="trending-hero__stat">
                <Icon name={stat.icon as IconName} />

                <div>
                  <dt className="trending-hero__stat-value">{stat.value}</dt>
                  <dd className="trending-hero__stat-label">{stat.label}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Full-height image on the right */}
      <div className="trending-hero__media pointer-events-none absolute inset-y-0 right-0 w-full md:w-[58%]">
        <Image
          src={imagesConfig.images.sixtealTrendingHero.src}
          alt={imagesConfig.images.sixtealTrendingHero.alt}
          fill
          priority
          sizes="(min-width: 768px) 58vw, 100vw"
          className="trending-hero__image"
        />
      </div>
    </section>
  );
}
