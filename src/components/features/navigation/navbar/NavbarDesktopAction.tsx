"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useNavigationActions,
  useNavigationState,
} from "@/components/providers/NavigationProvider";
import { Hamburger, Icon, type IconName } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";
import { MOBILE_MENU_ID } from "@/packages/configs/navigation.config";
import { useHydratedStore } from "@/packages/hooks/useHydratedStore";
import { selectCartCount, useCartStore } from "@/packages/store/cart.store";
import { useWishlistStore } from "@/packages/store/wishlist.store";
import { cn } from "@/packages/utils/cn";

type ActionLinkProps = {
  href: string;
  icon: IconName;
  label: string;
  count?: number;
};

/**
 * Icon link with an optional count badge. `count` is 0 until the client
 * has mounted (see useHydratedStore), so the server HTML and the first
 * client render always agree.
 */
const ActionLink = ({ href, icon, label, count = 0 }: ActionLinkProps) => {
  const pathname = usePathname();
  const isCurrent = pathname === href;
  const accessibleLabel =
    count > 0 ? `${label}, ${count} ${count === 1 ? "item" : "items"}` : label;

  return (
    <Link
      href={href}
      className={cn("header-action", isCurrent && "is-current")}
      aria-label={accessibleLabel}
      aria-current={isCurrent ? "page" : undefined}
    >
      <Icon name={icon} className="header-action__icon" size={20} />
      {count > 0 && (
        // `key` restarts the pop animation each time the count changes.
        <span key={count} className="count-badge" aria-hidden="true">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
};

const NavbarDesktopAction = () => {
  const mobileMenuOpen = useNavigationState("mobileMenuOpen");
  const { toggleMobileMenu } = useNavigationActions();

  const cartCount = useHydratedStore(useCartStore, selectCartCount, 0);
  const wishlistCount = useHydratedStore(
    useWishlistStore,
    (s) => s.ids.length,
    0,
  );

  return (
    <div className="header-actions">
      <ActionLink
        href={appConfig.routes.actions.search}
        icon="search"
        label="Search"
      />
      <ActionLink
        href={appConfig.routes.actions.wishlist}
        icon="heart"
        label="Wishlist"
        count={wishlistCount}
      />
      <ActionLink
        href={appConfig.routes.actions.cart}
        icon="shopping-bag"
        label="Cart"
        count={cartCount}
      />
      <Hamburger
        isOpen={mobileMenuOpen}
        onToggle={toggleMobileMenu}
        controls={MOBILE_MENU_ID}
      />
    </div>
  );
};

export default NavbarDesktopAction;
