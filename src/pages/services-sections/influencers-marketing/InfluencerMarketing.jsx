import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiSearch,
  FiUsers,
  FiTarget,
  FiEdit3,
  FiBarChart2,
  FiLayers,
  FiCheckCircle,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiDatabase,
  FiFileText,
  FiAward,
  FiStar,
} from "react-icons/fi";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import {
  HiShoppingCart,
  HiHome,
  HiGlobe,
  HiCamera,
  HiSparkles,
} from "react-icons/hi";

import influencerHero from "../../../assets/services/Influencer-Marketing.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import { ServiceHeroSection, ServiceCTASection } from "../../../components/services-sections";
import ServiceSubServicesSection from "../../../components/services-sections/ServiceSubServicesSection";

import InfServicesGrid from "./sub-components/InfServicesGrid";
import InfFullService from "./sub-components/InfFullService";
import InfPlatforms from "./sub-components/InfPlatforms";
import InfInfluencerTypes from "./sub-components/InfInfluencerTypes";
import InfCampaignProcess from "./sub-components/InfCampaignProcess";
import InfIndustries from "./sub-components/InfIndustries";
import InfWhyChooseUs from "./sub-components/InfWhyChooseUs";
import InfComparisonTable from "./sub-components/InfComparisonTable";

import "./influencerMarketing.css";

gsap.registerPlugin(ScrollTrigger);

function revealChildren(containerRef, selector, staggerVal = 0.1) {
  if (!containerRef.current) return;
  const els = containerRef.current.querySelectorAll(selector);
  if (!els.length) return;
  gsap.fromTo(
    els,
    { opacity: 0, y: 36 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: staggerVal,
      ease: "power3.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 82%" },
    }
  );
}

const coreServices = [
  {
    icon: <FiSearch />,
    title: "Influencer Research and Discovery",
    description:
      "Our influencer research and discovery process identifies creators whose audience, engagement, and content align with your brand.",
  },
  {
    icon: <FiUsers />,
    title: "Influencer Outreach and Partnership Management",
    description:
      "We manage communication, campaign agreements, and collaboration timelines to ensure influencer partnerships run smoothly.",
  },
  {
    icon: <FiTarget />,
    title: "Influencer Campaign Strategy and Planning",
    description:
      "Our strategy and planning focus on defining campaign goals, target audiences, and content direction for maximum engagement.",
  },
  {
    icon: <FiEdit3 />,
    title: "Content Collaboration With Influencers",
    description:
      "We ensure brand messaging remains natural while connecting with the influencer's audience to build trust and engagement.",
  },
  {
    icon: <FiBarChart2 />,
    title: "Campaign Management and Performance Tracking",
    description:
      "Our campaign management process monitors reach, engagement, and audience response with detailed reporting.",
  },
];

const fullServiceItems = [
  {
    icon: <FiLayers />,
    title: "Strategic Influencer Campaign Development",
    description:
      "We define campaign goals, identify suitable influencers, and plan content that aligns with your brand for consistent results.",
  },
  {
    icon: <FiCheckCircle />,
    title: "Access to Verified UAE Influencers",
    description:
      "Each creator is selected based on audience relevance and engagement quality to ensure real and active audience reach.",
  },
  {
    icon: <FiZap />,
    title: "End-to-End Influencer Campaign Management",
    description:
      "From influencer coordination to campaign monitoring, we manage all key activities across every campaign stage.",
  },
];

const platforms = [
  {
    icon: <FaInstagram />,
    title: "Instagram Influencer Marketing Campaigns",
    description:
      "Widely used by brands in fashion, lifestyle, beauty, and e-commerce. Influencers share product experiences through posts, stories, and reels.",
    tags: ["Posts", "Stories", "Reels", "IGTV"],
  },
  {
    icon: <FaTiktok />,
    title: "TikTok Influencer Marketing for Brand Growth",
    description:
      "Helps brands reach audiences through short and engaging video content with rapid exposure and audience interaction.",
    tags: ["Short Video", "Trends", "Duets", "Challenges"],
  },
  {
    icon: <FaYoutube />,
    title: "YouTube Influencer Partnerships",
    description:
      "Allows brands to share detailed content such as product reviews, tutorials, and brand experiences for deeper trust.",
    tags: ["Reviews", "Tutorials", "Vlogs", "Shorts"],
  },
];

