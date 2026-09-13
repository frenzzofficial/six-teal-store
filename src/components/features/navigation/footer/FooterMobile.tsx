"use client";

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

const FooterMobile = () => {
  const { footer, social, logo } = navigationConfig;

  return (
    <div className="nav-footer-mobile">
      <div className="nav-footer-mobile__brand">
        <Image src={logo.src} alt={logo.alt} width={100} height={50} />
        <div className="nav-footer-mobile__social">
          {social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="nav-icon-btn"
            >
              <LucideLibrary name={item.icon} className="nav-icon-btn__icon" />
            </a>
          ))}
        </div>
      </div>

      <div className="nav-footer-mobile__accordion">
        {columnOrder.map((key) => {
          const column = footer[key];
          return (
            <details key={key} className="nav-footer-mobile__group">
              <summary className="nav-footer-mobile__summary">
                <span>{column.title}</span>
                <LucideLibrary
                  name="chevron-down"
                  className="nav-footer-mobile__chevron"
                />
              </summary>
              <ul className="nav-footer-mobile__list">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="nav-footer-mobile__link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>

      <div className="nav-footer-mobile__bottom">
        © {new Date().getFullYear()} SixTeal Store
      </div>
    </div>
  );
};

export default FooterMobile;
