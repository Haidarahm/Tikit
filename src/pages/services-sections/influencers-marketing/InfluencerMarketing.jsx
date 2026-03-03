import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";

import "./influencersMarketing.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── Icon maps (order matches translation arrays) ─────────── */
const problemIcons = [<FiTarget />, <FiDollarSign />, <FiBarChart2 />, <FiGlobe />];
const benefitIcons = [<FiTrendingUp />, <FiBarChart2 />, <FiZap />, <FiGlobe />];
const whyUsIcons   = [<FiLayers />, <FiShield />, <FiSearch />, <FiMessageSquare />];
const subServiceIcons = [
  <FiActivity />,
  <FiUsers />,
  <FiStar />,
  <FiPieChart />,
  <FiInstagram />,
  <FiVideo />,
  <FiTag />,
];

const subServiceHrefs = [
  "/services/influencer-marketing-agency-dubai/campaign-management",
  "/services/influencer-marketing-agency-dubai/micro-influencer-marketing-uae",
  "/services/influencer-marketing-agency-dubai/luxury-influencer-marketing",
  "/services/influencer-marketing-agency-dubai/roi-analytics",
  "/services/influencer-marketing-agency-dubai/instagram-influencer-marketing",
  "/services/influencer-marketing-agency-dubai/tiktok-influencer-marketing",
  "/services/influencer-marketing-agency-dubai/influencer-marketing-cost-uae",
];

/* ─── Helper: animate a ref's children ─────────────────────── */
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