const influencerTypes = [
  {
    icon: <FiStar />,
    title: "Nano Influencers for Niche Brand Promotion",
    description:
      "Smaller but highly engaged audiences. Ideal for niche markets and local businesses building trust within specific communities.",
  },
  {
    icon: <FiUsers />,
    title: "Micro Influencers for Targeted Campaigns",
    description:
      "Strong engagement and loyal followers. Perfect for promoting products to a focused audience that shares similar interests.",
  },
  {
    icon: <FiTrendingUp />,
    title: "Macro Influencers for Large-Scale Campaigns",
    description:
      "Broader reach to help brands expand visibility. Commonly used for product launches and brand awareness campaigns.",
  },
  {
    icon: <FiAward />,
    title: "Celebrity Influencers for Maximum Brand Reach",
    description:
      "Large audiences and strong brand recognition. Used for major campaigns that aim to achieve maximum exposure.",
  },
];

const processSteps = [
  {
    title: "Audience and Market Research",
    description:
      "Understanding the target audience is the first step. Research helps identify audience preferences, industry trends, and suitable strategies.",
  },
  {
    title: "Influencer Identification and Selection",
    description:
      "Creators are evaluated based on audience demographics, engagement rates, and content quality to ensure the right fit.",
  },
  {
    title: "Campaign Strategy Development",
    description:
      "A campaign strategy outlines the goals, messaging, and content direction aligned with the brand's marketing objectives.",
  },
  {
    title: "Influencer Collaboration and Content Creation",
    description:
      "Influencers create content that naturally integrates brand messaging with their storytelling style for authenticity.",
  },
  {
    title: "Campaign Launch and Performance Monitoring",
    description:
      "Once live, performance is monitored to track engagement, reach, and audience interaction for continuous optimization.",
  },
];

const industries = [
  { icon: <HiSparkles />, title: "Fashion and Beauty Brands" },
  { icon: <HiCamera />, title: "Restaurants and Hospitality" },
  { icon: <HiGlobe />, title: "Travel and Tourism Companies" },
  { icon: <HiShoppingCart />, title: "E-commerce and Retail Brands" },
  { icon: <HiHome />, title: "Real Estate and Lifestyle" },
];

const whyUsReasons = [
  {
    icon: <FiUsers />,
    title: "Network of Trusted UAE Influencers",
    description: "We work with verified influencers across multiple industries and social media platforms.",
  },
  {
    icon: <FiDatabase />,
    title: "Data-Driven Strategies",
    description: "Campaign decisions are based on audience insights, engagement data, and performance metrics.",
  },
  {
    icon: <FiFileText />,
    title: "Transparent Campaign Reporting",
    description: "Brands receive clear reports showing campaign reach, engagement, and audience interaction.",
  },
  {
    icon: <FiShield />,
    title: "Proven Experience in Campaigns",
    description: "Our team has experience managing influencer collaborations across various industries.",
  },
];

const comparisonRows = [
  {
    feature: "Audience Trust",
    influencer: "High due to the creator's credibility",
    traditional: "Lower compared to influencer content",
  },
  {
    feature: "Engagement",
    influencer: "Strong interaction through social media",
    traditional: "Limited audience interaction",
  },
  {
    feature: "Targeting",
    influencer: "Highly targeted audience reach",
    traditional: "Broad and less precise targeting",
  },
  {
    feature: "Content Style",
    influencer: "Authentic and relatable",
    traditional: "Promotional and brand-driven",
  },
  {
    feature: "Cost Efficiency",
    influencer: "Flexible budgets for different campaigns",
    traditional: "Often requires higher budgets",
  },
];

const subServiceItems = [
  {
    title: "Campaign Management",
    desc: "End-to-end campaign planning, execution, and optimization to keep influencer collaborations on track.",
  },
  {
    title: "Micro Influencer Marketing UAE",
    desc: "Target niche audiences through highly engaged micro creators across UAE-focused campaigns.",
  },
  {
    title: "Luxury Influencer Marketing",
    desc: "Premium influencer collaborations designed for luxury brands, high-value products, and exclusive audiences.",
  },
  {
    title: "ROI Analytics",
    desc: "Measure campaign performance with actionable reporting on reach, engagement, and return on investment.",
  },
  {
    title: "Instagram Influencer Marketing",
    desc: "Build visibility with creator-led Instagram content, including reels, stories, and branded posts.",
  },
  {
    title: "TikTok Influencer Marketing",
    desc: "Drive awareness through short-form TikTok campaigns that match trends and audience behavior.",
  },
  {
    title: "Influencer Marketing Cost UAE",
    desc: "Understand campaign pricing models and budget planning for influencer marketing in the UAE market.",
  },
];

