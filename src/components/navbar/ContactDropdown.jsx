import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useClient } from "../../store/ClientContext.jsx";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import TikitButton from "../TikitButton.jsx";

export default function ContactDropdown({ isMobile = false, onClose }) {
  const { t } = useTranslation();
  useTheme();
  const { setClientType } = useClient();
  const { localizedNavigate } = useI18nLanguage();
  const contactDropdownRef = useRef(null);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contactDropdownRef.current &&
        !contactDropdownRef.current.contains(event.target)
      ) {
        setIsContactDropdownOpen(false);
      }
    };

    if (isContactDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isContactDropdownOpen]);

const handleClientClick = () => {
    setClientType("client");
    try {
      sessionStorage.setItem("shouldScrollToAction", "true");
    } catch (error) {
      console.warn("Failed to write shouldScrollToAction to sessionStorage:", error);
    }
    localizedNavigate("/contact-us", { state: { preserveScroll: true } });
    setIsContactDropdownOpen(false);
    if (onClose) onClose();
  };

  const handleInfluencerClick = () => {
    setClientType("influencer");
    try {
      sessionStorage.setItem("shouldScrollToAction", "true");
    } catch (error) {
      console.warn("Failed to write shouldScrollToAction to sessionStorage:", error);
    }
    localizedNavigate("/contact-us", { state: { preserveScroll: true } });
    setIsContactDropdownOpen(false);
    if (onClose) onClose();
  };

  if (isMobile) {
    return (
      <div className="mobile-nav-item mt-4">
        <TikitButton
          text={t("nav.contact") || "Contact Us"}
          onClick={handleClientClick}
        />
      </div>
    );
  }

  return (
    <div
      ref={contactDropdownRef}
      className={`relative transition-all duration-300 ${
        isContactDropdownOpen ? "contact-dropdown-open" : ""
      }`}
    >
      <TikitButton
        text={t("nav.contact") || "Contact Us"}
        onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
      />
      <div
        className={`absolute left-1/2 top-full z-50 mt-2 w-max min-w-[140px] -translate-x-1/2 transition-opacity duration-300 ease-out ${
          isContactDropdownOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`rounded-lg overflow-hidden transition-all duration-300 ease-out border border-[var(--foreground)]/20 dark:border-white/20 shadow-lg ${
            isContactDropdownOpen ? "translate-y-0" : "-translate-y-2"
          } bg-[var(--background)] dark:bg-[var(--container-bg)] backdrop-blur-md`}
        >
          <button
            onClick={handleClientClick}
            className="block w-full text-left px-4 py-3 text-sm transition-all duration-200 rounded-t-lg text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)]"
            aria-label={`Contact us as ${t("contact.action.client")}`}
          >
            {t("contact.action.client")}
          </button>
          <button
            onClick={handleInfluencerClick}
            className="block w-full text-left px-4 py-3 text-sm transition-all duration-200 rounded-b-lg text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)]"
            aria-label={`Contact us as ${t("contact.action.influencer")}`}
          >
            {t("contact.action.influencer")}
          </button>
        </div>
      </div>
    </div>
  );
}
