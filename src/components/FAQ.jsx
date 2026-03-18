import React, { useState } from "react";
import { useI18nLanguage } from "../store/I18nLanguageContext";

/**
 * FAQ Component (UI only).
 * Structured data is centralized in SEOHead to avoid duplicates.
 */
const FAQ = ({ items = [], title, className = "" }) => {
  const { isRtl } = useI18nLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) return null;

  return (
    <section 
      className={`faq-section py-12 md:py-20 ${className}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6 md:px-10">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[var(--foreground)]">
            {title}
          </h2>
        )}
        
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-[var(--secondary)]/20 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left bg-[var(--background)] hover:bg-[var(--secondary)]/5 transition-colors"
                aria-expanded={openIndex === index}
              >
                <h3 
                  className="text-lg font-medium text-[var(--foreground)] pr-4"
                >
                  {item.question}
                </h3>
                <span className={`text-[var(--secondary)] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div 
                  className="px-6 py-4 text-[var(--foreground)]/80 bg-[var(--secondary)]/5"
                >
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { getHomeFAQItems, getServicesFAQItems } from "../utils/faqUtils.js";

export default FAQ;

