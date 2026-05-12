import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  FiSearch,
  FiUsers,
  FiTarget,
  FiEdit3,
  FiBarChart2,
  FiLayers,
  FiCheckCircle,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiDatabase,
  FiFileText,
  FiAward,
  FiStar,
} from "react-icons/fi";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import {
  HiShoppingCart,
  HiHome,
  HiGlobe,
  HiCamera,
  HiSparkles,
} from "react-icons/hi";

import influencerHero from "../../../assets/services/Influencer-Marketing.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import { ServiceHeroSection, ServiceCTASection } from "../../../components/services-sections";
import ServiceSubServicesSection from "../../../components/services-sections/ServiceSubServicesSection";

import InfServicesGrid from "./sub-components/InfServicesGrid";
import InfFullService from "./sub-components/InfFullService";
import InfPlatforms from "./sub-components/InfPlatforms";
import InfInfluencerTypes from "./sub-components/InfInfluencerTypes";
import InfCampaignProcess from "./sub-components/InfCampaignProcess";
import InfIndustries from "./sub-components/InfIndustries";
import InfWhyChooseUs from "./sub-components/InfWhyChooseUs";
import InfComparisonTable from "./sub-components/InfComparisonTable";
import {
  influencerMarketingSubServiceHrefs,
  influencerMarketingSubServiceIcons,
  getInfluencerMarketingSubServiceItems,
} from "./sub-components/influencerMarketingSubServices";
import { toArray } from "./influencerUtils";

import "./influencerMarketing.css";

const TK = "serviceSections.influencerMarketing";

const coreServiceIcons = [<FiSearch key="cs1" />, <FiUsers key="cs2" />, <FiTarget key="cs3" />, <FiEdit3 key="cs4" />, <FiBarChart2 key="cs5" />];
const fullServiceIcons = [<FiLayers key="fs1" />, <FiCheckCircle key="fs2" />, <FiZap key="fs3" />];
const platformIcons = [<FaInstagram key="pl1" />, <FaTiktok key="pl2" />, <FaYoutube key="pl3" />];
const influencerTypeIcons = [<FiStar key="it1" />, <FiUsers key="it2" />, <FiTrendingUp key="it3" />, <FiAward key="it4" />];
const industryIcons = [<HiSparkles key="ind1" />, <HiCamera key="ind2" />, <HiGlobe key="ind3" />, <HiShoppingCart key="ind4" />, <HiHome key="ind5" />];
const whyUsIcons = [<FiUsers key="wu1" />, <FiDatabase key="wu2" />, <FiFileText key="wu3" />, <FiShield key="wu4" />];

