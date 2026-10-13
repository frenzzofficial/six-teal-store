import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui";
import { imagesConfig } from "@/packages/configs/images.config";

const POINTS = [
  {
    icon: "sparkles",
    title: "Quality Assured",
    subtitle: "Only the best products",
  },
  { icon: "lock", title: "Fast & Secure", subtitle: "Reliable delivery" },
  {
    icon: "rotate-ccw",
    title: "Easy Returns",
    subtitle: "Hassle-free process",
  },
];

export function ProductsHero() {
  return (
    <section className="products-hero">
      <div className="products-hero__inner section-bleed__inner">
        <div className="products-hero__content">
          <p className="products-hero__eyebrow">Curated for a brighter you</p>
          <h1 className="products-hero__title">Discover Amazing Products</h1>
          <p className="products-hero__description">
            Handpicked essentials for your lifestyle — fashion, tech, wellness,
            accessories, fragrance and more.
          </p>
          <Link href="#product-grid">
            Shop Now
            <Icon name="arrow-right" />
          </Link>
          <ul className="products-hero__points">
            {POINTS.map((p) => (
              <li key={p.title} className="products-hero__point">
                <Icon name={p.icon as IconName} />
                <div>
                  <p className="products-hero__point-title">{p.title}</p>
                  <p className="products-hero__point-subtitle">{p.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="products-hero__media">
          <Image
            src={imagesConfig.images.sixtealProductsHero.src}
            alt={imagesConfig.images.sixtealProductsHero.alt}
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="products-hero__image"
            priority
          />
        </div>
      </div>
    </section>
  );
}
