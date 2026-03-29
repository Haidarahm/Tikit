import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiTarget,
  FiClock,
  FiPieChart,
  FiTrendingDown,
  FiUsers,
  FiEye,
  FiMapPin,
  FiUserCheck,
  FiBarChart2,
  FiLayers,
  FiCalendar,
  FiFilm,
  FiPackage,
  FiGlobe,
  FiZap,
  FiAward,
  FiInstagram,
  FiFileText,
} from "react-icons/fi";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

import influencerHero from "../../../assets/services/Influencer-Marketing.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import { ServiceHeroSection, ServiceSubServicesSection, ServiceCTASection } from "../../../components/services-sections";

import InfServicesGrid from "./sub-components/InfServicesGrid";
import InfFullService from "./sub-components/InfFullService";
import InfPlatforms from "./sub-components/InfPlatforms";
import InfCampaignProcess from "./sub-components/InfCampaignProcess";
import InfIndustries from "./sub-components/InfIndustries";
import InfWhyChooseUs from "./sub-components/InfWhyChooseUs";
import InfIconCardGrid from "./sub-components/InfIconCardGrid";
import InfCaseStudyBlock from "./sub-components/InfCaseStudyBlock";
import {
  INFLUENCER_MARKETING_BASE,
  influencerMarketingSubServiceHrefs,
  influencerMarketingSubServiceIcons,
  influencerMarketingSubServiceItems,
} from "./influencerMarketingSubServices";

import "./influencerMarketing.css";

gsap.registerPlugin(ScrollTrigger);

const BASE = INFLUENCER_MARKETING_BASE;

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

const challengeCards = [
  {
    icon: <FiTarget />,
    title: "Choosing the right creators",
    description:
      "Many brands invest in influencers but struggle to match creators with audience quality, niche relevance, and real influence on buying decisions.",
  },
  {
    icon: <FiClock />,
    title: "Managing campaign timelines",
    description:
      "Without a clear structure, briefs, approvals, and publishing windows slip—creating last-minute stress and inconsistent delivery.",
  },
  {
    icon: <FiPieChart />,
    title: "Tracking actual ROI",
    description:
      "Attention alone does not grow a business. Campaigns need reporting that ties engagement, traffic, and conversions to real outcomes.",
  },
];

const unstructuredProblems = [
  {
    icon: <FiTrendingDown />,
    title: "High costs with low returns",
    description:
      "Unstructured spend on the wrong creators or formats often burns budget without clear attribution to leads or sales.",
  },
  {
    icon: <FiUsers />,
    title: "Irrelevant audience reach",
    description:
      "Follower counts can mask mismatched audiences. Poor fit means your message never reaches people who would actually consider your brand.",
  },
  {
    icon: <FiEye />,
    title: "No clear performance insights",
    description:
      "Without disciplined tracking, teams guess what worked—making it hard to optimize, scale, or defend the investment internally.",
  },
];

const structuredBenefits = [
  {
    icon: <FiMapPin />,
    title: "Reach the right audience across Dubai and the UAE",
    description:
      "Campaigns are planned around geography, demographics, and platform behavior so spend goes where your buyers actually are.",
  },
  {
    icon: <FiUserCheck />,
    title: "Work with influencers who influence buying decisions",
    description:
      "We prioritize audience quality, engagement patterns, and niche fit—not vanity metrics—so recommendations translate into action.",
  },
  {
    icon: <FiBarChart2 />,
    title: "Turn content into measurable business results",
    description:
      "From engagement to traffic and conversions, reporting is built around KPIs you care about, not screenshots of likes alone.",
  },
];

const processSteps = [
  {
    title: "Strategy & campaign planning",
    description:
      "We define campaign goals, target audience, and key performance metrics before execution begins—so every deliverable ladders up to outcomes.",
  },
  {
    title: "Influencer selection in Dubai & UAE",
    description:
      "We identify creators based on audience quality, engagement, and niche relevance—not just follower count.",
  },
  {
    title: "Outreach & collaboration management",
    description:
      "We handle influencer communication, pricing discussions, and onboarding with clear timelines and accountability.",
  },
  {
    title: "Content planning & brand alignment",
    description:
      "We guide content direction so it aligns with your brand voice, compliance needs, and campaign goals.",
  },
  {
    title: "Campaign execution",
    description:
      "We manage publishing schedules, coordination, and delivery across platforms so go-live stays organized.",
  },
  {
    title: "Performance tracking & reporting",
    description:
      "We track engagement, reach, clicks, and conversions using real data—and summarize what it means for your next move.",
  },
  {
    title: "Optimization & scaling",
    description:
      "We improve campaigns based on performance insights and scale what works best, rather than repeating guesswork.",
  },
];

