import React from "react";
import { useTranslation } from "react-i18next";
import InfluencerSubPage from "./InfluencerSubPage";
import {
  HiClipboardList,
  HiUserGroup,
  HiPhotograph,
  HiClock,
  HiBadgeCheck,
  HiGlobe,
  HiChartBar,
  HiLightBulb,
} from "react-icons/hi";
import {
  HiSparkles,
  HiCurrencyDollar,
  HiPresentationChartBar,
} from "react-icons/hi2";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const BASE = "/influencer-marketing-agency-dubai";
const TK = "serviceSections.influencerMarketing.subPages.campaignManagement";
const SUB_ITEMS_KEY = "serviceSections.influencerMarketing.subServices.items";

const toArray = (val) => (Array.isArray(val) ? val : []);

const CampaignManagement = () => {
  const { t } = useTranslation();
  const featureIcons = [HiClipboardList, HiUserGroup, HiPhotograph, HiClock, HiChartBar, HiLightBulb];
  const trustIcons = [HiBadgeCheck, HiGlobe, HiUserGroup, HiChartBar];

  const subServiceItems = toArray(t(SUB_ITEMS_KEY, { returnObjects: true }));

  const pageData = {
    seo: {
      title: "Influencer Campaign Management Dubai | End-to-End Campaign Services",
      description: "Professional influencer campaign management in Dubai. From strategy and influencer selection to content approval and performance tracking.",
      keywords: "influencer campaign management Dubai, campaign management UAE, influencer marketing campaign",
      canonicalUrl: `${BASE}/campaign-management-dubai`,
      serviceType: "Influencer Campaign Management",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `https://tikit.ae${BASE}/campaign-management-dubai#service`,
        name: "Influencer Campaign Management",
        description: "End-to-end influencer campaign management services in Dubai.",
        provider: { "@type": "Organization", name: "Tikit Agency", url: "https://tikit.ae" },
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
      },
      breadcrumbs: [
        { name: t("nav.home"), url: "/" },
        { name: t("nav.services"), url: "/services" },
        { name: t("serviceSections.influencerMarketing.badge"), url: BASE },
        { name: t(`${TK}.badge`), url: `${BASE}/campaign-management-dubai` },
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
      benefits: toArray(t(`${TK}.definition.benefits`, { returnObjects: true })),
      processTitle: t(`${TK}.definition.processTitle`),
      processSteps: toArray(t(`${TK}.definition.processSteps`, { returnObjects: true })),
    },
    stats: toArray(t(`${TK}.stats`, { returnObjects: true })),
    features: {
      title: t(`${TK}.features.title`),
      subtitle: t(`${TK}.features.subtitle`),
      items: toArray(t(`${TK}.features.items`, { returnObjects: true })).map((item, i) => ({
        ...item,
        icon: featureIcons[i],
      })),
    },
    process: {
      title: t(`${TK}.process.title`),
      subtitle: t(`${TK}.process.subtitle`),
      steps: toArray(t(`${TK}.process.steps`, { returnObjects: true })),
    },
    trust: {
      title: t(`${TK}.trust.title`),
      subtitle: t(`${TK}.trust.subtitle`),
      cards: toArray(t(`${TK}.trust.cards`, { returnObjects: true })).map((card, i) => ({
        ...card,
        icon: trustIcons[i],
      })),
      paragraph: t(`${TK}.trust.paragraph`),
    },
    relatedPages: [
      { path: `${BASE}/micro-influencer-marketing-uae`, icon: HiUserGroup, itemIndex: 1 },
      { path: `${BASE}/roi-analytics`, icon: HiPresentationChartBar, itemIndex: 3 },
      { path: `${BASE}/instagram-influencer-marketing`, icon: FaInstagram, itemIndex: 4 },
      { path: `${BASE}/tiktok-influencer-marketing`, icon: FaTiktok, itemIndex: 5 },
      { path: `${BASE}/luxury-influencer-marketing`, icon: HiSparkles, itemIndex: 2 },
      { path: `${BASE}/influencer-marketing-cost-uae`, icon: HiCurrencyDollar, itemIndex: 6 },
    ].map(({ path, icon, itemIndex }) => {
      const entry = subServiceItems[itemIndex];
      return {
        path,
        icon,
        title: entry?.title ?? "",
        description: entry?.desc ?? "",
      };
    }),
    faq: {
      title: t(`${TK}.faq.title`),
      items: toArray(t(`${TK}.faq.items`, { returnObjects: true })),
    },
    cta: {
      title: t(`${TK}.cta.title`),
      description: t(`${TK}.cta.description`),
      button: t(`${TK}.cta.button`),
    },
  };

  return <InfluencerSubPage pageData={pageData} />;
};

export default CampaignManagement;
