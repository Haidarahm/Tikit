import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  FiTarget,
  FiTrendingUp,
  FiBarChart2,
  FiGlobe,
  FiSearch,
  FiLayers,
  FiZap,
  FiMessageSquare,
  FiShield,
  FiDollarSign,
  FiUsers,
  FiActivity,
  FiAward,
} from "react-icons/fi";

import digitalMarketingHero from "../../../assets/services/digital_marketing.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  ServiceHeroSection,
  ServiceProblemsSection,
  ServiceProcessSection,
  ServiceBenefitsSection,
  ServiceCaseStudySection,
  ServiceWhyUsSection,
  ServiceSubServicesSection,
  ServiceMultiCTASection,
} from "../../../components/services-sections";

import "../../../components/services-sections/ServiceSections.css";

const problemIcons = [<FiTarget key="1" />, <FiDollarSign key="2" />, <FiBarChart2 key="3" />, <FiGlobe key="4" />];
const benefitIcons = [<FiTrendingUp key="1" />, <FiBarChart2 key="2" />, <FiZap key="3" />, <FiGlobe key="4" />];
const whyUsIcons = [<FiLayers key="1" />, <FiShield key="2" />, <FiSearch key="3" />, <FiMessageSquare key="4" />];
const marketExpertiseIcons = [<FiGlobe key="me1" />, <FiMessageSquare key="me2" />, <FiUsers key="me3" />];
const subServiceIcons = [
  <FiSearch key="1" />,
  <FiTrendingUp key="2" />,
  <FiActivity key="3" />,
  <FiAward key="4" />,
];

const subServiceHrefs = [
  "/digital-marketing-agency-dubai/seo-services",
  "/digital-marketing-agency-dubai/paid-ads-management",
  "/digital-marketing-agency-dubai/conversion-optimization",
  "/digital-marketing-agency-dubai/performance-marketing",
];

