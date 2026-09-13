import NavbarDesktop from "../features/navigation/navbar/NavbarDesktop";
import NavbarMobile from "../features/navigation/navbar/NavbarMobile";
import NavbarTablet from "../features/navigation/navbar/NavbarTablet";

/**
 * Renders all three nav variants and lets Tailwind's responsive classes
 * decide which is visible. Deciding this in JS (via useBreakpoints, which
 * can't know the viewport during SSR) forced every first paint to fall back
 * to the mobile nav and then "pop" to the right one after mount — a
 * hydration-mismatch-prone flash. CSS media queries apply instantly on
 * first paint, server and client alike, so there's no flash and no
 * mismatch.
 */
const Header = () => {
  return (
    <header className="nav-header">
      <div className="hidden lg:block">
        <NavbarDesktop />
      </div>
      <div className="hidden md:block lg:hidden">
        <NavbarTablet />
      </div>
      <div className="block md:hidden">
        <NavbarMobile />
      </div>
    </header>
  );
};

export default Header;
