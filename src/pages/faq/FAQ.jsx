import React, { useState } from "react";
import { 
  FaQuestionCircle, 
  FaCogs, 
  FaUsers, 
  FaMapMarkerAlt,
  FaClock,
  FaChartLine,
  FaGlobe,
  FaDollarSign,
  FaRocket,
  FaBullhorn
} from "react-icons/fa";
import SEOHead from "../../components/SEOHead";
import Footer from "../../components/Footer";
import Accordion from "../../components/ui/Accordion";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const { isRtl, language } = useI18nLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Icons for each question
  const icons = [
    <FaCogs className="text-[var(--secondary)]" />,
    <FaRocket className="text-[var(--secondary)]" />,
    <FaUsers className="text-[var(--secondary)]" />,
    <FaMapMarkerAlt className="text-[var(--secondary)]" />,
    <FaClock className="text-[var(--secondary)]" />,
    <FaBullhorn className="text-[var(--secondary)]" />,
    <FaGlobe className="text-[var(--secondary)]" />,
    <FaDollarSign className="text-[var(--secondary)]" />,
    <FaChartLine className="text-[var(--secondary)]" />,
    <FaRocket className="text-[var(--secondary)]" />
  ];

  // FAQ items from translations
  const faqItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => ({
    key: `q${num}`,
    label: (
      <div className="flex items-center gap-4 py-2">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center">
          {icons[index]}
        </div>
        <span
          className={`text-lg md:text-xl font-semibold text-[var(--foreground)] ${
            isRtl ? "font-cairo" : "font-antonio"
          }`}
        >
          {t(`faq.questions.q${num}.question`)}
        </span>
      </div>
    ),
    children: (
      <div className="pl-14 pr-4 pb-4">
        <p className="text-[var(--foreground)]/80 leading-relaxed text-base md:text-lg">
          {t(`faq.questions.q${num}.answer`)}
        </p>
      </div>
    ),
  }));


  return (
    <div
    data-nav-color="black"
      className={`min-h-screen bg-[var(--background)] ${isRtl ? "font-cairo" : "font-hero-light"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title="FAQ | Tikit Agency Dubai - Influencer Marketing Questions"
        description="Frequently asked questions about Tikit Agency. Learn about our influencer marketing process, pricing, team & services in Dubai and Saudi Arabia."
        keywords="Tikit Agency FAQ, influencer marketing questions, social media agency FAQ, Dubai marketing agency questions, how influencer marketing works"
        canonicalUrl="/faq"
        faqItems={[
          { question: "How does Tikit Agency work?", answer: "Our process includes strategy development, creator matching, content creation, campaign execution, and detailed analytics reporting." },
          { question: "What is your production process?", answer: "Our production workflow has four phases: Pre-Production, Production, Post-Production, and Delivery with professional equipment." },
          { question: "Who is on the Tikit team?", answer: "Our team consists of 50+ creative professionals including strategists, content creators, social media managers, and designers." },
          { question: "Where are Tikit's offices located?", answer: "Our headquarters is in Dubai at The Burlington Tower, Marasi Drive, Office 309. We also have offices in Saudi Arabia and Turkey." },
          { question: "How long does a typical campaign take?", answer: "Quick activations can launch in 1-2 weeks. Comprehensive campaigns take 4-8 weeks. Full-scale productions may require 6-12 weeks." },
          { question: "What platforms do you specialize in?", answer: "We manage campaigns across Instagram, TikTok, YouTube, Snapchat, Twitter/X, LinkedIn, and Facebook." }
        ]}
      />

      {/* Hero Section with Gradient */}
      <section className="relative py-20 md:py-32 px-6 md:px-10 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0  "></div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[var(--secondary)]/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[var(--secondary)]/5 blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{
              background: "linear-gradient(135deg, var(--secondary) 0%, rgba(82, 195, 197, 0.6) 100%)",
            }}
          >
            <FaQuestionCircle className="w-10 h-10 text-white" />
          </div>
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6 ${
              isRtl ? "font-cairo" : "font-antonio"
            }`}
          >
            {t("faq.title", "Frequently Asked Questions")}
          </h1>
          <p className="text-lg md:text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto">
            {t(
              "faq.subtitle",
              "Find answers to common questions about our services, processes, and how we can help your brand grow."
            )}
          </p>
        </div>
      </section>

      {/* FAQ Section with Custom Lightweight Accordion */}
      <section className="py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Accordion
            accordion={false}
            expandIconPosition={isRtl ? "start" : "end"}
            items={faqItems}
          />
        </div>
      </section>

      {/* CTA Section with modern design */}
      <section className="py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)]/20 via-[var(--secondary)]/10 to-transparent"></div>
            <div className="absolute inset-0 border-2 border-[var(--secondary)]/20 rounded-3xl"></div>
            
            {/* Content */}
            <div className="relative text-center">
              <h2
                className={`text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 ${
                  isRtl ? "font-cairo" : "font-antonio"
                }`}
              >
                {t("faq.cta.title", "Still have questions?")}
              </h2>
              <p className="text-[var(--foreground)]/70 mb-8 text-lg max-w-2xl mx-auto">
                {t(
                  "faq.cta.description",
                  "Get in touch with our team and we'll be happy to help you."
                )}
              </p>
              <button
                onClick={() => navigate("/contact-us")}
                className="group inline-flex items-center gap-3 bg-[var(--secondary)] hover:bg-[var(--secondary)]/90 text-[var(--background)] font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[var(--secondary)]/30 hover:shadow-[var(--secondary)]/50 hover:scale-105"
              >
                <span className="text-lg">{t("faq.cta.button", "Contact Us")}</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isRtl ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
