"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { LucideLibrary, Link as NavLink } from "@/components/ui";
import { navigationConfig } from "@/packages/configs/navigation.config";
import { useIsActivePath } from "@/packages/hooks/useIsActivePath";
import { cn } from "@/packages/utils/cn";

type NavSidebarProps = {
  navKey: string;
  open: boolean;
  onClose: () => void;
};

export function NavSidebar({ navKey, open, onClose }: NavSidebarProps) {
  const { setActiveMenu, state } = useNavigation(navKey);
  const panelRef = useRef<HTMLDivElement>(null);
  const { navbar, explore, account, social, actions } = navigationConfig;
  const isActive = useIsActivePath();

  // Lock body scroll + close on Escape while the sidebar is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={cn(
          "nav-sidebar-overlay",
          open && "nav-sidebar-overlay--visible",
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={cn("nav-sidebar", open && "nav-sidebar--open")}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="nav-sidebar__header">
          <span className="nav-sidebar__title">Menu</span>
          <button
            type="button"
            className="nav-icon-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <LucideLibrary name="close" className="nav-icon-btn__icon" />
          </button>
        </div>

        <div className="nav-sidebar__body">
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
              <LucideLibrary
                name="chevron-down"
                className="nav-sidebar__chevron"
              />
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
        </div>

        <div className="nav-sidebar__footer">
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
                <LucideLibrary
                  name={item.icon}
                  className="nav-icon-btn__icon"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