const subServiceHrefs = [
  "/influencer-marketing-agency-dubai/campaign-management",
  "/influencer-marketing-agency-dubai/micro-influencer-marketing-uae",
  "/influencer-marketing-agency-dubai/luxury-influencer-marketing",
  "/influencer-marketing-agency-dubai/roi-analytics",
  "/influencer-marketing-agency-dubai/instagram-influencer-marketing",
  "/influencer-marketing-agency-dubai/tiktok-influencer-marketing",
  "/influencer-marketing-agency-dubai/influencer-marketing-cost-uae",
];

const subServiceIcons = [
  <FiBarChart2 key="1" />,
  <FiUsers key="2" />,
  <FiAward key="3" />,
  <FiTrendingUp key="4" />,
  <FaInstagram key="5" />,
  <FaTiktok key="6" />,
  <FiFileText key="7" />,
];

const faqItems = [
  {
    question: "What does an influencer marketing agency do?",
    answer:
      "An influencer marketing agency helps brands collaborate with social media creators to promote products or services. The agency manages influencer selection, campaign planning, partnerships, and performance tracking to ensure campaigns achieve their marketing goals.",
  },
  {
    question: "Why should businesses work with an influencer marketing agency in Dubai?",
    answer:
      "Working with an influencer marketing agency in Dubai helps businesses connect with creators who have strong local audiences. Agencies also handle campaign strategy, influencer outreach, and campaign management, making influencer marketing more organized and effective.",
  },
  {
    question: "How much does influencer marketing cost in Dubai?",
    answer:
      "Influencer marketing costs vary depending on the influencer's audience size, platform, and campaign scope. Nano and micro influencers usually charge lower fees, while macro or celebrity influencers may require larger campaign budgets.",
  },
  {
    question: "How do brands find the right influencers for their campaigns?",
    answer:
      "Brands usually identify influencers by analyzing audience demographics, engagement rates, and content quality. An influencer marketing agency helps evaluate these factors to ensure influencers match the brand's target audience and campaign objectives.",
  },
  {
    question: "Which social media platforms are best for influencer marketing?",
    answer:
      "Instagram, TikTok, and YouTube are the most commonly used platforms for influencer marketing campaigns. Each platform offers different content formats and audience types, allowing brands to choose the best channel for their marketing goals.",
  },
  {
    question: "What industries benefit the most from influencer marketing?",
    answer:
      "Industries such as fashion, beauty, travel, restaurants, ecommerce, and real estate often benefit from influencer marketing. Influencers help these businesses showcase products and services through authentic content that reaches engaged audiences.",
  },
  {
    question: "How long does an influencer marketing campaign take?",
    answer:
      "The duration of an influencer marketing campaign depends on the campaign goals and collaboration scope. Some campaigns run for a few weeks, while long-term partnerships with influencers can last several months.",
  },
  {
    question: "How can influencer marketing help grow a brand?",
    answer:
      "Influencer marketing helps brands increase visibility, reach targeted audiences, and build trust through authentic creator content. When influencers share genuine experiences with their followers, it can improve engagement and encourage potential customers to explore the brand.",
  },
];

