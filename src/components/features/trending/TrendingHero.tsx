import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui";
import { imagesConfig } from "@/packages/configs/images.config";

const STATS = [
  { icon: "trending-up", value: "12K+", label: "Saves this week" },
  { icon: "trending-up", value: "48%", label: "More popular than last month" },
];

export function TrendingHero() {
  return (
    <section className="trending-hero">
      <div className="trending-hero__inner section-bleed__inner">
        <div className="trending-hero__content">
          <p className="trending-hero__eyebrow">Trending now</p>
          <h1 className="trending-hero__title">
            What's Inspiring <span>Everyone</span>
          </h1>
          <p className="trending-hero__description">
            Discover products, styles and ideas people are loving right now.
            Stay ahead with handpicked trends, updated weekly.
          </p>
          <Link href="#trending-grid">
            Explore Trends
            <Icon name="arrow-right" />
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
        <div className="trending-hero__media">
          <Image
            src={imagesConfig.images.sixtealTrendingHero.src}
            alt={imagesConfig.images.sixtealTrendingHero.alt}
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="trending-hero__image"
            priority
          />
        </div>
      </div>
    </section>
  );
}
