import React, { useState } from "react";

/**
 * Lightweight Accordion Component
 * Replaces Ant Design Collapse to improve performance
 * ~2KB vs ~700KB (antd)
 */
const Accordion = ({ items = [], accordion = false, expandIconPosition = "end", className = "" }) => {
  const [openKeys, setOpenKeys] = useState([]);

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

  return (
    <div className={`faq-accordion ${className}`}>
      {items.map((item) => {
        const isOpen = openKeys.includes(item.key);
        const iconPosition = expandIconPosition === "start" ? "left" : "right";

        return (
          <div
            key={item.key}
            className={`faq-accordion-item ${isOpen ? "faq-accordion-item-active" : ""}`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.key)}
              className="faq-accordion-header"
              aria-expanded={isOpen}
              aria-controls={`faq-content-${item.key}`}
            >
              {expandIconPosition === "start" && (
                <span className="faq-accordion-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isOpen ? "rotate-180" : ""}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              )}
              <div className="faq-accordion-label">{item.label}</div>
              {expandIconPosition === "end" && (
                <span className="faq-accordion-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isOpen ? "rotate-180" : ""}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              )}
            </button>
            <div
              id={`faq-content-${item.key}`}
              className={`faq-accordion-content ${isOpen ? "faq-accordion-content-open" : ""}`}
              aria-hidden={!isOpen}
            >
              <div className="faq-accordion-content-inner">{item.children}</div>
            </div>
          </div>
        );
      })}
      <style jsx global>{`
        .faq-accordion {
          width: 100%;
        }

        .faq-accordion-item {
          background: var(--container-bg);
          border: 1px solid rgba(var(--foreground-rgb, 54, 55, 55), 0.1);
          border-radius: 16px;
          margin-bottom: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .dark .faq-accordion-item {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .faq-accordion-item:hover {
          border-color: var(--secondary);
          box-shadow: 0 4px 12px rgba(82, 195, 197, 0.15);
        }

        .faq-accordion-item-active {
          border-color: var(--secondary) !important;
          box-shadow: 0 8px 24px rgba(82, 195, 197, 0.2);
        }

        .faq-accordion-header {
          width: 100%;
          padding: 20px 24px;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
        }

        .faq-accordion-header:focus {
          outline: 2px solid var(--secondary);
          outline-offset: -2px;
        }

        .faq-accordion-label {
          flex: 1;
        }

        .faq-accordion-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          color: var(--secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-accordion-icon svg {
          width: 100%;
          height: 100%;
        }

        .faq-accordion-icon.rotate-180 {
          transform: rotate(180deg);
        }

        .faq-accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-top: 1px solid rgba(var(--foreground-rgb, 54, 55, 55), 0.1);
        }

        .dark .faq-accordion-content {
          border-top-color: rgba(255, 255, 255, 0.1);
        }

        .faq-accordion-content-open {
          max-height: 2000px; /* Large enough for content */
        }

        .faq-accordion-content-inner {
          padding: 16px 24px;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .faq-accordion-header {
            padding: 16px;
          }

          .faq-accordion-content-inner {
            padding: 12px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Accordion;
