import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useClient } from "../../store/ClientContext.jsx";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import TikitButton from "../TikitButton.jsx";

export default function ContactDropdown({ isMobile = false, onClose }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { setClientType } = useClient();
  const { isRtl } = useI18nLanguage();
  const navigate = useNavigate();
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
    navigate("/contact");
    setIsContactDropdownOpen(false);
    if (onClose) onClose();
  };

  const handleInfluencerClick = () => {
    setClientType("influencer");
    sessionStorage.setItem("shouldScrollToAction", "true");
    navigate("/contact");
    setIsContactDropdownOpen(false);
    if (onClose) onClose();
  };

  if (isMobile) {
    return (
      <div className="mobile-nav-item mt-8">
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
      className={`relative ${
        isContactDropdownOpen ? "contact-dropdown-open" : ""
      }`}
    >
      <TikitButton
        text={t("nav.contact") || "Contact Us"}
        onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
      />
      {isContactDropdownOpen && (
        <div
          className={`absolute ${
            isRtl ? "left-0" : "right-0"
          } mt-2 min-w-[140px] rounded-lg shadow-lg border z-50 ${
            theme === "dark"
              ? "bg-gray-900/95 backdrop-blur-md border-gray-700/50"
              : "bg-white/95 backdrop-blur-md border-gray-200/50"
          }`}
        >
          <button
            onClick={handleClientClick}
            className={`block w-full text-left px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg ${
              theme === "dark"
                ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
            }`}
          >
            {t("contact.action.client")}
          </button>
          <button
            onClick={handleInfluencerClick}
            className={`block w-full text-left px-4 py-3 text-sm transition-colors duration-200 last:rounded-b-lg ${
              theme === "dark"
                ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
            }`}
          >
            {t("contact.action.influencer")}
          </button>
        </div>
      )}
    </div>
  );
}

