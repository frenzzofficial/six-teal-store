import Image from "next/image";
import { Icon, type IconName, Link } from "@/components/ui";
import { imagesConfig } from "@/packages/configs/images.config";

const POINTS = [
  {
    icon: "sparkles",
    title: "Quality Assured",
    subtitle: "Only the best products",
  },
  {
    icon: "lock",
    title: "Fast & Secure",
    subtitle: "Reliable delivery",
  },
  {
    icon: "rotate-ccw",
    title: "Easy Returns",
    subtitle: "Hassle-free process",
  },
];

export function ProductsHero() {
  return (
    <section className="products-hero relative isolate w-full overflow-hidden">
      {/* Left content */}
      <div className="products-hero__inner section-bleed__inner relative z-10">
        <div className="products-hero__content">
          <p className="products-hero__eyebrow">Curated for a brighter you</p>

          <h1 className="products-hero__title">Discover Amazing Products</h1>

          <p className="products-hero__description">
            Handpicked essentials for your lifestyle — fashion, tech, wellness,
            accessories, fragrance and more.
          </p>

          <Link href="#product-grid" variant="primary-button">
            Shop Now
            <Icon name="arrow-right" size={18} />
          </Link>

          <ul className="products-hero__points">
            {POINTS.map((point) => (
              <li key={point.title} className="products-hero__point">
                <Icon name={point.icon as IconName} />

                <div>
                  <p className="products-hero__point-title">{point.title}</p>

                  <p className="products-hero__point-subtitle">
                    {point.subtitle}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full-height image anchored to the right */}
      <div className="products-hero__media pointer-events-none absolute inset-y-0 right-0 w-full md:w-[58%]">
        <Image
          src={imagesConfig.images.sixtealProductsHero.src}
          alt={imagesConfig.images.sixtealProductsHero.alt}
          fill
          priority
          sizes="(min-width: 768px) 58vw, 100vw"
          className="products-hero__image"
        />
      </div>
    </section>
  );
}
