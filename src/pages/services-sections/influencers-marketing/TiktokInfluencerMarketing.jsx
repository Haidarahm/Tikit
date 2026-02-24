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
import {
  HiMegaphone,
  HiCurrencyDollar,
  HiPresentationChartBar,
} from "react-icons/hi2";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const BASE = "/services/influencer-marketing-agency-dubai";

const pageData = {
  seo: {
    title: "TikTok Influencer Marketing Dubai | Viral Content & Creator Campaigns",
    description: "TikTok influencer marketing agency in Dubai. Viral short-form video campaigns, trending content, and creator partnerships to reach Gen Z and millennials in the UAE. Expert TikTok campaign strategy and execution.",
    keywords: "TikTok influencer marketing Dubai, TikTok marketing agency UAE, TikTok creators Dubai, viral TikTok campaigns, TikTok content strategy, short form video marketing UAE, Gen Z marketing Dubai",
    canonicalUrl: `${BASE}/tiktok-influencer-marketing`,
    serviceType: "TikTok Influencer Marketing",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://tikit.ae${BASE}/tiktok-influencer-marketing#service`,
      name: "TikTok Influencer Marketing Dubai",
      description: "Strategic TikTok influencer marketing services in Dubai for viral campaigns, trending content, and creator partnerships targeting Gen Z and millennials.",
      provider: { "@type": "Organization", name: "Tikit Agency", url: "https://tikit.ae" },
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Influencer Marketing", url: BASE },
      { name: "TikTok Influencer Marketing", url: `${BASE}/tiktok-influencer-marketing` },
    ],
  },
  badge: "TikTok Influencer Marketing",
  hero: {
    title: "Go Viral With",
    mainWord: "TikTok Creators",
    description: "Harness the explosive growth of TikTok to reach younger audiences, create viral moments, and drive unprecedented engagement. Our TikTok campaigns turn brands into trending conversations across the UAE.",
  },
  definition: {
    title: "What is TikTok Influencer Marketing?",
    paragraph: "TikTok influencer marketing leverages the platform's unique algorithm and creator ecosystem to produce short-form video content that drives massive organic reach and engagement. Unlike traditional social media, TikTok's For You Page algorithm gives every piece of content the potential to go viral regardless of follower count. This makes TikTok the most powerful platform for brand discovery, especially among Gen Z and millennial audiences who are rapidly growing in the UAE market.",
    benefitsTitle: "Why TikTok is a Game-Changer",
    benefits: [
      "Unmatched viral potential — content can reach millions regardless of follower count",
      "UAE TikTok usage has grown 150% since 2022, making it the fastest-growing platform",
      "Gen Z and millennials spend an average of 95 minutes daily on TikTok",
      "Authentic, raw content format that builds genuine trust and relatability",
      "TikTok Shopping and in-app purchasing capabilities for seamless conversions",
      "Trending sounds and challenges create participatory, shareable brand moments",
    ],
    processTitle: "Our TikTok Marketing Framework",
    processSteps: [
      "Research trending content formats, sounds, and challenges relevant to your brand and audience",
      "Identify TikTok-native creators who understand the platform's culture and content style",
      "Develop creative concepts that blend brand messaging with authentic TikTok storytelling",
      "Produce and launch campaigns optimized for the TikTok algorithm and For You Page distribution",
      "Track viral metrics, engagement quality, and conversion performance across all content",
    ],
  },
  stats: [
    { value: "150+", label: "TikTok Campaigns" },
    { value: "200+", label: "TikTok Creators" },
    { value: "100M+", label: "Total Views Generated" },
    { value: "12%", label: "Average Engagement Rate" },
  ],
  features: {
    title: "TikTok Marketing Services",
    subtitle: "Full-spectrum TikTok campaigns built for virality",
    items: [
      {
        icon: HiVideoCamera,
        title: "Viral Video Campaigns",
        description: "Short-form video content designed for maximum virality — leveraging trending formats, hooks, and storytelling techniques native to TikTok.",
      },
      {
        icon: HiMusicNote,
        title: "Trending Sound Strategy",
        description: "Strategic use of trending sounds, original audio, and branded music to boost content discoverability and ride viral waves on TikTok.",
      },
      {
        icon: HiLightningBolt,
        title: "Challenge Campaigns",
        description: "Branded hashtag challenges and duet campaigns that encourage mass participation and turn audiences into active brand advocates.",
      },
      {
        icon: HiTrendingUp,
        title: "TikTok Spark Ads",
        description: "Amplify top-performing organic creator content with TikTok Spark Ads for extended reach, targeted distribution, and measurable conversions.",
      },
      {
        icon: HiSparkles,
        title: "TikTok Shop Integration",
        description: "Seamless product showcases through TikTok Shop, live shopping events, and shoppable creator content for direct in-app purchases.",
      },
      {
        icon: HiUserGroup,
        title: "Creator Community Building",
        description: "Build long-term relationships with TikTok creators who become genuine brand advocates and consistently produce authentic content.",
      },
    ],
  },
  process: {
    title: "Our TikTok Campaign Process",
    subtitle: "Platform-native strategy for maximum impact",
    steps: [
      {
        title: "Trend Research & Strategy",
        description: "Our TikTok specialists research current trends, viral formats, and audience behavior to develop a strategy that positions your brand in the cultural conversation.",
      },
      {
        title: "Creator Casting",
        description: "We cast TikTok-native creators who understand the platform's unique culture, production style, and audience expectations — ensuring content feels authentic, not advertorial.",
      },
      {
        title: "Content Production & Launch",
        description: "Creators produce content with our creative guidance, optimized for the TikTok algorithm with attention-grabbing hooks, trending elements, and clear brand integration.",
      },
      {
        title: "Amplify & Analyze",
        description: "We boost top-performing content with Spark Ads, track viral metrics and conversions, and provide insights on what drives TikTok success for your brand.",
      },
    ],
  },
  trust: {
    title: "TikTok Marketing Experts",
    subtitle: "Deep expertise in the UAE's fastest-growing platform",
    cards: [
      { icon: FaTiktok, title: "TikTok Specialists", description: "Dedicated TikTok strategists who live and breathe the platform's culture and trends." },
      { icon: HiBadgeCheck, title: "200+ Creators", description: "Vetted network of TikTok-native creators across entertainment, lifestyle, comedy, and more." },
      { icon: HiGlobe, title: "UAE Trend Experts", description: "Deep understanding of UAE-specific TikTok trends, local humor, and regional content preferences." },
      { icon: HiChartBar, title: "100M+ Views", description: "Proven track record generating over 100 million views across TikTok campaigns." },
    ],
    paragraph: "TikTok is the fastest-growing social platform in the UAE, and our team has been at the forefront since its rise. We've executed 150+ TikTok campaigns, generated 100M+ views, and maintained an average 12% engagement rate — far exceeding industry benchmarks.",
  },
  relatedPages: [
    { path: `${BASE}/instagram-influencer-marketing`, title: "Instagram Marketing", description: "Strategic Instagram creator campaigns.", icon: FaInstagram },
    { path: `${BASE}/campaign-management`, title: "Campaign Management", description: "End-to-end campaign execution.", icon: HiMegaphone },
    { path: `${BASE}/micro-influencer-marketing-uae`, title: "Micro-Influencer Marketing", description: "Authentic micro-influencer campaigns.", icon: HiUserGroup },
    { path: `${BASE}/luxury-influencer-marketing`, title: "Luxury Influencer Marketing", description: "Premium brand partnerships.", icon: HiSparkles },
    { path: `${BASE}/roi-analytics`, title: "ROI & Analytics", description: "Performance tracking and measurement.", icon: HiPresentationChartBar },
    { path: `${BASE}/influencer-marketing-cost-uae`, title: "Influencer Marketing Cost", description: "Campaign pricing and budgets.", icon: HiCurrencyDollar },
  ],
  faq: {
    title: "TikTok Influencer Marketing FAQ",
    items: [
      { question: "Why should brands use TikTok for influencer marketing?", answer: "TikTok offers unmatched organic reach potential — even small accounts can go viral thanks to the For You Page algorithm. With 95 minutes average daily usage among Gen Z, it's the most engaging platform. TikTok content feels authentic and drives higher trust and purchase intent compared to polished ads on other platforms." },
      { question: "How much does TikTok influencer marketing cost in UAE?", answer: "TikTok creator rates in the UAE range from AED 1,000-3,000 for nano and micro-influencers to AED 10,000-50,000+ for top-tier creators. Costs depend on follower count, average views, engagement rate, and content complexity. We optimize budgets to maximize views and engagement per dirham spent." },
      { question: "What types of brands perform best on TikTok?", answer: "While originally popular for fashion, beauty, and entertainment, TikTok now drives results across all industries including F&B, education, finance, real estate, and B2B. The key is adapting your brand message to TikTok's authentic, entertaining content style rather than traditional advertising formats." },
      { question: "How do you measure TikTok campaign success?", answer: "We track video views, completion rates, engagement rate (likes, comments, shares, saves), profile visits, website clicks, hashtag usage, and conversion metrics. For TikTok Shop campaigns, we also measure product views, add-to-carts, and direct sales. Our analytics provide clear ROI calculations for every campaign." },
    ],
  },
  cta: {
    title: "Ready to Go Viral on TikTok?",
    description: "Partner with TikTok-native creators who know how to create content that captures attention and drives results.",
    button: "Launch TikTok Campaign",
  },
};

const TiktokInfluencerMarketing = () => <InfluencerSubPage pageData={pageData} />;

export default TiktokInfluencerMarketing;