const platforms = [
  {
    icon: <FaInstagram />,
    title: "Instagram campaign management in Dubai",
    description:
      "Best for brand awareness, lifestyle content, and visual engagement—stories, reels, and curated feeds that feel native to the platform.",
    tags: ["Awareness", "Lifestyle", "Reels", "Stories"],
  },
  {
    icon: <FaTiktok />,
    title: "TikTok campaign management UAE",
    description:
      "Ideal for viral reach, fast engagement, and younger audiences through short-form creative that matches trends and culture.",
    tags: ["Short-form", "Trends", "Reach", "Engagement"],
  },
  {
    icon: <FaYoutube />,
    title: "YouTube influencer campaigns UAE",
    description:
      "Great for detailed content, product reviews, and long-term trust building through longer storytelling and search-friendly assets.",
    tags: ["Reviews", "Tutorials", "Long-form", "Trust"],
  },
];

const campaignTypes = [
  {
    icon: <FiPackage />,
    title: "Product launch campaigns",
    description: "Build momentum and visibility for new products in the UAE market with coordinated creator beats and clear CTAs.",
  },
  {
    icon: <FiGlobe />,
    title: "Brand awareness campaigns",
    description: "Increase recognition and establish a strong presence in Dubai through consistent messaging and creator narratives.",
  },
  {
    icon: <FiZap />,
    title: "Lead generation campaigns",
    description: "Drive targeted traffic that converts into potential customers using trackable journeys—not just impressions.",
  },
  {
    icon: <FiAward />,
    title: "Luxury influencer campaigns",
    description:
      "Tailored strategies for premium brands targeting high-value audiences in Dubai, with emphasis on brand safety and craft.",
  },
];

const pricingFactors = [
  {
    icon: <FiUsers />,
    title: "Influencer size and audience type",
    description: "Creator tier affects reach, rates, and expected engagement—matched to your goals and risk tolerance.",
  },
  {
    icon: <FiInstagram />,
    title: "Platform selection",
    description: "Each platform has different production needs, timelines, and performance patterns—your mix should follow the audience.",
  },
  {
    icon: <FiCalendar />,
    title: "Campaign duration",
    description: "Longer programs can compound learning; shorter bursts can support launches—scope drives resourcing and cost.",
  },
  {
    icon: <FiFilm />,
    title: "Content requirements",
    description: "Deliverable count, formats, usage rights, and amplification layers all influence production and management effort.",
  },
];

const marketInsightCards = [
  {
    icon: <FiInstagram />,
    title: "Instagram and TikTok dominate engagement",
    description: "In Dubai, short-form and visual platforms continue to capture outsized attention—plan creative and measurement accordingly.",
  },
  {
    icon: <FiUsers />,
    title: "Micro influencers often drive stronger interaction",
    description: "Smaller, highly relevant audiences frequently outperform broad reach when the goal is trust and conversion.",
  },
  {
    icon: <FiLayers />,
    title: "Authentic content beats scripted promotions",
    description: "Audiences respond to natural storytelling; rigid scripts tend to reduce credibility and engagement over time.",
  },
];

const popularNiches = [
  { icon: <HiSparkles />, title: "Fashion and lifestyle" },
  { icon: <FiAward />, title: "Beauty and skincare" },
  { icon: <FiGlobe />, title: "Food and hospitality" },
];

const whyChooseUs = [
  {
    icon: <FiMapPin />,
    title: "Local market expertise",
    description: "We understand audience behavior, trends, and platform dynamics in Dubai—so strategy reflects how people actually consume content.",
  },
  {
    icon: <FiUsers />,
    title: "Access to relevant influencers",
    description: "We work with influencers across multiple niches in the UAE and vet fit against your objectives—not just popularity.",
  },
  {
    icon: <FiBarChart2 />,
    title: "Performance-driven approach",
    description: "Every campaign is built around measurable outcomes like engagement, traffic, and conversions—not vanity metrics alone.",
  },
  {
    icon: <FiFileText />,
    title: "Transparent reporting",
    description: "You receive clear updates and insights throughout the campaign, with recommendations grounded in data.",
  },
];

