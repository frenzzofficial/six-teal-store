"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/packages/utils/cn";

const TABS = [
  { href: "/account", label: "Overview", exact: true },
  { href: "/account/orders", label: "Orders", exact: false },
  { href: "/account/profile", label: "Profile", exact: false },
  { href: "/account/security", label: "Security", exact: false },
] as const;

/** The tab bar above every account page. */
const AccountNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Account" className="account-tabs">
      <ul className="account-tabs__list section-bleed__inner">
        {TABS.map((tab) => {
          const active = tab.exact
            ? pathname === tab.href
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <li key={tab.href}>
              <NextLink
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn("account-tabs__link", active && "is-active")}
              >
                {tab.label}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AccountNav;
