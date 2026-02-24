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
    title: "Influencer Marketing ROI & Analytics Dubai | Campaign Performance Tracking",
    description: "Data-driven influencer marketing analytics and ROI tracking in Dubai. Real-time dashboards, campaign performance metrics, attribution modeling, and comprehensive reporting for measurable influencer marketing results.",
    keywords: "influencer marketing ROI Dubai, campaign analytics UAE, influencer performance tracking, marketing attribution Dubai, campaign reporting, influencer marketing measurement, data driven influencer marketing",
    canonicalUrl: `${BASE}/roi-analytics`,
    serviceType: "Influencer Marketing Analytics",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://tikit.ae${BASE}/roi-analytics#service`,
      name: "Influencer Marketing ROI & Analytics",
      description: "Comprehensive influencer marketing analytics, ROI tracking, and performance measurement services for data-driven campaign optimization.",
      provider: { "@type": "Organization", name: "Tikit Agency", url: "https://tikit.ae" },
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Influencer Marketing", url: BASE },
      { name: "ROI & Analytics", url: `${BASE}/roi-analytics` },
    ],
  },
  badge: "ROI & Analytics",
  hero: {
    title: "Measure What Matters With",
    mainWord: "Data-Driven Analytics",
    description: "Transform your influencer marketing from guesswork into a science. Real-time dashboards, comprehensive ROI tracking, and actionable insights that prove campaign value and guide strategic decisions.",
  },
  definition: {
    title: "What is Influencer Marketing ROI Analytics?",
    paragraph: "Influencer marketing ROI analytics is the systematic process of measuring, analyzing, and reporting on the performance and return on investment of influencer campaigns. It goes beyond vanity metrics like follower counts to track meaningful business outcomes including engagement quality, website traffic, lead generation, sales attribution, and brand sentiment. Advanced analytics platforms provide real-time dashboards, multi-touch attribution models, and predictive insights that help brands optimize campaign performance and justify marketing spend.",
    benefitsTitle: "Why Analytics-Driven Campaigns Win",
    benefits: [
      "Quantify exact ROI for every dirham spent on influencer marketing campaigns",
      "Identify top-performing influencers, content types, and platforms for budget optimization",
      "Real-time monitoring enables instant campaign adjustments for better performance",
      "Data-backed insights for strategic planning and future campaign optimization",
      "Transparent reporting builds confidence and trust with stakeholders and leadership",
    ],
    processTitle: "How We Track & Measure Performance",
    processSteps: [
      "Define clear KPIs and success metrics aligned with business objectives before campaign launch",
      "Set up tracking infrastructure including UTM parameters, pixel tracking, and attribution models",
      "Monitor campaigns in real-time with automated alerts for performance anomalies",
      "Analyze cross-platform data to identify patterns, trends, and optimization opportunities",
      "Deliver comprehensive reports with actionable recommendations for continuous improvement",
    ],
  },
  stats: [
    { value: "100%", label: "Campaign Tracking Coverage" },
    { value: "24/7", label: "Real-Time Monitoring" },
    { value: "3.5x", label: "Average Client ROI" },
    { value: "200+", label: "Campaigns Analyzed" },
  ],
  features: {
    title: "Analytics & Reporting Services",
    subtitle: "Comprehensive measurement for every aspect of your campaigns",
    items: [
      {
        icon: HiPresentationChartBar,
        title: "Real-Time Dashboards",
        description: "Live campaign dashboards tracking impressions, reach, engagement, clicks, and conversions across all influencers and platforms in real-time.",
      },
      {
        icon: HiTrendingUp,
        title: "ROI Attribution",
        description: "Multi-touch attribution models that connect influencer activities to website traffic, leads, and sales for accurate return on investment calculation.",
      },
      {
        icon: HiEye,
        title: "Audience Insights",
        description: "Deep audience analytics including demographics, interests, location data, and behavioral patterns to understand who your campaigns are reaching.",
      },
      {
        icon: HiCursorClick,
        title: "Engagement Analysis",
        description: "Beyond likes and comments — we measure engagement quality, sentiment, save rates, share rates, and genuine audience interaction.",
      },
      {
        icon: HiDocumentReport,
        title: "Custom Reports",
        description: "Tailored performance reports with visualizations, competitive benchmarking, and strategic recommendations delivered weekly or monthly.",
      },
      {
        icon: HiAdjustments,
        title: "Campaign Optimization",
        description: "Data-driven recommendations to optimize live campaigns including budget reallocation, content adjustments, and influencer performance management.",
      },
    ],
  },
  process: {
    title: "Our Analytics Process",
    subtitle: "From setup to insights in four strategic steps",
    steps: [
      {
        title: "Measurement Framework",
        description: "We establish clear KPIs, set up tracking infrastructure, and define attribution models before your campaign launches to ensure comprehensive data capture.",
      },
      {
        title: "Real-Time Monitoring",
        description: "Our analytics platform monitors campaign performance 24/7, tracking metrics across all influencers and platforms with automated alerts for key milestones.",
      },
      {
        title: "Deep Analysis",
        description: "Our data team analyzes cross-platform performance data to uncover insights, identify top performers, and discover optimization opportunities.",
      },
      {
        title: "Strategic Reporting",
        description: "We deliver comprehensive reports with clear ROI calculations, competitive benchmarks, audience insights, and actionable recommendations for future campaigns.",
      },
    ],
  },
  trust: {
    title: "Data You Can Trust",
    subtitle: "Transparent, accurate analytics for informed decision-making",
    cards: [
      { icon: HiBadgeCheck, title: "Verified Metrics", description: "All metrics are verified and cross-referenced to ensure accuracy and eliminate inflated numbers." },
      { icon: HiGlobe, title: "Cross-Platform Tracking", description: "Unified analytics across Instagram, TikTok, YouTube, Snapchat, and all major platforms." },
      { icon: HiUserGroup, title: "Audience Verification", description: "Advanced tools to verify audience authenticity and quality for accurate performance data." },
      { icon: HiChartBar, title: "Custom Dashboards", description: "Personalized dashboards tailored to your KPIs with real-time data access." },
    ],
    paragraph: "Our analytics infrastructure has tracked 200+ influencer campaigns, processing millions of data points to deliver accurate ROI calculations. We use industry-leading tools combined with proprietary analysis methods to provide insights you can confidently present to stakeholders.",
  },
  relatedPages: [
    { path: `${BASE}/campaign-management`, title: "Campaign Management", description: "Full-service campaign execution and management.", icon: HiMegaphone },
    { path: `${BASE}/micro-influencer-marketing-uae`, title: "Micro-Influencer Marketing", description: "High-engagement micro-influencer campaigns.", icon: HiUserGroup },
    { path: `${BASE}/luxury-influencer-marketing`, title: "Luxury Influencer Marketing", description: "Premium brand influencer partnerships.", icon: HiSparkles },
    { path: `${BASE}/instagram-influencer-marketing`, title: "Instagram Marketing", description: "Instagram influencer campaign strategies.", icon: FaInstagram },
    { path: `${BASE}/tiktok-influencer-marketing`, title: "TikTok Marketing", description: "TikTok campaign analytics and tracking.", icon: FaTiktok },
    { path: `${BASE}/influencer-marketing-cost-uae`, title: "Influencer Marketing Cost", description: "Budget planning and cost optimization.", icon: HiCurrencyDollar },
  ],
  faq: {
    title: "ROI & Analytics FAQ",
    items: [
      { question: "How do you measure influencer marketing ROI?", answer: "We measure ROI through a combination of tracked conversions, UTM parameters, unique discount codes, pixel tracking, and multi-touch attribution models. This allows us to connect influencer activities directly to business outcomes like website visits, leads, and sales, calculating exact return on investment." },
      { question: "What metrics do you track for influencer campaigns?", answer: "We track reach, impressions, engagement rate, engagement quality, click-through rate, website traffic, conversion rate, cost per engagement, cost per acquisition, audience growth, brand sentiment, share of voice, and earned media value. Metrics are customized based on your campaign objectives." },
      { question: "How often do you provide campaign reports?", answer: "We provide real-time dashboard access for ongoing monitoring, weekly performance summaries during active campaigns, and comprehensive post-campaign reports with detailed analysis. Report frequency can be customized to your needs — daily, weekly, or monthly." },
      { question: "Can you track offline conversions from influencer campaigns?", answer: "Yes, we use techniques like unique promo codes, QR codes, branded landing pages, and footfall attribution to track offline conversions. We also conduct brand lift studies and sentiment analysis to measure offline impact on brand awareness and purchase intent." },
    ],
  },
  cta: {
    title: "Start Measuring Your Impact",
    description: "Get clear, accurate analytics that prove the value of your influencer marketing investment.",
    button: "Get Started",
  },
};

const ROIAnalytics = () => <InfluencerSubPage pageData={pageData} />;

export default ROIAnalytics;
