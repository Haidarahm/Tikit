import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  FiUsers,
  FiClock,
  FiEdit3,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
  FiSearch,
  FiLayers,
  FiVideo,
  FiBriefcase,
  FiBarChart2,
  FiHome,
  FiAward,
  FiWatch,
  FiTruck,
  FiActivity,
  FiStar,
  FiGlobe,
} from "react-icons/fi";

import influencerHero from "../../../assets/services/Influencer-Marketing.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  ServiceHeroSection,
  ServiceProblemsSection,
  ServiceStatsSection,
  ServiceSubServicesSection,
  ServiceCTASection,
} from "../../../components/services-sections";

import InfIconCardGrid from "./sub-components/InfIconCardGrid";
import InfServicesGrid from "./sub-components/InfServicesGrid";
import InfIndustries from "./sub-components/InfIndustries";
import InfWhyChooseUs from "./sub-components/InfWhyChooseUs";
import {
  INFLUENCER_MARKETING_BASE,
  influencerMarketingSubServiceHrefs,
  influencerMarketingSubServiceIcons,
  getInfluencerMarketingSubServiceItems,
} from "./influencerMarketingSubServices";

import "./influencerMarketing.css";

gsap.registerPlugin(ScrollTrigger);

const BASE = INFLUENCER_MARKETING_BASE;

const problemIcons = [<FiUsers key="p1" />, <FiClock key="p2" />, <FiEdit3 key="p3" />];
const principleIcons = [<FiStar key="pr1" />, <FiTarget key="pr2" />, <FiShield key="pr3" />];
const serviceIcons = [<FiSearch key="s1" />, <FiLayers key="s2" />, <FiVideo key="s3" />, <FiBriefcase key="s4" />, <FiBarChart2 key="s5" />];
const industryIcons = [<FiHome key="i1" />, <FiAward key="i2" />, <FiWatch key="i3" />, <FiTruck key="i4" />, <FiGlobe key="i5" />, <FiActivity key="i6" />];
const whyUsIcons = [<FiGlobe key="w1" />, <FiUsers key="w2" />, <FiCheckCircle key="w3" />, <FiTrendingUp key="w4" />];

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

