import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  HiCheckCircle,
  HiCode,
  HiDocumentSearch,
  HiSparkles,
  HiLocationMarker,
} from "react-icons/hi";
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import ServiceCard from "../../../components/ServiceCard";
import DMCTA from "./components/DMCTA";
import DMRelatedServices from "./components/DMRelatedServices";
import "./digitalMarketing.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_KEYS = [
  "precisionTechnical",
  "keywordIntelligence",
  "contentAuthority",
  "localMaps",
];
const SERVICE_ICONS = [HiCode, HiDocumentSearch, HiSparkles, HiLocationMarker];
const PROCESS_KEYS = [
  "discovery",
  "audit",
  "roadmap",
  "implementation",
  "refinement",
];

const toArray = (value) => (Array.isArray(value) ? value : []);

const SEOServicesPage = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const industriesRef = useRef(null);
  const linksRef = useRef(null);

  const faqItems = toArray(
    t("serviceSections.digitalMarketing.seoServices.faqItems", {
      returnObjects: true,
    }),
  );
  const benefitsList = toArray(
    t("serviceSections.digitalMarketing.seoServices.definition.benefitsList", {
      returnObjects: true,
    }),
  );
  const industryItems = toArray(
    t("serviceSections.digitalMarketing.seoServices.industries.items", {
      returnObjects: true,
    }),
  );
  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  useEffect(() => {
    let ctx;
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        const animate = (ref, selector, vars) => {
          if (!ref.current) return;
          const els = ref.current.querySelectorAll(selector);
          if (!els.length) return;
          gsap.fromTo(els, { opacity: 0, y: vars.y ?? 40 }, {
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
          });
        };

        animate(heroRef, ".hero-animate", { y: 60, duration: 1, stagger: 0.2, ease: "power3.out" });
        animate(servicesRef, ".service-card", { y: 50, stagger: 0.15 });
        animate(processRef, ".dm-process-card", { stagger: 0.15, ease: "power3.out" });
        animate(industriesRef, ".dm-trust-card", { y: 24, stagger: 0.08 });
        animate(linksRef, ".dm-link-card", { y: 30, duration: 0.6, stagger: 0.1 });
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
        title={t("serviceSections.digitalMarketing.seoServices.seo.title")}
        description={t(
          "serviceSections.digitalMarketing.seoServices.seo.description",
        )}
        keywords={t("serviceSections.digitalMarketing.seoServices.seo.keywords")}
        canonicalUrl="/digital-marketing-agency-dubai/seo-services"
        serviceType={t(
          "serviceSections.digitalMarketing.seoServices.seo.serviceType",
        )}
        faqItems={faqItems}
        breadcrumbs={[
          {
            name: t("serviceSections.digitalMarketing.breadcrumb.home", {
              defaultValue: "Home",
            }),
            url: "/",
          },
          {
            name: t("serviceSections.digitalMarketing.breadcrumb.services", {
              defaultValue: "Services",
            }),
            url: "/services",
          },
          {
            name: t("serviceSections.digitalMarketing.breadcrumb.hub", {
              defaultValue: "Digital Marketing",
            }),
            url: "/digital-marketing-agency-dubai",
          },
          {
            name: t(
              "serviceSections.digitalMarketing.seoServices.seo.breadcrumbLabel",
            ),
            url: "/digital-marketing-agency-dubai/seo-services",
          },
        ]}
      />

      <section ref={heroRef} className="dm-hero">
        <div className="dm-hero-overlay">
          <div className="dm-hero-gradient" />
        </div>
        <div className="dm-hero-content relative z-10">
          <p className="hero-animate dm-hero-kicker">
            {t("serviceSections.digitalMarketing.seoServices.heroTagline")}
          </p>
          <HeroWithBadge
            badge={t("serviceSections.digitalMarketing.seoServices.badge")}
            title={t("serviceSections.digitalMarketing.seoServices.hero.title")}
            mainWord={t(
              "serviceSections.digitalMarketing.seoServices.hero.mainWord",
            )}
            description={t(
              "serviceSections.digitalMarketing.seoServices.hero.description",
            )}
            titleClassName="hero-animate block"
            descriptionClassName="hero-animate dm-hero-desc"
            contentClassName="relative z-10 max-w-6xl mx-auto text-center mt-6"
            disableAnimation
          />
          <div className="hero-animate mt-10 flex justify-center">
            <a href="/contact-us" className="dm-cta-btn">
              {t("serviceSections.digitalMarketing.seoServices.heroCta")}
            </a>
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-heading ${fontClass}`}>
            {t(
              "serviceSections.digitalMarketing.seoServices.definition.whatIsTitle",
            )}
          </h2>
          <p className="dm-text">
            {t(
              "serviceSections.digitalMarketing.seoServices.definition.paragraph",
            )}
          </p>
          <p className="dm-benefits-label font-semibold mb-3">
            {t(
              "serviceSections.digitalMarketing.seoServices.definition.benefitsLabel",
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

      <section ref={servicesRef} className="dm-section dm-section-alt">
        <div className="dm-container-wide">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t("serviceSections.digitalMarketing.seoServices.services.title")}
          </h2>
          <p className="dm-section-subtitle">
            {t("serviceSections.digitalMarketing.seoServices.services.subtitle")}
          </p>
          <div className="dm-feature-grid dm-feature-grid--pillars">
            {SERVICE_KEYS.map((key, idx) => {
              const bullets = toArray(
                t(
                  `serviceSections.digitalMarketing.seoServices.services.items.${key}.bullets`,
                  { returnObjects: true },
                ),
              );
              return (
                <ServiceCard
                  key={key}
                  icon={SERVICE_ICONS[idx]}
                  title={t(
                    `serviceSections.digitalMarketing.seoServices.services.items.${key}.title`,
                  )}
                  description={t(
                    `serviceSections.digitalMarketing.seoServices.services.items.${key}.description`,
                  )}
                  iconWrapperClassName="dm-card-icon"
                  iconClassName="w-8 h-8 text-white"
                  titleClassName="dm-card-title"
                  descriptionClassName="dm-card-desc"
                >
                  {bullets.length > 0 ? (
                    <ul className="dm-pillar-bullets mt-5 space-y-2">
                      {bullets.map((line, bidx) => (
                        <li key={bidx} className="dm-pillar-bullet-item">
                          <span className="dm-pillar-bullet-dot" aria-hidden />
                          <span className="dm-text-sm">{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </ServiceCard>
              );
            })}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section ref={processRef} className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t("serviceSections.digitalMarketing.seoServices.process.title")}
          </h2>
          <p className="dm-section-subtitle">
            {t(
              "serviceSections.digitalMarketing.seoServices.process.subtitle",
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
                    `serviceSections.digitalMarketing.seoServices.process.steps.${step}.title`,
                  )}
                </h3>
                <p className="dm-step-desc">
                  {t(
                    `serviceSections.digitalMarketing.seoServices.process.steps.${step}.description`,
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

      <section ref={industriesRef} className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-section-title ${fontClass}`}>
            {t(
              "serviceSections.digitalMarketing.seoServices.industries.title",
            )}
          </h2>
          <p className="dm-section-subtitle">
            {t(
              "serviceSections.digitalMarketing.seoServices.industries.subtitle",
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {industryItems.map((item, idx) => (
              <div key={idx} className="dm-trust-card dm-industry-card">
                <span className="dm-trust-title dm-industry-card__text">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <FAQ
        items={faqItems}
        title={t("serviceSections.digitalMarketing.seoServices.faqTitle")}
      />

      <section ref={linksRef}>
        <DMRelatedServices current="seoServices" />
      </section>

      <DMCTA />
    </div>
  );
};

export default SEOServicesPage;
