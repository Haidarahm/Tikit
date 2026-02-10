import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import {
  HiColorSwatch,
  HiLightBulb,
  HiTemplate,
  HiBookOpen,
  HiCube,
  HiRefresh,
  HiCheckCircle,
  HiBadgeCheck,
  HiGlobe,
  HiUserGroup,
  HiChartBar,
} from "react-icons/hi";
import {
  MdBrush,
  MdPalette,
  MdTextFields,
  MdDashboard,
  MdCreditCard,
  MdDescription,
  MdEmail,
  MdPhoneIphone,
  MdCardGiftcard,
  MdLocalMall,
  MdDirectionsCar,
  MdStorefront,
} from "react-icons/md";
import TikitTitle from "../../components/TikitTitle";
import SEOHead from "../../components/SEOHead";
import FAQ from "../../components/FAQ";

gsap.registerPlugin(ScrollTrigger);

const Branding = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const elementsRef = useRef(null);
  const definitionRef = useRef(null);
  const trustRef = useRef(null);

  // FAQ items from translations (for display and schema)
  const faqItems = t("serviceSections.branding.faqItems", { returnObjects: true });

  // Structured data for this service page
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://tikit.ae/services/branding#service",
    "name": "Branding and Identity Design Services",
    "description": "Branding is the strategic process of creating a unique identity for a business or product. It encompasses visual elements such as logo design, color palette, typography, and imagery, combined with brand messaging, voice, and values to create a cohesive identity that resonates with target audiences and differentiates the business from competitors.",
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
    "serviceType": "Branding and Identity Design",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Branding Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Strategy Development" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Logo Design" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Visual Identity Systems" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Guidelines" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Packaging Design" }}
      ]
    }
  };

  useEffect(() => {
    let ctx;
    
    // Small delay to ensure DOM is ready
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

        // Process animation
        if (processRef.current) {
          const processItems = processRef.current.querySelectorAll(".process-item");
          if (processItems.length > 0) {
            gsap.fromTo(
              processItems,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
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

        // Elements animation
        if (elementsRef.current) {
          const elementCards = elementsRef.current.querySelectorAll(".element-card");
          if (elementCards.length > 0) {
            gsap.fromTo(
              elementCards,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: elementsRef.current,
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
        title="Branding Services UAE | Brand Identity Design Agency Dubai"
        description="Professional branding services in UAE. We create distinctive brand identities including logo design, visual identity systems, brand strategy, and guidelines. 300+ brands created with 15+ years of experience."
        keywords="branding agency UAE, brand identity design Dubai, logo design UAE, branding company Dubai, visual identity, brand guidelines, packaging design UAE, corporate branding Dubai"
        canonicalUrl="/services/branding"
        serviceType="Branding and Identity Design"
        structuredData={serviceSchema}
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Branding", url: "/services/branding" }
        ]}
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20 px-6"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#52C3C5]/30 via-transparent to-[#1C6F6C]/30" />
        </div>

        <div className="relative mt-10 z-10 max-w-6xl mx-auto text-center">
          <span className="hero-animate inline-block px-6 py-2 mb-6 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-semibold uppercase tracking-wider">
            {t("serviceSections.branding.badge")}
          </span>

          <TikitTitle
            className="hero-animate block"
            title={t("serviceSections.branding.hero.title")}
            mainWord={t("serviceSections.branding.hero.mainWord")}
            disableAnimation
          />
          <p className="hero-animate text-lg md:text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto leading-relaxed">
            {t("serviceSections.branding.hero.description")}
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
            {t("serviceSections.branding.definition.whatIsTitle")}
          </h2>
          <p className="text-lg text-[var(--foreground)]/80 leading-relaxed mb-8">
            {t("serviceSections.branding.definition.paragraph")}
          </p>

          {/* Key Benefits - Bullet List */}
          <div className="mb-8">
            <h3 className={`text-xl font-bold text-[var(--foreground)] mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
              {t("serviceSections.branding.definition.benefitsTitle")}
            </h3>
            <ul className="space-y-3">
              {t("serviceSections.branding.definition.benefitsList", { returnObjects: true }).map((item, idx) => (
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
              {t("serviceSections.branding.definition.processTitle")}
            </h3>
            <ol className="space-y-3">
              {t("serviceSections.branding.definition.processSteps", { returnObjects: true }).map((step, idx) => (
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
            {t("serviceSections.branding.services.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.branding.services.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiColorSwatch className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.branding.services.items.brandStrategy.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.branding.services.items.brandStrategy.description")}
              </p>
            </div>

            {/* Service 2 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiLightBulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.branding.services.items.logoDesign.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.branding.services.items.logoDesign.description")}
              </p>
            </div>

            {/* Service 3 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiTemplate className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.branding.services.items.visualIdentity.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.branding.services.items.visualIdentity.description")}
              </p>
            </div>

            {/* Service 4 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiBookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.branding.services.items.brandGuidelines.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.branding.services.items.brandGuidelines.description")}
              </p>
            </div>

            {/* Service 5 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiCube className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.branding.services.items.packagingDesign.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.branding.services.items.packagingDesign.description")}
              </p>
            </div>

            {/* Service 6 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiRefresh className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.branding.services.items.brandRefresh.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                {t("serviceSections.branding.services.items.brandRefresh.description")}
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
            {t("serviceSections.branding.process.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.branding.process.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                step: "01",
                title: t("serviceSections.branding.process.steps.discovery.title"),
                desc: t("serviceSections.branding.process.steps.discovery.description"),
              },
              {
                step: "02",
                title: t("serviceSections.branding.process.steps.strategy.title"),
                desc: t("serviceSections.branding.process.steps.strategy.description"),
              },
              {
                step: "03",
                title: t("serviceSections.branding.process.steps.visual.title"),
                desc: t("serviceSections.branding.process.steps.visual.description"),
              },
              {
                step: "04",
                title: t("serviceSections.branding.process.steps.refinement.title"),
                desc: t("serviceSections.branding.process.steps.refinement.description"),
              },
              {
                step: "05",
                title: t("serviceSections.branding.process.steps.system.title"),
                desc: t("serviceSections.branding.process.steps.system.description"),
              },
              {
                step: "06",
                title: t("serviceSections.branding.process.steps.launch.title"),
                desc: t("serviceSections.branding.process.steps.launch.description"),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="process-item relative p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center text-white font-bold shadow-lg shadow-[#52C3C5]/30 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 mt-4">
                  {item.title}
                </h3>
                <p className="text-[var(--foreground)]/70 leading-relaxed">
                  {item.desc}
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

      {/* Brand Elements Section */}
      <section ref={elementsRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.branding.elements.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.branding.elements.description")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {t("serviceSections.branding.elements.items", { returnObjects: true }).map((itemTitle, idx) => {
              const elementIcons = [
                MdBrush,
                MdPalette,
                MdTextFields,
                MdDashboard,
                MdCreditCard,
                MdDescription,
                MdEmail,
                MdPhoneIphone,
                MdCardGiftcard,
                MdLocalMall,
                MdDirectionsCar,
                MdStorefront,
              ];
              const IconComponent = elementIcons[idx];
              return (
                <div
                  key={idx}
                  className="element-card group text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#52C3C5]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-[#52C3C5]" />
                  </div>
                  <p className="text-[var(--foreground)] font-semibold text-sm">
                    {itemTitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <h3 className="text-4xl md:text-5xl font-bold text-[#52C3C5] mb-2">
                300+
              </h3>
              <p className="text-[var(--foreground)]/70 text-sm md:text-base">
                {t("serviceSections.branding.stats.brandsCreated")}
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <h3 className="text-4xl md:text-5xl font-bold text-[#52C3C5] mb-2">
                15+
              </h3>
              <p className="text-[var(--foreground)]/70 text-sm md:text-base">
                {t("serviceSections.branding.stats.yearsExperience")}
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <h3 className="text-4xl md:text-5xl font-bold text-[#52C3C5] mb-2">
                25+
              </h3>
              <p className="text-[var(--foreground)]/70 text-sm md:text-base">
                {t("serviceSections.branding.stats.industryAwards")}
              </p>
            </div>
         
          </div>
        </div>
      </section>

      {/* Why Trust Us Section - Entity & Trust Signals */}
      <section ref={trustRef} className="py-20 px-6 bg-[var(--foreground)]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.branding.trust.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-12 max-w-2xl mx-auto">
            {t("serviceSections.branding.trust.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiBadgeCheck className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.branding.trust.card1Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.branding.trust.card1Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiGlobe className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.branding.trust.card2Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.branding.trust.card2Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiUserGroup className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.branding.trust.card3Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.branding.trust.card3Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="w-12 h-12 rounded-full bg-[#52C3C5]/10 flex items-center justify-center mb-4">
                <HiChartBar className="w-6 h-6 text-[#52C3C5]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{t("serviceSections.branding.trust.card4Title")}</h3>
              <p className="text-[var(--foreground)]/70 text-sm">{t("serviceSections.branding.trust.card4Desc")}</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[var(--foreground)]/70 max-w-3xl mx-auto">
              {t("serviceSections.branding.trust.paragraph")}
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
        title={t("serviceSections.branding.faqTitle")}
      />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.branding.cta.title")}
          </h2>
          <p className="text-[var(--foreground)]/70 text-lg mb-8">
            {t("serviceSections.branding.cta.description")}
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#52C3C5] rounded-full hover:bg-[#1C6F6C] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#52C3C5]/30"
          >
            {t("serviceSections.branding.cta.button")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Branding;

