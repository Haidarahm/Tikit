import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import { InfluencerDetails } from "./InfluencerDetails";
import influencer1 from "../../assets/influncer/1.png";
import influencer2 from "../../assets/influncer/2.png";
import SEOHead from "../../components/SEOHead";
import { useInfluencersStore } from "../../store/influencersStore";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const getSectionLabel = (section) =>
  section?.title ||
  section?.name ||
  section?.label ||
  section?.slug ||
  "Untitled";

const getSectionKey = (section, fallback) =>
  section?.id ?? section?.slug ?? section?.key ?? `section-${fallback}`;

const normalizeSocialLinks = (links) => {
  if (!Array.isArray(links) || links.length === 0) return [];
  return links
    .map((link) => {
      if (!link) return null;
      if (typeof link === "string") {
        return { platform: link.toLowerCase(), href: link };
      }
      const platform =
        link?.platform ||
        link?.type ||
        link?.name ||
        link?.label ||
        link?.title ||
        link?.link_type;
      const href = link?.href || link?.url || link?.link;
      if (!platform || !href) return null;
      return {
        platform: String(platform).toLowerCase(),
        href,
      };
    })
    .filter(Boolean);
};

export const Influencer = () => {
  const detailRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSectionKey, setActiveSectionKey] = useState(null);
  const sections = useInfluencersStore((state) => state.sections);
  const sectionsLoading = useInfluencersStore((state) => state.sectionsLoading);
  const sectionsError = useInfluencersStore((state) => state.sectionsError);
  const loadSections = useInfluencersStore((state) => state.loadSections);
  const influencersBySection = useInfluencersStore(
    (state) => state.influencersBySection
  );
  const influencersLoading = useInfluencersStore(
    (state) => state.influencersLoading
  );
  const influencersError = useInfluencersStore(
    (state) => state.influencersError
  );
  const loadInfluencers = useInfluencersStore((state) => state.loadInfluencers);

  const normalizedSections = useMemo(() => {
    const list = Array.isArray(sections) ? sections : [];
    return list.map((section, index) => {
      const requestId = getSectionKey(section, index);
      return {
        key: String(requestId),
        requestId,
        label: getSectionLabel(section),
        description:
          section?.description || section?.summary || section?.content || "",
        index,
      };
    });
  }, [sections]);

  useEffect(() => {
    // Safety: ensure no leftover locomotive-scroll styles block scrolling
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  useEffect(() => {
    if (!normalizedSections.length) {
      setActiveSectionKey(null);
      setActiveIndex(0);
      return;
    }

    setActiveSectionKey((prev) => {
      if (prev && normalizedSections.some((section) => section.key === prev)) {
        return prev;
      }
      return normalizedSections[0]?.key ?? null;
    });
  }, [normalizedSections]);

  useEffect(() => {
    if (!activeSectionKey) return;
    const nextIndex = normalizedSections.findIndex(
      (section) => section.key === activeSectionKey
    );
    if (nextIndex !== -1 && nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }
  }, [activeSectionKey, normalizedSections, activeIndex]);

  useEffect(() => {
    if (!activeSectionKey) return;
    if (influencersBySection[activeSectionKey]) {
      return;
    }
    loadInfluencers(activeSectionKey);
  }, [activeSectionKey, influencersBySection, loadInfluencers]);

  useEffect(() => {
    const nextIndex = activeIndex + 1;
    const nextSection = normalizedSections[nextIndex];
    if (!nextSection) return;
    const nextKey = nextSection.key;
    if (!nextKey || influencersBySection[nextKey]) return;
    loadInfluencers(nextKey);
  }, [activeIndex, normalizedSections, influencersBySection, loadInfluencers]);

  useEffect(() => {
    const sectionElements = detailRefs.current.filter(Boolean);
    if (!sectionElements.length) return undefined;

    const triggers = sectionElements.map((sectionEl, index) => {
      const sectionKey = normalizedSections[index]?.key;
      const contentEl =
        sectionEl.querySelector("[data-section-content]") || sectionEl;

      return ScrollTrigger.create({
        trigger: contentEl,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveIndex(index);
          if (sectionKey) setActiveSectionKey(sectionKey);
        },
        onEnterBack: () => {
          setActiveIndex(index);
          if (sectionKey) setActiveSectionKey(sectionKey);
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [normalizedSections, influencersBySection]);

  const handleNavClick = (index) => {
    const section = normalizedSections[index];
    if (!section) return;

    const target = detailRefs.current[index];
    if (!target) return;

    setActiveSectionKey(section.key);
    setActiveIndex(index);

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getInfluencersForSection = (sectionKey, fallbackImages = []) => {
    const rawList = influencersBySection[sectionKey];
    if (!Array.isArray(rawList)) return [];

    return rawList.map((influencer, idx) => ({
      id: influencer?.id ?? `${sectionKey}-inf-${idx}`,
      name:
        influencer?.name ||
        influencer?.full_name ||
        influencer?.title ||
        "Unnamed Influencer",
      primarySubtitle:
        influencer?.primarySubtitle ||
        influencer?.primary_subtitle ||
        influencer?.subtitle ||
        influencer?.role ||
        "",
      secondarySubtitle:
        influencer?.secondarySubtitle ||
        influencer?.secondary_subtitle ||
        influencer?.short_description ||
        influencer?.description ||
        "",
      image:
        influencer?.image ||
        influencer?.profile_photo ||
        influencer?.avatar ||
        influencer?.photo ||
        fallbackImages[idx % fallbackImages.length] ||
        influencer1,
      socialLinks: normalizeSocialLinks(
        influencer?.socialLinks ||
          influencer?.social_links ||
          influencer?.socialMedia ||
          influencer?.social_media ||
          influencer?.links
      ),
    }));
  };

  return (
    <div className="influencers-section w-full">
      <SEOHead
        title="Influencer Network"
        description="Discover Tikit Agency's network of talented influencers and content creators. Connect with top influencers across various niches including lifestyle, beauty, tech, and travel."
        keywords="influencer network, content creators, social media influencers, influencer marketing, brand partnerships, influencer collaboration, UAE influencers"
        canonicalUrl="/influencer"
      />
      <Hero />
      <div className="w-full px-6 mx-auto ">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <aside className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-32">
              <div className="mb-6 space-y-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-medium">
                  Influencer Sections
                  <span className="w-2 h-2 rounded-full bg-[#52C3C5] animate-pulse" />
                </span>
                <p className="text-xs text-[var(--foreground)]/60 leading-relaxed">
                  Browse categories on the left and explore each creator within
                  the selected section on the right.
                </p>
              </div>
              {sectionsLoading && normalizedSections.length === 0 ? (
                <div className="text-sm text-[var(--foreground)]/70">
                  Loading sections...
                </div>
              ) : sectionsError ? (
                <div className="text-sm text-red-500">
                  {sectionsError || "Failed to load sections."}
                </div>
              ) : normalizedSections.length === 0 ? (
                <div className="text-sm text-[var(--foreground)]/70">
                  No sections available right now.
                </div>
              ) : (
                <div className="flex flex-col gap-3 influencer-nav-scroll">
                  {normalizedSections.map((section, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={section.key}
                        type="button"
                        onClick={() => handleNavClick(index)}
                        className={`text-left px-4 py-3 rounded-2xl border transition-all duration-300 ease-out backdrop-blur-sm ${
                          isActive
                            ? "bg-[#52C3C5]/15 border-[#52C3C5]/60 text-[#52C3C5] shadow-lg shadow-[#52C3C5]/20"
                            : "bg-[var(--background)]/60 border-[var(--foreground)]/10 text-[var(--foreground)] hover:border-[#52C3C5]/50 hover:text-[#52C3C5]"
                        }`}
                      >
                        <div className="text-sm uppercase tracking-wide opacity-70">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="text-lg font-semibold">
                          {section.label}
                        </div>
                        {section.description ? (
                          <div className="text-xs opacity-70 line-clamp-2">
                            {section.description}
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
          <div className="flex-1 space-y-16">
            {normalizedSections.map((section, index) => {
              const influencers = getInfluencersForSection(section.key, [
                influencer1,
                influencer2,
              ]);
              const hasLoaded = Array.isArray(
                influencersBySection[section.key]
              );
              const isLoadingSection = influencersLoading && !hasLoaded;

              return (
                <section
                  key={section.key}
                  ref={(el) => {
                    detailRefs.current[index] = el;
                  }}
                  data-section-index={index}
                  data-section-key={section.key}
                >
                  <div className="mb-6 md:mb-10">
                    <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#52C3C5]">
                      {String(index + 1).padStart(2, "0")} • {section.label}
                    </span>
                    {section.description ? (
                      <p className="mt-3 text-sm md:text-base text-[var(--foreground)]/70 max-w-3xl">
                        {section.description}
                      </p>
                    ) : null}
                  </div>

                  {isLoadingSection ? (
                    <div className="text-sm text-[var(--foreground)]/70">
                      Loading influencers...
                    </div>
                  ) : influencersError && !hasLoaded ? (
                    <div className="text-sm text-red-500">
                      {influencersError || "Failed to load influencers."}
                    </div>
                  ) : influencers.length === 0 ? (
                    <div className="text-sm text-[var(--foreground)]/70">
                      We couldn't find influencers for this section yet. Please
                      check back soon.
                    </div>
                  ) : (
                    <div data-section-content className="space-y-16">
                      {influencers.map((influencer, infIndex) => (
                        <InfluencerDetails
                          key={influencer.id}
                          name={influencer.name}
                          primarySubtitle={influencer.primarySubtitle}
                          secondarySubtitle={influencer.secondarySubtitle}
                          image={influencer.image}
                          socialLinks={influencer.socialLinks}
                          isReversed={infIndex % 2 === 1}
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
            {sectionsLoading && normalizedSections.length === 0 ? (
              <div className="text-sm text-[var(--foreground)]/70">
                Loading sections...
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
