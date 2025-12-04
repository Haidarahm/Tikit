import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const caseStudySections = [
  {
    id: "objective",
    number: "01",
    title: "Objective",
    description:
      "Define clear goals and measurable outcomes that drive the entire campaign strategy forward.",
  },
  {
    id: "brief",
    number: "02",
    title: "Brief",
    description:
      "Comprehensive overview of the project scope, requirements, and creative direction.",
  },
  {
    id: "strategy",
    number: "03",
    title: "Strategy",
    description:
      "Detailed execution plan mapping out channels, timeline, and resource allocation.",
  },
  {
    id: "approach",
    number: "04",
    title: "Approach",
    description:
      "Creative methodology and tactical implementation showcasing our unique process.",
  },
];

// Placeholder content for each section - replace with actual data
const sectionContent = {
  objective: {
    title: "Campaign Objective",
    content: `Our primary objective was to establish a powerful brand presence across multiple digital touchpoints while driving measurable engagement and conversion metrics. We focused on creating authentic connections with the target audience through strategic influencer partnerships and compelling content narratives.

The campaign aimed to achieve a 40% increase in brand awareness within the target demographic, generate over 2 million organic impressions, and establish long-term relationships with key industry influencers. By leveraging data-driven insights and creative storytelling, we positioned the brand as an industry leader in innovation and customer-centric values.

Secondary objectives included building a sustainable content ecosystem, fostering community engagement, and creating shareable moments that would extend the campaign's reach organically beyond paid media investments.`,
  },
  brief: {
    title: "Project Brief",
    content: `The client approached us with a clear vision: transform their digital presence and connect with a younger, more engaged audience segment. The brief outlined specific requirements for influencer selection, content themes, and brand messaging consistency across all touchpoints.

Key deliverables included a comprehensive influencer partnership program spanning 12 weeks, creation of 50+ pieces of original content across Instagram, TikTok, and YouTube, and development of a brand ambassador program for sustained engagement.

The brief emphasized authenticity as the cornerstone of all content creation, ensuring that influencer partnerships felt genuine and aligned with both the brand's values and the creator's personal style. Budget allocation prioritized quality over quantity, with focus on micro-influencers who demonstrated high engagement rates within niche communities.`,
  },
  strategy: {
    title: "Strategic Framework",
    content: `Our strategy centered on a three-phase approach: Discovery, Activation, and Amplification. Each phase built upon the previous, creating a cohesive narrative arc that kept audiences engaged throughout the campaign duration.

Phase One focused on identifying and vetting potential influencer partners, conducting audience analysis, and establishing content guidelines. We utilized proprietary tools to assess creator authenticity scores and audience overlap potential.

Phase Two involved coordinated content rollout across platforms, with carefully timed posts designed to maximize algorithmic visibility. Real-time monitoring allowed for agile adjustments to content strategy based on performance metrics.

Phase Three amplified top-performing content through paid media support and cross-platform repurposing, extending reach while maintaining cost efficiency. Community management protocols ensured consistent brand voice in all audience interactions.`,
  },
  approach: {
    title: "Creative Approach",
    content: `Our creative approach prioritized authentic storytelling over traditional advertising formats. Each piece of content was developed collaboratively with influencer partners, ensuring their unique voice remained central while effectively communicating brand messages.

The visual identity maintained consistency through subtle brand integration techniques that felt native to each platform's aesthetic expectations. We developed platform-specific content variations that respected the unique culture and consumption patterns of each channel's user base.

Below are examples of the creative executions that drove exceptional engagement and brand recall metrics throughout the campaign:`,
    hasVideos: true,
    videos: [
      {
        id: 1,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        poster: "",
        title: "Campaign Highlight Reel",
      },
      {
        id: 2,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        poster: "",
        title: "Behind the Scenes",
      },
    ],
  },
};

const CaseStudy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if we're in a Locomotive Scroll context
    const hasLocomotiveScroll = !!window.locomotiveScrollInstance;

    if (hasLocomotiveScroll) {
      // For Locomotive Scroll, we'll use intersection observer instead
      const observerOptions = {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-section-index"),
              10
            );
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      }, observerOptions);

      sectionRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    } else {
      // Use GSAP ScrollTrigger for standard scroll
      const triggers = sectionRefs.current.map((sectionEl, index) => {
        if (!sectionEl) return null;
        return ScrollTrigger.create({
          trigger: sectionEl,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      return () => {
        triggers.forEach((trigger) => trigger?.kill());
      };
    }
  }, []);

  const handleNavClick = (index) => {
    setActiveIndex(index);
    const target = sectionRefs.current[index];
    if (!target) return;

    const locomotiveScroll = window.locomotiveScrollInstance;
    if (locomotiveScroll) {
      locomotiveScroll.scrollTo(target, {
        offset: -100,
        duration: 800,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="case-study-section w-full py-20 lg:py-32 bg-[var(--background)]"
    >
      <div className="w-full px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-medium mb-4">
            Case Studies
            <span className="w-2 h-2 rounded-full bg-[#52C3C5] animate-pulse" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
            Project Deep Dive
          </h2>
          <p className="text-base md:text-lg text-[var(--foreground)]/60 max-w-2xl leading-relaxed">
            Browse categories on the left and explore each section within the
            selected area on the right.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Sticky Selector - Desktop */}
          <aside className="lg:w-72 xl:w-80 flex-shrink-0 hidden md:block">
            <div className="sticky top-32">
              <div className="mb-6 space-y-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#52C3C5]">
                  Sections
                </span>
                <p className="text-xs text-[var(--foreground)]/60 leading-relaxed">
                  Navigate through each phase of our campaign methodology.
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
          <div className="md:hidden w-full mb-6">
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
                          Campaign Videos
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