const DigitalMarketing = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const toArray = (val) => (Array.isArray(val) ? val : []);

  const problems = toArray(t("serviceSections.digitalMarketing.problems.items", { returnObjects: true }));
  const steps = toArray(t("serviceSections.digitalMarketing.process.steps", { returnObjects: true }));
  const benefits = toArray(t("serviceSections.digitalMarketing.benefits.items", { returnObjects: true }));
  const whyUsItems = toArray(t("serviceSections.digitalMarketing.whyUs.items", { returnObjects: true }));
  const marketExpertiseItems = toArray(t("serviceSections.digitalMarketing.marketExpertise.items", { returnObjects: true }));
  const subServices = [
    {
      title: t("serviceSections.digitalMarketing.subServices.seoServices.title", { defaultValue: "SEO Services" }),
      desc: t("serviceSections.digitalMarketing.subServices.seoServices.description", {
        defaultValue:
          "Improve search visibility and organic traffic with technical, on-page, and content SEO strategies.",
      }),
    },
    {
      title: t("serviceSections.digitalMarketing.subServices.paidAds.title", { defaultValue: "Paid Ads Management" }),
      desc: t("serviceSections.digitalMarketing.subServices.paidAds.description", {
        defaultValue: "Launch and optimize paid campaigns across Google and social channels to generate qualified leads.",
      }),
    },
    {
      title: t("serviceSections.digitalMarketing.subServices.conversionOptimization.title", {
        defaultValue: "Conversion Optimization",
      }),
      desc: t("serviceSections.digitalMarketing.subServices.conversionOptimization.description", {
        defaultValue: "Turn more visitors into customers through CRO audits, testing, and landing-page performance improvements.",
      }),
    },
    {
      title: t("serviceSections.digitalMarketing.subServices.performanceMarketing.title", {
        defaultValue: "Performance Marketing",
      }),
      desc: t("serviceSections.digitalMarketing.subServices.performanceMarketing.description", {
        defaultValue:
          "Drive measurable growth with data-backed paid media, CRO, tracking, and ROI-focused campaigns across Google, Meta, and TikTok.",
      }),
    },
  ];
  const caseStatsRaw = toArray(t("serviceSections.digitalMarketing.caseStudy.stats", { returnObjects: true }));
  const caseTags = toArray(t("serviceSections.digitalMarketing.caseStudy.tags", { returnObjects: true }));
  const faqItems = toArray(t("serviceSections.digitalMarketing.faq.items", { returnObjects: true }));
  const finalCtaCards = toArray(t("serviceSections.digitalMarketing.finalCta.cards", { returnObjects: true }));

  const marketExpertiseMicroCta = {
    before: t("serviceSections.digitalMarketing.marketExpertise.microCta.before"),
    highlight: t("serviceSections.digitalMarketing.marketExpertise.microCta.highlight"),
    after: t("serviceSections.digitalMarketing.marketExpertise.microCta.after"),
  };

  const whyUsMicroCta = {
    before: t("serviceSections.digitalMarketing.whyUs.microCta.before"),
    highlight: t("serviceSections.digitalMarketing.whyUs.microCta.highlight"),
    after: t("serviceSections.digitalMarketing.whyUs.microCta.after"),
  };

  const caseStats = caseStatsRaw.map((stat, i) => ({
    ...stat,
    dataTarget: i === 0 ? "3" : i === 1 ? "90" : undefined,
    dataSuffix: i === 0 ? "x" : i === 1 ? "%" : undefined,
  }));

  const breadcrumbs = [
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
  ];

  const dir = isRtl ? "rtl" : "ltr";

  return (
    <>
      <SEOHead
        title={t("serviceSections.digitalMarketing.seo.title")}
        description={t("serviceSections.digitalMarketing.seo.description")}
        keywords={t("serviceSections.digitalMarketing.seo.keywords", {
          defaultValue:
            "digital marketing agency Dubai, digital marketing services UAE, performance marketing Dubai, SEO and paid ads Dubai",
        })}
        serviceType={t("serviceSections.digitalMarketing.seo.serviceType")}
        canonicalUrl="/digital-marketing-agency-dubai"
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        imageSrc={digitalMarketingHero}
        imageAlt={t("serviceSections.digitalMarketing.seo.serviceType")}
        badge={t("serviceSections.digitalMarketing.hero.badge")}
        badgeVariant="pulse"
        title={t("serviceSections.digitalMarketing.hero.title")}
        mainWord={t("serviceSections.digitalMarketing.hero.mainWord")}
        description={t("serviceSections.digitalMarketing.hero.description")}
        dataNavColor="black"
      />

      <ServiceProblemsSection
        sectionLabel={t("serviceSections.digitalMarketing.problems.sectionLabel")}
        title={t("serviceSections.digitalMarketing.problems.title")}
        description={t("serviceSections.digitalMarketing.problems.description")}
        items={problems}
        icons={problemIcons}
        dir={dir}
      />

      <ServiceProcessSection
        sectionLabel={t("serviceSections.digitalMarketing.process.sectionLabel")}
        title={t("serviceSections.digitalMarketing.process.title")}
        description={t("serviceSections.digitalMarketing.process.description")}
        steps={steps}
        dir={dir}
      />

      <ServiceBenefitsSection
        sectionLabel={t("serviceSections.digitalMarketing.benefits.sectionLabel")}
        title={t("serviceSections.digitalMarketing.benefits.title")}
        description={t("serviceSections.digitalMarketing.benefits.description")}
        items={benefits}
        icons={benefitIcons}
        dir={dir}
      />

      <ServiceCaseStudySection
        sectionLabel={t("serviceSections.digitalMarketing.caseStudy.sectionLabel")}
        title={t("serviceSections.digitalMarketing.caseStudy.title")}
        tag={t("serviceSections.digitalMarketing.caseStudy.tag")}
        caseTitle={t("serviceSections.digitalMarketing.caseStudy.caseTitle")}
        stats={caseStats}
        tags={caseTags}
        quote={t("serviceSections.digitalMarketing.caseStudy.quote")}
        dir={dir}
      />

      <ServiceWhyUsSection
        sectionLabel={t("serviceSections.digitalMarketing.marketExpertise.sectionLabel")}
        title={t("serviceSections.digitalMarketing.marketExpertise.title")}
        items={marketExpertiseItems}
        icons={marketExpertiseIcons}
        microCta={marketExpertiseMicroCta}
        dir={dir}
      />

      <ServiceWhyUsSection
        sectionLabel={t("serviceSections.digitalMarketing.whyUs.sectionLabel")}
        title={t("serviceSections.digitalMarketing.whyUs.title")}
        items={whyUsItems}
        icons={whyUsIcons}
        microCta={whyUsMicroCta}
        dir={dir}
      />

      <ServiceSubServicesSection
        sectionLabel={t("serviceSections.digitalMarketing.subServices.sectionLabel", { defaultValue: "Sub-Services" })}
        title={t("serviceSections.digitalMarketing.subServices.title", {
          defaultValue: "Explore Digital Marketing Sub-Services",
        })}
        description={t("serviceSections.digitalMarketing.subServices.subtitle", {
          defaultValue:
            "Choose a focused digital service based on your growth objective: visibility, paid acquisition, or conversion rate growth.",
        })}
        learnMoreText={t("serviceSections.digitalMarketing.subServices.learnMore", { defaultValue: "Learn More" })}
        items={subServices}
        hrefs={subServiceHrefs}
        icons={subServiceIcons}
        dir={dir}
      />

      <FAQ items={faqItems} title={t("serviceSections.digitalMarketing.faq.title")} />

      <ServiceMultiCTASection
        title={t("serviceSections.digitalMarketing.finalCta.title")}
        cards={finalCtaCards}
        finalLine={t("serviceSections.digitalMarketing.finalCta.finalLine")}
        dir={dir}
      />
    </>
  );
};

export default DigitalMarketing;
