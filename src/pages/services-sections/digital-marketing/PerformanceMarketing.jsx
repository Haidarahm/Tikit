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
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import ServiceCard from "../../../components/ServiceCard";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";
import DMCTA from "./components/DMCTA";
import DMRelatedServices from "./components/DMRelatedServices";
import DMHeroSection from "./components/DMHeroSection";
import { DMDivider } from "./components/DMDivider";
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

  const definitionLines = toArray(
    t(
      "serviceSections.digitalMarketing.performanceMarketing.definition.benefitsList",
      { returnObjects: true },
    ),
  );

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

      <DMHeroSection
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
      />

      <DMDivider />

      <AnimatedSection className="dm-section">
        <div className="dm-container">
          <AnimatedTitle as="h2" className={`dm-heading ${fontClass}`}>
            {t(
              "serviceSections.digitalMarketing.performanceMarketing.definition.whatIsTitle",
            )}
          </AnimatedTitle>
          <AnimatedText className="dm-text" delay={0.05}>
            {t(
              "serviceSections.digitalMarketing.performanceMarketing.definition.paragraph",
            )}
          </AnimatedText>
          <AnimatedGroup as="ul" className="space-y-3 mt-4" stagger={0.06}>
            {definitionLines.map((item, idx) => (
              <AnimatedCard as="li" key={idx} className="dm-check-item">
                <HiCheckCircle className="dm-check-icon" />
                <span className="dm-text-sm">{item}</span>
              </AnimatedCard>
            ))}
          </AnimatedGroup>
        </div>
      </AnimatedSection>

      <DMDivider />

      <AnimatedSection className="dm-section">
        <div className="dm-container-wide">
          <div>
            <AnimatedTitle as="h2" className={`dm-section-title ${fontClass}`}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.services.title",
              )}
            </AnimatedTitle>
            <AnimatedText className="dm-section-subtitle" delay={0.05}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.services.subtitle",
              )}
            </AnimatedText>
          </div>
          <AnimatedGroup
            as="div"
            className="dm-feature-grid"
            style={{ perspective: 1000 }}
            stagger={0.1}
          >
            {SERVICE_KEYS.map((key, idx) => (
              <AnimatedCard key={key}>
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
              </AnimatedCard>
            ))}
          </AnimatedGroup>
        </div>
      </AnimatedSection>

      <DMDivider />

      <AnimatedSection className="dm-section">
        <div className="dm-container">
          <div>
            <AnimatedTitle as="h2" className={`dm-section-title ${fontClass}`}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.process.title",
              )}
            </AnimatedTitle>
            <AnimatedText className="dm-section-subtitle" delay={0.05}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.process.subtitle",
              )}
            </AnimatedText>
          </div>
          <AnimatedGroup
            as="div"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            stagger={0.1}
          >
            {PROCESS_KEYS.map((step, idx) => (
              <AnimatedCard key={step} className="dm-process-card">
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
              </AnimatedCard>
            ))}
          </AnimatedGroup>
        </div>
      </AnimatedSection>

      <DMDivider />

      <AnimatedSection className="dm-section">
        <div className="dm-container">
          <div>
            <AnimatedTitle as="h2" className={`dm-section-title ${fontClass}`}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.industries.title",
              )}
            </AnimatedTitle>
            <AnimatedText className="dm-section-subtitle" delay={0.05}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.industries.subtitle",
              )}
            </AnimatedText>
          </div>
          <AnimatedGroup
            as="div"
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
            stagger={0.08}
          >
            {industryItems.map((item, idx) => (
              <AnimatedCard key={idx} className="dm-trust-card text-center">
                <span className="dm-trust-title">{item}</span>
              </AnimatedCard>
            ))}
          </AnimatedGroup>
        </div>
      </AnimatedSection>

      <DMDivider />

      <AnimatedSection className="dm-section">
        <div className="dm-container">
          <div>
            <AnimatedTitle as="h2" className={`dm-section-title ${fontClass}`}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.whyUs.title",
              )}
            </AnimatedTitle>
            <AnimatedText className="dm-section-subtitle" delay={0.05}>
              {t(
                "serviceSections.digitalMarketing.performanceMarketing.whyUs.subtitle",
              )}
            </AnimatedText>
          </div>
          <AnimatedGroup
            as="ul"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            stagger={0.06}
          >
            {whyUsItems.map((item, idx) => (
              <AnimatedCard as="li" key={idx} className="dm-check-item">
                <HiLightningBolt className="dm-check-icon" />
                <span className="dm-text-sm">{item}</span>
              </AnimatedCard>
            ))}
          </AnimatedGroup>
        </div>
      </AnimatedSection>

      <DMDivider />

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
