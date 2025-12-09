import React, { useState, useRef, useEffect, useMemo, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const CaseStudy = ({ caseData, videos: videosFromProps }) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contentAreaRef = useRef(null);
  const asideRef = useRef(null);

  const caseStudySections = useMemo(
    () => [
      {
        id: "objective",
        number: "01",
        title: t("caseStudy.sections.objective.title"),
        description: t("caseStudy.sections.objective.description"),
      },
      {
        id: "brief",
        number: "02",
        title: t("caseStudy.sections.brief.title"),
        description: t("caseStudy.sections.brief.description"),
      },
      {
        id: "strategy",
        number: "03",
        title: t("caseStudy.sections.strategy.title"),
        description: t("caseStudy.sections.strategy.description"),
      },
      {
        id: "approach",
        number: "04",
        title: t("caseStudy.sections.approach.title"),
        description: t("caseStudy.sections.approach.description"),
      },
    ],
    [t]
  );

  const defaultSectionContent = useMemo(
    () => ({
      objective: {
        title: t("caseStudy.content.objective.title"),
        content: t("caseStudy.content.objective.body"),
      },
      brief: {
        title: t("caseStudy.content.brief.title"),
        content: t("caseStudy.content.brief.body"),
      },
      strategy: {
        title: t("caseStudy.content.strategy.title"),
        content: t("caseStudy.content.strategy.body"),
      },
      approach: {
        title: t("caseStudy.content.approach.title"),
        content: t("caseStudy.content.approach.body"),
        hasVideos: false,
        videos: [],
      },
    }),
    [t]
  );

  const sectionContent = useMemo(() => {
    if (!caseData) return defaultSectionContent;

    const { objective, brief, strategy, approach } = caseData;

    // Map API videos to the format used in the component
    const hasVideos = videosFromProps && videosFromProps.length > 0;
    const apiVideos = hasVideos
      ? videosFromProps.map((src, idx) => ({
          id: idx + 1,
          src,
          poster: "",
          title: `Video ${idx + 1}`,
        }))
      : [];

    return {
      objective: {
        ...defaultSectionContent.objective,
        content: objective || defaultSectionContent.objective.content,
      },
      brief: {
        ...defaultSectionContent.brief,
        content: brief || defaultSectionContent.brief.content,
      },
      strategy: {
        ...defaultSectionContent.strategy,
        content: strategy || defaultSectionContent.strategy.content,
      },
      approach: {
        ...defaultSectionContent.approach,
        content: approach || defaultSectionContent.approach.content,
        hasVideos,
        videos: apiVideos,
      },
    };
  }, [caseData, videosFromProps]);

  // Scroll listener for active section detection
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.4;
      
      let activeFound = false;
      
      for (let index = 0; index < sectionRefs.current.length; index++) {
        const ref = sectionRefs.current[index];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            setActiveIndex(index);
            activeFound = true;
            break;
          }
        }
      }
      
      if (!activeFound) {
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        sectionRefs.current.forEach((ref, index) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            const distance = Math.abs(rect.top - viewportCenter);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          }
        });
        
        setActiveIndex(closestIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (index) => {
    setActiveIndex(index);
    const target = sectionRefs.current[index];
    if (!target) return;
    
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Pin aside using ScrollTrigger (works even with other smooth scroll libs)
  useLayoutEffect(() => {
    const asideEl = asideRef.current;
    const contentEl = contentAreaRef.current;
    if (!asideEl || !contentEl) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const trigger = ScrollTrigger.create({
            trigger: contentEl,
            start: "top top", // align with top-28
            end: () => `bottom top+=${asideEl.offsetHeight + 64}`,
            pin: asideEl,
            pinSpacing: false,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          });
          return () => trigger.kill();
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // GSAP Header Animation
  useEffect(() => {
    if (!headerRef.current) return;

    const elements = headerRef.current.querySelectorAll('.header-animate');
    
    // Set initial state
    gsap.set(elements, {
      opacity: 0,
      y: 40
    });

    // Create intersection observer for better compatibility with Locomotive Scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
              delay: 0.1
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);


  return (
    <div
      ref={containerRef}
      id="case-study-container"
      className="case-study-section w-full py-20 lg:py-32 bg-[var(--background)]"
    >
      <div className="w-full px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24">
          <span className="header-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-medium mb-4">
            {t("caseStudy.header.badge")}
            <span className="w-2 h-2 rounded-full bg-[#52C3C5] animate-pulse" />
          </span>
          <h2 className="header-animate text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
            {t("caseStudy.header.title")}
          </h2>
          <p className="header-animate text-base md:text-lg text-[var(--foreground)]/60 max-w-2xl leading-relaxed">
            {t("caseStudy.header.description")}
          </p>
        </div>

        {/* Main Content */}
        <div id="case-study-content" ref={contentAreaRef} className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16 relative">
          {/* Left Sticky Selector - Desktop */}
          <aside
            ref={asideRef}
            className="lg:w-72 xl:w-80 flex-shrink-0 hidden lg:block lg:self-start h-fit"
          >
            <div className="lg:pt-8">
              <div className="mb-6 space-y-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#52C3C5]">
                  {t("caseStudy.sidebar.title")}
                </span>
                <p className="text-xs text-[var(--foreground)]/60 leading-relaxed">
                  {t("caseStudy.sidebar.description")}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {caseStudySections.map((section, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleNavClick(index)}
                      className={`text-left px-4 py-3 rounded-2xl border transition-all duration-300 ease-out backdrop-blur-sm group ${
                        isActive
                          ? "bg-[#52C3C5]/15 border-[#52C3C5]/60 text-[#52C3C5] shadow-lg shadow-[#52C3C5]/20"
                          : "bg-[var(--background)]/60 border-[var(--foreground)]/10 text-[var(--foreground)] hover:border-[#52C3C5]/50 hover:text-[#52C3C5]"
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span
                          className={`text-sm font-mono transition-colors ${
                            isActive
                              ? "text-[#52C3C5]"
                              : "text-[var(--foreground)]/40 group-hover:text-[#52C3C5]/60"
                          }`}
                        >
                          {section.number}
                        </span>
                        <div>
                          <div className="text-lg font-semibold">
                            {section.title}
                          </div>
                          <div className="text-xs opacity-70 line-clamp-2 mt-1">
                            {section.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Mobile Selector */}
          <div className="lg:hidden w-full mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {caseStudySections.map((section, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleNavClick(index)}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-[#52C3C5]/15 border-[#52C3C5]/60 text-[#52C3C5]"
                        : "bg-[var(--background)]/80 border-[var(--foreground)]/15 text-[var(--foreground)]"
                    }`}
                  >
                    <span className="text-xs font-mono mr-2">
                      {section.number}
                    </span>
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 space-y-24 lg:space-y-32">
            {caseStudySections.map((section, index) => {
              const content = sectionContent[section.id];
              return (
                <section
                  key={section.id}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  data-section-index={index}
                  className="scroll-mt-32"
                >
                  {/* Section Header */}
                  <div className="mb-8">
                    <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#52C3C5] flex items-center gap-2">
                      <span className="font-mono">{section.number}</span>
                      <span className="w-8 h-px bg-[#52C3C5]/40" />
                      {section.title}
                    </span>
                  </div>

                  {/* Section Content */}
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                      {content.title}
                    </h3>
                    <div className="prose prose-lg max-w-none">
                      {content.content.split("\n\n").map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-[var(--foreground)]/70 leading-relaxed mb-4"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Videos Section for Approach */}
                    {content.hasVideos && (
                      <div className="mt-12">
                        <h4 className="text-lg font-semibold text-[var(--foreground)] mb-6">
                          {t("caseStudy.videos.title")}
                        </h4>
                        <div className="flex flex-col sm:flex-row gap-6 justify-start">
                          {content.videos.map((video) => (
                            <div
                              key={video.id}
                              className="relative group"
                              style={{
                                width: "min(350px, 100%)",
                                maxWidth: "350px",
                              }}
                            >
                              <div
                                className="relative overflow-hidden rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10"
                                style={{
                                  aspectRatio: "350/550",
                                }}
                              >
                                <video
                                  className="w-full h-full object-cover"
                                  poster={video.poster}
                                  controls
                                  preload="metadata"
                                  playsInline
                                >
                                  <source src={video.src} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                              <p className="mt-3 text-sm text-[var(--foreground)]/60 font-medium">
                                {video.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  {index < caseStudySections.length - 1 && (
                    <div className="mt-16 lg:mt-24">
                      <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/10 to-transparent" />
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
