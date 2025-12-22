import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NAV_LINKS } from "./constants";
import ThemeToggle from "./ThemeToggle";
import ContactDropdown from "./ContactDropdown";
import LanguageSelector from "./LanguageSelector";
import InfluencerDropdown from "./InfluencerDropdown";

export default function MobileMenu({
  mobileMenuRef,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const { t } = useTranslation();

  // Filter out influencer link and render it separately as dropdown
  const regularLinks = NAV_LINKS.filter((link) => link.to !== "/influencer");

  return (
    <div
      ref={mobileMenuRef}
      className="fixed inset-0 z-40 top-20 m-4 overflow-hidden rounded-2xl hidden flex-col items-center justify-center lg:hidden bg-[var(--container-bg)]"
      style={{ display: "none" }}
    >
      <div className="flex flex-col items-center space-y-4 w-full">
        {regularLinks.map(({ to, key }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-nav-item text-[var(--foreground)] text-3xl md:text-4xl uppercase tracking-wider hover:opacity-70 transition-colors duration-300"
          >
            {t(key)}
          </Link>
        ))}

        {/* Influencer Dropdown */}
        <InfluencerDropdown
          isMobile={true}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Theme Toggle */}
        <div className="mobile-nav-item">
          <ThemeToggle isMobile={true} />
        </div>

        <ContactDropdown
          isMobile={true}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Language selector */}
        <LanguageSelector
          isMobile={true}
          onLanguageChange={() => {
            if (isMobileMenuOpen) {
              setIsMobileMenuOpen(false);
            }
          }}
        />
      </div>
    </div>
  );
}
