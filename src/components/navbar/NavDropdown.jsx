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
  const [expandedKeys, setExpandedKeys] = useState({});
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
    setExpandedKeys({});
    if (onClose) onClose();
  };

  const toggleItem = (key) => {
    setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
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

  const renderItems = (menuItems, level = 0, parentKey = "root") =>
    menuItems.map((item, index) => {
      const itemKey = `${parentKey}-${index}`;
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
      const isExpanded = !!expandedKeys[itemKey];

      return (
        <div
          key={`${item.to || item.label}-${itemKey}`}
          className={isMobile ? "w-full" : level === 0 ? "inline-block" : "w-full"}
        >
          <button
            onClick={() => {
              if (hasChildren) {
                toggleItem(itemKey);
                return;
              }
              if (item.to) handleItemClick(item.to);
            }}
            className={`${
              isMobile ? "w-full" : level === 0 ? "w-auto" : "w-full"
            } flex items-center justify-between text-left transition-all duration-200 rounded-lg ${
              isMobile
                ? `text-xl md:text-2xl font-light uppercase tracking-wider py-3 px-5 ${
                    level > 0
                      ? "ms-4 md:ms-6 text-lg md:text-xl normal-case tracking-normal font-normal opacity-90"
                      : "font-medium"
                  }`
                : `py-3.5 px-5 ${
                    level > 0
                      ? "ms-3 text-[13px] font-normal opacity-90"
                      : "text-sm font-semibold uppercase tracking-wide"
                  }`
            } text-[var(--foreground)] hover:bg-[var(--container-bg)] dark:hover:bg-[var(--container-bg)]`}
          >
            <span className="inline-flex items-center gap-2">
              {level > 0 ? <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]/70" /> : null}
              {item.label}
            </span>
            {hasChildren ? <Chevron rotated={isExpanded} /> : null}
          </button>

          {hasChildren ? (
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                isExpanded ? "max-h-[1000px] opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className={`${isMobile ? "flex flex-col gap-2" : "flex flex-col gap-1"} pb-1`}>
                {renderItems(item.children, level + 1, itemKey)}
              </div>
            </div>
          ) : null}
        </div>
      );
    });

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
          <div className="flex flex-col gap-3">{renderItems(items)}</div>
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
        className={`absolute ${isRtl ? "left-0" : "right-0"} mt-2 min-w-[260px] rounded-lg z-50 overflow-hidden transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } bg-[var(--background)] dark:bg-[var(--container-bg)] backdrop-blur-md border border-[var(--foreground)]/20 dark:border-white/20 shadow-lg`}
      >
        <div className="py-1 flex flex-row items-stretch gap-1">{renderItems(items)}</div>
      </div>
    </div>
  );
}