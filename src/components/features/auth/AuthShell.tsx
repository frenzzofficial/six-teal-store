import type { ReactNode } from "react";
import { Icon, type IconName, Link } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  /** Small line under the card, e.g. "No account? Create one". */
  footer?: ReactNode;
};

const PERKS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "package",
    title: "Track every order",
    text: "See where your parcel is and reorder in one tap.",
  },
  {
    icon: "heart",
    title: "Keep a wishlist",
    text: "Save favourites and pick them up on any device.",
  },
  {
    icon: "shield",
    title: "Secure by design",
    text: "Encrypted sessions and verified email, always.",
  },
];

/**
 * The frame every auth page sits in: a brand panel on wide screens and the form card
 * beside it. Server component — the interactive form arrives as `children`.
 */
const AuthShell = ({
  title,
  description,
  children,
  footer,
}: AuthShellProps) => (
  <div className="auth-page">
    <div className="auth-page__inner">
      <aside
        className="auth-brand"
        aria-label={`Why join ${appConfig.site.name}`}
      >
        <p className="auth-brand__eyebrow">{appConfig.site.name}</p>
        <h2 className="auth-brand__title">Everything you love, one account.</h2>
        <ul className="auth-brand__list">
          {PERKS.map((perk) => (
            <li key={perk.title} className="auth-brand__item">
              <span className="auth-brand__icon">
                <Icon name={perk.icon} size={20} />
              </span>
              <span>
                <strong>{perk.title}</strong>
                <span>{perk.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <section className="auth-card" aria-labelledby="auth-title">
        <header className="auth-card__header">
          <h1 id="auth-title" className="auth-card__title">
            {title}
          </h1>
          <p className="auth-card__description">{description}</p>
        </header>
        <div className="auth-card__body">{children}</div>
        {footer && <footer className="auth-card__footer">{footer}</footer>}
        <Link href="/" variant="secondary" className="auth-card__home">
          Back to store
        </Link>
      </section>
    </div>
  </div>
);

export default AuthShell;