/* ─── Component ─────────────────────────────────────────────── */
const InfluencerMarketing = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const heroRef        = useRef(null);
  const problemsRef    = useRef(null);
  const stepsRef       = useRef(null);
  const benefitsRef    = useRef(null);
  const caseRef        = useRef(null);
  const whyRef         = useRef(null);
  const ctaRef         = useRef(null);
  const subServicesRef = useRef(null);

  /* Safe helper — if the key isn't resolved yet t() returns the key string,
     which would crash .map(). Always fall back to []. */
  const toArray = (val) => (Array.isArray(val) ? val : []);

  /* Translation arrays */
  const problems    = toArray(t("serviceSections.influencerMarketing.problems.items",    { returnObjects: true }));
  const steps       = toArray(t("serviceSections.influencerMarketing.process.steps",       { returnObjects: true }));
  const benefits    = toArray(t("serviceSections.influencerMarketing.benefits.items",    { returnObjects: true }));
  const whyUsItems  = toArray(t("serviceSections.influencerMarketing.whyUs.items",       { returnObjects: true }));
  const subServices = toArray(t("serviceSections.influencerMarketing.subServices.items", { returnObjects: true }));
  const caseStats   = toArray(t("serviceSections.influencerMarketing.caseStudy.stats",   { returnObjects: true }));
  const caseTags    = toArray(t("serviceSections.influencerMarketing.caseStudy.tags",    { returnObjects: true }));
  const faqItems    = toArray(t("serviceSections.influencerMarketing.faq.items",         { returnObjects: true }));

  const breadcrumbs = [
    { name: t("serviceSections.influencerMarketing.breadcrumb.home",     { defaultValue: "Home" }),     url: "/" },
    { name: t("serviceSections.influencerMarketing.breadcrumb.services", { defaultValue: "Services" }), url: "/services" },
    { name: t("serviceSections.influencerMarketing.seo.serviceType"),  url: "/services/influencer-marketing-agency-dubai" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );

      /* Section reveals */
      revealChildren(problemsRef,    ".im-problem-card",    {}, 0.12);
      revealChildren(stepsRef,       ".im-step-card",       {}, 0.1);
      revealChildren(benefitsRef,    ".im-benefit-item",    {}, 0.11);
      revealChildren(whyRef,         ".im-whyus-card",      {}, 0.1);
      revealChildren(subServicesRef, ".im-subservice-card", {}, 0.08);

      /* Case Study slide in */
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

        /* Stat counters */
        const statValues = caseRef.current.querySelectorAll(
          ".im-case-study__stat-value[data-target]"
        );
        statValues.forEach((el) => {
          const target = parseFloat(el.dataset.target);
          const isMultiple = el.dataset.suffix === "x";
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = isMultiple
                ? `${Math.round(counter.val)}x`
                : `${Math.round(counter.val)}`;
            },
            scrollTrigger: { trigger: caseRef.current, start: "top 78%" },
          });
        });
      }

      /* CTA fade */
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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="im-hero" data-nav-color="black" >
        <div className="im-hero__image-wrapper">
          <img
            src={influencerHero}
            alt={t("serviceSections.influencerMarketing.seo.serviceType")}
            className="im-hero__image"
          />
          <div className="im-hero__overlay" />
        </div>
        <div ref={heroRef} className="im-hero__inner" style={{ opacity: 0 }}>
          <HeroWithBadge
            badge={t("serviceSections.influencerMarketing.hero.badge")}
            badgeVariant="pulse"
            title={t("serviceSections.influencerMarketing.hero.title")}
            mainWord={t("serviceSections.influencerMarketing.hero.mainWord")}
            description={t("serviceSections.influencerMarketing.hero.description")}
          />
        </div>
      </section>

      {/* ── Why Businesses Struggle ──────────────────────────── */}
      <section className="im-section" dir={isRtl ? "rtl" : "ltr"}>
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="im-section-label">
              {t("serviceSections.influencerMarketing.problems.sectionLabel")}
            </span>
            <h2 className="im-section-title">
              {t("serviceSections.influencerMarketing.problems.title")}
            </h2>
            <p className="im-section-desc">
              {t("serviceSections.influencerMarketing.problems.description")}
            </p>
          </div>
          <div ref={problemsRef} className="im-problems-grid">
            {Array.isArray(problems) && problems.map((p, i) => (
              <div key={i} className="im-problem-card">
                <div className="im-problem-card__icon">{problemIcons[i]}</div>
                <h3 className="im-problem-card__title">{p.title}</h3>
                <p className="im-problem-card__text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-Step Process ────────────────────────────────────── */}
      <section className="im-section--alt" dir={isRtl ? "rtl" : "ltr"}>
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="im-section-label">
              {t("serviceSections.influencerMarketing.process.sectionLabel")}
            </span>
            <h2 className="im-section-title">
              {t("serviceSections.influencerMarketing.process.title")}
            </h2>
            <p className="im-section-desc">
              {t("serviceSections.influencerMarketing.process.description")}
            </p>
          </div>
          <div ref={stepsRef} className="im-steps">
            {Array.isArray(steps) && steps.map((s, i) => (
              <div key={i} className="im-step-card">
                <div className="im-step-card__number">{s.n}</div>
                <h3 className="im-step-card__title">{s.title}</h3>
                <p className="im-step-card__text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section className="im-section" dir={isRtl ? "rtl" : "ltr"}>
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="im-section-label">
              {t("serviceSections.influencerMarketing.benefits.sectionLabel")}
            </span>
            <h2 className="im-section-title">
              {t("serviceSections.influencerMarketing.benefits.title")}
            </h2>
            <p className="im-section-desc">
              {t("serviceSections.influencerMarketing.benefits.description")}
            </p>
          </div>
          <div ref={benefitsRef} className="im-benefits-grid">
            {Array.isArray(benefits) && benefits.map((b, i) => (
              <div key={i} className="im-benefit-item">
                <div className="im-benefit-item__icon">{benefitIcons[i]}</div>
                <div>
                  <h3 className="im-benefit-item__title">{b.title}</h3>
                  <p className="im-benefit-item__text">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Study ───────────────────────────────────────── */}
      <section className="im-section--alt" dir={isRtl ? "rtl" : "ltr"}>
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="im-section-label">
              {t("serviceSections.influencerMarketing.caseStudy.sectionLabel")}
            </span>
            <h2 className="im-section-title">
              {t("serviceSections.influencerMarketing.caseStudy.title")}
            </h2>
          </div>
          <div ref={caseRef} className="im-case-study">
            <div className="im-case-study__glow" />
            <span className="im-case-study__tag">
              {t("serviceSections.influencerMarketing.caseStudy.tag")}
            </span>
            <h3 className="im-case-study__title">
              {t("serviceSections.influencerMarketing.caseStudy.caseTitle")}
            </h3>
            <div className="im-case-study__stats">
              {Array.isArray(caseStats) && caseStats.map((stat, i) => (
                <div key={i}>
                  <span
                    className="im-case-study__stat-value"
                    {...(i === 0 ? { "data-target": "3", "data-suffix": "x" } : {})}
                    {...(i === 1 ? { "data-target": "90", "data-suffix": "%" } : {})}
                  >
                    {stat.value}
                  </span>
                  <span className="im-case-study__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {Array.isArray(caseTags) && caseTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{
                    background: "color-mix(in srgb, var(--secondary) 12%, transparent)",
                    color: "var(--secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <blockquote className="im-case-study__quote">
              {t("serviceSections.influencerMarketing.caseStudy.quote")}
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Why Tikit ────────────────────────────────────────── */}
      <section className="im-section" dir={isRtl ? "rtl" : "ltr"}>
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="im-section-label">
              {t("serviceSections.influencerMarketing.whyUs.sectionLabel")}
            </span>
            <h2 className="im-section-title">
              {t("serviceSections.influencerMarketing.whyUs.title")}
            </h2>
          </div>
          <div ref={whyRef} className="im-whyus-grid">
            {Array.isArray(whyUsItems) && whyUsItems.map((w, i) => (
              <div key={i} className="im-whyus-card">
                <div className="im-whyus-card__icon">{whyUsIcons[i]}</div>
                <h3 className="im-whyus-card__title">{w.title}</h3>
                <p className="im-whyus-card__text">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sub-Services ─────────────────────────────────────── */}
      <section className="im-section--alt" dir={isRtl ? "rtl" : "ltr"}>
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="im-section-label">
              {t("serviceSections.influencerMarketing.subServices.sectionLabel")}
            </span>
            <h2 className="im-section-title">
              {t("serviceSections.influencerMarketing.subServices.title")}
            </h2>
            <p className="im-section-desc">
              {t("serviceSections.influencerMarketing.subServices.description")}
            </p>
          </div>
          <div ref={subServicesRef} className="im-subservices-grid">
            {Array.isArray(subServices) && subServices.map((s, i) => (
              <Link key={subServiceHrefs[i]} to={subServiceHrefs[i]} className="im-subservice-card">
                <div className="im-subservice-card__icon">{subServiceIcons[i]}</div>
                <h3 className="im-subservice-card__title">{s.title}</h3>
                <p className="im-subservice-card__desc">{s.desc}</p>
                <span className="im-subservice-card__cta">
                  {t("serviceSections.influencerMarketing.subServices.learnMore")} <FiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FAQ
        items={faqItems}
        title={t("serviceSections.influencerMarketing.faq.title")}
      />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section ref={ctaRef} className="im-cta" dir={isRtl ? "rtl" : "ltr"}>
        <div className="im-cta__inner">
          <p className="im-reveal im-section-label text-center mb-4 block">
            {t("serviceSections.influencerMarketing.cta.sectionLabel")}
          </p>
          <h2 className="im-reveal im-cta__title">
            {t("serviceSections.influencerMarketing.cta.title")}
          </h2>
          <p className="im-reveal im-cta__desc">
            {t("serviceSections.influencerMarketing.cta.description")}
          </p>
          <div className="im-reveal im-cta__buttons">
            <a href="/contact" className="im-btn-primary">
              <FiArrowRight />
              {t("serviceSections.influencerMarketing.cta.primaryButton")}
            </a>
            <a href="tel:+97145774042" className="im-btn-secondary">
              <FiPhone />
              {t("serviceSections.influencerMarketing.cta.secondaryButton")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfluencerMarketing;