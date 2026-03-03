import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FiTarget,
  FiTrendingUp,
  FiBarChart2,
  FiGlobe,
  FiSearch,
  FiLayers,
  FiZap,
  FiCheckCircle,
  FiMessageSquare,
  FiShield,
  FiDollarSign,
  FiUsers,
  FiArrowRight,
  FiPhone,
} from "react-icons/fi";

import influencerHero from "../../../assets/services/Influencer-Marketing.webp";
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";

import "./influencersMarketing.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────── */
const problems = [
  {
    icon: <FiTarget />,
    title: "No Clear Strategy That Makes Money",
    text: "Many agencies post, run ads, and hope for engagement. That's gambling with your budget. Traffic may increase while revenue stays flat.",
  },
  {
    icon: <FiDollarSign />,
    title: "Wasted Budget on Ads That Don't Convert",
    text: "Poorly targeted PPC, social ads, or Google campaigns disappear fast. You can get 10,000 clicks in a month and zero sales.",
  },
  {
    icon: <FiBarChart2 />,
    title: "Poor Tracking & Reporting",
    text: "Some agencies give reports full of jargon you can't act on. We provide real-time dashboards and transparent reporting so you always know what works.",
  },
  {
    icon: <FiGlobe />,
    title: "Lack of UAE Market Knowledge",
    text: "Dubai is not like other markets. Language, culture, and spending habits matter. Generic campaigns fail — only local expertise drives results.",
  },
];

const steps = [
  {
    n: "01",
    title: "Deep Business & Market Analysis",
    text: "We study your business, competitors, and the UAE market to find opportunities, threats, and hidden growth potential.",
  },
  {
    n: "02",
    title: "Custom Strategy Development",
    text: "No templates. No cookie-cutter solutions. Every campaign is built for your goals, audience, and revenue targets.",
  },
  {
    n: "03",
    title: "Multi-Channel Campaign Execution",
    text: "SEO, PPC, social media, and website optimisation — each channel supporting the others to maximise ROI.",
  },
  {
    n: "04",
    title: "Data-Driven Optimisation & Scaling",
    text: "We track every click, lead, and conversion. We test, tweak, and scale campaigns that actually work.",
  },
];

const benefits = [
  {
    icon: <FiTrendingUp />,
    title: "ROI-Focused Campaigns Across All Digital Channels",
    text: "Every campaign is designed to make more money than you spend. No wasted clicks. No guesswork. Only profit-driven marketing.",
  },
  {
    icon: <FiBarChart2 />,
    title: "Transparent Reporting & Performance Dashboards",
    text: "Track your campaigns in real-time. See exactly what works. Know your ROI down to the last dirham.",
  },
  {
    icon: <FiZap />,
    title: "Faster Execution Without Compromising Quality",
    text: "We move fast. Launch campaigns quickly. Beat competitors to the market — but never sacrifice quality.",
  },
  {
    icon: <FiGlobe />,
    title: "Expertise in Local & International Markets",
    text: "We know the local market, the culture, and the language nuances (English and Arabic) for Dubai-based and international brands.",
  },
];

const whyUs = [
  {
    icon: <FiLayers />,
    title: "No Generic Plans",
    text: "Every campaign is built specifically for your business, goals, and audience.",
  },
  {
    icon: <FiShield />,
    title: "Transparent Pricing",
    text: "No hidden fees. No surprise charges. Clear, upfront pricing so you can focus on growth.",
  },
  {
    icon: <FiSearch />,
    title: "Data-Driven Decisions",
    text: "Every move backed by real analytics and performance insights. No guessing.",
  },
  {
    icon: <FiMessageSquare />,
    title: "Direct Communication",
    text: "Talk directly to your dedicated account manager — no middlemen, no delays.",
  },
];

