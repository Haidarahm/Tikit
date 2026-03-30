import React from "react";
import { useTranslation } from "react-i18next";
import InfluencerSubPage from "./InfluencerSubPage";
import {
  HiVideoCamera,
  HiTrendingUp,
  HiMusicNote,
  HiLightningBolt,
  HiUserGroup,
  HiBadgeCheck,
  HiGlobe,
  HiChartBar,
  HiSparkles,
} from "react-icons/hi";
import { FaTiktok } from "react-icons/fa";
import { getInfluencerSubServiceRelatedPages, INFLUENCER_MARKETING_BASE as BASE } from "./influencerMarketingSubServices";
const TK = "serviceSections.influencerMarketing.subPages.tiktokInfluencer";

const TiktokInfluencerMarketing = () => {
  const { t } = useTranslation();
  const featureIcons = [HiVideoCamera, HiMusicNote, HiLightningBolt, HiTrendingUp, HiSparkles, HiUserGroup];
  const trustIcons = [FaTiktok, HiBadgeCheck, HiGlobe, HiChartBar];

  const pageData = {
    seo: {
      title: "TikTok Influencer Marketing Dubai | Viral Content & Creator Campaigns",
      description: "TikTok influencer marketing agency in Dubai. Viral short-form video campaigns and creator partnerships.",
      keywords: "TikTok influencer marketing Dubai, TikTok marketing agency UAE, viral TikTok campaigns",
      canonicalUrl: `${BASE}/tiktok-influencer-marketing`,
      serviceType: "TikTok Influencer Marketing",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `https://tikit.ae${BASE}/tiktok-influencer-marketing#service`,
        name: "TikTok Influencer Marketing Dubai",
        description: "Strategic TikTok influencer marketing services in Dubai.",
        provider: { "@type": "Organization", name: "Tikit Agency", url: "https://tikit.ae" },
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
      },
      breadcrumbs: [
        { name: t("nav.home"), url: "/" },
        { name: t("nav.services"), url: "/services" },
        { name: t("serviceSections.influencerMarketing.badge"), url: BASE },
        { name: t(`${TK}.badge`), url: `${BASE}/tiktok-influencer-marketing` },
      ],
    },
    badge: t(`${TK}.badge`),
    hero: {
      title: t(`${TK}.hero.title`),
      mainWord: t(`${TK}.hero.mainWord`),
      description: t(`${TK}.hero.description`),
    },
    definition: {
      title: t(`${TK}.definition.title`),
      paragraph: t(`${TK}.definition.paragraph`),
      benefitsTitle: t(`${TK}.definition.benefitsTitle`),
      benefits: t(`${TK}.definition.benefits`, { returnObjects: true }),
      processTitle: t(`${TK}.definition.processTitle`),
      processSteps: t(`${TK}.definition.processSteps`, { returnObjects: true }),
    },
    stats: t(`${TK}.stats`, { returnObjects: true }),
    features: {
      title: t(`${TK}.features.title`),
      subtitle: t(`${TK}.features.subtitle`),
      items: t(`${TK}.features.items`, { returnObjects: true }).map((item, i) => ({ ...item, icon: featureIcons[i] })),
    },
    process: {
      title: t(`${TK}.process.title`),
      subtitle: t(`${TK}.process.subtitle`),
      steps: t(`${TK}.process.steps`, { returnObjects: true }),
    },
    trust: {
      title: t(`${TK}.trust.title`),
      subtitle: t(`${TK}.trust.subtitle`),
      cards: t(`${TK}.trust.cards`, { returnObjects: true }).map((card, i) => ({ ...card, icon: trustIcons[i] })),
      paragraph: t(`${TK}.trust.paragraph`),
    },
    relatedPages: getInfluencerSubServiceRelatedPages(`${BASE}/tiktok-influencer-marketing`, t),
    faq: { title: t(`${TK}.faq.title`), items: t(`${TK}.faq.items`, { returnObjects: true }) },
    cta: { title: t(`${TK}.cta.title`), description: t(`${TK}.cta.description`), button: t(`${TK}.cta.button`) },
  };

  return <InfluencerSubPage pageData={pageData} />;
};

export default TiktokInfluencerMarketing;
