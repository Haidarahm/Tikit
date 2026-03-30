import { FiBarChart2, FiAward, FiTrendingUp, FiFileText } from "react-icons/fi";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export const INFLUENCER_MARKETING_BASE = "/influencer-marketing-agency-dubai";

/** Fallback (English) copy used only when `t` is not provided. */
const fallbackInfluencerMarketingSubServiceItems = [
  {
    title: "Campaign Management",
    desc: "End-to-end campaign planning, execution, and optimization to keep influencer collaborations on track.",
  },
  // {
  //   title: "Luxury Influencer Marketing",
  //   desc: "Premium influencer collaborations designed for luxury brands, high-value products, and exclusive audiences.",
  // },
  // {
  //   title: "ROI Analytics",
  //   desc: "Measure campaign performance with actionable reporting on reach, engagement, and return on investment.",
  // },
  // {
  //   title: "Instagram Influencer Marketing",
  //   desc: "Build visibility with creator-led Instagram content, including reels, stories, and branded posts.",
  // },
  // {
  //   title: "TikTok Influencer Marketing",
  //   desc: "Drive awareness through short-form TikTok campaigns that match trends and audience behavior.",
  // },
  // {
  //   title: "Influencer Marketing Cost UAE",
  //   desc: "Understand campaign pricing models and budget planning for influencer marketing in the UAE market.",
  // },
];

function pickInfluencerMarketingItemsFromI18n(allItems) {
  // NOTE:
  // Locale `subServices.items` contains 7 entries (including "Micro Influencer Marketing UAE"),
  // but this page currently exposes only 6 routes (hrefs/icons) below.
  // Keep indices that match the existing 6-card order.
  const indicesToKeep = [0, 2, 3, 4, 5, 6];
  return indicesToKeep.map((idx) => allItems?.[idx]).filter(Boolean);
}

export function getInfluencerMarketingSubServiceItems(t) {
  try {
    if (!t) return fallbackInfluencerMarketingSubServiceItems;
    const allItems = t("serviceSections.influencerMarketing.subServices.items", { returnObjects: true });
    if (!Array.isArray(allItems)) return fallbackInfluencerMarketingSubServiceItems;

    const picked = pickInfluencerMarketingItemsFromI18n(allItems);
    return picked.map((item) => ({
      title: item?.title ?? "",
      desc: item?.desc ?? "",
    }));
  } catch (e) {
    return fallbackInfluencerMarketingSubServiceItems;
  }
}

export const influencerMarketingSubServiceHrefs = [
  `${INFLUENCER_MARKETING_BASE}/campaign-management-dubai`,
  `${INFLUENCER_MARKETING_BASE}/luxury-influencer-marketing`,
  `${INFLUENCER_MARKETING_BASE}/roi-analytics`,
  `${INFLUENCER_MARKETING_BASE}/instagram-influencer-marketing`,
  `${INFLUENCER_MARKETING_BASE}/tiktok-influencer-marketing`,
  `${INFLUENCER_MARKETING_BASE}/influencer-marketing-cost-uae`,
];

export const influencerMarketingSubServiceIcons = [
  <FiBarChart2 key="influencer-sub-cm" />,
  <FiAward key="influencer-sub-luxury" />,
  <FiTrendingUp key="influencer-sub-roi" />,
  <FaInstagram key="influencer-sub-ig" />,
  <FaTiktok key="influencer-sub-tt" />,
  <FiFileText key="influencer-sub-cost" />,
];

/**
 * Entries for InfluencerSubPage `relatedPages`: all sub-services except the current route.
 * @param {string} excludePath - Full path e.g. `${INFLUENCER_MARKETING_BASE}/roi-analytics`
 * @param {Function} [t] - i18n translation function
 */
export function getInfluencerSubServiceRelatedPages(excludePath, t) {
  const normalized = excludePath.replace(/\/$/, "");
  const items = getInfluencerMarketingSubServiceItems(t);

  return influencerMarketingSubServiceHrefs
    .map((href, i) => ({
      path: href,
      title: items[i]?.title ?? "",
      description: items[i]?.desc ?? "",
      icon: influencerMarketingSubServiceIcons[i],
    }))
    .filter((e) => e.path.replace(/\/$/, "") !== normalized);
}