const faqItems = [
  {
    question: "How much does campaign management cost in Dubai?",
    answer:
      "Costs depend on campaign size, influencers, and platforms. We provide customized plans based on your goals rather than one-size-fits-all packages.",
  },
  {
    question: "How long does a campaign take?",
    answer: "Most campaigns run between 2 and 6 weeks depending on scope, deliverables, and approval cycles—longer programs are available when needed.",
  },
  {
    question: "Which platform works best in Dubai?",
    answer:
      "Instagram and TikTok perform well for many industries, but the best platform depends on your audience, offer, and creative format—we recommend based on data, not assumptions.",
  },
  {
    question: "Do you work with micro influencers in Dubai?",
    answer: "Yes. Micro influencers often deliver strong engagement and better ROI when the goal is relevance, trust, and efficient testing.",
  },
];

const CampaignManagement = () => {
  const heroRef = useRef(null);
  const challengesRef = useRef(null);
  const unstructuredRef = useRef(null);
  const structuredBenefitsRef = useRef(null);
  const hubLinkRef = useRef(null);
  const processRef = useRef(null);
  const platformsRef = useRef(null);
  const campaignTypesRef = useRef(null);
  const costRef = useRef(null);
  const caseStudyRef = useRef(null);
  const insightsRef = useRef(null);
  const nichesRef = useRef(null);
  const whyUsRef = useRef(null);
  const subServicesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );

      revealChildren(challengesRef, ".inf-reveal", 0.1);
      revealChildren(unstructuredRef, ".inf-reveal", 0.12);
      revealChildren(structuredBenefitsRef, ".inf-reveal", 0.1);

      if (hubLinkRef.current) {
        gsap.fromTo(
          hubLinkRef.current.querySelectorAll(".inf-hub-link"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: hubLinkRef.current, start: "top 82%" },
          }
        );
      }

      revealChildren(processRef, ".inf-reveal", 0.12);
      revealChildren(platformsRef, ".inf-reveal", 0.15);
      revealChildren(campaignTypesRef, ".inf-reveal", 0.1);
      revealChildren(costRef, ".inf-reveal", 0.1);
      revealChildren(caseStudyRef, ".inf-reveal", 0.12);
      revealChildren(insightsRef, ".inf-reveal", 0.1);
      revealChildren(nichesRef, ".inf-industry-tag", 0.08);
      revealChildren(whyUsRef, ".inf-reveal", 0.1);
      revealChildren(subServicesRef, ".im-subservice-card", 0.08);

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
    { name: "Influencer Marketing Agency Dubai", url: BASE },
    { name: "Campaign Management Dubai", url: `${BASE}/campaign-management-dubai` },
  ];

  return (
    <>
      <SEOHead
        title="Influencer Campaign Management Dubai | End-to-End Campaign Services"
        description="Professional influencer campaign management in Dubai—from strategy and influencer selection to content alignment, execution, and performance reporting aligned with business outcomes."
        keywords="influencer campaign management Dubai, campaign management UAE, influencer marketing campaign Dubai"
        canonicalUrl={`${BASE}/campaign-management-dubai`}
        serviceType="Influencer Campaign Management Dubai"
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        ref={heroRef}
        imageSrc={influencerHero}
        imageAlt="Influencer campaign management in Dubai"
        badge="Campaign Management"
        badgeVariant="pulse"
        title="Influencer Campaign Management in"
        mainWord="Dubai"
        description="Running influencer campaigns in Dubai can bring attention—but attention alone does not grow a business. We manage campaigns end-to-end so every step, from planning to reporting, is aligned with real outcomes like engagement, leads, and sales. Our approach is simple: build campaigns that perform, not just campaigns that look good."
        dataNavColor="black"
      />

      <InfServicesGrid
        ref={challengesRef}
        label="The challenge"
        title="Where brands get stuck without structured management"
        description="Many brands invest in influencers but struggle when the operating system around the campaign is unclear."
        services={challengeCards}
      />

      <InfFullService
        ref={unstructuredRef}
        label="Why it matters"
        title="Why influencer campaign management matters in Dubai"
        description="Dubai is one of the most competitive digital markets in the region. Influencer marketing works—but only when it is managed with precision and local understanding. Brands that run unstructured campaigns often face the problems below."
        items={unstructuredProblems}
      />

      <InfWhyChooseUs
        ref={structuredBenefitsRef}
        label="Structured results"
        title="What changes with proper campaign management"
        description="A structured campaign replaces guesswork with clarity, control, and performance signals you can act on."
        reasons={structuredBenefits}
      />

      <section ref={hubLinkRef} className="inf-section inf-section--alt">
        <div className="inf-container">
          <p className="inf-desc inf-hub-link mb-4 max-w-3xl">
            If you are planning long-term growth, it helps to look beyond single campaigns. Our{" "}
            <Link to={BASE} className="font-semibold underline underline-offset-4 hover:opacity-80" style={{ color: "var(--secondary)" }}>
              influencer marketing services in Dubai
            </Link>{" "}
            focus on scalable strategies that connect campaigns with real business goals.
          </p>
          <p className="inf-desc inf-hub-link mb-0 max-w-3xl">
            A well-managed campaign is not just promotion—it is a growth channel.
          </p>
        </div>
      </section>

      <InfCampaignProcess
        ref={processRef}
        label="Our process"
        title="Our influencer campaign management process in Dubai"
        description="We follow a structured framework that ensures clarity, control, and performance at every stage."
        steps={processSteps}
      />

      <InfPlatforms
        ref={platformsRef}
        label="Platforms"
        title="Social media campaign management across Dubai platforms"
        description="Each platform in Dubai has different audience behavior. We build campaigns based on where your audience is most active—and we focus on platform performance, not assumptions."
        platforms={platforms}
      />

      <InfIconCardGrid
        ref={campaignTypesRef}
        label="Campaign types"
        title="Types of influencer campaigns we manage in Dubai"
        description="Every campaign is designed with a clear goal and measurable outcomes. We align execution with your business objectives—not just content delivery."
        items={campaignTypes}
        columns={2}
      />

      <InfServicesGrid
        ref={costRef}
        label="Pricing"
        title="Influencer campaign management cost in Dubai"
        description="Campaign costs vary depending on multiple factors, and understanding them helps you plan better."
        services={pricingFactors}
        footer="Micro influencers often provide higher engagement at a lower cost, while larger influencers offer broader reach. Instead of fixed packages, we build campaigns based on your budget and expected outcomes."
      />

      <InfCaseStudyBlock
        ref={caseStudyRef}
        label="Performance"
        title="Campaign results and performance examples"
        description="We focus on performance that aligns with business growth—not just metrics in isolation."
        caseTitle="Example campaign (Dubai-based brand)"
        objective="Increase online sales"
        strategyTitle="Strategy"
        strategyItems={[
          "Collaborated with niche influencers in Dubai",
          "Focused on Instagram and TikTok",
          "Created conversion-driven content",
        ]}
        outcomeTitle="Outcome"
        outcomeItems={[
          "Improved engagement across platforms",
          "Increased qualified website traffic",
          "Achieved a strong return on campaign investment",
        ]}
        footer="Every campaign is tracked, measured, and optimized for better results."
      />

      <InfServicesGrid
        ref={insightsRef}
        label="Insights"
        title="Dubai influencer marketing insights (2026)"
        description="Understanding local trends helps create better-performing campaigns."
        services={marketInsightCards}
      />

      <InfIndustries
        ref={nichesRef}
        label="Popular niches"
        title="Popular niches in the UAE"
        description="Campaigns that align with local audience behavior consistently perform better."
        industries={popularNiches}
      />

      <InfWhyChooseUs
        ref={whyUsRef}
        label="Why Tikit"
        title="Why choose our campaign management services in Dubai"
        description="The right team makes a measurable difference in campaign performance."
        reasons={whyChooseUs}
      />

      <ServiceSubServicesSection
        ref={subServicesRef}
        sectionLabel="Sub-services"
        title="Explore influencer marketing sub-services"
        description="Choose the service that best matches your campaign goals, audience, and platform strategy."
        learnMoreText="Learn more"
        items={influencerMarketingSubServiceItems}
        hrefs={influencerMarketingSubServiceHrefs}
        icons={influencerMarketingSubServiceIcons}
        classPrefix="im"
      />

      <FAQ items={faqItems} title="FAQs – campaign management in Dubai" />

      <ServiceCTASection
        ref={ctaRef}
        classPrefix="im"
        sectionLabel="Get started"
        title="Ready to launch a high-performing influencer campaign in Dubai?"
        description="If you want campaigns that deliver results—not just impressions—you need the right strategy and execution. We help you plan, manage, and scale influencer campaigns with clarity and confidence."
        primaryButtonText="Book your free strategy call"
        primaryHref="/contact-us"
        secondaryButtonText="Call us"
        secondaryHref="tel:+97145774042"
      />
    </>
  );
};

export default CampaignManagement;
