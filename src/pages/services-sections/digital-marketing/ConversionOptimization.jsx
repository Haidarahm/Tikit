import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  HiCheckCircle,
  HiSearchCircle,
  HiTemplate,
  HiChartBar,
  HiUserGroup,
  HiAdjustments,
  HiClipboardCheck,
  HiDeviceMobile,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import ServiceCard from "../../../components/ServiceCard";
import DMCTA from "./components/DMCTA";
import DMRelatedServices from "./components/DMRelatedServices";
import "./digitalMarketing.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_KEYS = [
  "croAudit",
  "landingPage",
  "abTesting",
  "userJourney",
  "uxFunnel",
  "formCheckout",
  "mobile",
  "whatsappChat",
];

const SERVICE_ICONS = [
  HiSearchCircle,
  HiTemplate,
  HiChartBar,
  HiUserGroup,
  HiAdjustments,
  HiClipboardCheck,
  HiDeviceMobile,
  FaWhatsapp,
];

const PROCESS_KEYS = ["discover", "diagnose", "design", "test", "implement"];

const toArray = (value) => (Array.isArray(value) ? value : []);

const ConversionOptimization = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const expectationsRef = useRef(null);
  const insightRef = useRef(null);
  const linksRef = useRef(null);

  const faqItems = toArray(
    t("serviceSections.digitalMarketing.conversionOptimization.faqItems", {
      returnObjects: true,
    }),
  );
  const benefitsList = toArray(
    t(
      "serviceSections.digitalMarketing.conversionOptimization.definition.benefitsList",
      { returnObjects: true },
    ),
  );
  const expectationsList = toArray(
    t(
      "serviceSections.digitalMarketing.conversionOptimization.expectations.items",
      { returnObjects: true },
    ),
  );
  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  useEffect(() => {
    let ctx;
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        const animate = (ref, selector, vars = {}) => {
          if (!ref.current) return;
          const els = ref.current.querySelectorAll(selector);
          if (!els.length) return;
          gsap.fromTo(
            els,
            { opacity: 0, y: vars.y ?? 40 },
            {
              opacity: 1,
              y: 0,
              duration: vars.duration ?? 0.8,
              stagger: vars.stagger ?? 0.12,
              ease: vars.ease ?? "power2.out",
              scrollTrigger: {
                trigger: ref.current,
                start: vars.start ?? "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        };

        animate(heroRef, ".hero-animate", {
          y: 60,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
        animate(servicesRef, ".service-card", { y: 50, stagger: 0.15 });
        animate(processRef, ".dm-process-card", {
          stagger: 0.15,
          ease: "power3.out",
        });
        animate(expectationsRef, ".dm-check-item", { y: 24, stagger: 0.08 });
        animate(insightRef, ".dm-insight-block", { y: 24, stagger: 0.1 });
        animate(linksRef, ".dm-link-card", {
          y: 30,
          duration: 0.6,
          stagger: 0.1,
        });
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
      className={`dm-page ${isRtl ? "font-cairo" : "font-hero-light"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title="Conversion Rate Optimisation Dubai & UAE | CRO Agency | Tikit"
        description="Turn more visitors into customers with Tikit's CRO services in Dubai & UAE. Audit, A/B testing, landing page, funnel, mobile, and WhatsApp conversion optimisation."
        keywords="conversion rate optimisation Dubai, CRO agency UAE, A/B testing Dubai, landing page optimisation, funnel optimisation, mobile CRO, WhatsApp conversion"
        canonicalUrl="/digital-marketing-agency-dubai/conversion-optimization"
        serviceType="Conversion Rate Optimisation"
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Digital Marketing", url: "/digital-marketing-agency-dubai" },
          {
            name: "Conversion Optimisation",
            url: "/digital-marketing-agency-dubai/conversion-optimization",
          },
        ]}
      />

      {/* Hero */}
      <section ref={heroRef} className="dm-hero">
        <div className="dm-hero-overlay">
          <div className="dm-hero-gradient" />
        </div>
        <div className="dm-hero-content relative z-10">
          <p className="hero-animate dm-hero-kicker">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.heroTagline",
            )}
          </p>
          <HeroWithBadge
            badge={t(
              "serviceSections.digitalMarketing.conversionOptimization.badge",
            )}
            title={t(
              "serviceSections.digitalMarketing.conversionOptimization.hero.title",
            )}
            mainWord={t(
              "serviceSections.digitalMarketing.conversionOptimization.hero.mainWord",
            )}
            description={t(
              "serviceSections.digitalMarketing.conversionOptimization.hero.description",
            )}
            titleClassName="hero-animate block"
            descriptionClassName="hero-animate dm-hero-desc"
            contentClassName="relative z-10 max-w-6xl mx-auto text-center mt-6"
            disableAnimation
          />
          <p className="hero-animate dm-hero-desc dm-hero-desc--secondary mt-6">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.heroSecondary",
            )}
          </p>
          <div className="hero-animate mt-10 flex justify-center">
            <a href="/contact-us" className="dm-cta-btn">
              {t(
                "serviceSections.digitalMarketing.conversionOptimization.heroCta",
              )}
            </a>
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      {/* What is CRO & why it matters */}
      <section className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-heading ${fontClass}`}>
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.definition.whatIsTitle",
            )}
          </h2>
          <p className="dm-text">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.definition.paragraph",
            )}
          </p>
          <p className="dm-text">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.definition.paragraph2",
            )}
          </p>
          <p className="dm-benefits-label font-semibold mb-3 mt-6">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.definition.benefitsLabel",
            )}
          </p>
          <ul className="space-y-3">
            {benefitsList.map((item, idx) => (
              <li key={idx} className="dm-check-item">
                <HiCheckCircle className="dm-check-icon" />
                <span className="dm-text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      {/* Services */}
      <section ref={servicesRef} className="dm-section dm-section-alt">
        <div className="dm-container-wide">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.services.title",
            )}
          </h2>
          <p className="dm-section-subtitle">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.services.subtitle",
            )}
          </p>
          <div className="dm-feature-grid">
            {SERVICE_KEYS.map((key, idx) => (
              <ServiceCard
                key={key}
                icon={SERVICE_ICONS[idx]}
                title={t(
                  `serviceSections.digitalMarketing.conversionOptimization.services.items.${key}.title`,
                )}
                description={t(
                  `serviceSections.digitalMarketing.conversionOptimization.services.items.${key}.description`,
                )}
                iconWrapperClassName="dm-card-icon"
                iconClassName="w-8 h-8 text-white"
                titleClassName="dm-card-title"
                descriptionClassName="dm-card-desc"
              />
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      {/* Process */}
      <section ref={processRef} className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.process.title",
            )}
          </h2>
          <p className="dm-section-subtitle">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.process.subtitle",
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {PROCESS_KEYS.map((step, idx) => (
              <div key={step} className="dm-process-card">
                <div className="dm-step-number">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="dm-step-title">
                  {t(
                    `serviceSections.digitalMarketing.conversionOptimization.process.steps.${step}.title`,
                  )}
                </h3>
                <p className="dm-step-desc">
                  {t(
                    `serviceSections.digitalMarketing.conversionOptimization.process.steps.${step}.description`,
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      {/* Expectations */}
      <section ref={expectationsRef} className="dm-section dm-section-alt">
        <div className="dm-container">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.expectations.title",
            )}
          </h2>
          <p className="dm-section-subtitle">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.expectations.subtitle",
            )}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {expectationsList.map((item, idx) => (
              <li key={idx} className="dm-check-item">
                <HiCheckCircle className="dm-check-icon" />
                <span className="dm-text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      {/* Market insight */}
      <section ref={insightRef} className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.marketInsight.title",
            )}
          </h2>
          <p className="dm-text dm-insight-block">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.marketInsight.paragraph",
            )}
          </p>
          <p className="dm-text dm-insight-block">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.marketInsight.paragraph2",
            )}
          </p>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <FAQ
        items={faqItems}
        title={t(
          "serviceSections.digitalMarketing.conversionOptimization.faqTitle",
        )}
      />

      {/* Related services */}
      <section ref={linksRef}>
        <DMRelatedServices current="conversionOptimization" />
      </section>

      <DMCTA />
    </div>
  );
};

export default ConversionOptimization;
