import { LucideLibrary } from "lucide-react";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { Link as NextLink } from "@/components/ui";
import { navigationConfig } from "@/packages/configs/navigation.config";
import { cn } from "@/packages/utils/cn";

interface NavbarDesktopActionProps {
  key: string;
}

const NavbarDesktopAction = ({ key }: NavbarDesktopActionProps) => {
  const { state, toggleSearch } = useNavigation(key);

  const { actions } = navigationConfig;
  return (
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
  );
};

export default NavbarDesktopAction;
