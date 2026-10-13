import Image from "next/image";
import { Icon, type IconName } from "@/components/ui";
import { imagesConfig } from "@/packages/configs/images.config";

const POINTS = [
  { icon: "lock", title: "Secure Checkout", subtitle: "100% safe & encrypted" },
  { icon: "truck", title: "Fast Shipping", subtitle: "On orders above ₹999" },
  { icon: "rotate-ccw", title: "Easy Returns", subtitle: "7-day hassle free" },
];

export function CartHero() {
  return (
    <section className="cart-hero">
      <div className="cart-hero__inner section-bleed__inner">
        <div className="cart-hero__content">
          <p className="cart-hero__eyebrow">Your style, one step closer</p>
          <h1 className="cart-hero__title">Your Cart</h1>
          <p className="cart-hero__description">
            Great choices! You're building a better, more inspired you.
          </p>
          <ul className="cart-hero__points">
            {POINTS.map((p) => (
              <li key={p.title} className="cart-hero__point">
                <Icon name={p.icon as IconName} />
                <div>
                  <p className="cart-hero__point-title">{p.title}</p>
                  <p className="cart-hero__point-subtitle">{p.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="cart-hero__media">
          <Image
            src={imagesConfig.images.sixtealCart.src}
            alt={imagesConfig.images.sixtealCart.alt}
            sizes="(min-width: 1024px) 30vw, 70vw"
            className="cart-hero__image"
            priority
          />
        </div>
      </div>
    </section>
  );
}
