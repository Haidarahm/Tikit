import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../store/I18nLanguageContext";

/**
 * FAQ Component with built-in Schema.org FAQPage structured data
 * Optimized for AI Engine Optimization (AEO)
 * 
 * Usage:
 * <FAQ items={[{ question: "...", answer: "..." }]} />
 */
const FAQ = ({ items = [], title, className = "" }) => {
  const { isRtl } = useI18nLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  // Inject FAQ Schema into head
  useEffect(() => {
    if (!items || items.length === 0) return;

    const scriptId = "faq-structured-data";
    let scriptTag = document.getElementById(scriptId);
    
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": items.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(faqSchema);

    return () => {
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [items]);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) return null;

  return (
    <section 
      className={`faq-section py-12 md:py-20 ${className}`}
      dir={isRtl ? "rtl" : "ltr"}
      itemScope 
      itemType="https://schema.org/FAQPage"
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
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left bg-[var(--background)] hover:bg-[var(--secondary)]/5 transition-colors"
                aria-expanded={openIndex === index}
              >
                <h3 
                  className="text-lg font-medium text-[var(--foreground)] pr-4"
                  itemProp="name"
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
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="px-6 py-4 text-[var(--foreground)]/80 bg-[var(--secondary)]/5"
                  itemProp="text"
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

