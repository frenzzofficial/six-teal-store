import FooterDesktop from "../features/navigation/footer/FooterDesktop";
import FooterMobile from "../features/navigation/footer/FooterMobile";

// See Header.tsx: CSS-driven visibility avoids the SSR/first-paint flash
// that JS breakpoint detection causes.
const Footer = () => {
  return (
    <footer className="nav-footer">
      <div className="hidden md:block">
        <FooterDesktop />
      </div>
      <div className="block md:hidden">
        <FooterMobile />
      </div>
    </footer>
  );
};

export default Footer;