const InfluencerMarketing = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const fullServiceRef = useRef(null);
  const platformsRef = useRef(null);
  const typesRef = useRef(null);
  const processRef = useRef(null);
  const industriesRef = useRef(null);
  const whyUsRef = useRef(null);
  const comparisonRef = useRef(null);
  const subServicesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );

      revealChildren(servicesRef, ".inf-reveal", 0.1);
      revealChildren(fullServiceRef, ".inf-reveal", 0.12);
      revealChildren(platformsRef, ".inf-reveal", 0.15);
      revealChildren(typesRef, ".inf-reveal", 0.1);
      revealChildren(processRef, ".inf-reveal", 0.12);
      revealChildren(industriesRef, ".inf-reveal", 0.08);
      revealChildren(whyUsRef, ".inf-reveal", 0.1);
      revealChildren(subServicesRef, ".im-subservice-card", 0.08);

      if (comparisonRef.current) {
        gsap.fromTo(
          comparisonRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: comparisonRef.current, start: "top 82%" },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll(".im-reveal"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Influencer Marketing Agency Dubai", url: "/influencer-marketing-agency-dubai" },
  ];

  return (
    <>
      <SEOHead
        title="Influencer Marketing Agency Dubai | Influencer Campaigns"
        description="Top influencer marketing agency in Dubai helping brands connect with trusted creators and manage influencer campaigns across Instagram, TikTok, and YouTube."
        serviceType="Influencer Marketing Agency Dubai"
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        ref={heroRef}
        imageSrc={influencerHero}
        imageAlt="Influencer Marketing Agency Dubai"
        badge="Influencer Marketing Agency"
        badgeVariant="pulse"
        title="High-Impact Influencer Campaigns in"
        mainWord="Dubai"
        description="Dubai has become a strong market for influencer collaborations, where brands work with creators to reach engaged online audiences. A trusted influencer marketing agency helps businesses connect with the right influencers and build partnerships that increase brand visibility."
        dataNavColor="black"
      />

      <InfServicesGrid
        ref={servicesRef}
        label="Our Services"
        title="Influencer Marketing Services in Dubai"
        description="Our influencer marketing services help brands collaborate with creators who can reach the right audience across social media platforms. We focus on building partnerships that strengthen brand visibility and engagement."
        services={coreServices}
      />

      <InfFullService
        ref={fullServiceRef}
        label="Full-Service Agency"
        title="Full-Service Influencer Marketing Agency in Dubai"
        description="We help brands plan, launch, and manage influencer campaigns across major social media platforms, connecting businesses with creators who can reach the right audience."
        items={fullServiceItems}
      />

      <InfPlatforms
        ref={platformsRef}
        label="Platforms"
        title="Social Media Influencer Marketing Platforms"
        description="Our influencer marketing campaigns focus on platforms where audiences are most active, helping brands connect with potential customers through authentic creator content."
        platforms={platforms}
      />

      <InfInfluencerTypes
        ref={typesRef}
        label="Influencer Categories"
        title="Types of Influencers for Marketing Campaigns"
        description="Different influencer categories help brands reach specific audiences. Choosing the right influencer type depends on campaign goals, budget, and audience targeting."
        types={influencerTypes}
      />

      <InfCampaignProcess
        ref={processRef}
        label="Our Process"
        title="Influencer Marketing Campaign Process"
        description="A structured campaign process helps ensure influencer collaborations deliver consistent results. Each step focuses on audience relevance and campaign performance."
        steps={processSteps}
      />

      <InfIndustries
        ref={industriesRef}
        label="Industries We Serve"
        title="Industries Using Influencer Marketing in Dubai and the UAE"
        description="Influencer marketing is widely used across multiple industries in the UAE. Brands use creators to promote products and services through engaging content."
        industries={industries}
      />

      <InfWhyChooseUs
        ref={whyUsRef}
        label="Why Choose Us"
        title="Why Businesses Choose Our Influencer Marketing Agency in Dubai"
        description="Businesses partner with our influencer marketing agency to manage campaigns through a professional and structured approach."
        reasons={whyUsReasons}
      />

      <InfComparisonTable
        ref={comparisonRef}
        label="Comparison"
        title="Influencer Marketing Agency vs Traditional Advertising"
        description="See how influencer marketing compares to traditional advertising methods."
        rows={comparisonRows}
        footer="Influencer marketing allows brands to reach audiences through trusted creators, while traditional advertising focuses on direct promotional messaging."
      />

      <ServiceSubServicesSection
        ref={subServicesRef}
        sectionLabel="Sub-Services"
        title="Explore Influencer Marketing Sub-Services"
        description="Choose the influencer marketing service that best matches your campaign goals, target audience, and platform strategy."
        learnMoreText="Learn More"
        items={subServiceItems}
        hrefs={subServiceHrefs}
        icons={subServiceIcons}
        classPrefix="im"
      />

      <FAQ items={faqItems} title="Frequently Asked Questions About Influencer Marketing in Dubai" />

      <ServiceCTASection
        ref={ctaRef}
        classPrefix="im"
        sectionLabel="Get Started"
        title="Start Your Influencer Marketing Campaign With a Leading Dubai Agency"
        description="If your business is looking to collaborate with influencers, our team helps brands plan influencer campaigns, connect with trusted creators, and manage campaigns that strengthen brand visibility and audience engagement."
        primaryButtonText="Start Your Campaign"
        primaryHref="/contact-us"
        secondaryButtonText="Call Us"
        secondaryHref="tel:+97145774042"
      />
    </>
  );
};

export default InfluencerMarketing;
