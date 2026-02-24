import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import influencerHero from "../../../assets/services/Influencer-Marketing.webp";
import TikitTitle from "../../../components/TikitTitle";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  HiCheckCircle,
  HiBadgeCheck,
  HiGlobe,
  HiUserGroup,
  HiChartBar,
  HiArrowRight,
} from "react-icons/hi";
import {
  HiMegaphone,
  HiSparkles,
  HiCurrencyDollar,
  HiPresentationChartBar,
} from "react-icons/hi2";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import "./influencersMarketing.css";

gsap.registerPlugin(ScrollTrigger);

const BASE_PATH = "/services/influencer-marketing-agency-dubai";

const subServices = [
  {
    key: "campaignManagement",
    path: `${BASE_PATH}/campaign-management`,
    icon: HiMegaphone,
  },
  {
    key: "microInfluencer",
    path: `${BASE_PATH}/micro-influencer-marketing-uae`,
    icon: HiUserGroup,
  },
  {
    key: "luxuryInfluencer",
    path: `${BASE_PATH}/luxury-influencer-marketing`,
    icon: HiSparkles,
  },
  {
    key: "roiAnalytics",
    path: `${BASE_PATH}/roi-analytics`,
    icon: HiPresentationChartBar,
  },
  {
    key: "instagramInfluencer",
    path: `${BASE_PATH}/instagram-influencer-marketing`,
    icon: FaInstagram,
  },
  {
    key: "tiktokInfluencer",
    path: `${BASE_PATH}/tiktok-influencer-marketing`,
    icon: FaTiktok,
  },
  {
    key: "influencerCost",
    path: `${BASE_PATH}/influencer-marketing-cost-uae`,
    icon: HiCurrencyDollar,
  },
];

