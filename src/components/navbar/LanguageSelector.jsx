import { useRef, useEffect, useState } from "react";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTheme } from "../../store/ThemeContext.jsx";
import { LANGUAGES } from "./constants";
import { useNavColor } from "./hooks/useNavColor";

export default function LanguageSelector({
  isMobile = false,
  onLanguageChange,
}) {
  const { language, setLanguage } = useI18nLanguage();
  useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef(null);
  const navColor = useNavColor();
  const textColor =
    navColor === "white" ? "text-white" : "text-[var(--foreground)]";

  // Handle click outside to close language menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangOpen]);

  const handleLanguageSelect = (langValue) => {
    setLanguage(langValue);
    setIsLangOpen(false);
    if (onLanguageChange) {
      onLanguageChange();
    }
  };

  if (isMobile) {
    return (
      <div className="mobile-nav-item w-full px-6 mt-6 overflow-visible">
        <button
          onClick={() => setIsLangOpen((v) => !v)}
          className="w-full flex items-center justify-center  text-[var(--foreground)] text-2xl md:text-3xl font-light uppercase tracking-wider transition-colors duration-200 hover:opacity-80"
          aria-label={`Select language. Current language: ${language === "en" ? "English" : language === "fr" ? "French" : "Arabic"}`}
          aria-expanded={isLangOpen}
          aria-haspopup="listbox"
        >
          <span>
            {language === "en" ? "En" : language === "fr" ? "Fr" : "Ar"}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-300 ease-out ${
              isLangOpen ? "rotate-90" : "rotate-0"
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
          className={`transition-all duration-300 ease-out ${
            isLangOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          } overflow-visible`}
        >
          <div className="flex flex-col gap-3">
            {LANGUAGES.map((opt) => (
              <button
                key={opt.value}
                className={`text-xl md:text-2xl font-light uppercase tracking-wider transition-all duration-200 py-2 px-4 rounded-lg ${
                  language === opt.value
                    ? "bg-[var(--secondary)]/20 text-[var(--secondary)] dark:text-[var(--secondary)] border-l-4 border-[var(--secondary)]"
                    : "text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)]"
                }`}
                onClick={() => handleLanguageSelect(opt.value)}
                aria-label={`Select ${opt.label} language`}
                aria-selected={language === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={langMenuRef}>
      <button
        onClick={() => setIsLangOpen((v) => !v)}
        className={`nav-item uppercase font-light text-sm opacity-0 ${textColor} relative inline-flex items-center gap-2 transition-colors duration-300 ease-in-out hover:opacity-80`}
        aria-haspopup="listbox"
        aria-expanded={isLangOpen}
        aria-label={`Select language. Current language: ${language === "en" ? "English" : language === "fr" ? "French" : "Arabic"}`}
      >
        <span className="relative inline-block">
          {language === "en" ? "En" : language === "fr" ? "Fr" : "Ar"}
          <span
            className="nav-underline absolute left-0 right-0 bottom-[-2px] h-[1px] bg-current origin-left block transition-transform duration-300 ease-out"
            style={{
              transform: isLangOpen ? "scaleX(1)" : "scaleX(0)",
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
            isLangOpen ? "rotate-90" : "rotate-0"
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
        className={`absolute right-0 mt-3 min-w-[120px] rounded-lg z-50 overflow-hidden transition-all duration-300 ease-out ${
          isLangOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } bg-[var(--background)] dark:bg-[var(--container-bg)] backdrop-blur-md border border-[var(--foreground)]/20 dark:border-white/20 shadow-lg`}
        role="listbox"
        aria-label="Language selection"
      >
            {LANGUAGES.map((opt, index) => (
              <button
                key={opt.value}
                className={`block w-full text-left px-4 py-3 text-sm uppercase transition-all duration-200 ${
                  index === 0 ? "rounded-t-lg" : ""
                } ${index === LANGUAGES.length - 1 ? "rounded-b-lg" : ""} ${
                  language === opt.value
                    ? "bg-[var(--secondary)]/20 text-[var(--secondary)] dark:text-[var(--secondary)] border-l-2 border-[var(--secondary)] font-medium"
                    : "text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)]"
                }`}
                onClick={() => handleLanguageSelect(opt.value)}
                role="option"
                aria-selected={language === opt.value}
                aria-label={`Select ${opt.label} language`}
              >
                {opt.label}
              </button>
            ))}
      </div>
    </div>
  );
}
