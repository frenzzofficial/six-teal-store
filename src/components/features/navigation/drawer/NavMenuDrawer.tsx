"use client";

import Link from "next/link";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { Drawer, LucideLibrary, Link as NavLink } from "@/components/ui";
import { navigationConfig } from "@/packages/configs/navigation.config";
import { useIsActivePath } from "@/packages/hooks/useIsActivePath";
import { cn } from "@/packages/utils/cn";

type NavMenuDrawerProps = {
  navKey: string;
  open: boolean;
  onClose: () => void;
};

export function NavMenuDrawer({ navKey, open, onClose }: NavMenuDrawerProps) {
  const { setActiveMenu, state } = useNavigation(navKey);
  const { navbar, explore, account, social, actions } = navigationConfig;
  const isActive = useIsActivePath();

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      origin="left"
      title="Menu"
      footer={
        <div className="nav-sidebar__social">
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
      }
    >
      <nav className="nav-sidebar__section" aria-label="Primary">
        {navbar.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            variant="nav"
            className={cn(
              "nav-sidebar__link",
              isActive(item.href) && "nav-sidebar__link--active",
            )}
            onClick={onClose}
          >
            <LucideLibrary name={item.icon} className="nav-link__icon" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="nav-sidebar__divider" />

      <details
        className="nav-sidebar__collapsible"
        open={state.activeMenu === "Explore"}
        onToggle={(e) =>
          setActiveMenu(
            (e.target as HTMLDetailsElement).open ? "Explore" : null,
          )
        }
      >
        <summary className="nav-sidebar__collapsible-summary">
          <span>Shop by category</span>
          <LucideLibrary name="chevron-down" className="nav-sidebar__chevron" />
        </summary>
        <div className="nav-sidebar__collapsible-body">
          {explore.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-sidebar__sublink"
              onClick={onClose}
            >
              <LucideLibrary
                name={item.icon}
                className="nav-sidebar__sublink-icon"
              />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </details>

      <div className="nav-sidebar__divider" />

      <nav className="nav-sidebar__section" aria-label="Account">
        {account.guest.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            variant="nav"
            className={cn(
              "nav-sidebar__link",
              isActive(item.href) && "nav-sidebar__link--active",
            )}
            onClick={onClose}
          >
            <LucideLibrary name={item.icon} className="nav-link__icon" />
            <span>{item.name}</span>
          </NavLink>
        ))}
        <NavLink
          href={actions.wishlist.href}
          variant="nav"
          className={cn(
            "nav-sidebar__link",
            isActive(actions.wishlist.href) && "nav-sidebar__link--active",
          )}
          onClick={onClose}
        >
          <LucideLibrary
            name={actions.wishlist.icon}
            className="nav-link__icon"
          />
          <span>{actions.wishlist.name}</span>
        </NavLink>
      </nav>
    </Drawer>
  );
}
