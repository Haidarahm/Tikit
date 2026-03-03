import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useNavColor } from "./hooks/useNavColor.js";

/**
 * NavDropdown — reusable nav dropdown for desktop & mobile.
 *
 * Props:
 *  label        {string}              — button label text
 *  items        {Array<{label, to}>}  — dropdown items with label + route
 *  isMobile     {boolean}             — renders mobile accordion style
 *  onClose      {function}            — called after navigation (mobile use)
 *
 * Usage (desktop):
 *   <NavDropdown
 *     label="Influencers"
 *     items={[
 *       { label: "Our Influencers",       to: "/influencer" },
 *       { label: "Register as Influencer", to: "/influencer-register" },
 *     ]}
 *   />
 *
 * Usage (mobile, inside MobileMenu):
 *   <NavDropdown
 *     label="Influencers"
 *     items={[...]}
 *     isMobile
 *     onClose={() => setIsMobileMenuOpen(false)}
 *   />
 */
export default function NavDropdown({ label, items = [], isMobile = false, onClose }) {
  const { isRtl } = useI18nLanguage();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const navColor = useNavColor();
  const textColor = navColor === "white" ? "text-white" : "text-[var(--foreground)]";

  /* ── Close on outside click (desktop only) ── */
  useEffect(() => {
    if (isMobile) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isMobile]);

  const handleItemClick = (to) => {
    navigate(to);
    setIsOpen(false);
    if (onClose) onClose();
  };

  /* ── Chevron SVG ── */
  const Chevron = ({ rotated }) => (
    <svg
      width={isMobile ? 14 : 12}
      height={isMobile ? 14 : 12}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ease-out ${rotated ? "rotate-90" : "rotate-0"}`}
    >
      <path
        d="M8 5l8 7-8 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  /* ════════════════════════════════════════
     MOBILE — accordion style
  ════════════════════════════════════════ */
  if (isMobile) {
    return (
      <div className="mobile-nav-item w-full flex flex-col">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="text-[var(--foreground)] text-3xl md:text-4xl uppercase tracking-wider hover:opacity-70 transition-colors duration-300 flex items-center justify-center gap-2"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span>{label}</span>
          <Chevron rotated={isOpen} />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex flex-col gap-3">
            {items.map(({ label: itemLabel, to }) => (
              <button
                key={to}
                onClick={() => handleItemClick(to)}
                className="text-xl md:text-2xl font-light uppercase tracking-wider transition-all duration-200 py-2 px-4 rounded-lg text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)] text-left"
              >
                {itemLabel}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════
     DESKTOP — floating dropdown
  ════════════════════════════════════════ */
  return (
    <div
      ref={dropdownRef}
      className={`relative transition-all duration-300 ${isOpen ? "dropdown-open" : ""}`}
    >
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`nav-item ${textColor} uppercase text-sm opacity-0 relative inline-flex items-center gap-1 transition-colors duration-300 ease-in-out hover:opacity-80`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="relative inline-block">
          {label}
          <span
            className="nav-underline absolute left-0 right-0 bottom-[-2px] h-[1px] bg-current origin-left block transition-transform duration-300 ease-out"
            style={{ transform: isOpen ? "scaleX(1)" : "scaleX(0)" }}
          />
        </span>
        <Chevron rotated={isOpen} />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute ${isRtl ? "left-0" : "right-0"} mt-2 min-w-[180px] rounded-lg z-50 overflow-hidden transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } bg-[var(--background)] dark:bg-[var(--container-bg)] backdrop-blur-md border border-[var(--foreground)]/20 dark:border-white/20 shadow-lg`}
      >
        {items.map(({ label: itemLabel, to }, index) => (
          <button
            key={to}
            onClick={() => handleItemClick(to)}
            className={`text-start block w-full px-4 py-3 text-sm transition-all duration-200 text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)] ${
              index === 0 ? "rounded-t-lg" : ""
            } ${index === items.length - 1 ? "rounded-b-lg" : ""}`}
          >
            {itemLabel}
          </button>
        ))}
      </div>
    </div>
  );
}