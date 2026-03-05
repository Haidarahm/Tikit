import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiAlertCircle,
  FiLayout,
  FiCompass,
  FiEdit3,
  FiShield,
  FiGlobe,
  FiLink,
  FiArrowRight,
  FiPhone,
  FiBookOpen,
  FiRefreshCw,
  FiMap,
} from "react-icons/fi";

import brandingHero from "../../../assets/services/Branding.webp";
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";

import "./Branding.css";

gsap.registerPlugin(ScrollTrigger);

const problemIcons = [<FiAlertCircle key="1" />, <FiLayout key="2" />, <FiCompass key="3" />];
const benefitIcons = [<FiCompass key="1" />, <FiGlobe key="2" />, <FiShield key="3" />, <FiLink key="4" />];
const subServiceIcons = [<FiBookOpen key="1" />, <FiEdit3 key="2" />, <FiRefreshCw key="3" />, <FiMap key="4" />];

/* ─── Helper: staggered scroll reveal ──────────────────────── */
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
const TK = "serviceSections.branding.page";
const Branding = () => {
  const { t } = useTranslation();
  const heroRef       = useRef(null);
  const problemsRef   = useRef(null);
  const processRef    = useRef(null);
  const statsRef      = useRef(null);
  const benefitsRef   = useRef(null);
  const caseRef       = useRef(null);
  const subServicesRef = useRef(null);
  const ctaRef        = useRef(null);

  const breadcrumbsRaw = t(`${TK}.breadcrumbs`, { returnObjects: true });
  const breadcrumbs = Array.isArray(breadcrumbsRaw) ? breadcrumbsRaw : [];
  const problemsData = t(`${TK}.problems.items`, { returnObjects: true });
  const problems = Array.isArray(problemsData) ? problemsData.map((p, i) => ({ ...p, icon: problemIcons[i] })) : [];
  const processSteps = t(`${TK}.process.steps`, { returnObjects: true });
  const stats = t(`${TK}.stats.items`, { returnObjects: true });
  const benefitsData = t(`${TK}.benefits.items`, { returnObjects: true });
  const benefits = Array.isArray(benefitsData) ? benefitsData.map((b, i) => ({ ...b, icon: benefitIcons[i] })) : [];
  const subServicesData = t(`${TK}.subServices.items`, { returnObjects: true });
  const subServices = Array.isArray(subServicesData) ? subServicesData.map((s, i) => ({ ...s, icon: subServiceIcons[i] })) : [];
  const faqItems = t(`${TK}.faqItems`, { returnObjects: true });

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );

      /* Staggered section reveals */
      revealChildren(problemsRef,    ".br-problem-card",    {}, 0.12);
      revealChildren(processRef,     ".br-step-card",       {}, 0.1);
      revealChildren(statsRef,       ".br-stat-card",       {}, 0.12);
      revealChildren(benefitsRef,    ".br-benefit-item",    {}, 0.11);
      revealChildren(subServicesRef, ".br-subservice-card", {}, 0.08);

      /* Case study slide in from left */
      if (caseRef.current) {
        gsap.fromTo(
          caseRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: caseRef.current,
              start: "top 80%",
            },
          }
        );

        /* Animated stat counters inside case study */
        const statEls = caseRef.current.querySelectorAll(".br-case-study__stat-value[data-target]");
        statEls.forEach((el) => {
          const target   = parseFloat(el.dataset.target);
          const suffix   = el.dataset.suffix || "";
          const counter  = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(counter.val)}${suffix}`;
            },
            scrollTrigger: {
              trigger: caseRef.current,
              start: "top 78%",
            },
          });
        });
      }

      /* CTA sequential fade */
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll(".br-reveal"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEOHead
        title={t(`${TK}.seoTitle`)}
        description={t(`${TK}.seoDescription`)}
        serviceType="Branding Agency Dubai"
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section data-nav-color="black" className="br-hero">
        <div className="br-hero__image-wrapper">
          <img src={brandingHero} alt="Branding Agency Dubai" className="br-hero__image" />
          <div className="br-hero__overlay" />
        </div>
        <div ref={heroRef} className="br-hero__inner" style={{ opacity: 0 }}>
          <HeroWithBadge
            badge={t(`${TK}.hero.badge`)}
            badgeVariant="pulse"
            title={t(`${TK}.hero.title`)}
            mainWord={t(`${TK}.hero.mainWord`)}
            description={t(`${TK}.hero.description`)}
          />
        </div>
      </section>

      {/* ── Why Brands Fail ──────────────────────────────────── */}
      <section className="br-section">
        <div className="br-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="br-label">{t(`${TK}.problems.label`)}</span>
            <h2 className="br-title">{t(`${TK}.problems.title`)}</h2>
            <p className="br-desc">
              {t(`${TK}.problems.desc`)}
            </p>
          </div>
          <div ref={problemsRef} className="br-problems-grid">
            {(Array.isArray(problems) ? problems : []).map((p, idx) => (
              <div key={idx} className="br-problem-card">
                <div className="br-problem-card__icon">{p.icon}</div>
                <h3 className="br-problem-card__title">{p.title}</h3>
                <p className="br-problem-card__text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-Stage Process ──────────────────────────────────── */}
      <section className="br-section--alt">
        <div className="br-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="br-label">{t(`${TK}.process.label`)}</span>
            <h2 className="br-title">{t(`${TK}.process.title`)}</h2>
            <p className="br-desc">
              {t(`${TK}.process.desc`)}
            </p>
          </div>
          <div ref={processRef} className="br-process-grid">
            {(Array.isArray(processSteps) ? processSteps : []).map((s) => (
              <div key={s.n} className="br-step-card">
                <div className="br-step-card__number">{s.n}</div>
                <span className="br-step-card__badge">{s.badge}</span>
                <h3 className="br-step-card__title">{s.title}</h3>
                <p className="br-step-card__text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio Stats ───────────────────────────────────── */}
      <section className="br-section">
        <div className="br-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="br-label">{t(`${TK}.stats.label`)}</span>
            <h2 className="br-title">{t(`${TK}.stats.title`)}</h2>
            <p className="br-desc">
              {t(`${TK}.stats.desc`)}
            </p>
          </div>
          <div ref={statsRef} className="br-stats-banner">
            {(Array.isArray(stats) ? stats : []).map((s) => (
              <div key={s.value} className="br-stat-card">
                <span className="br-stat-card__value">{s.value}</span>
                <span className="br-stat-card__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Study ───────────────────────────────────────── */}
      <section className="br-section--alt">
        <div className="br-container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="br-label">{t(`${TK}.caseStudy.label`)}</span>
            <h2 className="br-title">{t(`${TK}.caseStudy.title`)}</h2>
          </div>
          <div ref={caseRef} className="br-case-study">
            <div className="br-case-study__glow" />
            <div className="br-case-study__glow--left" />
            <span className="br-case-study__tag">{t(`${TK}.caseStudy.tag`)}</span>
            <h3 className="br-case-study__title">
              {t(`${TK}.caseStudy.caseTitle`)}
            </h3>
            <div className="br-case-study__stats">
              <div>
                <span
                  className="br-case-study__stat-value"
                  data-target="40"
                  data-suffix="%"
                >
                  40%
                </span>
                <span className="br-case-study__stat-label">{t(`${TK}.caseStudy.stat1Label`)}</span>
              </div>
              <div>
                <span className="br-case-study__stat-value">Award</span>
                <span className="br-case-study__stat-label">{t(`${TK}.caseStudy.stat2Label`)}</span>
              </div>
              <div>
                <span className="br-case-study__stat-value">25+</span>
                <span className="br-case-study__stat-label">{t(`${TK}.caseStudy.stat3Label`)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {(t(`${TK}.caseStudy.pills`, { returnObjects: true }) || []).map((tag) => (
                <span key={tag} className="br-case-study__pill">{tag}</span>
              ))}
            </div>
            <blockquote className="br-case-study__quote">
              {t(`${TK}.caseStudy.quote`)}
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── What You Get ─────────────────────────────────────── */}
      <section className="br-section">
        <div className="br-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="br-label">{t(`${TK}.benefits.label`)}</span>
            <h2 className="br-title">{t(`${TK}.benefits.title`)}</h2>
            <p className="br-desc">
              {t(`${TK}.benefits.desc`)}
            </p>
          </div>
          <div ref={benefitsRef} className="br-benefits-grid">
            {(Array.isArray(benefits) ? benefits : []).map((b, idx) => (
              <div key={idx} className="br-benefit-item">
                <div className="br-benefit-item__icon">{b.icon}</div>
                <div>
                  <h3 className="br-benefit-item__title">{b.title}</h3>
                  <p className="br-benefit-item__text">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sub-Services ─────────────────────────────────────── */}
      <section className="br-section--alt">
        <div className="br-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="br-label">{t(`${TK}.subServices.label`)}</span>
            <h2 className="br-title">{t(`${TK}.subServices.title`)}</h2>
            <p className="br-desc">
              {t(`${TK}.subServices.desc`)}
            </p>
          </div>
          <div ref={subServicesRef} className="br-subservices-grid">
            {(Array.isArray(subServices) ? subServices : []).map((s) => (
              <Link key={s.href} to={s.href} className="br-subservice-card">
                <div className="br-subservice-card__icon">{s.icon}</div>
                <h3 className="br-subservice-card__title">{s.title}</h3>
                <p className="br-subservice-card__desc">{s.desc}</p>
                <span className="br-subservice-card__cta">
                  {t(`${TK}.subServices.learnMore`)} <FiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FAQ
        items={Array.isArray(faqItems) ? faqItems : []}
        title={t(`${TK}.faqTitle`)}
      />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section ref={ctaRef} className="br-cta">
        <div className="br-cta__inner">
          <p className="br-reveal br-label text-center mb-4 block">{t(`${TK}.cta.label`)}</p>
          <h2 className="br-reveal br-cta__title">
            {t(`${TK}.cta.title`)}
          </h2>
          <p className="br-reveal br-cta__desc">
            {t(`${TK}.cta.desc`)}
          </p>
          <div className="br-reveal br-cta__buttons">
            <a href="/contact" className="br-btn-primary">
              <FiArrowRight />
              {t(`${TK}.cta.primaryBtn`)}
            </a>
            <a href="tel:+97145774042" className="br-btn-secondary">
              <FiPhone />
              {t(`${TK}.cta.secondaryBtn`)}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Branding;