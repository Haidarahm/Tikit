import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

/* ─── Data ──────────────────────────────────────────────────── */
const problems = [
  {
    icon: <FiAlertCircle />,
    title: "You Look Like Everyone Else",
    text: "The UAE market adds thousands of new businesses every year. Most use the same stock fonts, safe colours, and generic messaging. If your brand could belong to any competitor, it belongs to none of them.",
  },
  {
    icon: <FiLayout />,
    title: "Your Brand Doesn't Hold Together",
    text: "A brand identity is a system, not a single asset. When your website looks different from your Instagram — and your Arabic materials feel like a translation job — customers notice even if they can't articulate why.",
  },
  {
    icon: <FiCompass />,
    title: "There's No Strategy Underneath",
    text: "Design without strategy is decoration. Without a clear positioning, defined audience, and compelling brand story, your visual identity has no foundation — it looks fine, says nothing, and converts poorly.",
  },
];

const processSteps = [
  {
    n: "01",
    badge: "Discover",
    title: "Know Your Ground Before You Build",
    text: "Business audit, market research, and competitor mapping. We find the space your brand can step into and genuinely own.",
  },
  {
    n: "02",
    badge: "Define",
    title: "Set the Strategy That Shapes Everything",
    text: "Brand purpose, values, tone of voice, and positioning — building a messaging framework in English and Arabic your whole team can rally around.",
  },
  {
    n: "03",
    badge: "Design",
    title: "Build an Identity Worth Carrying",
    text: "A complete visual identity: distinctive logo, colour palette, bilingual typography, iconography, and a comprehensive brand guidelines document.",
  },
  {
    n: "04",
    badge: "Deploy",
    title: "Get It Out Into the World, Properly",
    text: "Full rollout across website, social media, sales collateral, and signage — so your brand arrives in market as a coherent, confident whole.",
  },
];

const stats = [
  { value: "15+", label: "Years of branding experience across the UAE and GCC" },
  { value: "300+", label: "Brand identities delivered across retail, F&B, real estate, and more" },
  { value: "25+", label: "Industry awards for brand strategy and identity design" },
];

const benefits = [
  {
    icon: <FiCompass />,
    title: "Strategy Is Never Optional",
    text: "Every brand engagement starts with strategy. The most beautifully designed brand on a shaky foundation will always underperform. Our clients get brands that hold up under scrutiny, over time, and at scale.",
  },
  {
    icon: <FiGlobe />,
    title: "Built for Both Languages From Day One",
    text: "We are one of very few branding agencies in Dubai that treats Arabic and English as equal creative considerations from the very first brief — not a translation, not an adaptation.",
  },
  {
    icon: <FiShield />,
    title: "One Team, Full Accountability",
    text: "Strategy, design, and copywriting handled in-house. No freelancer network, no briefing chain. One point of contact who owns the outcome from kickoff to launch.",
  },
  {
    icon: <FiLink />,
    title: "Connected to Your Full Marketing Ecosystem",
    text: "As a full-service agency, Tikit connects your brand directly to social media, influencer, content, and digital marketing execution. Your brand is the foundation every other channel builds on.",
  },
];

const subServices = [
  {
    icon: <FiBookOpen />,
    title: "Brand Strategy",
    desc: "Purpose, positioning, audience definition, and messaging framework — the foundation every great brand is built on.",
    href: "/services/branding-agency-dubai/brand-strategy",
  },
  {
    icon: <FiEdit3 />,
    title: "Brand Identity Design",
    desc: "Logo, colour palette, typography, iconography, and a complete bilingual brand guidelines document.",
    href: "/services/branding-agency-dubai/brand-identity-design",
  },
  {
    icon: <FiRefreshCw />,
    title: "Rebranding Services",
    desc: "Evolve your brand without losing what you've already earned. We protect equity while resolving what's holding you back.",
    href: "/services/branding-agency-dubai/rebranding-services",
  },
  {
    icon: <FiMap />,
    title: "Brand Positioning",
    desc: "Define where your brand stands in the market, why customers should choose you, and how to own that space consistently.",
    href: "/services/branding-agency-dubai/brand-positioning",
  },
];

