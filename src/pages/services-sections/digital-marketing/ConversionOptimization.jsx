import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  HiTrendingUp,
  HiChartBar,
  HiSearchCircle,
  HiCurrencyDollar,
  HiCheckCircle,
  HiBadgeCheck,
  HiGlobe,
  HiUserGroup,
  HiLightningBolt,
  HiEye,
  HiTemplate,
} from "react-icons/hi";
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import ServiceCard from "../../../components/ServiceCard";
import DMCTA from "./components/DMCTA";
import DMRelatedServices from "./components/DMRelatedServices";
import "./digitalMarketing.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ICONS = [HiTrendingUp, HiEye, HiTemplate, HiChartBar, HiLightningBolt, HiUserGroup];

const ConversionOptimization = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const linksRef = useRef(null);

  const faqItems = t("serviceSections.digitalMarketing.conversionOptimization.faqItems", { returnObjects: true });
  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

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
          const cards = servicesRef.current.querySelectorAll(".service-card");
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
        if (linksRef.current) {
          const cards = linksRef.current.querySelectorAll(".dm-link-card");
          if (cards.length)
            gsap.fromTo(cards, { opacity: 0, y: 30 }, {
              opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
              scrollTrigger: { trigger: linksRef.current, start: "top 90%", toggleActions: "play none none none" },
            });
        }
      });
    }, 100);
    return () => { clearTimeout(timeout); if (ctx) ctx.revert(); };
  }, []);

  return (
    <div data-nav-color="black" className={`dm-page ${isRtl ? "font-cairo" : "font-hero-light"}`} dir={isRtl ? "rtl" : "ltr"}>
      <SEOHead
        title="Conversion Rate Optimization Dubai | CRO Agency UAE"
        description="Expert conversion rate optimization services in Dubai. We use A/B testing, UX analysis, and data-driven strategies to maximize conversions and revenue from your existing traffic."
        keywords="conversion rate optimization Dubai, CRO agency UAE, A/B testing Dubai, UX optimization, landing page optimization, conversion optimization agency"
        canonicalUrl="/services/digital-marketing-agency-dubai/conversion-optimization"
        serviceType="Conversion Rate Optimization"
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Digital Marketing", url: "/services/digital-marketing-agency-dubai" },
          { name: "Conversion Optimization", url: "/services/digital-marketing-agency-dubai/conversion-optimization" },
        ]}
      />

      {/* Hero */}
      <section ref={heroRef} className="dm-hero">
        <div className="dm-hero-overlay"><div className="dm-hero-gradient" /></div>
        <HeroWithBadge
          badge={t("serviceSections.digitalMarketing.conversionOptimization.badge")}
          title={t("serviceSections.digitalMarketing.conversionOptimization.hero.title")}
          mainWord={t("serviceSections.digitalMarketing.conversionOptimization.hero.mainWord")}
          description={t("serviceSections.digitalMarketing.conversionOptimization.hero.description")}
          titleClassName="hero-animate block"
          descriptionClassName="hero-animate dm-hero-desc"
          contentClassName="dm-hero-content"
          disableAnimation
        />
      </section>

      <div className="dm-divider-wrap"><div className="dm-divider" /></div>

      {/* Definition */}
      <section className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-heading ${fontClass}`}>
            {t("serviceSections.digitalMarketing.conversionOptimization.definition.whatIsTitle")}
          </h2>
          <p className="dm-text">
            {t("serviceSections.digitalMarketing.conversionOptimization.definition.paragraph")}
          </p>
          <ul className="space-y-3">
            {t("serviceSections.digitalMarketing.conversionOptimization.definition.benefitsList", { returnObjects: true }).map((item, idx) => (
              <li key={idx} className="dm-check-item">
                <HiCheckCircle className="dm-check-icon" />
                <span className="dm-text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="dm-divider-wrap"><div className="dm-divider" /></div>

      {/* Services */}
      <section ref={servicesRef} className="dm-section">
        <div className="dm-container-wide">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t("serviceSections.digitalMarketing.conversionOptimization.services.title")}
          </h2>
          <p className="dm-section-subtitle">
            {t("serviceSections.digitalMarketing.conversionOptimization.services.subtitle")}
          </p>
          <div className="dm-feature-grid">
            {["abTesting", "uxAudit", "landingPages", "funnelOptimization", "speedOptimization", "behavioralAnalysis"].map((key, idx) => (
              <ServiceCard
                key={key}
                icon={SERVICE_ICONS[idx]}
                title={t(`serviceSections.digitalMarketing.conversionOptimization.services.items.${key}.title`)}
                description={t(`serviceSections.digitalMarketing.conversionOptimization.services.items.${key}.description`)}
                iconWrapperClassName="dm-card-icon"
                iconClassName="w-8 h-8 text-white"
                titleClassName="dm-card-title"
                descriptionClassName="dm-card-desc"
              />
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap"><div className="dm-divider" /></div>

      {/* Process */}
      <section ref={processRef} className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t("serviceSections.digitalMarketing.conversionOptimization.process.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {["analyze", "hypothesize", "test", "implement"].map((step, idx) => (
              <div key={step} className="dm-process-card">
                <div className="dm-step-number">{String(idx + 1).padStart(2, "0")}</div>
                <h3 className="dm-step-title">{t(`serviceSections.digitalMarketing.conversionOptimization.process.steps.${step}.title`)}</h3>
                <p className="dm-step-desc">{t(`serviceSections.digitalMarketing.conversionOptimization.process.steps.${step}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap"><div className="dm-divider" /></div>

      <FAQ
        items={Array.isArray(faqItems) ? faqItems : []}
        title={t("serviceSections.digitalMarketing.conversionOptimization.faqTitle")}
      />

      {/* Related Services */}
      <section ref={linksRef}>
        <DMRelatedServices current="conversionOptimization" />
      </section>

      <DMCTA />
    </div>
  );
};

export default ConversionOptimization;
