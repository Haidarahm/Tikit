import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  HiSearchCircle,
  HiCurrencyDollar,
  HiTrendingUp,
  HiCheckCircle,
  HiBadgeCheck,
  HiGlobe,
  HiUserGroup,
  HiLightningBolt,
} from "react-icons/hi";
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import DMCTA from "./components/DMCTA";
import "./digitalMarketing.css";

gsap.registerPlugin(ScrollTrigger);

const SUB_SERVICES = [
  {
    key: "seoServices",
    icon: HiSearchCircle,
    path: "/digital-marketing-agency-dubai/seo-services",
  },
  {
    key: "paidAds",
    icon: HiCurrencyDollar,
    path: "/digital-marketing-agency-dubai/paid-ads-management",
  },
  {
    key: "conversionOptimization",
    icon: HiTrendingUp,
    path: "/digital-marketing-agency-dubai/conversion-optimization",
  },
];

const DigitalMarketing = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const definitionRef = useRef(null);
  const trustRef = useRef(null);
  const statsRef = useRef(null);

  const faqItems = t("serviceSections.digitalMarketing.faqItems", { returnObjects: true });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://tikit.ae/digital-marketing-agency-dubai#service",
    name: "Digital Marketing Services Dubai",
    description: "Comprehensive digital marketing services in Dubai including SEO, paid ads management, and conversion optimization. Data-driven strategies for measurable growth.",
    provider: {
      "@type": "Organization",
      name: "Tikit Agency",
      url: "https://tikit.ae",
      telephone: "+971 4 577 4042",
      email: "Holla@tikit.ae",
      address: {
        "@type": "PostalAddress",
        streetAddress: "The Burlington Tower, Marasi Drive, Office 309",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    serviceType: "Digital Marketing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paid Ads Management" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conversion Rate Optimization" } },
      ],
    },
  };

  useEffect(() => {
    let ctx;
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        if (heroRef.current) {
          const els = heroRef.current.querySelectorAll(".hero-animate");
          if (els.length)
            gsap.fromTo(els, { opacity: 0, y: 60 }, {
              opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
              scrollTrigger: { trigger: heroRef.current, start: "top 85%", toggleActions: "play none none none" },
            });
        }

        if (servicesRef.current) {
          const cards = servicesRef.current.querySelectorAll(".dm-hub-card");
          if (cards.length)
            gsap.fromTo(cards, { opacity: 0, y: 50 }, {
              opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
              scrollTrigger: { trigger: servicesRef.current, start: "top 85%", toggleActions: "play none none none" },
            });
        }

        if (processRef.current) {
          const items = processRef.current.querySelectorAll(".dm-process-card");
          if (items.length)
            gsap.fromTo(items, { opacity: 0, y: 40 }, {
              opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
              scrollTrigger: { trigger: processRef.current, start: "top 85%", toggleActions: "play none none none" },
            });
        }

        if (statsRef.current) {
          const stats = statsRef.current.querySelectorAll(".dm-stat-card");
          if (stats.length)
            gsap.fromTo(stats, { opacity: 0, scale: 0.9 }, {
              opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)",
              scrollTrigger: { trigger: statsRef.current, start: "top 85%", toggleActions: "play none none none" },
            });
        }

        if (trustRef.current) {
          const cards = trustRef.current.querySelectorAll(".dm-trust-card");
          if (cards.length)
            gsap.fromTo(cards, { opacity: 0, x: -30 }, {
              opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
              scrollTrigger: { trigger: trustRef.current, start: "top 85%", toggleActions: "play none none none" },
            });
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (ctx) ctx.revert();
    };
  }, []);

  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  return (
    <div data-nav-color="black" className={`dm-page ${isRtl ? "font-cairo" : "font-hero-light"}`} dir={isRtl ? "rtl" : "ltr"}>
      <SEOHead
        title="Digital Marketing Agency Dubai | Performance, SEO & Paid Ads"
        description="Leading digital marketing agency in Dubai. We deliver SEO services, paid ads management, and conversion optimization for measurable business growth across the UAE."
        keywords="digital marketing agency Dubai, SEO services Dubai, paid ads management, conversion optimization, digital marketing company UAE, PPC agency Dubai"
        canonicalUrl="/digital-marketing-agency-dubai"
        serviceType="Digital Marketing"
        structuredData={serviceSchema}
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Digital Marketing", url: "/digital-marketing-agency-dubai" },
        ]}
      />

      {/* Hero */}
      <section ref={heroRef} className="dm-hero">
        <div className="dm-hero-overlay">
          <div className="dm-hero-gradient" />
        </div>
        <HeroWithBadge
          badge={t("serviceSections.digitalMarketing.badge")}
          title={t("serviceSections.digitalMarketing.hero.title")}
          mainWord={t("serviceSections.digitalMarketing.hero.mainWord")}
          description={t("serviceSections.digitalMarketing.hero.description")}
          titleClassName="hero-animate block"
          descriptionClassName="hero-animate dm-hero-desc"
          contentClassName="dm-hero-content"
          disableAnimation
        />
      </section>

      <div className="dm-divider-wrap"><div className="dm-divider" /></div>

      {/* Definition */}
      <section ref={definitionRef} className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-heading ${fontClass}`}>
            {t("serviceSections.digitalMarketing.definition.whatIsTitle")}
          </h2>
          <p className="dm-text">
            {t("serviceSections.digitalMarketing.definition.paragraph")}
          </p>

          <div className="mb-8">
            <h3 className={`text-xl font-bold mb-4 ${fontClass}`} style={{ color: "var(--foreground)" }}>
              {t("serviceSections.digitalMarketing.definition.benefitsTitle")}
            </h3>
            <ul className="space-y-3">
              {t("serviceSections.digitalMarketing.definition.benefitsList", { returnObjects: true }).map((item, idx) => (
                <li key={idx} className="dm-check-item">
                  <HiCheckCircle className="dm-check-icon" />
                  <span className="dm-text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 ${fontClass}`} style={{ color: "var(--foreground)" }}>
              {t("serviceSections.digitalMarketing.definition.processTitle")}
            </h3>
            <ol className="space-y-3">
              {t("serviceSections.digitalMarketing.definition.processSteps", { returnObjects: true }).map((step, idx) => (
                <li key={idx} className="dm-number-item">
                  <span className="dm-number-badge">{idx + 1}</span>
                  <span className="dm-text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap"><div className="dm-divider" /></div>

      {/* Sub-services Hub Grid */}
      <section ref={servicesRef} className="dm-section">
        <div className="dm-container-wide">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t("serviceSections.digitalMarketing.subServices.title")}
          </h2>
          <p className="dm-section-subtitle">
            {t("serviceSections.digitalMarketing.subServices.subtitle")}
          </p>

          <div className="dm-hub-grid">
            {SUB_SERVICES.map(({ key, icon: Icon, path }) => (
              <Link key={key} to={path} className="dm-hub-card">
                <div className="dm-hub-card-icon">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="dm-hub-card-title">
                  {t(`serviceSections.digitalMarketing.subServices.${key}.title`)}
                </h3>
                <p className="dm-hub-card-desc">
                  {t(`serviceSections.digitalMarketing.subServices.${key}.description`)}
                </p>
                <span className="dm-hub-card-link">
                  {t("serviceSections.digitalMarketing.subServices.learnMore")} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap"><div className="dm-divider" /></div>

      {/* Process */}
      <section ref={processRef} className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t("serviceSections.digitalMarketing.process.title")}
          </h2>
          <p className="dm-section-subtitle">
            {t("serviceSections.digitalMarketing.process.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {["audit", "strategy", "execution", "optimization"].map((step, idx) => (
              <div key={step} className="dm-process-card">
                <div className="dm-step-number">{String(idx + 1).padStart(2, "0")}</div>
                <h3 className="dm-step-title">
                  {t(`serviceSections.digitalMarketing.process.steps.${step}.title`)}
                </h3>
                <p className="dm-step-desc">
                  {t(`serviceSections.digitalMarketing.process.steps.${step}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap"><div className="dm-divider" /></div>

      {/* Stats */}
      <section ref={statsRef} className="dm-section">
        <div className="dm-container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {["campaigns", "roiAvg", "adSpend", "clients"].map((stat) => (
              <div key={stat} className="dm-stat-card">
                <h3 className="dm-stat-value">{t(`serviceSections.digitalMarketing.stats.${stat}.value`)}</h3>
                <p className="dm-stat-label">{t(`serviceSections.digitalMarketing.stats.${stat}.label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section ref={trustRef} className="dm-section-alt">
        <div className="dm-container">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t("serviceSections.digitalMarketing.trust.title")}
          </h2>
          <p className="dm-section-subtitle">
            {t("serviceSections.digitalMarketing.trust.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HiBadgeCheck, key: "card1" },
              { icon: HiGlobe, key: "card2" },
              { icon: HiUserGroup, key: "card3" },
              { icon: HiLightningBolt, key: "card4" },
            ].map(({ icon: Icon, key }) => (
              <div key={key} className="dm-trust-card">
                <div className="dm-trust-icon"><Icon /></div>
                <h3 className="dm-trust-title">{t(`serviceSections.digitalMarketing.trust.${key}Title`)}</h3>
                <p className="dm-trust-desc">{t(`serviceSections.digitalMarketing.trust.${key}Desc`)}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="dm-text-sm" style={{ maxWidth: "48rem", margin: "0 auto" }}>
              {t("serviceSections.digitalMarketing.trust.paragraph")}
            </p>
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap"><div className="dm-divider" /></div>

      {/* FAQ */}
      <FAQ
        items={Array.isArray(faqItems) ? faqItems : []}
        title={t("serviceSections.digitalMarketing.faqTitle")}
      />

      <DMCTA />
    </div>
  );
};

export default DigitalMarketing;
