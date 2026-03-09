import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  FiTarget,
  FiTrendingUp,
  FiBarChart2,
  FiGlobe,
  FiSearch,
  FiLayers,
  FiZap,
  FiMessageSquare,
  FiShield,
  FiDollarSign,
  FiUsers,
  FiArrowRight,
  FiPhone,
  FiActivity,
  FiStar,
  FiPieChart,
  FiInstagram,
  FiVideo,
  FiTag,
} from "react-icons/fi";

import influencerHero from "../../../assets/services/Influencer-Marketing.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  ServiceHeroSection,
  ServiceProblemsSection,
  ServiceProcessSection,
  ServiceBenefitsSection,
  ServiceCaseStudySection,
  ServiceWhyUsSection,
  ServiceSubServicesSection,
  ServiceCTASection,
} from "../../../components/services-sections";

import "../../../components/services-sections/ServiceSections.css";

gsap.registerPlugin(ScrollTrigger);

const problemIcons = [<FiTarget key="1" />, <FiDollarSign key="2" />, <FiBarChart2 key="3" />, <FiGlobe key="4" />];
const benefitIcons = [<FiTrendingUp key="1" />, <FiBarChart2 key="2" />, <FiZap key="3" />, <FiGlobe key="4" />];
const whyUsIcons = [<FiLayers key="1" />, <FiShield key="2" />, <FiSearch key="3" />, <FiMessageSquare key="4" />];
const subServiceIcons = [
  <FiActivity key="1" />,
  <FiUsers key="2" />,
  <FiStar key="3" />,
  <FiPieChart key="4" />,
  <FiInstagram key="5" />,
  <FiVideo key="6" />,
  <FiTag key="7" />,
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

function revealChildren(containerRef, selector, fromVars = {}, staggerVal = 0.1) {
  if (!containerRef.current) return;
  const els = containerRef.current.querySelectorAll(selector);
  if (!els.length) return;
  gsap.fromTo(
    els,
    { opacity: 0, y: 36, ...fromVars },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: staggerVal,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 82%",
      },
    }
  );
}

