import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import socialHero from "../../assets/services/Social-Media.webp";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import {
  HiDocumentText,
  HiCalendar,
  HiUserGroup,
  HiChartBar,
  HiCurrencyDollar,
  HiLightningBolt,
  HiCheckCircle,
  HiBadgeCheck,
  HiGlobe,
} from "react-icons/hi";
import TikitTitle from "../../components/TikitTitle";
import SEOHead from "../../components/SEOHead";
import FAQ from "../../components/FAQ";

gsap.registerPlugin(ScrollTrigger);

const SocialMediaManagement = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const platformsRef = useRef(null);
  const benefitsRef = useRef(null);
  const definitionRef = useRef(null);
  const trustRef = useRef(null);

  // Scroll to top on mount
  useScrollToTop();

  // FAQ items from translations (for display and schema)
  const faqItems = t("serviceSections.socialMediaManagement.faqItems", { returnObjects: true });

  // Structured data for this service page
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://tikit.ae/services/social-media-management#service",
    "name": "Social Media Management Services",
    "description": "Social media management is the ongoing process of creating and publishing content, monitoring engagement, and growing an audience across social media platforms. This service includes content strategy, post creation, community management, analytics tracking, and paid social advertising to build brand presence and drive business results.",
    "provider": {
      "@type": "Organization",
      "name": "Tikit Agency",
      "url": "https://tikit.ae",
      "telephone": "+971 4 577 4042",
      "email": "Holla@tikit.ae",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Burlington Tower, Marasi Drive, Office 309",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    "serviceType": "Social Media Management",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Social Media Management Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Content Creation and Planning" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Community Management" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paid Social Advertising" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Analytics and Reporting" }}
      ]
    }
  };

  useEffect(() => {
    let ctx;
    
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        // Hero animation
        if (heroRef.current) {
          const heroElements = heroRef.current.querySelectorAll(".hero-animate");
          if (heroElements.length > 0) {
            gsap.fromTo(
              heroElements,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        // Services animation
        if (servicesRef.current) {
          const serviceCards = servicesRef.current.querySelectorAll(".service-card");
          if (serviceCards.length > 0) {
            gsap.fromTo(
              serviceCards,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: servicesRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        // Platforms animation
        if (platformsRef.current) {
          const platformCards = platformsRef.current.querySelectorAll(".platform-card");
          if (platformCards.length > 0) {
            gsap.fromTo(
              platformCards,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: platformsRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        // Benefits animation
        if (benefitsRef.current) {
          const benefitItems = benefitsRef.current.querySelectorAll(".benefit-item");
          if (benefitItems.length > 0) {
            gsap.fromTo(
              benefitItems,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: benefitsRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (ctx) ctx.revert();
    };
  }, []);

  const platforms = [
    { name: "Instagram", icon: FaInstagram, color: "#E4405F" },
    { name: "Facebook", icon: FaFacebook, color: "#1877F2" },
    { name: "Twitter", icon: FaTwitter, color: "#1DA1F2" },
    { name: "LinkedIn", icon: FaLinkedin, color: "#0A66C2" },
    { name: "TikTok", icon: FaTiktok, color: "#000000" },
    { name: "YouTube", icon: FaYoutube, color: "#FF0000" },
  ];

  return (
    <div
    data-nav-color="black"
      className={`min-h-screen bg-[var(--background)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title="Social Media Management Services UAE | Expert Social Media Agency"
        description="Professional social media management services in UAE. We create content, manage communities, and grow your brand across Instagram, TikTok, Facebook, LinkedIn. Data-driven strategies for measurable results."
        keywords="social media management UAE, social media agency Dubai, Instagram management, TikTok marketing UAE, Facebook management, LinkedIn marketing, social media marketing Dubai, content creation UAE"
        canonicalUrl="/services/social-media-management"
        serviceType="Social Media Management"
        structuredData={serviceSchema}
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Social Media Management", url: "/services/social-media-management" }
        ]}
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20 px-6"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src={socialHero}
            alt="Social Media Management"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/60 to-[var(--background)]" />
        </div>

        <div className="relative mt-10 z-10 max-w-6xl mx-auto text-center">
          <span className="hero-animate inline-block px-6 py-2 mb-6 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-semibold uppercase tracking-wider">
            {t("serviceSections.socialMediaManagement.badge")}
          </span>
          <TikitTitle title={t("serviceSections.socialMediaManagement.hero.title")} mainWord={t("serviceSections.socialMediaManagement.hero.mainWord")} />
          <p className="hero-animate text-lg md:text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto leading-relaxed">
            {t("serviceSections.socialMediaManagement.hero.description")}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Service Definition Section - SEO Optimized */}
      <section ref={definitionRef} className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-6 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.socialMediaManagement.definition.whatIsTitle")}
          </h2>
          <p className="text-lg text-[var(--foreground)]/80 leading-relaxed mb-8">
            {t("serviceSections.socialMediaManagement.definition.paragraph")}
          </p>

          {/* Key Benefits - Bullet List */}
          <div className="mb-8">
            <h3 className={`text-xl font-bold text-[var(--foreground)] mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
              {t("serviceSections.socialMediaManagement.definition.benefitsTitle")}
            </h3>
            <ul className="space-y-3">
              {t("serviceSections.socialMediaManagement.definition.benefitsList", { returnObjects: true }).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <HiCheckCircle className="w-6 h-6 text-[#52C3C5] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--foreground)]/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How It Works - Numbered List */}
          <div>
            <h3 className={`text-xl font-bold text-[var(--foreground)] mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
              {t("serviceSections.socialMediaManagement.definition.processTitle")}
            </h3>
            <ol className="space-y-3">
              {t("serviceSections.socialMediaManagement.definition.processSteps", { returnObjects: true }).map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#52C3C5] text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                  <span className="text-[var(--foreground)]/80">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.socialMediaManagement.services.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.socialMediaManagement.services.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiDocumentText className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.socialMediaManagement.services.items.contentCreation.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.socialMediaManagement.services.items.contentCreation.description")}
              </p>
            </div>

            {/* Service 2 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiCalendar className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.socialMediaManagement.services.items.contentPlanning.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.socialMediaManagement.services.items.contentPlanning.description")}
              </p>
            </div>

            {/* Service 3 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiUserGroup className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.socialMediaManagement.services.items.communityManagement.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.socialMediaManagement.services.items.communityManagement.description")}
              </p>
            </div>

            {/* Service 4 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiChartBar className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.socialMediaManagement.services.items.analytics.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.socialMediaManagement.services.items.analytics.description")}
              </p>
            </div>

            {/* Service 5 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiCurrencyDollar className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.socialMediaManagement.services.items.paidAdvertising.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.socialMediaManagement.services.items.paidAdvertising.description")}
              </p>
            </div>

            {/* Service 6 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiLightningBolt className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.socialMediaManagement.services.items.crisisManagement.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.socialMediaManagement.services.items.crisisManagement.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Platforms Section */}
      <section ref={platformsRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.socialMediaManagement.platforms.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.socialMediaManagement.platforms.description")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {platforms.map((platform, idx) => (
              <div
                key={idx}
                className="platform-card group relative p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
              >
                <platform.icon className="w-12 h-12 md:w-16 md:h-16 text-[var(--foreground)] group-hover:text-[#52C3C5] transition-colors duration-300 mb-3" />
                <p className="text-sm font-semibold text-[var(--foreground)] text-center">
                  {platform.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.socialMediaManagement.benefits.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.socialMediaManagement.benefits.description")}
          </p>

          <div className="space-y-6">
            {[
              {
                title: t("serviceSections.socialMediaManagement.benefits.items.dataDriven.title"),
                desc: t("serviceSections.socialMediaManagement.benefits.items.dataDriven.description"),
              },
              {
                title: t("serviceSections.socialMediaManagement.benefits.items.creative.title"),
                desc: t("serviceSections.socialMediaManagement.benefits.items.creative.description"),
              },
              {
                title: t("serviceSections.socialMediaManagement.benefits.items.monitoring.title"),
                desc: t("serviceSections.socialMediaManagement.benefits.items.monitoring.description"),
              },
              {
                title: t("serviceSections.socialMediaManagement.benefits.items.reporting.title"),
                desc: t("serviceSections.socialMediaManagement.benefits.items.reporting.description"),
              },
              {
                title: t("serviceSections.socialMediaManagement.benefits.items.expertise.title"),
                desc: t("serviceSections.socialMediaManagement.benefits.items.expertise.description"),
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="benefit-item flex items-start gap-4 p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#52C3C5] flex items-center justify-center">
                  <HiCheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--foreground)]/70">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us Section - Entity & Trust Signals */}
      <section ref={trustRef} className="py-20 px-6 bg-[var(--foreground)]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.socialMediaManagement.trust.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-12 max-w-2xl mx-auto">
            {t("serviceSections.socialMediaManagement.trust.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiBadgeCheck className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.socialMediaManagement.trust.card1Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.socialMediaManagement.trust.card1Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiGlobe className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.socialMediaManagement.trust.card2Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.socialMediaManagement.trust.card2Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiUserGroup className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.socialMediaManagement.trust.card3Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.socialMediaManagement.trust.card3Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiChartBar className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.socialMediaManagement.trust.card4Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.socialMediaManagement.trust.card4Desc")}</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[var(--foreground)]/70 max-w-3xl mx-auto">
              {t("serviceSections.socialMediaManagement.trust.paragraph")}
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* FAQ Section */}
      <FAQ 
        items={Array.isArray(faqItems) ? faqItems : []} 
        title={t("serviceSections.socialMediaManagement.faqTitle")}
      />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.socialMediaManagement.cta.title")}
          </h2>
          <p className="text-[var(--foreground)]/70 text-lg mb-8">
            {t("serviceSections.socialMediaManagement.cta.description")}
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#52C3C5] rounded-full hover:bg-[#1C6F6C] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#52C3C5]/30"
          >
            {t("serviceSections.socialMediaManagement.cta.button")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaManagement;

