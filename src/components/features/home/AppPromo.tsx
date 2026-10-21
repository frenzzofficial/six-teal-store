import Image from "next/image";
import Link from "next/link";
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
      {/* Left: Phone artwork */}
      <div className="app-promo__media">
        <Image
          src={imagesConfig.images.sixtealPhone.src}
          alt={imagesConfig.images.sixtealPhone.alt}
          fill
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="app-promo__image"
        />
      </div>

      {/* Center: App introduction */}
      <div className="app-promo__content">
        <p className="app-promo__eyebrow">SIXTEAL APP</p>

        <h2 className="app-promo__title">
          Your Style
          <br />
          On The Go
        </h2>

        <p className="app-promo__description">
          Shop, explore and get inspired — anytime, anywhere.
        </p>

        <div className="app-promo__store-links">
          <Link
            href="#app-store"
            className="app-promo__store-badge"
            aria-label="Download on the App Store"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M17.05 12.54c-.02-2.1 1.71-3.11 1.79-3.16a3.85 3.85 0 0 0-3.03-1.64c-1.27-.13-2.5.76-3.15.76-.67 0-1.66-.75-2.73-.73a4.02 4.02 0 0 0-3.39 2.07c-1.46 2.53-.37 6.25 1.03 8.3.7 1 1.52 2.12 2.59 2.08 1.04-.04 1.43-.67 2.69-.67 1.24 0 1.61.67 2.7.65 1.12-.02 1.83-1 2.5-2.02a8.3 8.3 0 0 0 1.14-2.34 3.62 3.62 0 0 1-2.14-3.3ZM14.98 6.4a3.7 3.7 0 0 0 .84-2.65 3.76 3.76 0 0 0-2.43 1.27 3.53 3.53 0 0 0-.87 2.55 3.1 3.1 0 0 0 2.46-1.17Z"
              />
            </svg>
            <span>
              <small>Download on the</small>
              <strong>App Store</strong>
            </span>
          </Link>

          <Link
            href="#google-play"
            className="app-promo__store-badge"
            aria-label="Get it on Google Play"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#34A853" d="M3 2.5v19l10-9.5z" />
              <path fill="#4285F4" d="m3 2.5 12.5 7.3-2.5 2.2z" />
              <path fill="#FBBC04" d="m3 21.5 12.5-7.3-2.5-2.2z" />
              <path
                fill="#EA4335"
                d="m13 12 2.5-2.2 4.2 2.5c.8.5.8 1 0 1.5l-4.2 2.4z"
              />
            </svg>
            <span>
              <small>GET IT ON</small>
              <strong>Google Play</strong>
            </span>
          </Link>
        </div>
      </div>

      {/* Right: App benefits */}
      <ul className="app-promo__features">
        {FEATURES.map((feature) => (
          <li key={feature.label} className="app-promo__feature">
            <span className="app-promo__feature-icon">
              <Icon name={feature.icon as IconName} />
            </span>
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
