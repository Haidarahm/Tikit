import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { debounce } from "../../utils/debounce";
import Hero from "./Hero";
import { InfluencerDetails } from "./InfluencerDetails";
import influencer1 from "../../assets/influncer/1.png";
import influencer2 from "../../assets/influncer/2.png";
import SEOHead from "../../components/SEOHead";
import { useInfluencersStore } from "../../store/influencersStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaSnapchatGhost,
} from "react-icons/fa";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const getSectionLabel = (section) =>
  section?.title || section?.name || section?.label || section?.slug || "";

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
  const mobileCardsRef = useRef(null);
  const swiperRef = useRef(null);
  const phoneCardTriggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSectionKey, setActiveSectionKey] = useState(null);
  const { isRtl, language } = useI18nLanguage();
  const { t } = useTranslation();
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
  const clearSection = useInfluencersStore((state) => state.clearSection);

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
    const debouncedRefresh = debounce(() => {
      ScrollTrigger.refresh();
      if (window.AOS && window.aosInitialized) {
        AOS.refresh();
      }
    }, 150);

    window.addEventListener("resize", debouncedRefresh, { passive: true });

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.removeEventListener("resize", debouncedRefresh);
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    loadSections({ lang: language });
    // Clear influencers cache when language changes to force reload with new language
    clearSection();
    setActiveIndex(0);
    setActiveSectionKey(null);
  }, [loadSections, language, clearSection]);

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
      if (
        swiperRef.current &&
        swiperRef.current.activeIndex !== nextIndex &&
        swiperRef.current.slideTo
      ) {
        swiperRef.current.slideTo(nextIndex);
      }
    }
  }, [activeSectionKey, normalizedSections, activeIndex]);

  useEffect(() => {
    if (!activeSectionKey) return;
    if (influencersBySection[activeSectionKey]) {
      return;
    }
    loadInfluencers(activeSectionKey, { lang: language });
  }, [activeSectionKey, influencersBySection, loadInfluencers, language]);

  useEffect(() => {
    const nextIndex = activeIndex + 1;
    const nextSection = normalizedSections[nextIndex];
    if (!nextSection) return;
    const nextKey = nextSection.key;
    if (!nextKey || influencersBySection[nextKey]) return;
    loadInfluencers(nextKey, { lang: language });
  }, [
    activeIndex,
    normalizedSections,
    influencersBySection,
    loadInfluencers,
    language,
  ]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return undefined;

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

  // GSAP animation for mobile influencer cards
  useEffect(() => {
    const cardsContainer = mobileCardsRef.current;
    if (!cardsContainer) return;

    const cardElements = cardsContainer.querySelectorAll(
      ".mobile-influencer-card"
    );

    if (!cardElements.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cardElements, { autoAlpha: 0, y: 30, scale: 0.95 });

      gsap.to(cardElements, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardsContainer,
          start: "top 90%",
          end: "bottom 60%",
        },
      });
    }, cardsContainer);

    return () => ctx.revert();
  }, [activeIndex, influencersBySection]);

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
        influencer?.name || influencer?.full_name || influencer?.title || "",
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
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
          <aside className="lg:w-72 hidden md:block xl:w-80 flex-shrink-0">
            <div className="sticky top-32">
              <div className="mb-6 space-y-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-medium">
                  {t("influencer.sections.title")}
                  <span className="w-2 h-2 rounded-full bg-[#52C3C5] animate-pulse" />
                </span>
                <p className="text-xs text-[var(--foreground)]/60 leading-relaxed">
                  {t("influencer.sections.description")}
                </p>
              </div>
              {sectionsLoading && normalizedSections.length === 0 ? (
                <div className="text-sm text-[var(--foreground)]/70">
                  {t("influencer.sections.loading")}
                </div>
              ) : sectionsError ? (
                <div className="text-sm text-red-500">
                  {sectionsError || t("influencer.sections.loadError")}
                </div>
              ) : normalizedSections.length === 0 ? (
                <div className="text-sm text-[var(--foreground)]/70">
                  {t("influencer.sections.noSections")}
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
                        <div className="text-lg font-semibold text-start">
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
          <div className="mobile-swiper-influencers-sections md:hidden w-full md:mb-8">
            {normalizedSections.length === 0 ? (
              sectionsLoading ? (
                <div className="text-sm text-center text-[var(--foreground)]/70 py-6">
                  {t("influencer.sections.loading")}
                </div>
              ) : (
                <div className="text-sm text-center text-[var(--foreground)]/70 py-6">
                  {t("influencer.sections.noSections")}
                </div>
              )
            ) : (
              <Swiper
                modules={[Pagination]}
                spaceBetween={12}
                slidesPerView={1.15}
                onSwiper={(instance) => {
                  swiperRef.current = instance;
                }}
                onSlideChange={(swiper) => {
                  const index = swiper.activeIndex;
                  const section = normalizedSections[index];
                  if (section) {
                    setActiveIndex(index);
                    setActiveSectionKey(section.key);
                  }
                }}
                dir={isRtl ? "rtl" : "ltr"}
                className="mobile-swiper"
              >
                {normalizedSections.map((section, index) => (
                  <SwiperSlide key={section.key}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(index)}
                      className={`w-full text-left px-4 py-3 rounded-2xl border transition-all duration-300 ${
                        index === activeIndex
                          ? "bg-[#52C3C5]/15 border-[#52C3C5]/60 text-[#52C3C5]"
                          : "bg-[var(--background)]/80 border-[var(--foreground)]/15 text-[var(--foreground)]"
                      }`}
                    >
                      <div className="text-xs uppercase tracking-wide opacity-60 mb-1">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="text-base font-semibold mb-1">
                        {section.label}
                      </div>
                      {section.description ? (
                        <p className="text-xs opacity-70 line-clamp-2">
                          {section.description}
                        </p>
                      ) : null}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="flex-1 space-y-16 hidden md:block">
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
                      {t("influencer.loading")}
                    </div>
                  ) : influencersError && !hasLoaded ? (
                    <div className="text-sm text-red-500">
                      {influencersError || t("influencer.loadError")}
                    </div>
                  ) : influencers.length === 0 ? (
                    <div className="text-sm text-[var(--foreground)]/70">
                      {t("influencer.noInfluencers")}
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
                {t("influencer.sections.loading")}
              </div>
            ) : null}
          </div>
          <div
            className="mobile-view-data md:hidden mt-6 space-y-6"
            ref={mobileCardsRef}
          >
            {(() => {
              const activeSection = normalizedSections[activeIndex];
              if (!activeSection) return null;
              const influencers = getInfluencersForSection(activeSection.key, [
                influencer1,
                influencer2,
              ]);
              const hasLoaded = Array.isArray(
                influencersBySection[activeSection.key]
              );
              const isLoadingSection = influencersLoading && !hasLoaded;

              return (
                <div className="space-y-6">
                  <div className="bg-[var(--background)]/80 hidden md:block border border-[var(--foreground)]/10 rounded-2xl p-4 shadow-sm">
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#52C3C5]">
                      {String(activeIndex + 1).padStart(2, "0")} •{" "}
                      {activeSection.label}
                    </span>
                    {activeSection.description ? (
                      <p className="mt-2 text-sm text-[var(--foreground)]/80">
                        {activeSection.description}
                      </p>
                    ) : null}
                  </div>

                  {isLoadingSection ? (
                    <div className="text-sm text-[var(--foreground)]/70 text-center py-8">
                      {t("influencer.loading")}
                    </div>
                  ) : influencersError && !hasLoaded ? (
                    <div className="text-sm text-red-500 text-center py-8">
                      {influencersError || t("influencer.loadError")}
                    </div>
                  ) : influencers.length === 0 ? (
                    <div className="text-sm text-[var(--foreground)]/70 text-center py-8">
                      {t("influencer.noInfluencers")}
                    </div>
                  ) : (
                    <div className="space-y-5" ref={phoneCardTriggerRef}>
                      {influencers.map((influencer, cardIndex) => (
                        <div
                          key={influencer.id}
                          className="rounded-3xl bg-[var(--background)]/90 border border-white/10 p-4 shadow-md space-y-4 will-change-transform mobile-influencer-card"
                          data-phone-card-index={cardIndex}
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
                              <img
                                src={influencer.image}
                                alt={influencer.name}
                                className="w-full h-full object-cover object-center"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-[var(--foreground)]">
                                {influencer.name}
                              </h3>
                              <p className="text-sm text-[var(--secondary)] font-medium">
                                {influencer.primarySubtitle}
                              </p>
                              <p className="text-xs text-[var(--foreground)]/70">
                                {influencer.secondarySubtitle}
                              </p>
                            </div>
                          </div>
                          {influencer.socialLinks?.length ? (
                            <div className="flex flex-wrap gap-2">
                              {influencer.socialLinks.map((link, idx) => {
                                const platform = (
                                  link.platform || ""
                                ).toLowerCase();
                                const iconMap = {
                                  instagram: FaInstagram,
                                  ig: FaInstagram,
                                  youtube: FaYoutube,
                                  yt: FaYoutube,
                                  tiktok: FaTiktok,
                                  tik_tok: FaTiktok,
                                  twitter: FaTwitter,
                                  x: FaTwitter,
                                  linkedin: FaLinkedinIn,
                                  facebook: FaFacebookF,
                                  fb: FaFacebookF,
                                  snapchat: FaSnapchatGhost,
                                  snap: FaSnapchatGhost,
                                };
                                const IconComponent =
                                  iconMap[platform] || FaInstagram;
                                return (
                                  <a
                                    key={`${influencer.id}-${idx}`}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-[var(--secondary)]/30 text-[var(--secondary)] hover:bg-[var(--secondary)]/10 transition"
                                  >
                                    <IconComponent className="w-3.5 h-3.5" />
                                    <span className="capitalize">
                                      {platform}
                                    </span>
                                  </a>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
