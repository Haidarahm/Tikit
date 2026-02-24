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
  HiMegaphone,
  HiSparkles,
  HiCurrencyDollar,
  HiPresentationChartBar,
} from "react-icons/hi2";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const BASE = "/services/influencer-marketing-agency-dubai";

const pageData = {
  seo: {
    title: "Influencer Campaign Management Dubai | End-to-End Campaign Services",
    description: "Professional influencer campaign management in Dubai. From strategy and influencer selection to content approval and performance tracking. Expert campaign managers for seamless execution and maximum ROI.",
    keywords: "influencer campaign management Dubai, campaign management UAE, influencer marketing campaign, influencer campaign planning, campaign execution Dubai, influencer content management",
    canonicalUrl: `${BASE}/campaign-management`,
    serviceType: "Influencer Campaign Management",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://tikit.ae${BASE}/campaign-management#service`,
      name: "Influencer Campaign Management",
      description: "End-to-end influencer campaign management services in Dubai including strategy development, influencer selection, content management, and performance analytics.",
      provider: {
        "@type": "Organization",
        name: "Tikit Agency",
        url: "https://tikit.ae",
      },
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Influencer Marketing", url: BASE },
      { name: "Campaign Management", url: `${BASE}/campaign-management` },
    ],
  },
  badge: "Campaign Management",
  hero: {
    title: "Expert Influencer Campaign",
    mainWord: "Management",
    description: "From initial strategy to final reporting, our dedicated campaign managers handle every detail of your influencer marketing campaigns. We ensure seamless execution, brand consistency, and maximum ROI across all platforms.",
  },
  definition: {
    title: "What is Influencer Campaign Management?",
    paragraph: "Influencer campaign management is the comprehensive process of planning, executing, and optimizing influencer marketing campaigns from start to finish. It encompasses everything from defining campaign objectives and selecting the right influencers to managing content creation, ensuring brand compliance, coordinating posting schedules, and analyzing performance metrics. Professional campaign management ensures that every touchpoint is strategically aligned with your brand goals.",
    benefitsTitle: "Why Professional Campaign Management Matters",
    benefits: [
      "Streamlined workflows that save time and eliminate miscommunication between brands and influencers",
      "Expert content review and approval processes ensuring brand-safe, high-quality deliverables",
      "Strategic posting schedules optimized for maximum audience engagement and reach",
      "Real-time campaign monitoring with instant adjustments for better performance",
      "Comprehensive contracts and briefing documents protecting your brand interests",
    ],
    processTitle: "Our Campaign Management Process",
    processSteps: [
      "Discovery session to understand brand objectives, target audience, and campaign KPIs",
      "Develop detailed campaign brief with creative guidelines, messaging, and deliverables",
      "Source, vet, and negotiate with the most suitable influencers for your campaign",
      "Manage content creation, review cycles, and approval workflows",
      "Execute campaign launch with coordinated posting schedules and real-time monitoring",
      "Deliver comprehensive performance reports with insights and recommendations",
    ],
  },
  stats: [
    { value: "200+", label: "Campaigns Managed" },
    { value: "98%", label: "On-Time Delivery" },
    { value: "3.5x", label: "Average ROI" },
    { value: "500+", label: "Influencer Partners" },
  ],
  features: {
    title: "Campaign Management Services",
    subtitle: "Everything you need for a successful influencer campaign",
    items: [
      {
        icon: HiClipboardList,
        title: "Campaign Strategy & Planning",
        description: "Comprehensive campaign blueprints with clear objectives, timelines, budgets, and KPIs tailored to your brand goals and target audience.",
      },
      {
        icon: HiUserGroup,
        title: "Influencer Sourcing & Vetting",
        description: "Data-driven influencer selection using audience analysis, engagement metrics, and brand alignment scoring to find your perfect partners.",
      },
      {
        icon: HiPhotograph,
        title: "Content Management & Approval",
        description: "Streamlined content review workflows with brand guideline compliance checks, revision management, and quality assurance.",
      },
      {
        icon: HiClock,
        title: "Timeline & Scheduling",
        description: "Coordinated posting schedules across multiple influencers and platforms to maximize campaign impact and audience reach.",
      },
      {
        icon: HiChartBar,
        title: "Performance Tracking",
        description: "Real-time campaign dashboards monitoring impressions, engagement, clicks, conversions, and ROI across all campaign touchpoints.",
      },
      {
        icon: HiLightBulb,
        title: "Post-Campaign Optimization",
        description: "Detailed post-campaign analysis with actionable insights and recommendations to improve future campaign performance.",
      },
    ],
  },
  process: {
    title: "How We Manage Your Campaign",
    subtitle: "A proven 4-step process for campaign excellence",
    steps: [
      {
        title: "Brief & Strategy",
        description: "We start with a deep-dive into your brand, objectives, and target audience. Together we define clear KPIs, creative direction, and a detailed campaign roadmap.",
      },
      {
        title: "Influencer Matching & Contracting",
        description: "Our team identifies and vets the best-fit influencers, negotiates competitive rates, and handles all contracts and legal agreements on your behalf.",
      },
      {
        title: "Content Creation & Launch",
        description: "We manage the entire content lifecycle — from creative briefing and drafts to approvals and scheduled publishing across all platforms.",
      },
      {
        title: "Monitor, Report & Optimize",
        description: "Real-time performance monitoring with detailed analytics reports. We continuously optimize live campaigns and provide actionable recommendations for future campaigns.",
      },
    ],
  },
  trust: {
    title: "Why Trust Our Campaign Management",
    subtitle: "Proven expertise in managing influencer campaigns across the UAE",
    cards: [
      { icon: HiBadgeCheck, title: "Dedicated Managers", description: "Every campaign gets a dedicated account manager as your single point of contact." },
      { icon: HiGlobe, title: "Multi-Platform Expertise", description: "Expert campaign management across Instagram, TikTok, YouTube, Snapchat, and more." },
      { icon: HiUserGroup, title: "500+ Influencer Network", description: "Access to a vetted network of influencers across all niches and audience sizes." },
      { icon: HiChartBar, title: "Transparent Reporting", description: "Real-time dashboards and detailed post-campaign reports with full transparency." },
    ],
    paragraph: "Our campaign management team has successfully executed 200+ influencer campaigns across industries including fashion, beauty, F&B, automotive, real estate, and technology. Each campaign is backed by data-driven strategy and hands-on management.",
  },
  relatedPages: [
    { path: `${BASE}/micro-influencer-marketing-uae`, title: "Micro-Influencer Marketing", description: "Cost-effective campaigns with authentic nano and micro-influencers.", icon: HiUserGroup },
    { path: `${BASE}/roi-analytics`, title: "ROI & Analytics", description: "Advanced campaign measurement and performance tracking.", icon: HiPresentationChartBar },
    { path: `${BASE}/instagram-influencer-marketing`, title: "Instagram Marketing", description: "Strategic Instagram influencer campaigns and content.", icon: FaInstagram },
    { path: `${BASE}/tiktok-influencer-marketing`, title: "TikTok Marketing", description: "Viral TikTok campaigns for maximum reach.", icon: FaTiktok },
    { path: `${BASE}/luxury-influencer-marketing`, title: "Luxury Influencer Marketing", description: "Premium partnerships for high-end brands.", icon: HiSparkles },
    { path: `${BASE}/influencer-marketing-cost-uae`, title: "Influencer Marketing Cost", description: "Transparent pricing and budget planning.", icon: HiCurrencyDollar },
  ],
  faq: {
    title: "Campaign Management FAQ",
    items: [
      { question: "What does influencer campaign management include?", answer: "Our campaign management covers everything from initial strategy and influencer selection to content approval, scheduling, live monitoring, and post-campaign reporting. We handle contracts, briefs, creative direction, and performance optimization." },
      { question: "How long does it take to set up a campaign?", answer: "A standard influencer campaign takes 2-4 weeks from brief to launch. Quick activations can be set up in 1-2 weeks. Complex multi-influencer campaigns may require 4-6 weeks of preparation." },
      { question: "Do you handle influencer contracts and payments?", answer: "Yes, we manage all contractual agreements, negotiations, and payment processing with influencers. This includes usage rights, exclusivity clauses, deliverable specifications, and payment timelines." },
      { question: "How do you ensure brand safety in campaigns?", answer: "We implement rigorous content review processes with brand guideline checklists, multiple approval stages, and real-time monitoring. All content is reviewed before publishing to ensure brand compliance and messaging accuracy." },
    ],
  },
  cta: {
    title: "Ready to Launch Your Next Campaign?",
    description: "Let our expert team manage your influencer campaign from start to finish for maximum impact and ROI.",
    button: "Get Started",
  },
};

const CampaignManagement = () => <InfluencerSubPage pageData={pageData} />;

export default CampaignManagement;
