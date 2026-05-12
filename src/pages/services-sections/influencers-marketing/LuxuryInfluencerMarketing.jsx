import { LocaleLink as Link } from "@/components/LocaleLink.jsx";
import { useTranslation } from "react-i18next";
import { serviceHeroFramerHero } from "@/helpers/framerMotion";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  FiUsers,
  FiClock,
  FiEdit3,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
  FiSearch,
  FiLayers,
  FiVideo,
  FiBriefcase,
  FiBarChart2,
  FiHome,
  FiAward,
  FiWatch,
  FiTruck,
  FiActivity,
  FiStar,
  FiGlobe,
} from "react-icons/fi";

import influencerHero from "../../../assets/services/Influencer-Marketing.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  ServiceHeroSection,
  ServiceProblemsSection,
  ServiceStatsSection,
  ServiceSubServicesSection,
  ServiceCTASection,
} from "../../../components/services-sections";

import InfIconCardGrid from "./sub-components/InfIconCardGrid";
import InfFeatureCardsList from "./sub-components/InfFeatureCardsList";
import InfIndustries from "./sub-components/InfIndustries";
import InfWhyChooseUs from "./sub-components/InfWhyChooseUs";
import InfInlineCTA from "./sub-components/InfInlineCTA";
import InfSplitCTA from "./sub-components/InfSplitCTA";
import InfPositioningStatement from "./sub-components/InfPositioningStatement";
import InfGetStartedSection from "./sub-components/InfGetStartedSection";
import {
  INFLUENCER_MARKETING_BASE,
  influencerMarketingSubServiceHrefs,
  influencerMarketingSubServiceIcons,
  getInfluencerMarketingSubServiceItems,
} from "./sub-components/influencerMarketingSubServices";
import { toArray } from "./influencerUtils";

import "./influencerMarketing.css";

const BASE = INFLUENCER_MARKETING_BASE;
const TK = "serviceSections.influencerMarketing.luxuryInfluencerMarketing";

const problemIcons = [<FiUsers key="p1" />, <FiClock key="p2" />, <FiEdit3 key="p3" />];
const principleIcons = [<FiStar key="pr1" />, <FiTarget key="pr2" />, <FiShield key="pr3" />];
const serviceIcons = [<FiSearch key="s1" />, <FiLayers key="s2" />, <FiVideo key="s3" />, <FiBriefcase key="s4" />, <FiBarChart2 key="s5" />];
const industryIcons = [<FiHome key="i1" />, <FiAward key="i2" />, <FiWatch key="i3" />, <FiTruck key="i4" />, <FiGlobe key="i5" />, <FiActivity key="i6" />, <FiUsers key="i7" />];
const marketIcons = [<FiUsers key="m1" />, <FiGlobe key="m2" />, <FiStar key="m3" />];
const whyUsIcons = [<FiGlobe key="w1" />, <FiUsers key="w2" />, <FiCheckCircle key="w3" />, <FiTrendingUp key="w4" />];

