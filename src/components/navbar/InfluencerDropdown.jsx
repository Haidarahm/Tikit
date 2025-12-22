import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useNavColor } from "./hooks/useNavColor";

export default function InfluencerDropdown({ isMobile = false, onClose }) {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const navigate = useNavigate();
  const influencerDropdownRef = useRef(null);
  const [isInfluencerDropdownOpen, setIsInfluencerDropdownOpen] =
    useState(false);
  const navColor = useNavColor();
  const textColor =
    navColor === "white" ? "text-white" : "text-[var(--foreground)]";

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        influencerDropdownRef.current &&
        !influencerDropdownRef.current.contains(event.target)
      ) {
        setIsInfluencerDropdownOpen(false);
      }
    };

    if (isInfluencerDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInfluencerDropdownOpen]);

  const handleOurInfluencersClick = () => {
    navigate("/influencer");
    setIsInfluencerDropdownOpen(false);
    if (onClose) onClose();
  };

  const handleRegisterClick = () => {
    navigate("/influencer-register");
    setIsInfluencerDropdownOpen(false);
    if (onClose) onClose();
  };

  if (isMobile) {
    return (
      <div className="mobile-nav-item w-full flex flex-col ">
        <button
          onClick={() => setIsInfluencerDropdownOpen((v) => !v)}
          className="text-[var(--foreground)] text-3xl md:text-4xl uppercase tracking-wider hover:opacity-70 transition-colors duration-300 flex items-center justify-center gap-2"
          aria-label={`${t("nav.influencers")} menu`}
          aria-haspopup="true"
          aria-expanded={isInfluencerDropdownOpen}
        >
          <span>{t("nav.influencers")}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-300 ease-out ${
              isInfluencerDropdownOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            <path
              d="M8 5l8 7-8 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isInfluencerDropdownOpen
              ? "max-h-96 opacity-100 mt-4"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex flex-col gap-3">
            <button
              onClick={handleOurInfluencersClick}
              className="text-xl md:text-2xl font-light uppercase tracking-wider transition-all duration-200 py-2 px-4 rounded-lg text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)] text-left"
              aria-label={t("nav.ourInfluencers") || "View our influencers"}
            >
              {t("nav.ourInfluencers") || "Our Influencers"}
            </button>
            <button
              onClick={handleRegisterClick}
              className="text-xl md:text-2xl font-light uppercase tracking-wider transition-all duration-200 py-2 px-4 rounded-lg text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)] text-left"
              aria-label={t("nav.registerAsInfluencer") || "Register as an influencer"}
            >
              {t("nav.registerAsInfluencer") || "Register as Influencer"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={influencerDropdownRef}
      className={`relative transition-all duration-300 ${
        isInfluencerDropdownOpen ? "influencer-dropdown-open" : ""
      }`}
    >
      <button
        onClick={() => setIsInfluencerDropdownOpen(!isInfluencerDropdownOpen)}
        className={`nav-item ${textColor} uppercase text-sm opacity-0 relative inline-flex items-center gap-1 transition-colors duration-300 ease-in-out hover:opacity-80`}
        aria-label={`${t("nav.influencers")} menu`}
        aria-haspopup="true"
        aria-expanded={isInfluencerDropdownOpen}
      >
        <span className="relative inline-block">
          {t("nav.influencers")}
          <span
            className="nav-underline absolute left-0 right-0 bottom-[-2px] h-[1px] bg-current origin-left block transition-transform duration-300 ease-out"
            style={{
              transform: isInfluencerDropdownOpen ? "scaleX(1)" : "scaleX(0)",
            }}
          />
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-300 ease-out ${
            isInfluencerDropdownOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          <path
            d="M8 5l8 7-8 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={`absolute ${
          isRtl ? "left-0" : "right-0"
        } mt-2 min-w-[180px] rounded-lg z-50 overflow-hidden transition-all duration-300 ease-out ${
          isInfluencerDropdownOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } bg-[var(--background)] dark:bg-[var(--container-bg)] backdrop-blur-md border border-[var(--foreground)]/20 dark:border-white/20 shadow-lg`}
      >
        <button
          onClick={handleOurInfluencersClick}
          className="text-start block w-full px-4 py-3 text-sm transition-all duration-200 rounded-t-lg text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)]"
          aria-label={t("nav.ourInfluencers") || "View our influencers"}
        >
          {t("nav.ourInfluencers") || "Our Influencers"}
        </button>
        <button
          onClick={handleRegisterClick}
          className="block text-start w-full text-left px-4 py-3 text-sm transition-all duration-200 rounded-b-lg text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)]"
          aria-label={t("nav.registerAsInfluencer") || "Register as an influencer"}
        >
          {t("nav.registerAsInfluencer") || "Register as Influencer"}
        </button>
      </div>
    </div>
  );
}