const InfluencerMarketing = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const dir = isRtl ? "rtl" : "ltr";

  const subServices = getInfluencerMarketingSubServiceItems(t);

  const coreServices = toArray(t(`${TK}.coreServices.items`, { returnObjects: true })).map((item, i) => ({
    icon: coreServiceIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const fullServiceItems = toArray(t(`${TK}.fullService.items`, { returnObjects: true })).map((item, i) => ({
    icon: fullServiceIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const platforms = toArray(t(`${TK}.platforms.items`, { returnObjects: true })).map((item, i) => ({
    icon: platformIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
    tags: item?.tags ?? [],
  }));

  const influencerTypes = toArray(t(`${TK}.influencerTypes.items`, { returnObjects: true })).map((item, i) => ({
    icon: influencerTypeIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const processSteps = toArray(t(`${TK}.process.steps`, { returnObjects: true }));

  const industries = toArray(t(`${TK}.industries.items`, { returnObjects: true })).map((item, i) => ({
    icon: industryIcons[i],
    title: item?.title ?? "",
  }));

  const whyUsReasons = toArray(t(`${TK}.whyChooseUs.items`, { returnObjects: true })).map((item, i) => ({
    icon: whyUsIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const comparisonRows = toArray(t(`${TK}.comparison.rows`, { returnObjects: true }));

  const faqItems = toArray(t(`${TK}.faq.items`, { returnObjects: true }));

  const breadcrumbs = [
    { name: t("nav.home"), url: "/" },
    { name: t("nav.services"), url: "/services" },
    { name: t(`${TK}.badge`), url: "/influencer-marketing-agency-dubai" },
  ];

  return (
    <>
    
      <SEOHead
        title={t(`${TK}.seo.title`)}
        description={t(`${TK}.seo.description`)}
        keywords={t(`${TK}.seo.keywords`)}
        serviceType={t(`${TK}.seo.serviceType`)}
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        imageSrc={influencerHero}
        imageAlt={t(`${TK}.seo.serviceType`)}
        badge={t(`${TK}.badge`)}
        badgeVariant="pulse"
        title={t(`${TK}.hero.title`)}
        mainWord={t(`${TK}.hero.mainWord`)}
        description={t(`${TK}.hero.description`)}
        dataNavColor="black"
      />

      <InfServicesGrid
        label={t(`${TK}.coreServices.label`)}
        title={t(`${TK}.coreServices.title`)}
        description={t(`${TK}.coreServices.description`)}
        services={coreServices}
      />

      <InfFullService
        label={t(`${TK}.fullService.label`)}
        title={t(`${TK}.fullService.title`)}
        description={t(`${TK}.fullService.description`)}
        items={fullServiceItems}
      />

      <InfPlatforms
        label={t(`${TK}.platforms.label`)}
        title={t(`${TK}.platforms.title`)}
        description={t(`${TK}.platforms.description`)}
        platforms={platforms}
      />

      <InfInfluencerTypes
        label={t(`${TK}.influencerTypes.label`)}
        title={t(`${TK}.influencerTypes.title`)}
        description={t(`${TK}.influencerTypes.description`)}
        types={influencerTypes}
      />

      <InfCampaignProcess
        label={t(`${TK}.process.label`)}
        title={t(`${TK}.process.title`)}
        description={t(`${TK}.process.description`)}
        steps={processSteps}
      />

      <InfIndustries
        label={t(`${TK}.industries.label`)}
        title={t(`${TK}.industries.title`)}
        description={t(`${TK}.industries.description`)}
        industries={industries}
      />

      <InfWhyChooseUs
        label={t(`${TK}.whyChooseUs.label`)}
        title={t(`${TK}.whyChooseUs.title`)}
        description={t(`${TK}.whyChooseUs.description`)}
        reasons={whyUsReasons}
      />

      <InfComparisonTable
        label={t(`${TK}.comparison.label`)}
        title={t(`${TK}.comparison.title`)}
        description={t(`${TK}.comparison.description`)}
        rows={comparisonRows}
        headerFeature={t(`${TK}.comparison.headerFeature`)}
        headerInfluencer={t(`${TK}.comparison.headerInfluencer`)}
        headerTraditional={t(`${TK}.comparison.headerTraditional`)}
        footer={t(`${TK}.comparison.footer`)}
      />

      <ServiceSubServicesSection
        sectionLabel={t(`${TK}.subServices.sectionLabel`)}
        title={t(`${TK}.subServices.title`)}
        description={t(`${TK}.subServices.description`)}
        learnMoreText={t(`${TK}.subServices.learnMore`)}
        items={subServices}
        hrefs={influencerMarketingSubServiceHrefs}
        icons={influencerMarketingSubServiceIcons}
        dir={dir}
        classPrefix="im"
      />

      <FAQ items={faqItems} title={t(`${TK}.faq.title`)} />

      <ServiceCTASection
        classPrefix="im"
        sectionLabel={t(`${TK}.cta.sectionLabel`)}
        title={t(`${TK}.cta.title`)}
        description={t(`${TK}.cta.description`)}
        primaryButtonText={t(`${TK}.cta.primaryButtonText`)}
        primaryHref="/contact-us"
        secondaryButtonText={t(`${TK}.cta.secondaryButtonText`)}
        secondaryHref="tel:+97145774042"
        dir={dir}
      />
    </>
  );
};

export default InfluencerMarketing;