const LuxuryInfluencerMarketing = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const dir = isRtl ? "rtl" : "ltr";

  const subServices = getInfluencerMarketingSubServiceItems(t);
  const problemItems = toArray(t(`${TK}.problems.items`, { returnObjects: true }));
  const principles = toArray(t(`${TK}.principles.items`, { returnObjects: true })).map((item, i) => ({
    icon: principleIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));
  const services = toArray(t(`${TK}.services.items`, { returnObjects: true })).map((item, i) => ({
    icon: serviceIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
    features: item?.features ?? [],
  }));
  const industries = toArray(t(`${TK}.industries.items`, { returnObjects: true })).map((item, i) => ({
    icon: industryIcons[i],
    title: item?.title ?? "",
  }));
  const marketReasons = toArray(t(`${TK}.market.items`, { returnObjects: true })).map((item, i) => ({
    icon: marketIcons[i],
    title: item?.title ?? "",
  }));
  const stats = toArray(t(`${TK}.results.items`, { returnObjects: true }));
  const whyUs = toArray(t(`${TK}.whyUs.items`, { returnObjects: true })).map((item, i) => ({
    icon: whyUsIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));
  const faqItems = toArray(t(`${TK}.faq.items`, { returnObjects: true }));

  const breadcrumbs = [
    { name: t("nav.home"), url: "/" },
    { name: t("nav.services"), url: "/services" },
    { name: t("serviceSections.influencerMarketing.badge"), url: BASE },
    { name: t(`${TK}.breadcrumb`), url: `${BASE}/luxury-influencer-marketing` },
  ];

  return (
    <>
      <SEOHead
        title={t(`${TK}.seo.title`)}
        description={t(`${TK}.seo.description`)}
        keywords={t(`${TK}.seo.keywords`)}
        canonicalUrl={`${BASE}/luxury-influencer-marketing`}
        serviceType={t(`${TK}.seo.serviceType`)}
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        imageSrc={influencerHero}
        imageAlt={t(`${TK}.seo.serviceType`)}
        badge={t(`${TK}.hero.badge`)}
        badgeVariant="pulse"
        title={t(`${TK}.hero.title`)}
        description={t(`${TK}.hero.description`)}
        dataNavColor="black"
        framerHero={serviceHeroFramerHero}
      />

      <ServiceProblemsSection
        sectionLabel={t(`${TK}.problems.sectionLabel`)}
        title={t(`${TK}.problems.title`)}
        description={t(`${TK}.problems.description`)}
        items={problemItems}
        icons={problemIcons}
        dir={dir}
        classPrefix="im"
        framer
      />

      <InfIconCardGrid
        label={t(`${TK}.approach.label`)}
        title={t(`${TK}.approach.title`)}
        description={t(`${TK}.approach.description`)}
        items={principles}
        columns={3}
      />

      <InfInlineCTA
        subtle
        label={t(`${TK}.offer.label`)}
        title={t(`${TK}.offer.title`)}
        description={
          <>
            {t(`${TK}.offer.descriptionBefore`)}{" "}
            <Link
              to="/influencer-marketing-agency-dubai"
              className="font-semibold underline underline-offset-4 hover:opacity-80"
              style={{ color: "var(--secondary)" }}
            >
              {t(`${TK}.offer.linkText`)}
            </Link>{" "}
            {t(`${TK}.offer.descriptionAfter`)}
          </>
        }
        buttonText={t(`${TK}.offer.buttonText`)}
      />

      <InfFeatureCardsList
        label={t(`${TK}.services.label`)}
        title={t(`${TK}.services.title`)}
        description={t(`${TK}.services.description`)}
        items={services}
      />

      <InfIndustries
        label={t(`${TK}.industries.label`)}
        title={t(`${TK}.industries.title`)}
        description={t(`${TK}.industries.description`)}
        industries={industries}
      />

      <ServiceStatsSection
        sectionLabel={t(`${TK}.results.sectionLabel`)}
        title={t(`${TK}.results.title`)}
        description={t(`${TK}.results.description`)}
        items={stats}
        dir={dir}
        framer
      />

      <InfSplitCTA
        label={t(`${TK}.growthCta.label`)}
        title={t(`${TK}.growthCta.title`)}
        description={t(`${TK}.growthCta.description`)}
        primaryText={t(`${TK}.growthCta.primaryText`)}
        highlights={toArray(t(`${TK}.growthCta.highlights`, { returnObjects: true }))}
      />

      <InfWhyChooseUs
        label={t(`${TK}.whyUs.label`)}
        title={t(`${TK}.whyUs.title`)}
        description={t(`${TK}.whyUs.description`)}
        reasons={whyUs}
      />

      <InfIndustries
        label={t(`${TK}.market.label`)}
        title={t(`${TK}.market.title`)}
        description={t(`${TK}.market.description`)}
        industries={marketReasons}
      />

      <FAQ items={faqItems} title={t(`${TK}.faq.title`)} />

      <InfPositioningStatement
        label={t(`${TK}.positioning.label`)}
        title={t(`${TK}.positioning.title`)}
        description={t(`${TK}.positioning.description`)}
      />

      <InfGetStartedSection
        label={t(`${TK}.getStarted.label`)}
        title={t(`${TK}.getStarted.title`)}
        description={t(`${TK}.getStarted.description`)}
        buttonText={t(`${TK}.getStarted.buttonText`)}
      />

      <ServiceSubServicesSection
        sectionLabel={t("serviceSections.influencerMarketing.subServices.sectionLabel")}
        title={t("serviceSections.influencerMarketing.subServices.title")}
        description={t("serviceSections.influencerMarketing.subServices.description")}
        learnMoreText={t("serviceSections.influencerMarketing.subServices.learnMore")}
        items={subServices}
        hrefs={influencerMarketingSubServiceHrefs}
        icons={influencerMarketingSubServiceIcons}
        dir={dir}
        classPrefix="im"
        framer
      />

      <ServiceCTASection
        classPrefix="im"
        sectionLabel={t(`${TK}.finalCta.sectionLabel`)}
        title={t(`${TK}.finalCta.title`)}
        description={t(`${TK}.finalCta.description`)}
        primaryButtonText={t(`${TK}.finalCta.primaryButtonText`)}
        primaryHref="/contact-us"
        secondaryButtonText={t(`${TK}.finalCta.secondaryButtonText`)}
        secondaryHref="tel:+97145774042"
        dir={dir}
        framer
      />
    </>
  );
};

export default LuxuryInfluencerMarketing;
