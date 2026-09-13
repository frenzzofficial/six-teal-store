"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { Link, LucideLibrary } from "@/components/ui";
import { navigationConfig } from "@/packages/configs/navigation.config";
import { cn } from "@/packages/utils/cn";

const NAV_KEY = "main";

const NavbarDesktop = () => {
  const { state, setActiveMenu, toggleSearch } = useNavigation(NAV_KEY);
  const { logo, navbar, actions } = navigationConfig;

  return (
    <div className="nav-desktop">
      <NextLink href="/" className="nav-desktop__logo" aria-label={logo.alt}>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          priority
          className="nav-desktop__logo-img"
        />
      </NextLink>

      <nav className="nav-desktop__links" aria-label="Primary">
        {navbar.map((item) => (
          <button
            type="button"
            key={item.href}
            className="nav-desktop__item"
            onMouseEnter={() => setActiveMenu(item.name)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link href={item.href} key={item.name} />
            {state.activeMenu === item.name && item.name === "Explore" && (
              <ExploreFlyout />
            )}
          </button>
        ))}
      </nav>

      <div className="nav-desktop__actions">
        <button
          type="button"
          className={cn(
            "nav-icon-btn",
            state.searchOpen && "nav-icon-btn--active",
          )}
          onClick={toggleSearch}
          aria-label={actions.search.name}
          aria-pressed={state.searchOpen}
        >
          <LucideLibrary
            name={actions.search.icon}
            className="nav-icon-btn__icon"
          />
        </button>
        <NextLink
          href={actions.wishlist.href}
          className="nav-icon-btn"
          aria-label={actions.wishlist.name}
        >
          <LucideLibrary
            name={actions.wishlist.icon}
            className="nav-icon-btn__icon"
          />
        </NextLink>
        <NextLink
          href={actions.account.href}
          className="nav-icon-btn"
          aria-label={actions.account.name}
        >
          <LucideLibrary
            name={actions.account.icon}
            className="nav-icon-btn__icon"
          />
        </NextLink>
        <NextLink
          href={actions.cart.href}
          className="nav-icon-btn nav-icon-btn--cart"
          aria-label={actions.cart.name}
        >
          <LucideLibrary
            name={actions.cart.icon}
            className="nav-icon-btn__icon"
          />
        </NextLink>
      </div>

      {state.searchOpen && <SearchOverlay onClose={toggleSearch} />}
    </div>
  );
};

function ExploreFlyout() {
  const { explore } = navigationConfig;
  return (
    <div className="nav-flyout" role="menu">
      <div className="nav-flyout__grid">
        {explore.map((item) => (
          <NextLink
            key={item.href}
            href={item.href}
            className="nav-flyout__item"
            role="menuitem"
          >
            <LucideLibrary name={item.icon} className="nav-flyout__icon" />
            <span>{item.name}</span>
          </NextLink>
        ))}
      </div>
    </div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="nav-search-overlay">
      <div className="nav-search-overlay__bar">
        <LucideLibrary name="search" className="nav-search-overlay__icon" />
        <input
          type="search"
          placeholder="Search products…"
          className="nav-search-overlay__input"
        />
        <button
          type="button"
          className="nav-search-overlay__close"
          onClick={onClose}
          aria-label="Close search"
        >
          <LucideLibrary name="close" className="nav-icon-btn__icon" />
        </button>
      </div>
    </div>
  );
}

export default NavbarDesktop;