const faqItems = [
  {
    question: "How much does a digital marketing agency in Dubai cost?",
    answer:
      "Pricing depends on your goals. We provide clear, transparent plans tailored to your business with no hidden fees.",
  },
  {
    question: "How long before I see results?",
    answer:
      "Some campaigns deliver quick wins in weeks. SEO and branding grow steadily over months. We set realistic timelines based on your goals.",
  },
  {
    question: "Do you offer full-service advertising and digital marketing solutions?",
    answer:
      "Yes. SEO, PPC, social media, website optimisation, content marketing — we handle it all under one roof.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "No. We offer flexible packages based on results and growth goals. No lock-ins.",
  },
  {
    question: "Can you work with international brands entering the UAE market?",
    answer:
      "Absolutely. We specialise in localising campaigns for Dubai and UAE audiences, including multilingual English and Arabic campaigns.",
  },
];

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Digital Marketing Dubai", url: "/services/digital-marketing" },
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
  const heroRef = useRef(null);
  const problemsRef = useRef(null);
  const stepsRef = useRef(null);
  const benefitsRef = useRef(null);
  const caseRef = useRef(null);
  const whyRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );

      /* Section reveals */
      revealChildren(problemsRef, ".im-problem-card", {}, 0.12);
      revealChildren(stepsRef, ".im-step-card", {}, 0.1);
      revealChildren(benefitsRef, ".im-benefit-item", {}, 0.11);
      revealChildren(whyRef, ".im-whyus-card", {}, 0.1);

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
            scrollTrigger: {
              trigger: caseRef.current,
              start: "top 80%",
            },
          }
        );

        /* Stat counters */
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
              el.textContent = isMultiple
                ? `${Math.round(counter.val)}x`
                : `${Math.round(counter.val)}`;
            },
            scrollTrigger: {
              trigger: caseRef.current,
              start: "top 78%",
            },
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
        title="Leading Digital Marketing Agency in Dubai"
        description="A leading UAE-based advertising and digital marketing agency, delivering tailored solutions to drive measurable business growth, leads, and revenue."
        serviceType="Digital Marketing Agency Dubai"
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="im-hero" data-nav-color="black">
        <div className="im-hero__image-wrapper">
          <img src={influencerHero} alt="Digital Marketing Dubai" className="im-hero__image" />
          <div className="im-hero__overlay" />
        </div>
        <div ref={heroRef} className="im-hero__inner" style={{ opacity: 0 }}>
          <HeroWithBadge
            badge=" Dubai's Growth Engine"
            badgeVariant="pulse"
            title="Leading Digital Marketing Agency in"
            mainWord="Dubai"
            description="We don't just promise traffic. We deliver profit you can count, campaigns you can measure, and growth you can see — trusted by local and international brands across the UAE."
          />
        </div>
      </section>

      {/* ── Why Businesses Struggle ──────────────────────────── */}
      <section className="im-section">
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="im-section-label">The Problem</span>
            <h2 className="im-section-title">
              Why Do Most Businesses Struggle to Scale?
            </h2>
            <p className="im-section-desc">
              Dubai is competitive. The wrong agency can cost you tens of thousands with nothing to show.
            </p>
          </div>
          <div ref={problemsRef} className="im-problems-grid">
            {problems.map((p) => (
              <div key={p.title} className="im-problem-card">
                <div className="im-problem-card__icon">{p.icon}</div>
                <h3 className="im-problem-card__title">{p.title}</h3>
                <p className="im-problem-card__text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-Step Process ────────────────────────────────────── */}
      <section className="im-section--alt">
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="im-section-label">Our Process</span>
            <h2 className="im-section-title">How Tikit Actually Grows Businesses</h2>
            <p className="im-section-desc">
              A simple, proven 4-step system — every step focused on profit, efficiency, and measurable results.
            </p>
          </div>
          <div ref={stepsRef} className="im-steps">
            {steps.map((s) => (
              <div key={s.n} className="im-step-card">
                <div className="im-step-card__number">{s.n}</div>
                <h3 className="im-step-card__title">{s.title}</h3>
                <p className="im-step-card__text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section className="im-section">
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="im-section-label">What You Get</span>
            <h2 className="im-section-title">Results You Can Measure and Trust</h2>
            <p className="im-section-desc">
              We don't just run campaigns. We deliver outcomes backed by real data.
            </p>
          </div>
          <div ref={benefitsRef} className="im-benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="im-benefit-item">
                <div className="im-benefit-item__icon">{b.icon}</div>
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
      <section className="im-section--alt">
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="im-section-label">Real Results</span>
            <h2 className="im-section-title">Brands That Chose the Best Agency in Dubai</h2>
          </div>
          <div ref={caseRef} className="im-case-study">
            <div className="im-case-study__glow" />
            <span className="im-case-study__tag">Mini Case Study · E-Commerce Brand</span>
            <h3 className="im-case-study__title">
              High Ad Spend, Zero Conversions — Transformed in 90 Days
            </h3>
            <div className="im-case-study__stats">
              <div>
                <span
                  className="im-case-study__stat-value"
                  data-target="3"
                  data-suffix="x"
                >
                  3x
                </span>
                <span className="im-case-study__stat-label">Sales Growth</span>
              </div>
              <div>
                <span
                  className="im-case-study__stat-value"
                  data-target="90"
                  data-suffix="%"
                >
                  90
                </span>
                <span className="im-case-study__stat-label">Days to Results</span>
              </div>
              <div>
                <span className="im-case-study__stat-value">Month 1</span>
                <span className="im-case-study__stat-label">ROI Positive</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {["SEO", "PPC", "Social Media", "Landing Page Optimisation", "Localised Messaging"].map((tag) => (
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
              "Finally, an agency that delivers measurable ROI. No fluff, just growth." — Retail Brand, Dubai
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Why Tikit ────────────────────────────────────────── */}
      <section className="im-section">
        <div className="im-container">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="im-section-label">Why Tikit</span>
            <h2 className="im-section-title">What Makes Us the Best Digital Marketing Agency in Dubai</h2>
          </div>
          <div ref={whyRef} className="im-whyus-grid">
            {whyUs.map((w) => (
              <div key={w.title} className="im-whyus-card">
                <div className="im-whyus-card__icon">{w.icon}</div>
                <h3 className="im-whyus-card__title">{w.title}</h3>
                <p className="im-whyus-card__text">{w.text}</p>
              </div>
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
      <section ref={ctaRef} className="im-cta">
        <div className="im-cta__inner">
          <p className="im-reveal im-section-label text-center mb-4 block">Ready to Grow?</p>
          <h2 className="im-reveal im-cta__title">
            Ready to Work with a Leading Digital Marketing Agency in Dubai?
          </h2>
          <p className="im-reveal im-cta__desc">
            Book a free strategy consultation. Get a roadmap to scale in Dubai and UAE — and stop wasting a single dirham.
          </p>
          <div className="im-reveal im-cta__buttons">
            <a href="/contact-us" className="im-btn-primary">
              <FiArrowRight />
              Book Free Consultation
            </a>
            <a href="https://wa.me/971568881133"
                  target="_blank"
                  rel="noreferrer noopener"
                 
                  aria-label="Contact us on WhatsApp at 056 888 1133" className="im-btn-secondary">
              <FiPhone />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfluencerMarketing;