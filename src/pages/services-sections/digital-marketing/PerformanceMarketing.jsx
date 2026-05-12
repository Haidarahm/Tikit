import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  HiCheckCircle,
  HiCurrencyDollar,
  HiAdjustments,
  HiChartBar,
  HiLightningBolt,
  HiRefresh,
  HiSparkles,
} from "react-icons/hi";
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import ServiceCard from "../../../components/ServiceCard";
import DMCTA from "./components/DMCTA";
import DMRelatedServices from "./components/DMRelatedServices";
import "./digitalMarketing.css";

const SERVICE_ICONS = [
  HiCurrencyDollar,
  HiAdjustments,
  HiChartBar,
  HiSparkles,
  HiRefresh,
];

const SERVICE_KEYS = [
  "paidAds",
  "conversionOptimization",
  "trackingAnalytics",
  "creativeTesting",
  "retargeting",
];

const PROCESS_KEYS = ["research", "strategy", "creative", "optimize"];

const toArray = (value) => (Array.isArray(value) ? value : []);

const PerformanceMarketing = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();

  const faqItems = toArray(
    t("serviceSections.digitalMarketing.performanceMarketing.faqItems", {
      returnObjects: true,
    }),
  );
  const industryItems = toArray(
    t(
      "serviceSections.digitalMarketing.performanceMarketing.industries.items",
      { returnObjects: true },
    ),
  );
  const whyUsItems = toArray(
    t("serviceSections.digitalMarketing.performanceMarketing.whyUs.items", {
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
        title={t(
          "serviceSections.digitalMarketing.performanceMarketing.seo.title",
        )}
        description={t(
          "serviceSections.digitalMarketing.performanceMarketing.seo.description",
        )}
        keywords={t(
          "serviceSections.digitalMarketing.performanceMarketing.seo.keywords",
        )}
        canonicalUrl="/digital-marketing-agency-dubai/performance-marketing"
        serviceType={t(
          "serviceSections.digitalMarketing.performanceMarketing.seo.serviceType",
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
              "serviceSections.digitalMarketing.performanceMarketing.seo.breadcrumbLabel",
            ),
            url: "/digital-marketing-agency-dubai/performance-marketing",
          },
        ]}
      />

      <section className="dm-hero">
        <div className="dm-hero-overlay">
          <div className="dm-hero-gradient" />
        </div>
        <div className="dm-hero-content relative z-10">
          <div>
            <HeroWithBadge
              badge={t(
                "serviceSections.digitalMarketing.performanceMarketing.badge",
              )}
              title={t(
                "serviceSections.digitalMarketing.performanceMarketing.hero.title",
              )}
              mainWord={t(
                "serviceSections.digitalMarketing.performanceMarketing.hero.mainWord",
              )}
              description={t(
                "serviceSections.digitalMarketing.performanceMarketing.hero.description",
              )}
              titleClassName="block"
              descriptionClassName="dm-hero-desc"
              contentClassName="relative z-10 max-w-6xl mx-auto text-center mt-6"
              disableAnimation
            />
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
              "serviceSections.digitalMarketing.performanceMarketing.definition.whatIsTitle",
            )}
          </h2>
          <p className="dm-text">
            {t(
              "serviceSections.digitalMarketing.performanceMarketing.definition.paragraph",
            )}
          </p>
          <ul className="space-y-3">
            {toArray(
              t(
                "serviceSections.digitalMarketing.performanceMarketing.definition.benefitsList",
                { returnObjects: true },
              ),
            ).map((item, idx) => (
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

      <section className="dm-section">
        <div className="dm-container-wide">
          <div>
            <h2 className={`dm-section-title ${fontClass}`}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.services.title",
              )}
            </h2>
            <p className="dm-section-subtitle">
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.services.subtitle",
              )}
            </p>
          </div>
          <div className="dm-feature-grid" style={{ perspective: 1000 }}>
            {SERVICE_KEYS.map((key, idx) => (
              <div key={key}>
                <ServiceCard
                  icon={SERVICE_ICONS[idx]}
                  title={t(
                    `serviceSections.digitalMarketing.performanceMarketing.services.items.${key}.title`,
                  )}
                  description={t(
                    `serviceSections.digitalMarketing.performanceMarketing.services.items.${key}.description`,
                  )}
                  iconWrapperClassName="dm-card-icon"
                  iconClassName="w-8 h-8 text-white"
                  titleClassName="dm-card-title"
                  descriptionClassName="dm-card-desc"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section">
        <div className="dm-container">
          <div>
            <h2 className={`dm-section-title ${fontClass}`}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.process.title",
              )}
            </h2>
            <p className="dm-section-subtitle">
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.process.subtitle",
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {PROCESS_KEYS.map((step, idx) => (
              <div key={step} className="dm-process-card">
                <div className="dm-step-number">{String(idx + 1).padStart(2, "0")}</div>
                <h3 className="dm-step-title">
                  {t(
                    `serviceSections.digitalMarketing.performanceMarketing.process.steps.${step}.title`,
                  )}
                </h3>
                <p className="dm-step-desc">
                  {t(
                    `serviceSections.digitalMarketing.performanceMarketing.process.steps.${step}.description`,
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

      <section className="dm-section">
        <div className="dm-container">
          <div>
            <h2 className={`dm-section-title ${fontClass}`}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.industries.title",
              )}
            </h2>
            <p className="dm-section-subtitle">
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.industries.subtitle",
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {industryItems.map((item, idx) => (
              <div key={idx} className="dm-trust-card text-center">
                <span className="dm-trust-title">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section">
        <div className="dm-container">
          <div>
            <h2 className={`dm-section-title ${fontClass}`}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.whyUs.title",
              )}
            </h2>
            <p className="dm-section-subtitle">
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.whyUs.subtitle",
              )}
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {whyUsItems.map((item, idx) => (
              <li key={idx} className="dm-check-item">
                <HiLightningBolt className="dm-check-icon" />
                <span className="dm-text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <FAQ
        items={faqItems}
        title={t(
          "serviceSections.digitalMarketing.performanceMarketing.faqTitle",
        )}
      />

      <section>
        <DMRelatedServices current="performanceMarketing" />
      </section>

      <DMCTA />
    </div>
  );
};

export default PerformanceMarketing;