const InfluencerMarketing = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const processRef = useRef(null);
  const definitionRef = useRef(null);
  const trustRef = useRef(null);
  const servicesRef = useRef(null);

  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";
  const faqItems = t("serviceSections.influencerMarketing.faqItems", { returnObjects: true });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://tikit.ae${BASE_PATH}#service`,
    name: "Influencer Marketing Agency Dubai",
    description:
      "Leading influencer marketing agency in Dubai connecting brands with authentic creators across Instagram, TikTok, YouTube. Campaign management, micro-influencer marketing, luxury influencer partnerships, ROI analytics. 500+ influencer network, 200+ campaigns.",
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
    serviceType: "Influencer Marketing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Influencer Marketing Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Influencer Campaign Management" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Micro-Influencer Marketing UAE" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Influencer Marketing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "ROI Analytics & Reporting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Instagram Influencer Marketing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "TikTok Influencer Marketing" } },
      ],
    },
  };

  useEffect(() => {
    let ctx;
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        const animate = (ref, selector, config = {}) => {
          if (!ref.current) return;
          const els = ref.current.querySelectorAll(selector);
          if (!els.length) return;
          gsap.fromTo(els, { opacity: 0, y: config.y || 40 }, {
            opacity: 1, y: 0,
            duration: config.duration || 0.8,
            stagger: config.stagger || 0.15,
            ease: config.ease || "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" },
          });
        };

        animate(heroRef, ".hero-animate", { y: 60, duration: 1, stagger: 0.2 });
        animate(statsRef, ".im-stat-card", { y: 30 });
        animate(processRef, ".im-process-card", { y: 50, stagger: 0.2 });
        animate(servicesRef, ".im-hub-card", { y: 40, stagger: 0.1 });
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
      className={`im-page ${isRtl ? "font-cairo" : "font-hero-light"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title="Influencer Marketing Agency Dubai | Connect with Top Creators UAE"
        description="Leading influencer marketing agency in Dubai. We connect brands with 500+ authentic creators across Instagram, TikTok, YouTube to drive engagement and ROI. Campaign management, micro-influencer marketing, luxury influencer partnerships."
        keywords="influencer marketing agency Dubai, influencer agency UAE, influencer marketing services Dubai, Instagram influencer marketing, TikTok influencer marketing, micro influencer UAE, luxury influencer marketing Dubai, influencer campaign management"
        canonicalUrl={BASE_PATH}
        serviceType="Influencer Marketing"
        structuredData={serviceSchema}
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Influencer Marketing Agency Dubai", url: BASE_PATH },
        ]}
      />

      {/* Hero */}
      <section ref={heroRef} className="im-hero">
        <div className="im-hero-overlay">
          <img src={influencerHero} alt="Influencer Marketing Agency Dubai" width={1920} height={1080} className="im-hero-image" loading="lazy" />
          <div className="im-hero-gradient" />
        </div>
        <div className="im-hero-content">
          <span className="hero-animate im-badge">{t("serviceSections.influencerMarketing.badge")}</span>
          <TikitTitle title={t("serviceSections.influencerMarketing.hero.title")} mainWord={t("serviceSections.influencerMarketing.hero.mainWord")} />
          <p className="hero-animate im-hero-desc">{t("serviceSections.influencerMarketing.hero.description")}</p>
        </div>
      </section>

      <div className="im-divider-wrap"><div className="im-divider" /></div>

      {/* Definition */}
      <section ref={definitionRef} className="im-section">
        <div className="max-w-4xl mx-auto">
          <h2 className={`im-heading ${fontClass}`}>{t("serviceSections.influencerMarketing.definition.whatIsTitle")}</h2>
          <p className="im-text">{t("serviceSections.influencerMarketing.definition.paragraph")}</p>

          <div className="mb-8">
            <h3 className={`text-xl font-bold mb-4 ${fontClass}`} style={{ color: "var(--foreground)" }}>
              {t("serviceSections.influencerMarketing.definition.benefitsTitle")}
            </h3>
            <ul className="space-y-3">
              {t("serviceSections.influencerMarketing.definition.benefitsList", { returnObjects: true }).map((item, idx) => (
                <li key={idx} className="im-check-item">
                  <HiCheckCircle className="im-check-icon" />
                  <span style={{ color: "color-mix(in srgb, var(--foreground) 80%, transparent)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 ${fontClass}`} style={{ color: "var(--foreground)" }}>
              {t("serviceSections.influencerMarketing.definition.processTitle")}
            </h3>
            <ol className="space-y-3">
              {t("serviceSections.influencerMarketing.definition.processSteps", { returnObjects: true }).map((step, idx) => (
                <li key={idx} className="im-number-item">
                  <span className="im-number-badge">{idx + 1}</span>
                  <span style={{ color: "color-mix(in srgb, var(--foreground) 80%, transparent)" }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="im-divider-wrap"><div className="im-divider" /></div>

      {/* Stats */}
      <section ref={statsRef} className="im-section">
        <div className="im-container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="im-stat-card">
              <h3 className="im-stat-value">500+</h3>
              <p className="im-stat-label">{t("serviceSections.influencerMarketing.stats.influencersNetwork")}</p>
            </div>
            <div className="im-stat-card">
              <h3 className="im-stat-value">200+</h3>
              <p className="im-stat-label">{t("serviceSections.influencerMarketing.stats.successfulCampaigns")}</p>
            </div>
            <div className="im-stat-card">
              <h3 className="im-stat-value">50M+</h3>
              <p className="im-stat-label">{t("serviceSections.influencerMarketing.stats.totalReach")}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="im-divider-wrap"><div className="im-divider" /></div>

      {/* Sub-Services Grid */}
      <section ref={servicesRef} className="im-section">
        <div className="im-container-wide">
          <h2 className={`im-section-title ${fontClass}`}>{t("serviceSections.influencerMarketing.subServices.title")}</h2>
          <p className="im-section-subtitle">{t("serviceSections.influencerMarketing.subServices.subtitle")}</p>
          <div className="im-hub-grid">
            {subServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.key} to={service.path} className="im-hub-card">
                  <div className="im-hub-card-icon">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="im-hub-card-title">
                    {t(`serviceSections.influencerMarketing.subServices.${service.key}.title`)}
                  </h3>
                  <p className="im-hub-card-desc">
                    {t(`serviceSections.influencerMarketing.subServices.${service.key}.description`)}
                  </p>
                  <span className="im-hub-card-link">
                    Learn More <HiArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="im-divider-wrap"><div className="im-divider" /></div>

      {/* Process */}
      <section ref={processRef} className="im-section">
        <div className="im-container">
          <h2 className={`im-section-title ${fontClass}`}>{t("serviceSections.influencerMarketing.process.title")}</h2>
          <p className="im-section-subtitle">{t("serviceSections.influencerMarketing.process.description")}</p>
          <div className="space-y-8">
            {["strategy", "selection", "management", "analytics"].map((key, idx) => (
              <div key={key} className="im-process-card">
                <div className="im-step-number">{idx + 1}</div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="im-step-title">{t(`serviceSections.influencerMarketing.process.steps.${key}.title`)}</h3>
                  <p className="im-step-desc">{t(`serviceSections.influencerMarketing.process.steps.${key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="im-divider-wrap"><div className="im-divider" /></div>

      {/* Trust */}
      <section ref={trustRef} className="im-section-alt">
        <div className="im-container">
          <h2 className={`im-section-title ${fontClass}`}>{t("serviceSections.influencerMarketing.trust.title")}</h2>
          <p className="im-section-subtitle">{t("serviceSections.influencerMarketing.trust.subtitle")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HiBadgeCheck, titleKey: "card1Title", descKey: "card1Desc" },
              { icon: HiGlobe, titleKey: "card2Title", descKey: "card2Desc" },
              { icon: HiUserGroup, titleKey: "card3Title", descKey: "card3Desc" },
              { icon: HiChartBar, titleKey: "card4Title", descKey: "card4Desc" },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.titleKey} className="im-trust-card">
                  <div className="im-trust-icon"><Icon /></div>
                  <h3 className="im-trust-title">{t(`serviceSections.influencerMarketing.trust.${card.titleKey}`)}</h3>
                  <p className="im-trust-desc">{t(`serviceSections.influencerMarketing.trust.${card.descKey}`)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <p style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }} className="max-w-3xl mx-auto">
              {t("serviceSections.influencerMarketing.trust.paragraph")}
            </p>
          </div>
        </div>
      </section>

      <div className="im-divider-wrap"><div className="im-divider" /></div>

      {/* FAQ */}
      <FAQ items={Array.isArray(faqItems) ? faqItems : []} title={t("serviceSections.influencerMarketing.faqTitle")} />

      {/* CTA */}
      <section className="im-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${fontClass}`} style={{ color: "var(--foreground)" }}>
            {t("serviceSections.influencerMarketing.cta.title")}
          </h2>
          <p className="text-lg mb-8" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
            {t("serviceSections.influencerMarketing.cta.description")}
          </p>
          <a href="/contact-us" className="im-cta-btn">{t("serviceSections.influencerMarketing.cta.button")}</a>
        </div>
      </section>
    </div>
  );
};

export default InfluencerMarketing;
