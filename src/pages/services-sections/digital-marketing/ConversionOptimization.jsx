import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  HiAdjustments,
  HiChartBar,
  HiClipboardCheck,
  HiDeviceMobile,
  HiSearchCircle,
  HiTemplate,
  HiUserGroup,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  DMDivider,
  DMHeroSection,
  DMDefinitionSection,
  DMServicePillarsSection,
  DMProcessStepsSection,
  DMIncludedSection,
  DMMarketInsightSection,
  DMRelatedServices,
  DMCTA,
} from "./components";
import "./digitalMarketing.css";

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

  const pillars = SERVICE_KEYS.map((key, idx) => ({
    key,
    icon: SERVICE_ICONS[idx],
    title: t(
      `serviceSections.digitalMarketing.conversionOptimization.services.items.${key}.title`,
    ),
    description: t(
      `serviceSections.digitalMarketing.conversionOptimization.services.items.${key}.description`,
    ),
  }));

  const processSteps = PROCESS_KEYS.map((step) => ({
    id: step,
    title: t(
      `serviceSections.digitalMarketing.conversionOptimization.process.steps.${step}.title`,
    ),
    description: t(
      `serviceSections.digitalMarketing.conversionOptimization.process.steps.${step}.description`,
    ),
  }));

  return (
    <div
      data-nav-color="black"
      className={`dm-page ${isRtl ? "font-cairo" : "font-hero-light"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title={t(
          "serviceSections.digitalMarketing.conversionOptimization.seo.title",
        )}
        description={t(
          "serviceSections.digitalMarketing.conversionOptimization.seo.description",
        )}
        keywords={t(
          "serviceSections.digitalMarketing.conversionOptimization.seo.keywords",
        )}
        canonicalUrl="/digital-marketing-agency-dubai/conversion-optimization"
        serviceType={t(
          "serviceSections.digitalMarketing.conversionOptimization.seo.serviceType",
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
              "serviceSections.digitalMarketing.conversionOptimization.seo.breadcrumbLabel",
            ),
            url: "/digital-marketing-agency-dubai/conversion-optimization",
          },
        ]}
      />

      <DMHeroSection
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
        heroSecondary={t(
          "serviceSections.digitalMarketing.conversionOptimization.heroSecondary",
        )}
        heroCta={t(
          "serviceSections.digitalMarketing.conversionOptimization.heroCta",
        )}
      />

      <DMDivider />

      <DMDefinitionSection
        title={t(
          "serviceSections.digitalMarketing.conversionOptimization.definition.whatIsTitle",
        )}
        paragraph={t(
          "serviceSections.digitalMarketing.conversionOptimization.definition.paragraph",
        )}
        paragraph2={t(
          "serviceSections.digitalMarketing.conversionOptimization.definition.paragraph2",
        )}
        benefitsLabel={t(
          "serviceSections.digitalMarketing.conversionOptimization.definition.benefitsLabel",
        )}
        benefitsList={benefitsList}
        fontClass={fontClass}
      />

      <DMDivider />

      <DMServicePillarsSection
        title={t(
          "serviceSections.digitalMarketing.conversionOptimization.services.title",
        )}
        subtitle={t(
          "serviceSections.digitalMarketing.conversionOptimization.services.subtitle",
        )}
        pillars={pillars}
        fontClass={fontClass}
      />

      <DMDivider />

      <DMProcessStepsSection
        title={t(
          "serviceSections.digitalMarketing.conversionOptimization.process.title",
        )}
        subtitle={t(
          "serviceSections.digitalMarketing.conversionOptimization.process.subtitle",
        )}
        steps={processSteps}
        fontClass={fontClass}
      />

      <DMDivider />

      <DMIncludedSection
        sectionClassName="dm-section dm-section-alt"
        title={t(
          "serviceSections.digitalMarketing.conversionOptimization.expectations.title",
        )}
        subtitle={t(
          "serviceSections.digitalMarketing.conversionOptimization.expectations.subtitle",
        )}
        items={expectationsList}
        fontClass={fontClass}
      />

      <DMDivider />

      <DMMarketInsightSection
        title={t(
          "serviceSections.digitalMarketing.conversionOptimization.marketInsight.title",
        )}
        paragraph={t(
          "serviceSections.digitalMarketing.conversionOptimization.marketInsight.paragraph",
        )}
        paragraph2={t(
          "serviceSections.digitalMarketing.conversionOptimization.marketInsight.paragraph2",
        )}
        fontClass={fontClass}
      />

      <DMDivider />

      <FAQ
        items={faqItems}
        title={t(
          "serviceSections.digitalMarketing.conversionOptimization.faqTitle",
        )}
      />

      <DMRelatedServices current="conversionOptimization" withScrollReveal />

      <DMCTA />
    </div>
  );
};

export default ConversionOptimization;