const faqItems = [
  {
    question: "What's the difference between a brand identity and a brand strategy?",
    answer:
      "Brand strategy defines what your brand means — your purpose, positioning, audience, and story. Brand identity makes it visible — your logo, colours, typography, and design system. One informs the other. Skipping strategy and going straight to design is the single most common and costly mistake businesses make.",
  },
  {
    question: "How long does a full branding project take?",
    answer:
      "A complete brand strategy and identity project typically runs four to eight weeks. Faster timelines are possible for focused scopes; larger multi-market or enterprise projects may take longer. We agree on a timeline before we begin and hold to it.",
  },
  {
    question: "Can you rebrand us without destroying what we've already built?",
    answer:
      "Yes — and protecting equity is always the first step in a rebrand. We audit what recognition, trust, and associations your current brand has earned, and build the evolution around preserving those assets while resolving what's holding you back.",
  },
  {
    question: "Do you work with international companies entering the UAE market?",
    answer:
      "Frequently. Localising a global brand for the UAE and GCC market is a specialism of ours — whether adapting an existing identity for Arabic markets or building a separate regional brand architecture entirely.",
  },
  {
    question: "What does a branding project cost?",
    answer:
      "Every project is scoped individually based on deliverables, timeline, and complexity. We provide clear, itemised proposals with no hidden fees. Book a consultation and we'll give you an accurate picture within 48 hours.",
  },
];

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Branding Agency Dubai", url: "/services/branding-agency-dubai" },
];

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
const Branding = () => {
  const heroRef       = useRef(null);
  const problemsRef   = useRef(null);
  const processRef    = useRef(null);
  const statsRef      = useRef(null);
  const benefitsRef   = useRef(null);
  const caseRef       = useRef(null);
  const subServicesRef = useRef(null);
  const ctaRef        = useRef(null);

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
        title="Branding Agency in Dubai | Brand Strategy & Identity Design"
        description="Tikit is a full-service branding agency in Dubai that builds brands from the inside out — starting with strategy, ending with a bilingual identity system that works across every market and channel."
        serviceType="Branding Agency Dubai"
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="br-hero">
        <div className="br-hero__image-wrapper">
          <img src={brandingHero} alt="Branding Agency Dubai" className="br-hero__image" />
          <div className="br-hero__overlay" />
        </div>
        <div ref={heroRef} className="br-hero__inner" style={{ opacity: 0 }}>
          <HeroWithBadge
            badge="✦ Dubai's Brand Builders"
            badgeVariant="pulse"
            title="Branding Agency in"
            mainWord="Dubai"
            description="We don't just design logos. We build brands that earn attention, trust, and loyalty — trusted by local and international businesses across the UAE and GCC."
          />
        </div>
      </section>

      {/* ── Why Brands Fail ──────────────────────────────────── */}
      <section className="br-section">
        <div className="br-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="br-label">The Real Problem</span>
            <h2 className="br-title">The Real Reason Your Brand Isn't Doing Enough</h2>
            <p className="br-desc">
              Most businesses in Dubai treat branding as a to-do item. Get a logo, pick some colours, move on. Here's why that always backfires.
            </p>
          </div>
          <div ref={problemsRef} className="br-problems-grid">
            {problems.map((p) => (
              <div key={p.title} className="br-problem-card">
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
            <span className="br-label">Our Approach</span>
            <h2 className="br-title">From Blank Canvas to Bold Brand</h2>
            <p className="br-desc">
              A proven four-stage process built for the realities of the UAE and GCC market. Every decision grounded in research. Every output built to last.
            </p>
          </div>
          <div ref={processRef} className="br-process-grid">
            {processSteps.map((s) => (
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
            <span className="br-label">Our Track Record</span>
            <h2 className="br-title">Brands That Made the Move</h2>
            <p className="br-desc">
              Delivered across retail, hospitality, real estate, F&B, healthcare, and professional services in the UAE and Saudi Arabia.
            </p>
          </div>
          <div ref={statsRef} className="br-stats-banner">
            {stats.map((s) => (
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
            <span className="br-label">Featured Project</span>
            <h2 className="br-title">Award-Winning Identity That Scaled a Market Leader</h2>
          </div>
          <div ref={caseRef} className="br-case-study">
            <div className="br-case-study__glow" />
            <div className="br-case-study__glow--left" />
            <span className="br-case-study__tag">Case Study · Niche Startup → Market Leader</span>
            <h3 className="br-case-study__title">
              Strategic Heritage + Modern Visual Storytelling — Built to Scale
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
                <span className="br-case-study__stat-label">Increase in Brand Equity</span>
              </div>
              <div>
                <span className="br-case-study__stat-value">Award</span>
                <span className="br-case-study__stat-label">Winning Identity System</span>
              </div>
              <div>
                <span className="br-case-study__stat-value">25+</span>
                <span className="br-case-study__stat-label">Industry Awards</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {["Brand Strategy", "Visual Identity", "Bilingual Design", "Brand Guidelines", "Market Rollout"].map((tag) => (
                <span key={tag} className="br-case-study__pill">{tag}</span>
              ))}
            </div>
            <blockquote className="br-case-study__quote">
              "Tikit didn't just give us a logo — they gave us a brand that our entire team believes in and our customers recognise immediately." — UAE Retail Brand
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── What You Get ─────────────────────────────────────── */}
      <section className="br-section">
        <div className="br-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="br-label">What You Get</span>
            <h2 className="br-title">What You Get When You Work With Tikit</h2>
            <p className="br-desc">
              We don't accept briefs that skip strategy. Because the most beautifully designed brand on a shaky foundation will always underperform.
            </p>
          </div>
          <div ref={benefitsRef} className="br-benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="br-benefit-item">
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
            <span className="br-label">Explore Our Services</span>
            <h2 className="br-title">Every Branding Service You Need</h2>
            <p className="br-desc">
              From first brief to final rollout — explore our specialist branding services built for the UAE market.
            </p>
          </div>
          <div ref={subServicesRef} className="br-subservices-grid">
            {subServices.map((s) => (
              <Link key={s.href} to={s.href} className="br-subservice-card">
                <div className="br-subservice-card__icon">{s.icon}</div>
                <h3 className="br-subservice-card__title">{s.title}</h3>
                <p className="br-subservice-card__desc">{s.desc}</p>
                <span className="br-subservice-card__cta">
                  Learn more <FiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FAQ
        items={faqItems}
        title="Frequently Asked Questions"
      />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section ref={ctaRef} className="br-cta">
        <div className="br-cta__inner">
          <p className="br-reveal br-label text-center mb-4 block">Ready to Build?</p>
          <h2 className="br-reveal br-cta__title">
            Your Brand Should Be Working for You — Not Against You.
          </h2>
          <p className="br-reveal br-cta__desc">
            Let's find out exactly what it needs. No jargon. No obligation. Book your free brand consultation today.
          </p>
          <div className="br-reveal br-cta__buttons">
            <a href="/contact" className="br-btn-primary">
              <FiArrowRight />
              Book Free Brand Consultation
            </a>
            <a href="tel:+97145774042" className="br-btn-secondary">
              <FiPhone />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Branding;