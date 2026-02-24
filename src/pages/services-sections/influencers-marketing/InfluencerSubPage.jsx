import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import TikitTitle from "../../../components/TikitTitle";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import { HiCheckCircle, HiArrowRight } from "react-icons/hi";
import "./influencersMarketing.css";

gsap.registerPlugin(ScrollTrigger);

const InfluencerSubPage = ({ pageData }) => {
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const processRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const linksRef = useRef(null);

  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  useEffect(() => {
    let ctx;
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        const animateSection = (ref, selector, config = {}) => {
          if (!ref.current) return;
          const elements = ref.current.querySelectorAll(selector);
          if (elements.length === 0) return;
          gsap.fromTo(
            elements,
            { opacity: 0, y: config.y || 40 },
            {
              opacity: 1,
              y: 0,
              duration: config.duration || 0.8,
              stagger: config.stagger || 0.15,
              ease: config.ease || "power3.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        };

        animateSection(heroRef, ".hero-animate", { y: 60, duration: 1, stagger: 0.2 });
        animateSection(featuresRef, ".im-card", { y: 50 });
        animateSection(processRef, ".im-process-card", { y: 50, stagger: 0.2 });
        animateSection(statsRef, ".im-stat-card", { y: 30 });
        animateSection(linksRef, ".im-link-card", { y: 30, stagger: 0.1 });

        if (imageRef.current) {
          const images = imageRef.current.querySelectorAll(".im-image-wrap");
          if (images.length > 0) {
            gsap.fromTo(
              images,
              { opacity: 0, scale: 0.95 },
              {
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: imageRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      data-nav-color="black"
      className={`im-page ${isRtl ? "font-cairo" : "font-hero-light"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title={pageData.seo.title}
        description={pageData.seo.description}
        keywords={pageData.seo.keywords}
        canonicalUrl={pageData.seo.canonicalUrl}
        serviceType={pageData.seo.serviceType}
        structuredData={pageData.seo.structuredData}
        faqItems={pageData.faq?.items}
        breadcrumbs={pageData.seo.breadcrumbs}
      />

      {/* Hero */}
      <section ref={heroRef} className="im-hero">
        {pageData.heroImage && (
          <div className="im-hero-overlay">
            <img
              src={pageData.heroImage}
              alt={pageData.hero.title}
              width={1920}
              height={1080}
              className="im-hero-image"
              loading="lazy"
            />
            <div className="im-hero-gradient" />
          </div>
        )}
        {!pageData.heroImage && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#52C3C5]/30 via-transparent to-[#1C6F6C]/30" />
          </div>
        )}
        <div className="im-hero-content">
          <span className="hero-animate im-badge">{pageData.badge}</span>
          <TikitTitle
            className="hero-animate block"
            title={pageData.hero.title}
            mainWord={pageData.hero.mainWord}
            disableAnimation
          />
          <p className="hero-animate im-hero-desc">{pageData.hero.description}</p>
        </div>
      </section>

      <div className="im-divider-wrap"><div className="im-divider" /></div>

      {/* Definition */}
      {pageData.definition && (
        <>
          <section className="im-section">
            <div className="max-w-4xl mx-auto">
              <h2 className={`im-heading ${fontClass}`}>{pageData.definition.title}</h2>
              <p className="im-text">{pageData.definition.paragraph}</p>

              {pageData.definition.benefits && (
                <div className="mb-8">
                  <h3 className={`text-xl font-bold mb-4 ${fontClass}`} style={{ color: "var(--foreground)" }}>
                    {pageData.definition.benefitsTitle}
                  </h3>
                  <ul className="space-y-3">
                    {pageData.definition.benefits.map((item, idx) => (
                      <li key={idx} className="im-check-item">
                        <HiCheckCircle className="im-check-icon" />
                        <span className="im-text-sm" style={{ fontSize: "1rem" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pageData.definition.processSteps && (
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${fontClass}`} style={{ color: "var(--foreground)" }}>
                    {pageData.definition.processTitle}
                  </h3>
                  <ol className="space-y-3">
                    {pageData.definition.processSteps.map((step, idx) => (
                      <li key={idx} className="im-number-item">
                        <span className="im-number-badge">{idx + 1}</span>
                        <span className="im-text-sm" style={{ fontSize: "1rem" }}>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </section>
          <div className="im-divider-wrap"><div className="im-divider" /></div>
        </>
      )}

      {/* Image + Content Section */}
      {pageData.imageSection && (
        <>
          <section ref={imageRef} className="im-section">
            <div className="im-container">
              <div className="im-two-col">
                <div className="im-image-wrap aspect-[4/3]">
                  <img
                    src={pageData.imageSection.image}
                    alt={pageData.imageSection.imageAlt}
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2 className={`im-heading ${fontClass}`}>{pageData.imageSection.title}</h2>
                  <p className="im-text">{pageData.imageSection.description}</p>
                  {pageData.imageSection.highlights && (
                    <ul className="space-y-3">
                      {pageData.imageSection.highlights.map((item, idx) => (
                        <li key={idx} className="im-check-item">
                          <HiCheckCircle className="im-check-icon" />
                          <span style={{ color: "color-mix(in srgb, var(--foreground) 80%, transparent)" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
          <div className="im-divider-wrap"><div className="im-divider" /></div>
        </>
      )}

      {/* Stats */}
      {pageData.stats && (
        <>
          <section ref={statsRef} className="im-section">
            <div className="im-container-wide">
              <div className={`grid gap-6 md:gap-8 ${
                pageData.stats.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"
              }`}>
                {pageData.stats.map((stat, idx) => (
                  <div key={idx} className="im-stat-card">
                    <h3 className="im-stat-value">{stat.value}</h3>
                    <p className="im-stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="im-divider-wrap"><div className="im-divider" /></div>
        </>
      )}

      {/* Features */}
      {pageData.features && (
        <>
          <section ref={featuresRef} className="im-section">
            <div className="im-container-wide">
              <h2 className={`im-section-title ${fontClass}`}>{pageData.features.title}</h2>
              <p className="im-section-subtitle">{pageData.features.subtitle}</p>
              <div className="im-feature-grid">
                {pageData.features.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="im-card">
                      <div className="im-card-icon">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="im-card-title">{item.title}</h3>
                      <p className="im-card-desc">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <div className="im-divider-wrap"><div className="im-divider" /></div>
        </>
      )}

      {/* Process */}
      {pageData.process && (
        <>
          <section ref={processRef} className="im-section">
            <div className="im-container">
              <h2 className={`im-section-title ${fontClass}`}>{pageData.process.title}</h2>
              <p className="im-section-subtitle">{pageData.process.subtitle}</p>
              <div className="space-y-8">
                {pageData.process.steps.map((step, idx) => (
                  <div key={idx} className="im-process-card">
                    <div className="im-step-number">{idx + 1}</div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="im-step-title">{step.title}</h3>
                      <p className="im-step-desc">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="im-divider-wrap"><div className="im-divider" /></div>
        </>
      )}

      {/* Trust Signals */}
      {pageData.trust && (
        <>
          <section className="im-section-alt">
            <div className="im-container">
              <h2 className={`im-section-title ${fontClass}`}>{pageData.trust.title}</h2>
              <p className="im-section-subtitle">{pageData.trust.subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pageData.trust.cards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div key={idx} className="im-trust-card">
                      <div className="im-trust-icon"><Icon /></div>
                      <h3 className="im-trust-title">{card.title}</h3>
                      <p className="im-trust-desc">{card.description}</p>
                    </div>
                  );
                })}
              </div>
              {pageData.trust.paragraph && (
                <div className="mt-12 text-center">
                  <p style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }} className="max-w-3xl mx-auto">
                    {pageData.trust.paragraph}
                  </p>
                </div>
              )}
            </div>
          </section>
          <div className="im-divider-wrap"><div className="im-divider" /></div>
        </>
      )}

      {/* Related Pages */}
      {pageData.relatedPages && (
        <>
          <section ref={linksRef} className="im-section">
            <div className="im-container-wide">
              <h2 className={`im-section-title ${fontClass}`}>Explore More Services</h2>
              <p className="im-section-subtitle">Discover our full range of influencer marketing solutions</p>
              <div className="im-link-grid">
                {pageData.relatedPages.map((page, idx) => {
                  const Icon = page.icon;
                  return (
                    <Link key={idx} to={page.path} className="im-link-card">
                      <div className="im-link-card-icon"><Icon /></div>
                      <h3 className="im-link-card-title">{page.title}</h3>
                      <p className="im-link-card-desc">{page.description}</p>
                      <span className="im-link-card-arrow">
                        Learn More <HiArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
          <div className="im-divider-wrap"><div className="im-divider" /></div>
        </>
      )}

      {/* FAQ */}
      {pageData.faq && (
        <FAQ items={pageData.faq.items} title={pageData.faq.title} />
      )}

      {/* CTA */}
      <section className="im-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${fontClass}`} style={{ color: "var(--foreground)" }}>
            {pageData.cta.title}
          </h2>
          <p className="text-lg mb-8" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
            {pageData.cta.description}
          </p>
          <a href="/contact-us" className="im-cta-btn">{pageData.cta.button}</a>
        </div>
      </section>
    </div>
  );
};

export default InfluencerSubPage;
