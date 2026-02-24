import React from "react";
import { useTranslation } from "react-i18next";
import InfluencerSubPage from "./InfluencerSubPage";
import {
  HiChartBar,
  HiTrendingUp,
  HiEye,
  HiCursorClick,
  HiDocumentReport,
  HiAdjustments,
  HiBadgeCheck,
  HiGlobe,
  HiUserGroup,
} from "react-icons/hi";
import { HiMegaphone, HiSparkles, HiCurrencyDollar, HiPresentationChartBar } from "react-icons/hi2";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const BASE = "/services/influencer-marketing-agency-dubai";
const TK = "serviceSections.influencerMarketing.subPages.roiAnalytics";

const ROIAnalytics = () => {
  const { t } = useTranslation();
  const featureIcons = [HiPresentationChartBar, HiTrendingUp, HiEye, HiCursorClick, HiDocumentReport, HiAdjustments];
  const trustIcons = [HiBadgeCheck, HiGlobe, HiUserGroup, HiChartBar];

  const pageData = {
    seo: {
      title: "Influencer Marketing ROI & Analytics Dubai | Campaign Performance Tracking",
      description: "Data-driven influencer marketing analytics and ROI tracking in Dubai. Real-time dashboards and comprehensive reporting.",
      keywords: "influencer marketing ROI Dubai, campaign analytics UAE, influencer performance tracking",
      canonicalUrl: `${BASE}/roi-analytics`,
      serviceType: "Influencer Marketing Analytics",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `https://tikit.ae${BASE}/roi-analytics#service`,
        name: "Influencer Marketing ROI & Analytics",
        description: "Comprehensive influencer marketing analytics and ROI tracking services.",
        provider: { "@type": "Organization", name: "Tikit Agency", url: "https://tikit.ae" },
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
      },
      breadcrumbs: [
        { name: t("nav.home"), url: "/" },
        { name: t("nav.services"), url: "/services" },
        { name: t("serviceSections.influencerMarketing.badge"), url: BASE },
        { name: t(`${TK}.badge`), url: `${BASE}/roi-analytics` },
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
    relatedPages: [
      { path: `${BASE}/campaign-management`, title: t("serviceSections.influencerMarketing.subServices.campaignManagement.title"), description: t("serviceSections.influencerMarketing.subServices.campaignManagement.description"), icon: HiMegaphone },
      { path: `${BASE}/micro-influencer-marketing-uae`, title: t("serviceSections.influencerMarketing.subServices.microInfluencer.title"), description: t("serviceSections.influencerMarketing.subServices.microInfluencer.description"), icon: HiUserGroup },
      { path: `${BASE}/luxury-influencer-marketing`, title: t("serviceSections.influencerMarketing.subServices.luxuryInfluencer.title"), description: t("serviceSections.influencerMarketing.subServices.luxuryInfluencer.description"), icon: HiSparkles },
      { path: `${BASE}/instagram-influencer-marketing`, title: t("serviceSections.influencerMarketing.subServices.instagramInfluencer.title"), description: t("serviceSections.influencerMarketing.subServices.instagramInfluencer.description"), icon: FaInstagram },
      { path: `${BASE}/tiktok-influencer-marketing`, title: t("serviceSections.influencerMarketing.subServices.tiktokInfluencer.title"), description: t("serviceSections.influencerMarketing.subServices.tiktokInfluencer.description"), icon: FaTiktok },
      { path: `${BASE}/influencer-marketing-cost-uae`, title: t("serviceSections.influencerMarketing.subServices.influencerCost.title"), description: t("serviceSections.influencerMarketing.subServices.influencerCost.description"), icon: HiCurrencyDollar },
    ],
    faq: { title: t(`${TK}.faq.title`), items: t(`${TK}.faq.items`, { returnObjects: true }) },
    cta: { title: t(`${TK}.cta.title`), description: t(`${TK}.cta.description`), button: t(`${TK}.cta.button`) },
  };

  return <InfluencerSubPage pageData={pageData} />;
};

export default ROIAnalytics;
