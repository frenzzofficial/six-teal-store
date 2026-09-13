"use client";
import { useBreakpoints } from "@/packages/hooks/useBreakpoints";
import NavbarDesktop from "../features/navigation/navbar/NavbarDesktop";
import NavbarMobile from "../features/navigation/navbar/NavbarMobile";
import NavbarTablet from "../features/navigation/navbar/NavbarTablet";

const Header = () => {
  const { isDesktop, isTablet, isMobile } = useBreakpoints();
  return (
    <header className="nav-header">
      {/* desktop nav */}
      {isDesktop && <NavbarDesktop />}

      {/* tablet nav */}
      {isTablet && <NavbarTablet />}

      {/* mobile nav */}
      {isMobile && <NavbarMobile />}
    </header>
  );
};

export default Header;
