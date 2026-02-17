import React, { useState, useRef, useEffect } from "react";

/**
 * Lightweight Accordion Component with Smooth Animations
 * Replaces Ant Design Collapse to improve performance
 * ~2KB vs ~700KB (antd)
 * Uses Tailwind CSS for smooth transitions
 */
const Accordion = ({ items = [], accordion = false, expandIconPosition = "end", className = "" }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const contentRefs = useRef({});

  const toggleItem = (key) => {
    if (accordion) {
      // Only one item open at a time
      setOpenKeys(openKeys.includes(key) ? [] : [key]);
    } else {
      // Multiple items can be open
      setOpenKeys((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    }
  };

  // Set max-height dynamically for smooth animation
  useEffect(() => {
    Object.keys(contentRefs.current).forEach((key) => {
      const element = contentRefs.current[key];
      if (element) {
        const innerElement = element.querySelector("div");
        if (openKeys.includes(key)) {
          // Set max-height to scrollHeight for smooth expansion
          const height = innerElement?.scrollHeight || 0;
          element.style.maxHeight = `${height}px`;
          // Force reflow to ensure transition starts
          element.offsetHeight;
        } else {
          element.style.maxHeight = "0px";
        }
      }
    });
  }, [openKeys]);

  return (
    <div className={`w-full ${className}`}>
      {items.map((item) => {
        const isOpen = openKeys.includes(item.key);

        return (
          <div
            key={item.key}
            className={`
              bg-[var(--container-bg)]
              border border-[var(--foreground)]/10
              dark:border-white/20
              rounded-2xl
              mb-4
              overflow-hidden
              transition-all duration-300 ease-out
              hover:border-[var(--secondary)]
              hover:shadow-lg hover:shadow-[var(--secondary)]/15
              ${isOpen ? "border-[var(--secondary)] shadow-xl shadow-[var(--secondary)]/20" : ""}
            `}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.key)}
              className={`
                w-full
                px-6 py-5
                md:px-6 md:py-5
                flex items-center gap-4
                bg-transparent
                border-none
                cursor-pointer
                text-left
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]
                rounded-t-2xl
                ${isOpen ? "rounded-b-none" : "rounded-b-2xl"}
              `}
              aria-expanded={isOpen}
              aria-controls={`faq-content-${item.key}`}
            >
              {expandIconPosition === "start" && (
                <span className="flex-shrink-0 w-5 h-5 text-[var(--secondary)]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-500 ease-out ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              )}
              <div className="flex-1">{item.label}</div>
              {expandIconPosition === "end" && (
                <span className="flex-shrink-0 w-5 h-5 text-[var(--secondary)]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-500 ease-out ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              )}
            </button>
            <div
              id={`faq-content-${item.key}`}
              ref={(el) => (contentRefs.current[item.key] = el)}
              className={`
                overflow-hidden
                transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                border-t border-[var(--foreground)]/10 dark:border-white/10
              `}
              style={{
                opacity: isOpen ? 1 : 0,
              }}
              aria-hidden={!isOpen}
            >
              <div
                className={`
                  px-6 py-4
                  md:px-6 md:py-4
                  transition-all duration-500 ease-out
                  ${isOpen ? "translate-y-0 opacity-100 delay-75" : "-translate-y-2 opacity-0"}
                `}
              >
                {item.children}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
