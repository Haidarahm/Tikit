import { useTranslation } from "react-i18next";
import {
  FiAlertCircle,
  FiLayout,
  FiCompass,
  FiEdit3,
  FiShield,
  FiGlobe,
  FiLink,
  FiArrowRight,
  FiPhone,
  FiBookOpen,
  FiRefreshCw,
  FiMap,
} from "react-icons/fi";

import brandingHero from "../../../assets/services/Branding.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  ServiceHeroSection,
  ServiceProblemsSection,
  ServiceProcessSection,
  ServiceStatsSection,
  ServiceBenefitsSection,
  ServiceCaseStudySection,
  ServiceSubServicesSection,
  ServiceCTASection,
} from "../../../components/services-sections";

import "./Branding.css";

const problemIcons = [<FiAlertCircle key="1" />, <FiLayout key="2" />, <FiCompass key="3" />];
const benefitIcons = [<FiCompass key="1" />, <FiGlobe key="2" />, <FiShield key="3" />, <FiLink key="4" />];
const subServiceIcons = [<FiBookOpen key="1" />, <FiEdit3 key="2" />, <FiRefreshCw key="3" />, <FiMap key="4" />];

const TK = "serviceSections.branding.page";
const Branding = () => {
  const { t } = useTranslation();

  const breadcrumbsRaw = t(`${TK}.breadcrumbs`, { returnObjects: true });
  const breadcrumbs = Array.isArray(breadcrumbsRaw) ? breadcrumbsRaw : [];
  const problemsData = t(`${TK}.problems.items`, { returnObjects: true });
  const problems = Array.isArray(problemsData) ? problemsData.map((p, i) => ({ ...p, icon: problemIcons[i] })) : [];
  const processSteps = t(`${TK}.process.steps`, { returnObjects: true });
  const stats = t(`${TK}.stats.items`, { returnObjects: true });
  const benefitsData = t(`${TK}.benefits.items`, { returnObjects: true });
  const benefits = Array.isArray(benefitsData) ? benefitsData.map((b, i) => ({ ...b, icon: benefitIcons[i] })) : [];
  const subServicesData = t(`${TK}.subServices.items`, { returnObjects: true });
  const subServices = Array.isArray(subServicesData) ? subServicesData.map((s, i) => ({ ...s, icon: subServiceIcons[i] })) : [];
  const faqItems = t(`${TK}.faqItems`, { returnObjects: true });

  const caseStudyStats = [
    { value: "40%", label: t(`${TK}.caseStudy.stat1Label`), dataTarget: "40", dataSuffix: "%" },
    { value: "Award", label: t(`${TK}.caseStudy.stat2Label`) },
    { value: "25+", label: t(`${TK}.caseStudy.stat3Label`) },
  ];
  const caseStudyPills = t(`${TK}.caseStudy.pills`, { returnObjects: true });
  const pillsArray = Array.isArray(caseStudyPills) ? caseStudyPills : [];

  return (
    <>
      <SEOHead
        title={t(`${TK}.seoTitle`)}
        description={t(`${TK}.seoDescription`)}
        serviceType="Branding Agency Dubai"
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        classPrefix="im"
        dataNavColor="black"
        imageSrc={brandingHero}
        imageAlt="Branding Agency Dubai"
        badge={t(`${TK}.hero.badge`)}
        badgeVariant="pulse"
        title={t(`${TK}.hero.title`)}
        mainWord={t(`${TK}.hero.mainWord`)}
        description={t(`${TK}.hero.description`)}
      />

      <ServiceProblemsSection
        classPrefix="im"
        sectionLabel={t(`${TK}.problems.label`)}
        title={t(`${TK}.problems.title`)}
        description={t(`${TK}.problems.desc`)}
        items={problems}
        icons={problemIcons}
      />

      <ServiceProcessSection
        classPrefix="im"
        sectionLabel={t(`${TK}.process.label`)}
        title={t(`${TK}.process.title`)}
        description={t(`${TK}.process.desc`)}
        steps={Array.isArray(processSteps) ? processSteps : []}
      />

      <ServiceStatsSection
        classPrefix="im"
        sectionLabel={t(`${TK}.stats.label`)}
        title={t(`${TK}.stats.title`)}
        description={t(`${TK}.stats.desc`)}
        items={Array.isArray(stats) ? stats : []}
      />

      <ServiceCaseStudySection
        classPrefix="im"
        sectionLabel={t(`${TK}.caseStudy.label`)}
        title={t(`${TK}.caseStudy.title`)}
        tag={t(`${TK}.caseStudy.tag`)}
        caseTitle={t(`${TK}.caseStudy.caseTitle`)}
        stats={caseStudyStats}
        tags={pillsArray}
        quote={t(`${TK}.caseStudy.quote`)}
      />

      <ServiceBenefitsSection
        classPrefix="im"
        sectionLabel={t(`${TK}.benefits.label`)}
        title={t(`${TK}.benefits.title`)}
        description={t(`${TK}.benefits.desc`)}
        items={benefits}
        icons={benefitIcons}
      />

      <ServiceSubServicesSection
        classPrefix="im"
        sectionLabel={t(`${TK}.subServices.label`)}
        title={t(`${TK}.subServices.title`)}
        description={t(`${TK}.subServices.desc`)}
        learnMoreText={t(`${TK}.subServices.learnMore`)}
        items={subServices}
        hrefs={subServices.map((s) => s.href)}
        icons={subServiceIcons}
      />

      <FAQ
        items={Array.isArray(faqItems) ? faqItems : []}
        title={t(`${TK}.faqTitle`)}
      />

      <ServiceCTASection
        classPrefix="im"
        sectionLabel={t(`${TK}.cta.label`)}
        title={t(`${TK}.cta.title`)}
        description={t(`${TK}.cta.desc`)}
        primaryButtonText={t(`${TK}.cta.primaryBtn`)}
        primaryHref="/contact"
        secondaryButtonText={t(`${TK}.cta.secondaryBtn`)}
        secondaryHref="tel:+97145774042"
      />
    </>
  );
};

export default Branding;
