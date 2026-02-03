import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import influencerHero from "../../assets/services/Influencer-Marketing.webp";
import influencer1 from "../../assets/influencers/Ahmed ben chaibah.webp";
import influencer2 from "../../assets/influencers/hessa alfalasi.webp";
import influencer3 from "../../assets/influencers/amira mohamed.webp";
import influencer4 from "../../assets/influencers/Sultan Alsuwaidi.webp";
import TikitTitle from "../../components/TikitTitle";
import SEOHead from "../../components/SEOHead";
import FAQ from "../../components/FAQ";
import { HiCheckCircle, HiBadgeCheck, HiGlobe, HiUserGroup, HiChartBar } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const InfluencerMarketing = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const processRef = useRef(null);
  const showcaseRef = useRef(null);
  const definitionRef = useRef(null);
  const trustRef = useRef(null);

  // FAQ items from translations (for display and schema)
  const faqItems = t("serviceSections.influencerMarketing.faqItems", { returnObjects: true });

  // Structured data for this service page
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://tikit.ae/services/influencer-marketing#service",
    "name": "Influencer Marketing Services",
    "description": "Influencer marketing is a strategic approach that connects brands with content creators who have engaged audiences on social media platforms. This service involves identifying, vetting, and partnering with influencers to create authentic content that promotes products or services to targeted demographics across Instagram, TikTok, YouTube, and other platforms.",
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
    "serviceType": "Influencer Marketing",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Influencer Marketing Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Influencer Campaign Management" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Talent Sourcing and Vetting" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Content Strategy and Creation" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Campaign Analytics and Reporting" }}
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

        // Stats animation
        if (statsRef.current) {
          const statCards = statsRef.current.querySelectorAll(".stat-card");
          if (statCards.length > 0) {
            gsap.fromTo(
              statCards,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: statsRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        // Process cards animation
        if (processRef.current) {
          const processCards = processRef.current.querySelectorAll(".process-card");
          if (processCards.length > 0) {
            gsap.fromTo(
              processCards,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: processRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        // Showcase images animation
        if (showcaseRef.current) {
          const showcaseImages = showcaseRef.current.querySelectorAll(".showcase-image");
          if (showcaseImages.length > 0) {
            gsap.fromTo(
              showcaseImages,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: showcaseRef.current,
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

  return (
    <div
    data-nav-color="black"
      className={`min-h-screen bg-[var(--background)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title="Influencer Marketing Services UAE | Connect with Top Creators"
        description="Influencer marketing services in UAE connecting brands with authentic creators. Our agency matches brands with influencers across Instagram, TikTok, YouTube to drive engagement and measurable ROI. 500+ influencer network, 200+ campaigns."
        keywords="influencer marketing UAE, influencer agency Dubai, influencer marketing services, social media influencers UAE, Instagram marketing Dubai, TikTok influencers, YouTube influencer marketing, creator partnerships UAE"
        canonicalUrl="/services/influencer-marketing"
        serviceType="Influencer Marketing"
        structuredData={serviceSchema}
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Influencer Marketing", url: "/services/influencer-marketing" }
        ]}
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20 px-6"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src={influencerHero}
            alt="Influencer Marketing"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/60 to-[var(--background)]" />
        </div>

        <div className="relative z-10 mt-10 max-w-6xl mx-auto text-center">
          <span className="hero-animate inline-block px-6 py-2 mb-6 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-semibold uppercase tracking-wider">
            {t("serviceSections.influencerMarketing.badge")}
          </span>
         
          <TikitTitle title={t("serviceSections.influencerMarketing.hero.title")} mainWord={t("serviceSections.influencerMarketing.hero.mainWord")} />
          <p className="hero-animate text-lg md:text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto leading-relaxed">
            {t("serviceSections.influencerMarketing.hero.description")}
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
            {t("serviceSections.influencerMarketing.definition.whatIsTitle")}
          </h2>
          <p className="text-lg text-[var(--foreground)]/80 leading-relaxed mb-8">
            {t("serviceSections.influencerMarketing.definition.paragraph")}
          </p>

          {/* Key Benefits - Bullet List */}
          <div className="mb-8">
            <h3 className={`text-xl font-bold text-[var(--foreground)] mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
              {t("serviceSections.influencerMarketing.definition.benefitsTitle")}
            </h3>
            <ul className="space-y-3">
              {t("serviceSections.influencerMarketing.definition.benefitsList", { returnObjects: true }).map((item, idx) => (
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
              {t("serviceSections.influencerMarketing.definition.processTitle")}
            </h3>
            <ol className="space-y-3">
              {t("serviceSections.influencerMarketing.definition.processSteps", { returnObjects: true }).map((step, idx) => (
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

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="stat-card text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <h3 className="text-4xl md:text-5xl font-bold text-[#52C3C5] mb-2">
                500+
              </h3>
              <p className="text-[var(--foreground)]/70 text-sm md:text-base">
                {t("serviceSections.influencerMarketing.stats.influencersNetwork")}
              </p>
            </div>
            <div className="stat-card text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <h3 className="text-4xl md:text-5xl font-bold text-[#52C3C5] mb-2">
                200+
              </h3>
              <p className="text-[var(--foreground)]/70 text-sm md:text-base">
                {t("serviceSections.influencerMarketing.stats.successfulCampaigns")}
              </p>
            </div>
            <div className="stat-card text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <h3 className="text-4xl md:text-5xl font-bold text-[#52C3C5] mb-2">
                50M+
              </h3>
              <p className="text-[var(--foreground)]/70 text-sm md:text-base">
                {t("serviceSections.influencerMarketing.stats.totalReach")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Process Section */}
      <section ref={processRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.influencerMarketing.process.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.influencerMarketing.process.description")}
          </p>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="process-card flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#52C3C5] flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                  {t("serviceSections.influencerMarketing.process.steps.strategy.title")}
                </h3>
                <p className="text-[var(--foreground)]/70 leading-relaxed">
                  {t("serviceSections.influencerMarketing.process.steps.strategy.description")}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="process-card flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#52C3C5] flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                  {t("serviceSections.influencerMarketing.process.steps.selection.title")}
                </h3>
                <p className="text-[var(--foreground)]/70 leading-relaxed">
                  {t("serviceSections.influencerMarketing.process.steps.selection.description")}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="process-card flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#52C3C5] flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                  {t("serviceSections.influencerMarketing.process.steps.management.title")}
                </h3>
                <p className="text-[var(--foreground)]/70 leading-relaxed">
                  {t("serviceSections.influencerMarketing.process.steps.management.description")}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="process-card flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#52C3C5] flex items-center justify-center text-white text-2xl font-bold">
                4
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                  {t("serviceSections.influencerMarketing.process.steps.analytics.title")}
                </h3>
                <p className="text-[var(--foreground)]/70 leading-relaxed">
                  {t("serviceSections.influencerMarketing.process.steps.analytics.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Showcase Section */}
      <section ref={showcaseRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.influencerMarketing.showcase.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.influencerMarketing.showcase.description")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { img: influencer1, name: "Ahmed Ben Chaibah" },
              { img: influencer2, name: "Hessa Alfalasi" },
              { img: influencer3, name: "Sara Gazioglu" },
              { img: influencer4, name: "Sultan Alsuwaidi" },
            ].map((influencer, idx) => (
              <div
                key={idx}
                className="showcase-image group relative overflow-hidden rounded-2xl aspect-square"
              >
                <img
                  src={influencer.img}
                  alt={influencer.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm md:text-base">
                      {influencer.name}
                    </p>
                  </div>
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
            {t("serviceSections.influencerMarketing.trust.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-12 max-w-2xl mx-auto">
            {t("serviceSections.influencerMarketing.trust.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiBadgeCheck className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.influencerMarketing.trust.card1Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.influencerMarketing.trust.card1Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiGlobe className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.influencerMarketing.trust.card2Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.influencerMarketing.trust.card2Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiUserGroup className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.influencerMarketing.trust.card3Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.influencerMarketing.trust.card3Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiChartBar className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.influencerMarketing.trust.card4Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.influencerMarketing.trust.card4Desc")}</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[var(--foreground)]/70 max-w-3xl mx-auto">
              {t("serviceSections.influencerMarketing.trust.paragraph")}
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
        title={t("serviceSections.influencerMarketing.faqTitle")}
      />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.influencerMarketing.cta.title")}
          </h2>
          <p className="text-[var(--foreground)]/70 text-lg mb-8">
            {t("serviceSections.influencerMarketing.cta.description")}
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#52C3C5] rounded-full hover:bg-[#1C6F6C] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#52C3C5]/30"
          >
            {t("serviceSections.influencerMarketing.cta.button")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default InfluencerMarketing;

