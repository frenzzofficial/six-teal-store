import Image from "next/image";
import Link from "next/link";
import LucideLibrary from "@/components/ui/icons/LucideLibrary";
import { navigationConfig } from "@/packages/configs/navigation.config";

const columnOrder = [
  "shop",
  "categories",
  "company",
  "support",
  "legal",
] as const;

const FooterDesktop = () => {
  const { footer, social, logo } = navigationConfig;

  return (
    <div className="nav-footer-desktop">
      <div className="nav-footer-desktop__top">
        <div className="nav-footer-desktop__brand">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
          />
          <p className="nav-footer-desktop__tagline">
            Considered goods, sourced with intention.
          </p>
          <div className="nav-footer-desktop__social">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="nav-icon-btn"
              >
                <LucideLibrary
                  name={item.icon}
                  className="nav-icon-btn__icon"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="nav-footer-desktop__columns">
          {columnOrder.map((key) => {
            const column = footer[key];
            return (
              <div key={key} className="nav-footer-desktop__column">
                <h3 className="nav-footer-desktop__heading">{column.title}</h3>
                <ul className="nav-footer-desktop__list">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="nav-footer-desktop__link"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="nav-footer-desktop__bottom">
        <span>
          © {new Date().getFullYear()} SixTeal Store. All rights reserved.
        </span>
        <div className="nav-footer-desktop__bottom-links">
          <Link href={footer.legal.links[0]?.href ?? "/privacy"}>Privacy</Link>
          <Link href={footer.legal.links[1]?.href ?? "/terms"}>Terms</Link>
        </div>
      </div>
    </div>
  );
};

export default FooterDesktop;
