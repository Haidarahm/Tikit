import InfluencerSubPage from "./InfluencerSubPage";
import {
  HiUserGroup,
  HiHeart,
  HiCurrencyDollar,
  HiTrendingUp,
  HiChatAlt2,
  HiShieldCheck,
  HiBadgeCheck,
  HiGlobe,
  HiChartBar,
} from "react-icons/hi";
import {
  HiMegaphone,
  HiSparkles,
  HiPresentationChartBar,
} from "react-icons/hi2";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const BASE = "/services/influencer-marketing-agency-dubai";

const pageData = {
  seo: {
    title: "Micro-Influencer Marketing UAE | Authentic Creator Partnerships Dubai",
    description: "Micro-influencer marketing services in UAE. Connect with authentic nano and micro-influencers (1K-50K followers) for cost-effective, high-engagement campaigns. Higher ROI, genuine audience trust, and targeted reach across Dubai and the UAE.",
    keywords: "micro influencer marketing UAE, nano influencer Dubai, small influencer marketing, micro influencer agency UAE, cost effective influencer marketing, authentic influencer partnerships Dubai",
    canonicalUrl: `${BASE}/micro-influencer-marketing-uae`,
    serviceType: "Micro-Influencer Marketing",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://tikit.ae${BASE}/micro-influencer-marketing-uae#service`,
      name: "Micro-Influencer Marketing UAE",
      description: "Authentic micro-influencer marketing services in the UAE connecting brands with nano and micro creators for high-engagement, cost-effective campaigns.",
      provider: { "@type": "Organization", name: "Tikit Agency", url: "https://tikit.ae" },
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Influencer Marketing", url: BASE },
      { name: "Micro-Influencer Marketing UAE", url: `${BASE}/micro-influencer-marketing-uae` },
    ],
  },
  badge: "Micro-Influencer Marketing UAE",
  hero: {
    title: "Authentic Growth Through",
    mainWord: "Micro-Influencers",
    description: "Tap into the power of nano and micro-influencers who deliver higher engagement rates, genuine audience trust, and cost-effective results for brands across the UAE.",
  },
  definition: {
    title: "What is Micro-Influencer Marketing?",
    paragraph: "Micro-influencer marketing focuses on partnering with content creators who have smaller but highly engaged audiences, typically between 1,000 and 50,000 followers. Unlike celebrity influencers, micro-influencers maintain close relationships with their followers, resulting in higher engagement rates, more authentic recommendations, and better conversion rates. In the UAE market, micro-influencers are particularly effective for reaching niche communities in specific cities, industries, or interest groups.",
    benefitsTitle: "Why Micro-Influencers Outperform",
    benefits: [
      "3-5x higher engagement rates compared to macro and celebrity influencers",
      "Authentic recommendations that audiences genuinely trust and act upon",
      "Cost-effective partnerships allowing brands to work with multiple creators simultaneously",
      "Access to niche communities and highly targeted demographics across the UAE",
      "Higher conversion rates due to stronger audience-influencer relationships",
      "Flexible content creation with faster turnaround times",
    ],
    processTitle: "How Micro-Influencer Campaigns Work",
    processSteps: [
      "Define your target audience segments and identify relevant micro-influencer niches",
      "Screen and vet micro-influencers for authentic engagement, audience quality, and brand fit",
      "Coordinate multi-influencer campaigns with consistent messaging and creative direction",
      "Launch campaigns across multiple micro-influencers for amplified reach and social proof",
      "Track individual and aggregate performance metrics to optimize future campaigns",
    ],
  },
  stats: [
    { value: "60%", label: "Higher Engagement vs Macro" },
    { value: "300+", label: "Vetted Micro-Influencers" },
    { value: "7x", label: "Better Cost-Per-Engagement" },
    { value: "85%", label: "Audience Trust Rate" },
  ],
  features: {
    title: "Micro-Influencer Services",
    subtitle: "Strategic micro-influencer partnerships for authentic brand growth",
    items: [
      {
        icon: HiUserGroup,
        title: "Influencer Discovery & Vetting",
        description: "Advanced tools to find authentic micro-influencers with real engagement, quality audiences, and genuine influence in your target market.",
      },
      {
        icon: HiHeart,
        title: "Community-Driven Campaigns",
        description: "Build genuine brand advocacy through micro-influencers who create authentic, relatable content that resonates with their engaged communities.",
      },
      {
        icon: HiCurrencyDollar,
        title: "Budget-Optimized Strategy",
        description: "Maximize your marketing budget by distributing spend across multiple micro-influencers for broader reach at lower cost-per-engagement.",
      },
      {
        icon: HiTrendingUp,
        title: "Scalable Campaigns",
        description: "Start with a focused group and scale to dozens of micro-influencers based on performance data and campaign objectives.",
      },
      {
        icon: HiChatAlt2,
        title: "UGC & Content Amplification",
        description: "Generate a library of authentic user-generated content that can be repurposed across your owned channels and paid advertising.",
      },
      {
        icon: HiShieldCheck,
        title: "Fraud Detection & Quality",
        description: "Advanced audience analysis tools to detect fake followers, bot engagement, and ensure you partner only with genuine creators.",
      },
    ],
  },
  process: {
    title: "Our Micro-Influencer Process",
    subtitle: "A data-driven approach to micro-influencer success",
    steps: [
      {
        title: "Audience Mapping",
        description: "We analyze your target demographics and map them to micro-influencer audiences across the UAE, identifying creators whose followers match your ideal customer profile.",
      },
      {
        title: "Creator Screening",
        description: "Every micro-influencer goes through our rigorous vetting process checking engagement authenticity, audience demographics, content quality, and brand safety.",
      },
      {
        title: "Multi-Creator Campaigns",
        description: "We coordinate campaigns across multiple micro-influencers simultaneously, ensuring consistent messaging while allowing each creator's unique voice to shine.",
      },
      {
        title: "Performance & Scale",
        description: "We track performance per creator and aggregate results, identifying top performers for ongoing partnerships and scaling successful strategies.",
      },
    ],
  },
  trust: {
    title: "Why Choose Us for Micro-Influencer Marketing",
    subtitle: "Deep expertise in the UAE micro-influencer landscape",
    cards: [
      { icon: HiBadgeCheck, title: "Vetted Network", description: "300+ pre-screened micro-influencers across the UAE with verified engagement metrics." },
      { icon: HiGlobe, title: "UAE Market Experts", description: "Deep understanding of UAE consumer behavior, cultural nuances, and trending content." },
      { icon: HiUserGroup, title: "Multi-Niche Coverage", description: "Micro-influencers across fashion, food, tech, fitness, travel, beauty, and more." },
      { icon: HiChartBar, title: "Performance Guaranteed", description: "Data-driven creator selection with guaranteed engagement rate benchmarks." },
    ],
    paragraph: "Our micro-influencer campaigns consistently deliver 3-5x higher engagement rates than traditional influencer marketing. We've built relationships with authentic creators across every major niche in the UAE, from Dubai lifestyle and Abu Dhabi culture to Sharjah food and UAE tech communities.",
  },
  relatedPages: [
    { path: `${BASE}/campaign-management`, title: "Campaign Management", description: "End-to-end campaign planning and execution.", icon: HiMegaphone },
    { path: `${BASE}/roi-analytics`, title: "ROI & Analytics", description: "Measure and optimize campaign performance.", icon: HiPresentationChartBar },
    { path: `${BASE}/instagram-influencer-marketing`, title: "Instagram Marketing", description: "Instagram-focused influencer strategies.", icon: FaInstagram },
    { path: `${BASE}/tiktok-influencer-marketing`, title: "TikTok Marketing", description: "TikTok campaigns for viral reach.", icon: FaTiktok },
    { path: `${BASE}/luxury-influencer-marketing`, title: "Luxury Influencer Marketing", description: "Premium brand partnerships.", icon: HiSparkles },
    { path: `${BASE}/influencer-marketing-cost-uae`, title: "Influencer Marketing Cost", description: "Transparent pricing for UAE campaigns.", icon: HiCurrencyDollar },
  ],
  faq: {
    title: "Micro-Influencer Marketing FAQ",
    items: [
      { question: "What is the difference between micro and macro influencers?", answer: "Micro-influencers typically have 1K-50K followers with higher engagement rates (3-7%), while macro-influencers have 100K+ followers with lower engagement rates (1-3%). Micro-influencers offer more authentic connections, better cost-per-engagement, and higher conversion rates for targeted campaigns." },
      { question: "How much do micro-influencers cost in the UAE?", answer: "Micro-influencer rates in the UAE typically range from AED 500-5,000 per post depending on follower count, engagement rate, content type, and niche. Nano-influencers (1K-10K) start from AED 500, while established micro-influencers (25K-50K) may charge AED 2,000-5,000 per deliverable." },
      { question: "How many micro-influencers do I need for a campaign?", answer: "The ideal number depends on your goals and budget. We typically recommend 5-15 micro-influencers for a focused campaign and 20-50 for larger awareness campaigns. Working with multiple creators provides social proof, broader reach, and more content assets." },
      { question: "How do you verify micro-influencer authenticity?", answer: "We use advanced analytics tools to check for fake followers, bot engagement, and audience quality. We analyze engagement patterns, follower growth history, audience demographics, and comment authenticity to ensure every creator we recommend has genuine influence." },
    ],
  },
  cta: {
    title: "Start Your Micro-Influencer Campaign",
    description: "Connect with authentic creators who genuinely influence purchase decisions in your target market.",
    button: "Get Started",
  },
};

const MicroInfluencerMarketing = () => <InfluencerSubPage pageData={pageData} />;

export default MicroInfluencerMarketing;
