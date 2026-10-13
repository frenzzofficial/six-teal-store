import Image from "next/image";
import { Icon, type IconName } from "@/components/ui";
import { imagesConfig } from "@/packages/configs/images.config";

const FEATURES = [
  { icon: "package", label: "Exclusive Offers" },
  { icon: "circle-check", label: "Early Access" },
  { icon: "sparkles", label: "Personalized Picks" },
  { icon: "shopping-bag", label: "Seamless Shopping" },
];

export function AppPromo() {
  return (
    <section className="app-promo">
      <div className="app-promo__media">
        <Image
          src={imagesConfig.images.sixtealPhone.src}
          alt={imagesConfig.images.sixtealPhone.alt}
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="app-promo__image"
        />
      </div>
      <div className="app-promo__content">
        <p className="app-promo__eyebrow">SixTeal App</p>
        <h2 className="app-promo__title">Your Style On The Go</h2>
        <p className="app-promo__description">
          Shop, explore and get inspired — anytime, anywhere.
        </p>
        <ul className="app-promo__features">
          {FEATURES.map((f) => (
            <li key={f.label} className="app-promo__feature">
              <Icon name={f.icon as IconName} />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
        <div className="app-promo__store-links">
          <span className="app-promo__store-badge">
            <Icon name="shopping-bag" />
            App Store
          </span>
          <span className="app-promo__store-badge">
            <Icon name="shopping-bag" />
            Google Play
          </span>
        </div>
      </div>
    </section>
  );
}
