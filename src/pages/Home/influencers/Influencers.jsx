import React, { useState, useEffect, useMemo } from "react";
import "./influencers.css";
import influencerPlaceholder from "../../../assets/influncer/1.png";
import AOS from "aos";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaSnapchatGhost,
} from "react-icons/fa";
import { useInfluencersStore } from "../../../store/influencersStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext.jsx";
import TikitTitle from "../../../components/TikitTitle.jsx";

const SOCIAL_ICON_MAP = {
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

const getSectionLabel = (section) =>
  section?.title ||
  section?.name ||
  section?.label ||
  section?.slug ||
  "Untitled";

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

const Influencers = () => {
  const navigate = useNavigate();
  const [activeSectionId, setActiveSectionId] = useState(null);
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
  const { t } = useTranslation();
  const { language, isRtl } = useI18nLanguage();

  useEffect(() => {
    loadSections({ lang: language });
  }, [loadSections, language]);

  useEffect(() => {
    clearSection();
    setActiveSectionId(null);
  }, [language, clearSection]);

  useEffect(() => {
    if (!sections || sections.length === 0) {
      setActiveSectionId(null);
      return;
    }

    setActiveSectionId((prev) => {
      if (prev && sections.some((section) => section?.id === prev)) {
        return prev;
      }
      return sections[0]?.id ?? sections[0]?.slug ?? sections[0]?.key ?? null;
    });
  }, [sections]);

  useEffect(() => {
    if (!activeSectionId) return;
    if (influencersBySection[activeSectionId]) {
      if (window.AOS && window.aosInitialized) {
        AOS.refresh();
      }
      return;
    }
    loadInfluencers(activeSectionId, { lang: language });
  }, [activeSectionId, influencersBySection, loadInfluencers, language]);

  useEffect(() => {
    if (window.AOS && window.aosInitialized) {
      AOS.refresh();
    }
  }, []);

  useEffect(() => {
    if (window.AOS && window.aosInitialized) {
      AOS.refresh();
    }
  }, [activeSectionId, influencersBySection]);

  const influencers = useMemo(() => {
    if (!activeSectionId) return [];
    const list = influencersBySection[activeSectionId] || [];
    if (!Array.isArray(list)) return [];
    return list.map((influencer, index) => ({
      id: influencer?.id ?? `${activeSectionId}-${index}`,
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
      secondarySubtitle: influencer?.secondary_subtitle || "",
      image: influencer?.image || influencerPlaceholder,
      followers: influencer?.followers,
      socialLinks: normalizeSocialLinks(influencer?.links),
    }));
  }, [activeSectionId, influencersBySection]);

  const isSectionActive = (section) => {
    if (!section) return false;
    const id = section?.id || section?.slug || section?.key;
    return id === activeSectionId;
  };

  const handleSectionChange = (section) => {
    const nextId = section?.id || section?.slug || section?.key;
    if (!nextId || nextId === activeSectionId) return;
    setActiveSectionId(nextId);
  };

  const renderFollowersLabel = (followers) => {
    if (!followers) return null;
    if (typeof followers === "number") {
      if (followers >= 1_000_000) {
        return `${(followers / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
      }
      if (followers >= 1_000) {
        return `${(followers / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
      }
      return followers.toString();
    }
    return followers;
  };

  const arrowIcon = isRtl ? "←" : "→";

  return (
    <section
      className="influencers-scope min-h-[1074px] py-16 px-4 relative overflow-hidden bg-[var(--background)]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#52C3C5]/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#52C3C5]/10 dark:bg-[#52C3C5]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#52C3C5] animate-pulse"></span>
            <span className="text-sm font-medium text-[#52C3C5]">
              {t("home.influencers.badge")}
            </span>
          </div>
          
          <TikitTitle  title={t("home.influencers.title")} mainWord={t("home.influencers.mainWord")}/>
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
            {t("home.influencers.subtitle")}
          </p>
        </div>

        {/* Category Menu Bar - Centered */}
        <div
          className="flex justify-center mb-12"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center max-w-5xl px-2">
            {sectionsLoading && sections.length === 0 ? (
              <div className="text-sm text-[var(--foreground)]/70">
                {t("home.influencers.loadingCategories")}
              </div>
            ) : sectionsError ? (
              <div className="text-sm text-red-500">
                {sectionsError || t("home.influencers.categoriesError")}
              </div>
            ) : sections.length === 0 ? (
              <div className="text-sm text-[var(--foreground)]/70">
                {t("home.influencers.noCategories")}
              </div>
            ) : (
              sections.map((section, idx) => {
                const isActive = isSectionActive(section);
                return (
                  <button
                    key={section?.id ?? section?.slug ?? idx}
                    onClick={() => handleSectionChange(section)}
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-delay={idx * 60}
                    className={`chip flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-400 ease-out text-sm sm:text-base font-medium tracking-wide ${
                      isActive
                        ? "bg-[#52C3C5] text-white border-[#52C3C5] shadow-lg shadow-[#52C3C5]/30"
                        : "bg-transparent text-[var(--foreground)] border-[var(--foreground)]/15 hover:border-[#52C3C5]/60 hover:text-[#52C3C5] hover:bg-[#52C3C5]/10"
                    }`}
                  >
                    {getSectionLabel(section)}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Cards Grid - 3 per row */}
        <div className="flex flex-wrap justify-center gap-6 min-h-[500px]">
          {influencersLoading && !influencers.length ? (
            <div className="text-sm text-[var(--foreground)]/70">
              {t("home.influencers.loadingInfluencers")}
            </div>
          ) : influencersError && !influencers.length ? (
            <div className="text-sm text-red-500">
              {influencersError || t("home.influencers.influencersError")}
            </div>
          ) : influencers.length === 0 ? (
            <div className="text-center text-sm text-[var(--foreground)]/70 max-w-md">
              {t("home.influencers.noInfluencers")}
            </div>
          ) : (
            influencers.map((inf, idx) => {
              const followersLabel = renderFollowersLabel(inf.followers);
              return (
                <div
                  key={inf.id}
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={idx * 100}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm"
                >
                  <div className="group relative bg-[var(--background)] border border-[var(--foreground)]/10 dark:border-[var(--foreground)]/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#52C3C5]/20 transition-all duration-500 ease-out hover:-translate-y-3 hover:border-[#52C3C5]/30">
                    {/* Card Image */}
                    <div className="relative h-80 bg-gradient-to-br from-[#52C3C5]/10 to-[#5269C5]/10 dark:from-[#52C3C5]/20 dark:to-[#5269C5]/20 overflow-hidden transition-all duration-500 ease-out group-hover:from-[#52C3C5]/20 group-hover:to-[#5269C5]/20">
                      <img
                        src={inf.image}
                        alt={inf.name}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[95%] w-auto object-contain transition-all duration-700 ease-out group-hover:scale-110 group-hover:drop-shadow-2xl"
                        loading="lazy"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#52C3C5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>

                      {/* Followers Badge */}
                      {followersLabel && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--background)]/90 backdrop-blur-sm border border-[#52C3C5]/30 transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-[#52C3C5] group-hover:shadow-lg group-hover:shadow-[#52C3C5]/30">
                          <span className="text-xs font-semibold text-[#52C3C5]">
                            {t("home.influencers.followersLabel", {
                              count: followersLabel,
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6 transition-all duration-300 ease-out group-hover:bg-[#52C3C5]/5">
                      <h3 className="text-xl font-bold mb-2 text-[var(--foreground)] transition-all duration-300 ease-out group-hover:text-[#52C3C5]">
                        {inf.name}
                      </h3>
                      <p className="text-sm text-[#52C3C5] font-medium mb-1 transition-all duration-300 ease-out group-hover:tracking-wide">
                        {inf.primarySubtitle}
                      </p>
                      <p className="text-xs text-[var(--foreground)]/60 mb-4 transition-colors duration-300 ease-out group-hover:text-[var(--foreground)]/80">
                        {inf.secondarySubtitle}
                      </p>

                      {/* Social Links */}
                      <div className="flex gap-2">
                        {inf.socialLinks?.map((social, socialIdx) => {
                          const Icon =
                            SOCIAL_ICON_MAP[social.platform] || FaInstagram;
                          return (
                            <a
                              key={`${inf.id}-${social.platform}`}
                              href={social.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label={social.platform}
                              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#52C3C5] to-[#5269C5] text-white hover:from-[#52C3C5] hover:to-[#5269C5] transition-all duration-500 ease-out hover:scale-125 hover:-rotate-12 shadow-lg hover:shadow-2xl hover:shadow-[#52C3C5]/50"
                              style={{ transitionDelay: `${socialIdx * 50}ms` }}
                            >
                              <Icon className="text-base transition-transform duration-300 ease-out hover:scale-110" />
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#52C3C5]/10 to-transparent rounded-bl-full transition-all duration-500 ease-out group-hover:w-24 group-hover:h-24 group-hover:from-[#52C3C5]/20"></div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/influencer")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#52C3C5] text-[#52C3C5] font-semibold tracking-wide uppercase text-sm transition-all duration-300 hover:bg-[#52C3C5] hover:text-white shadow-lg shadow-[#52C3C5]/30"
          >
            {t("home.influencers.showAll")}
            <span aria-hidden="true">{arrowIcon}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Influencers;