const LuxuryInfluencerMarketing = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const dir = isRtl ? "rtl" : "ltr";

  const subServices = getInfluencerMarketingSubServiceItems(t);

  const problemItems = [
    {
      title: "Follower count over buyer quality",
      text: "Many campaigns chase big numbers but miss high-net-worth audiences that actually convert.",
    },
    {
      title: "Short-term reach over brand equity",
      text: "Luxury brands need long-term positioning, not temporary visibility spikes.",
    },
    {
      title: "Generic content over premium storytelling",
      text: "Mass-market creative weakens exclusivity and can dilute luxury perception.",
    },
  ];

  const principles = [
    {
      icon: principleIcons[0],
      title: "Exclusivity",
      description: "Limited, high-quality influencer partnerships for premium brand alignment.",
    },
    {
      icon: principleIcons[1],
      title: "Relevance",
      description: "Targeting affluent, high-intent audiences in Dubai and the UAE.",
    },
    {
      icon: principleIcons[2],
      title: "Control",
      description: "Protecting brand image across creative, collaborations, and publishing.",
    },
  ];

  const services = [
    {
      icon: serviceIcons[0],
      title: "High-End Influencer Identification & Vetting",
      description: "We source Dubai and international creators with verified affluent audience profiles and authentic engagement.",
    },
    {
      icon: serviceIcons[1],
      title: "Luxury Campaign Strategy & Positioning",
      description: "Audience segmentation, platform strategy, and campaign narrative built for premium buyers.",
    },
    {
      icon: serviceIcons[2],
      title: "Premium Content Creation & Storytelling",
      description: "Editorial visuals, high-end video, and experience-led campaigns crafted for luxury perception.",
    },
    {
      icon: serviceIcons[3],
      title: "Influencer Campaign Management",
      description: "Outreach, negotiations, exclusivity agreements, execution, and quality control handled end to end.",
    },
    {
      icon: serviceIcons[4],
      title: "Performance Tracking & Optimization",
      description: "High-value engagement, audience quality, premium conversion signals, and ROI optimization.",
    },
  ];

  const industries = [
    { icon: industryIcons[0], title: "Luxury Real Estate" },
    { icon: industryIcons[1], title: "High-End Fashion & Couture" },
    { icon: industryIcons[2], title: "Jewelry & Watches" },
    { icon: industryIcons[3], title: "Premium Automotive" },
    { icon: industryIcons[4], title: "Luxury Hotels & Resorts" },
    { icon: industryIcons[5], title: "Aesthetic & Cosmetic Clinics" },
  ];

  const stats = [
    { value: "3x+", label: "ROI for UAE luxury campaigns" },
    { value: "100%+", label: "Increase in qualified leads" },
    { value: "Verified", label: "Affluent audience engagement" },
  ];

  const whyUs = [
    {
      icon: whyUsIcons[0],
      title: "Deep Luxury Market Insight",
      description: "We understand how affluent audiences evaluate, trust, and buy in Dubai.",
    },
    {
      icon: whyUsIcons[1],
      title: "Access to Premium Influencers",
      description: "We prioritize creators who influence buyers, not just followers.",
    },
    {
      icon: whyUsIcons[2],
      title: "Strategy + Execution in One Team",
      description: "Planning, creative, coordination, and optimization with full consistency.",
    },
    {
      icon: whyUsIcons[3],
      title: "Long-Term Brand Value Focus",
      description: "We build sustained authority, not short-lived campaign spikes.",
    },
  ];

  const faqItems = [
    {
      question: "What is luxury influencer marketing?",
      answer:
        "Luxury influencer marketing promotes premium brands through creators who attract affluent audiences, with emphasis on exclusivity, brand positioning, and trust.",
    },
    {
      question: "How is it different from regular influencer marketing?",
      answer:
        "It prioritizes audience quality, premium brand fit, and storytelling rather than mass reach or short-term virality.",
    },
    {
      question: "How do you ensure influencer quality?",
      answer:
        "We evaluate audience demographics, authenticity, engagement quality, previous collaborations, and alignment with your luxury brand standards.",
    },
    {
      question: "Which platforms work best in the UAE luxury segment?",
      answer:
        "Instagram and TikTok are key for high-visibility luxury campaigns, while YouTube supports deeper brand storytelling and authority.",
    },
  ];

  const heroRef = useRef(null);
  const problemsRef = useRef(null);
  const principlesRef = useRef(null);
  const servicesRef = useRef(null);
  const industriesRef = useRef(null);
  const statsRef = useRef(null);
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

      revealChildren(problemsRef, ".im-problem-card", 0.12);
      revealChildren(principlesRef, ".inf-reveal", 0.1);
      revealChildren(servicesRef, ".inf-reveal", 0.08);
      revealChildren(industriesRef, ".inf-industry-tag", 0.08);
      revealChildren(statsRef, ".im-stat-card", 0.12);
      revealChildren(whyUsRef, ".inf-reveal", 0.1);
      revealChildren(subServicesRef, ".im-subservice-card", 0.08);
      revealChildren(ctaRef, ".im-reveal", 0.12);
    });

    return () => ctx.revert();
  }, []);

  const breadcrumbs = [
    { name: t("nav.home"), url: "/" },
    { name: t("nav.services"), url: "/services" },
    { name: t("serviceSections.influencerMarketing.badge"), url: BASE },
    { name: "Luxury Influencer Marketing", url: `${BASE}/luxury-influencer-marketing` },
  ];

  return (
    <>
      <SEOHead
        title="Luxury Influencer Marketing Agency Dubai | Tikit.ae UAE"
        description="Luxury influencer marketing in Dubai & UAE. Tikit.ae helps premium brands reach high-net-worth audiences through elite influencer campaigns and strategic storytelling."
        keywords="luxury influencer marketing, luxury influencer marketing agency dubai, luxury influencer campaign uae"
        canonicalUrl={`${BASE}/luxury-influencer-marketing`}
        serviceType="Luxury Influencer Marketing Agency Dubai"
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        ref={heroRef}
        imageSrc={influencerHero}
        imageAlt="Luxury Influencer Marketing Agency Dubai"
        badge="Luxury Influencer Marketing"
        badgeVariant="pulse"
        title="Luxury Influencer Marketing Agency in Dubai"
        mainWord="Connect with High-Net-Worth Audiences"
        description="We help premium brands in Dubai and the UAE grow through exclusive influencer partnerships, elevated storytelling, and measurable campaign execution."
        dataNavColor="black"
      />

      <ServiceProblemsSection
        ref={problemsRef}
        sectionLabel="The Problem"
        title="The Problem with Traditional Influencer Marketing"
        description="Luxury campaigns often underperform when strategy prioritizes scale over exclusivity, audience quality, and brand control."
        items={problemItems}
        icons={problemIcons}
        dir={dir}
        classPrefix="im"
      />

      <InfIconCardGrid
        ref={principlesRef}
        label="Our Approach"
        title="How We Build Luxury Influence in the UAE"
        description="Our strategy is designed for premium positioning and high-value customer acquisition."
        items={principles}
        columns={3}
      />

      <InfServicesGrid
        ref={servicesRef}
        label="Our Services"
        title="Our Luxury Influencer Marketing Services"
        description="From elite creator vetting to campaign optimization, every step is built for premium brands."
        services={services}
      />

      <InfIndustries
        ref={industriesRef}
        label="Industries"
        title="Industries We Serve in Dubai & UAE"
        description="We work with sectors where trust, perception, and brand prestige directly impact revenue."
        industries={industries}
      />

      <ServiceStatsSection
        ref={statsRef}
        sectionLabel="Results"
        title="Real Campaign Results"
        description="We focus on outcomes that matter to luxury brands: qualified demand, premium positioning, and profitable growth."
        items={stats}
        dir={dir}
      />

      <InfWhyChooseUs
        ref={whyUsRef}
        label="Why Tikit.ae"
        title="Why Tikit.ae is Different"
        description="We combine luxury category understanding with disciplined execution to deliver measurable value."
        reasons={whyUs}
      />

      <FAQ items={faqItems} title="Frequently Asked Questions" />

      <ServiceSubServicesSection
        ref={subServicesRef}
        sectionLabel={t("serviceSections.influencerMarketing.subServices.sectionLabel")}
        title={t("serviceSections.influencerMarketing.subServices.title")}
        description={t("serviceSections.influencerMarketing.subServices.description")}
        learnMoreText={t("serviceSections.influencerMarketing.subServices.learnMore")}
        items={subServices}
        hrefs={influencerMarketingSubServiceHrefs}
        icons={influencerMarketingSubServiceIcons}
        dir={dir}
        classPrefix="im"
      />

      <ServiceCTASection
        ref={ctaRef}
        classPrefix="im"
        sectionLabel="Get Started"
        title="Let’s Position Your Brand Where It Belongs"
        description="Attract high-value customers in Dubai and the UAE with luxury influencer campaigns designed for authority and growth."
        primaryButtonText="Start Your Luxury Campaign Today"
        primaryHref="/contact-us"
        secondaryButtonText="Call Us Now"
        secondaryHref="tel:+97145774042"
        dir={dir}
      />
    </>
  );
};

export default LuxuryInfluencerMarketing;
