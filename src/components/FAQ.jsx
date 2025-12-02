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
  const { t } = useTranslation();
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

// Pre-defined FAQ items for common pages
export const getHomeFAQItems = (t) => [
  {
    question: t("faq.home.q1", "What is Tikit Agency?"),
    answer: t("faq.home.a1", "Tikit Agency is a leading influencer marketing and talent management agency based in Dubai, UAE, with offices in Saudi Arabia, Istanbul (Turkey), and Syria. We connect brands with authentic creators to drive real engagement and measurable ROI across the GCC and MENA region. With 300+ happy clients and 50+ team members, we're one of the top influencer marketing agencies in the Middle East.")
  },
  {
    question: t("faq.home.q2", "What services does Tikit Agency offer?"),
    answer: t("faq.home.a2", "Tikit Agency offers comprehensive marketing services including: Influencer Marketing, Talent Management, Social Media Marketing, Branding & Identity Design, Content Production, Web Development, and Digital Marketing. We serve clients across Dubai, Abu Dhabi, Saudi Arabia (Riyadh, Jeddah), Istanbul (Turkey), and the broader MENA region.")
  },
  {
    question: t("faq.home.q3", "How can I contact Tikit Agency?"),
    answer: t("faq.home.a3", "You can contact Tikit Agency at +971 56 888 1133 or email Hello@tikit.ae. Our main office is located in Jumeirah 1, Dubai, UAE. We also have offices in Saudi Arabia, Istanbul (Turkey), and Syria. Follow us on Instagram @tikit.ae for updates.")
  },
  {
    question: t("faq.home.q4", "Does Tikit work with influencers in Saudi Arabia?"),
    answer: t("faq.home.a4", "Yes! Tikit Agency has a dedicated office in Saudi Arabia and works with top influencers across Riyadh, Jeddah, and the entire Kingdom. We're recognized as one of the best influencer marketing agencies in KSA, helping brands connect with authentic Saudi content creators.")
  },
  {
    question: t("faq.home.q5", "How do I become an influencer with Tikit?"),
    answer: t("faq.home.a5", "Content creators can register with Tikit Agency through our Influencer Registration page. We offer three plans: Management, Affiliate, and Premium, each providing different levels of support including brand deal negotiations, contract review, dedicated account management, and international opportunities.")
  }
];

export const getServicesFAQItems = (t) => [
  {
    question: t("faq.services.q1", "What makes Tikit different from other influencer agencies?"),
    answer: t("faq.services.a1", "Tikit Agency combines data-driven matchmaking with authentic creator relationships. Unlike traditional agencies, we focus on ROI and measurable results. Our team of 50+ experts, presence in Dubai and Saudi Arabia, and track record of 300+ happy clients make us a trusted partner for brands seeking real impact in the GCC market.")
  },
  {
    question: t("faq.services.q2", "How does influencer marketing work with Tikit?"),
    answer: t("faq.services.a2", "Our influencer marketing process includes: 1) Understanding your brand goals, 2) Data-backed influencer matching, 3) Campaign strategy development, 4) Content creation and approval, 5) Campaign execution across platforms, 6) Real-time analytics and reporting. We handle everything from nano-influencers to celebrity partnerships.")
  },
  {
    question: t("faq.services.q3", "What platforms does Tikit cover?"),
    answer: t("faq.services.a3", "Tikit Agency manages influencer campaigns across all major platforms including Instagram, TikTok, YouTube, Snapchat, Twitter/X, LinkedIn, and Facebook. We specialize in platforms popular in the MENA region and can customize campaigns for specific audience segments.")
  }
];

export default FAQ;

