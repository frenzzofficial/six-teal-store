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
    <section className="cart-hero relative w-full overflow-hidden">
      {/* Left content */}
      <div className="cart-hero__inner section-bleed__inner relative z-10">
        <div className="cart-hero__content">
          <p className="cart-hero__eyebrow">Your style, one step closer</p>

          <h1 className="cart-hero__title">Your Cart</h1>

          <p className="cart-hero__description">
            Great choices! You're building a better, more inspired you.
          </p>

          <ul className="cart-hero__points">
            {POINTS.map((point) => (
              <li key={point.title} className="cart-hero__point">
                <Icon name={point.icon as IconName} />

                <div>
                  <p className="cart-hero__point-title">{point.title}</p>

                  <p className="cart-hero__point-subtitle">{point.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full-height image anchored to the right */}
      <div className="cart-hero__media pointer-events-none absolute inset-y-0 right-0 w-full md:w-[58%]">
        <Image
          src={imagesConfig.images.sixtealCart.src}
          alt={imagesConfig.images.sixtealCart.alt}
          fill
          priority
          sizes="(min-width: 768px) 58vw, 100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
