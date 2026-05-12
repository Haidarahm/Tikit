import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  benefitsSection,
  faqSectionReveal,
  problemsSection,
  processSection,
  seoServicesHeroChildVariants,
  seoServicesHeroContainerVariants,
} from "@/helpers/framerMotion";
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

      <section className="dm-hero">
        <div className="dm-hero-overlay">
          <div className="dm-hero-gradient" />
        </div>
        <Motion.div
          className="dm-hero-content relative z-10"
          initial="hidden"
          animate="visible"
          variants={seoServicesHeroContainerVariants}
        >
          <Motion.div variants={seoServicesHeroChildVariants}>
            <HeroWithBadge
              badge={t("serviceSections.digitalMarketing.seoServices.badge")}
              title={t("serviceSections.digitalMarketing.seoServices.hero.title")}
              mainWord={t(
                "serviceSections.digitalMarketing.seoServices.hero.mainWord",
              )}
              description={t(
                "serviceSections.digitalMarketing.seoServices.hero.description",
              )}
              titleClassName="block"
              descriptionClassName="dm-hero-desc"
              contentClassName="relative z-10 max-w-6xl mx-auto text-center mt-6"
              disableAnimation
            />
          </Motion.div>
          <Motion.div
            variants={seoServicesHeroChildVariants}
            className="mt-10 flex justify-center"
          >
            <a href="/contact-us" className="dm-cta-btn">
              {t("serviceSections.digitalMarketing.seoServices.heroCta")}
            </a>
          </Motion.div>
        </Motion.div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section">
        <Motion.div className="dm-container" {...benefitsSection.headerWrap}>
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
        </Motion.div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section dm-section-alt">
        <div className="dm-container-wide">
          <Motion.div {...problemsSection.header}>
            <h2 className={`dm-section-title ${fontClass}`}>
              {t("serviceSections.digitalMarketing.seoServices.services.title")}
            </h2>
            <p className="dm-section-subtitle">
              {t("serviceSections.digitalMarketing.seoServices.services.subtitle")}
            </p>
          </Motion.div>
          <div
            className="dm-feature-grid dm-feature-grid--pillars"
            style={{ perspective: problemsSection.gridPerspectivePx }}
          >
            {SERVICE_KEYS.map((key, idx) => {
              const bullets = toArray(
                t(
                  `serviceSections.digitalMarketing.seoServices.services.items.${key}.bullets`,
                  { returnObjects: true },
                ),
              );
              return (
                <Motion.div key={key} {...problemsSection.card(idx)}>
                  <ServiceCard
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
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section">
        <div className="dm-container">
          <Motion.div {...processSection.header}>
            <h2 className={`dm-section-title ${fontClass}`}>
              {t("serviceSections.digitalMarketing.seoServices.process.title")}
            </h2>
            <p className="dm-section-subtitle">
              {t(
                "serviceSections.digitalMarketing.seoServices.process.subtitle",
              )}
            </p>
          </Motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {PROCESS_KEYS.map((step, idx) => (
              <Motion.div
                key={step}
                className="dm-process-card"
                {...processSection.stepCard(idx)}
              >
                <Motion.div className="dm-step-number" {...processSection.stepNumber(idx)}>
                  {String(idx + 1).padStart(2, "0")}
                </Motion.div>
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
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section">
        <div className="dm-container">
          <Motion.div {...benefitsSection.headerWrap}>
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
          </Motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {industryItems.map((item, idx) => (
              <Motion.div
                key={idx}
                className="dm-trust-card dm-industry-card"
                {...benefitsSection.item(idx)}
              >
                <span className="dm-trust-title dm-industry-card__text">
                  {item}
                </span>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <Motion.div {...faqSectionReveal}>
        <FAQ
          items={faqItems}
          title={t("serviceSections.digitalMarketing.seoServices.faqTitle")}
        />
      </Motion.div>

      <section>
        <DMRelatedServices current="seoServices" />
      </section>

      <DMCTA />
    </div>
  );
};

export default SEOServicesPage;
