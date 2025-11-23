import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTheme } from "../../store/ThemeContext.jsx";
import { LANGUAGES } from "./constants";
import { useHeroScrollColor } from "./hooks/useHeroScrollColor";

export default function LanguageSelector({
  isMobile = false,
  onLanguageChange,
}) {
  const { language, setLanguage, isRtl } = useI18nLanguage();
  const { theme } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef(null);
  const location = useLocation();
  const scrollColor = useHeroScrollColor();

  const isHomePage = location.pathname === "/home";
  const textColor = isHomePage ? scrollColor : "text-[var(--foreground)]";

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
      <div className="mobile-nav-item w-full px-6 mt-6">
        <button
          onClick={() => setIsLangOpen((v) => !v)}
          className="w-full flex items-center justify-between text-[var(--foreground)] text-2xl md:text-3xl font-light uppercase tracking-wider"
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
            style={{
              transform: isLangOpen ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
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
        {isLangOpen && (
          <div className="mt-4 flex flex-col gap-3">
            {LANGUAGES.map((opt) => (
              <button
                key={opt.value}
                className={`text-xl md:text-2xl font-light uppercase tracking-wider transition-all duration-200 py-2 px-4 rounded-lg ${
                  language === opt.value
                    ? theme === "dark"
                      ? "bg-blue-600/20 text-blue-300 border-l-4 border-blue-400"
                      : "bg-blue-100/50 text-blue-700 border-l-4 border-blue-500"
                    : theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-gray-800/30"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
                onClick={() => handleLanguageSelect(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={langMenuRef}>
      <button
        onClick={() => setIsLangOpen((v) => !v)}
        className={`nav-item uppercase font-light text-sm opacity-0 ${textColor} relative inline-flex items-center gap-2`}
        aria-haspopup="listbox"
        aria-expanded={isLangOpen}
      >
        <span className="relative inline-block">
          {language === "en" ? "En" : language === "fr" ? "Fr" : "Ar"}
          <span
            className="nav-underline"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -2,
              height: 1,
              backgroundColor: "currentColor",
              transform: "scaleX(0)",
              transformOrigin: "left",
              display: "block",
            }}
          />
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isLangOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
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
      {isLangOpen && (
        <div
          className={`absolute right-0 mt-3 min-w-[120px] rounded-lg shadow-lg border z-50 ${
            theme === "dark"
              ? "bg-gray-900/95 backdrop-blur-md border-gray-700/50"
              : "bg-white/95 backdrop-blur-md border-gray-200/50"
          }`}
          role="listbox"
        >
          {LANGUAGES.map((opt) => (
            <button
              key={opt.value}
              className={`block w-full text-left px-4 py-3 text-sm uppercase transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                language === opt.value
                  ? theme === "dark"
                    ? "bg-blue-600/20 text-blue-300 border-l-2 border-blue-400"
                    : "bg-blue-100/50 text-[#52C3C5] border-l-2 border-[#52C3C5]/80"
                  : theme === "dark"
                  ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
              onClick={() => handleLanguageSelect(opt.value)}
              role="option"
              aria-selected={language === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
