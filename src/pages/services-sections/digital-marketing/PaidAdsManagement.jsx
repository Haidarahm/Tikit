import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import { HiGlobeAlt } from "react-icons/hi";
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaSnapchatGhost,
  FaTiktok,
} from "react-icons/fa";
import SEOHead from "../../../components/SEOHead";
import {
  DMDivider,
  DMHeroSection,
  DMDefinitionSection,
  DMServicePillarsSection,
  DMIncludedSection,
  DMWhyChooseSection,
  DMProcessStepsSection,
  DMFinalCtaSection,
  DMRelatedServicesReveal,
  DMFaqBlock,
  DMCTA,
} from "./components";
import "./digitalMarketing.css";

const SERVICE_KEYS = [
  "googleAds",
  "metaAds",
  "tiktokAds",
  "snapchatAds",
  "linkedinAds",
  "programmaticDisplay",
];

const SERVICE_ICONS = [
  FaGoogle,
  FaFacebook,
  FaTiktok,
  FaSnapchatGhost,
  FaLinkedin,
  HiGlobeAlt,
];

const PROCESS_KEYS = ["audit", "setup", "optimize", "report"];

const toArray = (value) => (Array.isArray(value) ? value : []);

const PaidAdsManagement = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  const faqItems = toArray(
    t("serviceSections.digitalMarketing.paidAds.faqItems", {
      returnObjects: true,
    }),
  );
  const benefitsList = toArray(
    t("serviceSections.digitalMarketing.paidAds.definition.benefitsList", {
      returnObjects: true,
    }),
  );
  const includedItems = toArray(
    t("serviceSections.digitalMarketing.paidAds.included.items", {
      returnObjects: true,
    }),
  );
  const whyChooseItems = toArray(
    t("serviceSections.digitalMarketing.paidAds.whyChoose.items", {
      returnObjects: true,
    }),
  ).filter(
    (row) =>
      row &&
      typeof row === "object" &&
      typeof row.title === "string" &&
      typeof row.description === "string",
  );

  const pillars = SERVICE_KEYS.map((key, idx) => ({
    key,
    icon: SERVICE_ICONS[idx],
    title: t(
      `serviceSections.digitalMarketing.paidAds.services.items.${key}.title`,
    ),
    description: t(
      `serviceSections.digitalMarketing.paidAds.services.items.${key}.description`,
    ),
  }));

  const processSteps = PROCESS_KEYS.map((step) => ({
    id: step,
    title: t(
      `serviceSections.digitalMarketing.paidAds.process.steps.${step}.title`,
    ),
    description: t(
      `serviceSections.digitalMarketing.paidAds.process.steps.${step}.description`,
    ),
  }));

  return (
    <div
      data-nav-color="black"
      className={`dm-page ${isRtl ? "font-cairo" : "font-hero-light"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title={t("serviceSections.digitalMarketing.paidAds.seo.title")}
        description={t(
          "serviceSections.digitalMarketing.paidAds.seo.description",
        )}
        keywords={t("serviceSections.digitalMarketing.paidAds.seo.keywords")}
        canonicalUrl="/digital-marketing-agency-dubai/paid-ads-management"
        serviceType={t(
          "serviceSections.digitalMarketing.paidAds.seo.serviceType",
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
              "serviceSections.digitalMarketing.paidAds.seo.breadcrumbLabel",
            ),
            url: "/digital-marketing-agency-dubai/paid-ads-management",
          },
        ]}
      />

      <DMHeroSection
        badge={t("serviceSections.digitalMarketing.paidAds.badge")}
        title={t("serviceSections.digitalMarketing.paidAds.hero.title")}
        mainWord={t("serviceSections.digitalMarketing.paidAds.hero.mainWord")}
        description={t(
          "serviceSections.digitalMarketing.paidAds.hero.description",
        )}
        heroSecondary={t(
          "serviceSections.digitalMarketing.paidAds.heroSecondary",
        )}
        heroCta={t("serviceSections.digitalMarketing.paidAds.heroCta")}
      />

      <DMDivider />

      <DMDefinitionSection
        title={t(
          "serviceSections.digitalMarketing.paidAds.definition.whatIsTitle",
        )}
        paragraph={t(
          "serviceSections.digitalMarketing.paidAds.definition.paragraph",
        )}
        paragraph2={t(
          "serviceSections.digitalMarketing.paidAds.definition.paragraph2",
        )}
        benefitsLabel={t(
          "serviceSections.digitalMarketing.paidAds.definition.benefitsLabel",
        )}
        benefitsList={benefitsList}
        fontClass={fontClass}
      />

      <DMDivider />

      <DMServicePillarsSection
        title={t("serviceSections.digitalMarketing.paidAds.services.title")}
        subtitle={t(
          "serviceSections.digitalMarketing.paidAds.services.subtitle",
        )}
        pillars={pillars}
        fontClass={fontClass}
      />

      <DMDivider />

      <DMIncludedSection
        title={t("serviceSections.digitalMarketing.paidAds.included.title")}
        subtitle={t(
          "serviceSections.digitalMarketing.paidAds.included.subtitle",
        )}
        items={includedItems}
        fontClass={fontClass}
      />

      <DMDivider />

      <DMWhyChooseSection
        title={t("serviceSections.digitalMarketing.paidAds.whyChoose.title")}
        rows={whyChooseItems}
        fontClass={fontClass}
      />

      <DMDivider />

      <DMProcessStepsSection
        title={t("serviceSections.digitalMarketing.paidAds.process.title")}
        subtitle={t(
          "serviceSections.digitalMarketing.paidAds.process.subtitle",
        )}
        steps={processSteps}
        fontClass={fontClass}
      />

      <DMDivider />

      <DMFinalCtaSection
        title={t("serviceSections.digitalMarketing.paidAds.finalCta.title")}
        description={t(
          "serviceSections.digitalMarketing.paidAds.finalCta.description",
        )}
        buttonText={t(
          "serviceSections.digitalMarketing.paidAds.finalCta.button",
        )}
        fontClass={fontClass}
      />

      <DMDivider />

      <DMFaqBlock
        items={faqItems}
        title={t("serviceSections.digitalMarketing.paidAds.faqTitle")}
      />

      <DMRelatedServicesReveal current="paidAds" />

      <DMCTA />
    </div>
  );
};

export default PaidAdsManagement;
