"use client";

import { useBreakpoints } from "@/packages/hooks/useBreakpoints";
import FooterDesktop from "../features/navigation/footer/FooterDesktop";
import FooterMobile from "../features/navigation/footer/FooterMobile";

const Footer = () => {
  const { isMobile } = useBreakpoints();

  return (
    <footer className="nav-footer">
      {isMobile ? <FooterMobile /> : <FooterDesktop />}
    </footer>
  );
};

export default Footer;
