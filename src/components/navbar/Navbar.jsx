import React, { useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useNavbarScroll } from "./hooks/useNavbarScroll";
import { useNavbarAnimations } from "./hooks/useNavbarAnimations";
import { useMobileMenu } from "./hooks/useMobileMenu";
import NavLogo from "./NavLogo";
import DesktopNavLinks from "./DesktopNavLinks";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import ContactDropdown from "./ContactDropdown";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const navRef = useRef();
  const logoRef = useRef();
  const hamburgerRef = useRef();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, isRtl } = useI18nLanguage();

  // Custom hooks
  useNavbarScroll(navRef);
  useNavbarAnimations(logoRef, navRef);
  const mobileMenuRef = useMobileMenu(isMobileMenuOpen, hamburgerRef);

  // Refresh AOS when navbar mounts (AOS already initialized in App.jsx)
  React.useEffect(() => {
    if (window.AOS && window.aosInitialized) {
      AOS.refresh();
    }
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 md:top-10 inset-x-0 z-50 gpu-transform ${
          language === "ar" ? "font-cairo" : ""
        }`}
        style={{ transform: "translateY(0)" }}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div
          className={`${
            isRtl ? "flex-row-reverse" : ""
          } w-[95%] md:w-6/7 mx-auto rounded-full h-14 md:h-16 justify-between flex items-center px-4 md:px-6 py-2 bg-white/5 backdrop-blur-md shadow-sm text-white`}
        >
          {/* Logo */}
          <NavLogo logoRef={logoRef} language={language} />

          {/* Desktop Navigation */}
          <div className="flex gap-4">
            <DesktopNavLinks language={language} />
            <div className="hidden lg:flex gap-6 items-center">
              <LanguageSelector />
            </div>
          </div>

          {/* Desktop Right Controls */}
          <div
            className={`hidden lg:flex items-center gap-3 ${
              language === "ar" ? "order-1" : ""
            }`}
          >
            <ThemeToggle />
            <ContactDropdown />
          </div>

          {/* Mobile Hamburger */}
          <HamburgerButton
            onClick={toggleMobileMenu}
            language={language}
            isOpen={isMobileMenuOpen}
            ref={hamburgerRef}
          />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        mobileMenuRef={mobileMenuRef}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </>
  );
}

export default Navbar;
