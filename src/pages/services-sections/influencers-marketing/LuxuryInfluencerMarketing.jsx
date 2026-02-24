import InfluencerSubPage from "./InfluencerSubPage";
import {
  HiStar,
  HiShieldCheck,
  HiPhotograph,
  HiGlobeAlt,
  HiBadgeCheck,
  HiGlobe,
  HiUserGroup,
  HiChartBar,
} from "react-icons/hi";
import {
  HiMegaphone,
  HiSparkles,
  HiCurrencyDollar,
  HiPresentationChartBar,
} from "react-icons/hi2";
import { FaInstagram, FaTiktok, FaGem, FaCrown } from "react-icons/fa";

const BASE = "/services/influencer-marketing-agency-dubai";

const pageData = {
  seo: {
    title: "Luxury Influencer Marketing Dubai | Premium Brand Partnerships",
    description: "Luxury influencer marketing agency in Dubai. Exclusive partnerships with premium content creators for high-end brands. Fashion, automotive, jewelry, hospitality, and luxury lifestyle influencer campaigns.",
    keywords: "luxury influencer marketing Dubai, premium influencer agency, high-end brand marketing UAE, luxury lifestyle influencers, fashion influencer Dubai, luxury brand partnerships",
    canonicalUrl: `${BASE}/luxury-influencer-marketing`,
    serviceType: "Luxury Influencer Marketing",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://tikit.ae${BASE}/luxury-influencer-marketing#service`,
      name: "Luxury Influencer Marketing Dubai",
      description: "Premium influencer marketing services for luxury brands in Dubai, connecting high-end brands with exclusive content creators.",
      provider: { "@type": "Organization", name: "Tikit Agency", url: "https://tikit.ae" },
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Influencer Marketing", url: BASE },
      { name: "Luxury Influencer Marketing", url: `${BASE}/luxury-influencer-marketing` },
    ],
  },
  badge: "Luxury Influencer Marketing",
  hero: {
    title: "Elevate Your Brand With",
    mainWord: "Luxury Influencers",
    description: "Partner with Dubai's most prestigious content creators to position your brand in the luxury space. Curated partnerships that reflect exclusivity, sophistication, and premium quality.",
  },
  definition: {
    title: "What is Luxury Influencer Marketing?",
    paragraph: "Luxury influencer marketing is a specialized approach that connects premium brands with high-caliber content creators who embody sophistication, exclusivity, and aspirational lifestyles. Unlike mass-market influencer campaigns, luxury partnerships demand meticulous curation — from selecting creators with affluent, engaged audiences to producing cinematic-quality content that upholds brand prestige. Dubai, as a global luxury hub, provides the perfect backdrop for premium influencer campaigns across fashion, automotive, jewelry, hospitality, and real estate.",
    benefitsTitle: "Why Luxury Brands Choose Influencer Marketing",
    benefits: [
      "Access to affluent, high-net-worth audiences through trusted luxury lifestyle voices",
      "Premium content production that matches the quality standards of luxury brand campaigns",
      "Aspirational storytelling that elevates brand perception and desirability",
      "Exclusive access to Dubai's luxury events, venues, and lifestyle experiences",
      "Carefully curated partnerships that protect and enhance brand exclusivity",
    ],
    processTitle: "The Luxury Influencer Process",
    processSteps: [
      "Define brand positioning, target affluent demographics, and luxury campaign objectives",
      "Curate a shortlist of premium influencers vetted for audience quality and brand alignment",
      "Develop high-end creative concepts with cinematic production standards",
      "Execute campaigns with white-glove management and meticulous attention to detail",
      "Analyze engagement with affluent audiences and measure brand perception lift",
    ],
  },
  stats: [
    { value: "50+", label: "Luxury Campaigns" },
    { value: "100+", label: "Premium Creators" },
    { value: "25M+", label: "Affluent Audience Reach" },
    { value: "4.2x", label: "Brand Perception Lift" },
  ],
  features: {
    title: "Luxury Marketing Services",
    subtitle: "Premium influencer solutions for discerning brands",
    items: [
      {
        icon: FaCrown,
        title: "Elite Creator Curation",
        description: "Handpicked luxury influencers vetted for authentic affluent audiences, premium aesthetics, and alignment with high-end brand values.",
      },
      {
        icon: HiPhotograph,
        title: "Premium Content Production",
        description: "Cinematic-quality content creation with professional photography, videography, and art direction that meets luxury brand standards.",
      },
      {
        icon: FaGem,
        title: "Exclusive Experiences",
        description: "Curate immersive brand experiences at Dubai's most prestigious venues, events, and destinations for authentic luxury storytelling.",
      },
      {
        icon: HiShieldCheck,
        title: "Brand Protection",
        description: "Strict exclusivity agreements, content approval processes, and brand safety protocols to protect your premium positioning.",
      },
      {
        icon: HiGlobeAlt,
        title: "Global Luxury Reach",
        description: "Connect with international luxury audiences through Dubai-based creators who attract followers from Europe, Asia, and the Americas.",
      },
      {
        icon: HiStar,
        title: "VIP Event Activations",
        description: "Exclusive launch events, private viewings, and invitation-only experiences documented by premium creators for maximum impact.",
      },
    ],
  },
  process: {
    title: "The Premium Campaign Journey",
    subtitle: "White-glove service from concept to completion",
    steps: [
      {
        title: "Brand Immersion",
        description: "We deeply understand your brand DNA, luxury positioning, target affluent demographics, and campaign vision to create a bespoke strategy.",
      },
      {
        title: "Creator Curation",
        description: "Our team handpicks premium creators whose aesthetic, audience, and values align perfectly with your luxury brand — no compromises on quality.",
      },
      {
        title: "High-End Production",
        description: "Professional content creation with cinematic production values, art direction, and styling that meets the exacting standards of luxury marketing.",
      },
      {
        title: "Exclusive Launch",
        description: "Coordinated campaign launch with exclusive experiences, VIP events, and strategic content distribution to maximize impact with affluent audiences.",
      },
    ],
  },
  trust: {
    title: "Trusted by Luxury Brands",
    subtitle: "Experience in premium brand partnerships across Dubai and the UAE",
    cards: [
      { icon: HiBadgeCheck, title: "Premium Network", description: "Exclusive relationships with Dubai's top luxury lifestyle creators and tastemakers." },
      { icon: HiGlobe, title: "Dubai Luxury Expertise", description: "Deep knowledge of Dubai's luxury landscape, events, and affluent consumer behavior." },
      { icon: HiUserGroup, title: "Affluent Audiences", description: "Access to high-net-worth individuals through carefully vetted premium influencer partnerships." },
      { icon: HiChartBar, title: "Brand Perception Analytics", description: "Advanced sentiment analysis and brand perception measurement for luxury campaigns." },
    ],
    paragraph: "Our luxury influencer campaigns have served brands across fashion, haute couture, fine jewelry, luxury automotive, premium hospitality, and high-end real estate. We understand that luxury marketing demands perfection — from creator selection to content quality to audience engagement.",
  },
  relatedPages: [
    { path: `${BASE}/campaign-management`, title: "Campaign Management", description: "Full-service campaign planning and execution.", icon: HiMegaphone },
    { path: `${BASE}/micro-influencer-marketing-uae`, title: "Micro-Influencer Marketing", description: "Cost-effective campaigns with authentic creators.", icon: HiUserGroup },
    { path: `${BASE}/roi-analytics`, title: "ROI & Analytics", description: "Data-driven campaign measurement.", icon: HiPresentationChartBar },
    { path: `${BASE}/instagram-influencer-marketing`, title: "Instagram Marketing", description: "Visual storytelling on Instagram.", icon: FaInstagram },
    { path: `${BASE}/tiktok-influencer-marketing`, title: "TikTok Marketing", description: "Short-form luxury content.", icon: FaTiktok },
    { path: `${BASE}/influencer-marketing-cost-uae`, title: "Influencer Marketing Cost", description: "Investment planning for influencer campaigns.", icon: HiCurrencyDollar },
  ],
  faq: {
    title: "Luxury Influencer Marketing FAQ",
    items: [
      { question: "What makes luxury influencer marketing different?", answer: "Luxury influencer marketing demands higher production quality, more selective creator curation, exclusivity agreements, and premium audience targeting. Every element — from the influencer's aesthetic to the content setting — must reflect the brand's luxury positioning and aspirational values." },
      { question: "How do you select luxury influencers?", answer: "We evaluate creators based on audience affluence indicators, content quality and aesthetics, brand partnership history, engagement authenticity, and lifestyle alignment. Only creators who genuinely live and represent luxury lifestyles are considered for premium brand partnerships." },
      { question: "What is the cost of luxury influencer marketing in Dubai?", answer: "Luxury influencer campaigns in Dubai typically start from AED 50,000 for focused activations and can range to AED 500,000+ for comprehensive multi-creator campaigns with premium production. The investment reflects exclusive creator fees, high-end production, and premium venue access." },
      { question: "Which luxury industries do you serve?", answer: "We work with premium brands across fashion and haute couture, fine jewelry and watches, luxury automotive, premium hospitality and travel, high-end real estate, luxury beauty and skincare, and exclusive lifestyle brands operating in the UAE market." },
    ],
  },
  cta: {
    title: "Elevate Your Brand Presence",
    description: "Partner with Dubai's most prestigious creators to tell your luxury brand story with the sophistication it deserves.",
    button: "Start Your Luxury Campaign",
  },
};

const LuxuryInfluencerMarketing = () => <InfluencerSubPage pageData={pageData} />;

export default LuxuryInfluencerMarketing;