const InfluencerMarketing = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const heroRef = useRef(null);
  const problemsRef = useRef(null);
  const stepsRef = useRef(null);
  const benefitsRef = useRef(null);
  const caseRef = useRef(null);
  const whyRef = useRef(null);
  const ctaRef = useRef(null);
  const subServicesRef = useRef(null);

  const toArray = (val) => (Array.isArray(val) ? val : []);

  const problems = toArray(t("serviceSections.influencerMarketing.problems.items", { returnObjects: true }));
  const steps = toArray(t("serviceSections.influencerMarketing.process.steps", { returnObjects: true }));
  const benefits = toArray(t("serviceSections.influencerMarketing.benefits.items", { returnObjects: true }));
  const whyUsItems = toArray(t("serviceSections.influencerMarketing.whyUs.items", { returnObjects: true }));
  const subServices = toArray(t("serviceSections.influencerMarketing.subServices.items", { returnObjects: true }));
  const caseStatsRaw = toArray(t("serviceSections.influencerMarketing.caseStudy.stats", { returnObjects: true }));
  const caseTags = toArray(t("serviceSections.influencerMarketing.caseStudy.tags", { returnObjects: true }));
  const faqItems = toArray(t("serviceSections.influencerMarketing.faq.items", { returnObjects: true }));

  const caseStats = caseStatsRaw.map((stat, i) => ({
    ...stat,
    dataTarget: i === 0 ? "3" : i === 1 ? "90" : undefined,
    dataSuffix: i === 0 ? "x" : i === 1 ? "%" : undefined,
  }));

  const breadcrumbs = [
    { name: t("serviceSections.influencerMarketing.breadcrumb.home", { defaultValue: "Home" }), url: "/" },
    { name: t("serviceSections.influencerMarketing.breadcrumb.services", { defaultValue: "Services" }), url: "/services" },
    { name: t("serviceSections.influencerMarketing.seo.serviceType"), url: "/influencer-marketing-agency-dubai" },
  ];

  const dir = isRtl ? "rtl" : "ltr";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );

      revealChildren(problemsRef, ".im-problem-card", {}, 0.12);
      revealChildren(stepsRef, ".im-step-card", {}, 0.1);
      revealChildren(benefitsRef, ".im-benefit-item", {}, 0.11);
      revealChildren(whyRef, ".im-whyus-card", {}, 0.1);
      revealChildren(subServicesRef, ".im-subservice-card", {}, 0.08);

      if (caseRef.current) {
        gsap.fromTo(
          caseRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: caseRef.current, start: "top 80%" },
          }
        );

        const statValues = caseRef.current.querySelectorAll(".im-case-study__stat-value[data-target]");
        statValues.forEach((el) => {
          const target = parseFloat(el.dataset.target);
          const isMultiple = el.dataset.suffix === "x";
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = isMultiple ? `${Math.round(counter.val)}x` : `${Math.round(counter.val)}`;
            },
            scrollTrigger: { trigger: caseRef.current, start: "top 78%" },
          });
        });
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

  return (
    <>
      <SEOHead
        title={t("serviceSections.influencerMarketing.seo.title")}
        description={t("influencerMarketing.seo.description")}
        serviceType={t("influencerMarketing.seo.serviceType")}
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        ref={heroRef}
        imageSrc={influencerHero}
        imageAlt={t("serviceSections.influencerMarketing.seo.serviceType")}
        badge={t("serviceSections.influencerMarketing.hero.badge")}
        badgeVariant="pulse"
        title={t("serviceSections.influencerMarketing.hero.title")}
        mainWord={t("serviceSections.influencerMarketing.hero.mainWord")}
        description={t("serviceSections.influencerMarketing.hero.description")}
        dataNavColor="black"
      />

      <ServiceProblemsSection
        ref={problemsRef}
        sectionLabel={t("serviceSections.influencerMarketing.problems.sectionLabel")}
        title={t("serviceSections.influencerMarketing.problems.title")}
        description={t("serviceSections.influencerMarketing.problems.description")}
        items={problems}
        icons={problemIcons}
        dir={dir}
      />

      <ServiceProcessSection
        ref={stepsRef}
        sectionLabel={t("serviceSections.influencerMarketing.process.sectionLabel")}
        title={t("serviceSections.influencerMarketing.process.title")}
        description={t("serviceSections.influencerMarketing.process.description")}
        steps={steps}
        dir={dir}
      />

      <ServiceBenefitsSection
        ref={benefitsRef}
        sectionLabel={t("serviceSections.influencerMarketing.benefits.sectionLabel")}
        title={t("serviceSections.influencerMarketing.benefits.title")}
        description={t("serviceSections.influencerMarketing.benefits.description")}
        items={benefits}
        icons={benefitIcons}
        dir={dir}
      />

      <ServiceCaseStudySection
        ref={caseRef}
        sectionLabel={t("serviceSections.influencerMarketing.caseStudy.sectionLabel")}
        title={t("serviceSections.influencerMarketing.caseStudy.title")}
        tag={t("serviceSections.influencerMarketing.caseStudy.tag")}
        caseTitle={t("serviceSections.influencerMarketing.caseStudy.caseTitle")}
        stats={caseStats}
        tags={caseTags}
        quote={t("serviceSections.influencerMarketing.caseStudy.quote")}
        dir={dir}
      />

      <ServiceWhyUsSection
        ref={whyRef}
        sectionLabel={t("serviceSections.influencerMarketing.whyUs.sectionLabel")}
        title={t("serviceSections.influencerMarketing.whyUs.title")}
        items={whyUsItems}
        icons={whyUsIcons}
        dir={dir}
      />

      <ServiceSubServicesSection
        ref={subServicesRef}
        sectionLabel={t("serviceSections.influencerMarketing.subServices.sectionLabel")}
        title={t("serviceSections.influencerMarketing.subServices.title")}
        description={t("serviceSections.influencerMarketing.subServices.description")}
        learnMoreText={t("serviceSections.influencerMarketing.subServices.learnMore")}
        items={subServices}
        hrefs={subServiceHrefs}
        icons={subServiceIcons}
        dir={dir}
      />

      <FAQ
        items={faqItems}
        title={t("serviceSections.influencerMarketing.faq.title")}
      />

      <ServiceCTASection
        ref={ctaRef}
        sectionLabel={t("serviceSections.influencerMarketing.cta.sectionLabel")}
        title={t("serviceSections.influencerMarketing.cta.title")}
        description={t("serviceSections.influencerMarketing.cta.description")}
        primaryButtonText={t("serviceSections.influencerMarketing.cta.primaryButton")}
        secondaryButtonText={t("serviceSections.influencerMarketing.cta.secondaryButton")}
        dir={dir}
      />
    </>
  );
};

export default InfluencerMarketing;
