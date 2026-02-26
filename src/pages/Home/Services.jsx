import React, { useMemo, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useFontClass } from "../../hooks/useFontClass";
import { useTranslation } from "react-i18next";
import TikitTitle from "../../components/TikitTitle.jsx";
import influencerMarketing from "../../assets/services/Influencer-Marketing.webp";
import socialMedia from "../../assets/services/Social-Media.webp";
import production from "../../assets/services/production.webp";
import branding from "../../assets/services/Branding.webp";

const SERVICE_IMAGES = [
  influencerMarketing,
  socialMedia,
  production,
  branding,
];

const SERVICE_ROUTES = [
  "/services/influencer-marketing-agency-dubai",
  "/services/social-media-management",
  "/services/production",
  "/services/branding",
];

const CARD_COLORS = [
  { bg: "bg-[#35D5D0]/15", border: "border-[#35D5D0]/30", accent: "#35D5D0" },
  { bg: "bg-[#E84B43]/15", border: "border-[#E84B43]/30", accent: "#E84B43" },
  { bg: "bg-[#F3A67A]/15", border: "border-[#F3A67A]/30", accent: "#F3A67A" },
  { bg: "bg-[#252525]/15", border: "border-[#252525]/30", accent: "#6ACBCC" },
];

const ServiceCard = memo(({ service, index, onClick }) => {
  const colors = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={index * 120}
      data-aos-duration="700"
      style={{ perspective: "800px" }}
    >
      <div
        className={`relative rounded-[14px] overflow-hidden border ${colors.border} ${colors.bg} flex flex-col h-full will-change-transform hover:scale-[1.025] transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
      >
        <div className="relative w-full h-[150px] md:h-[160px] overflow-hidden">
          <img
            src={service.media}
            alt={service.title}
            width={400}
            height={160}
            className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.08]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="p-4 flex flex-col gap-1.5 flex-1">
          <h3 className="font-antonio font-bold text-[18px] md:text-[20px] text-[var(--foreground)] group-hover:bg-gradient-to-r group-hover:from-[#6ACBCC] group-hover:to-[#1C6F6C] group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-[var(--foreground)]/70 text-[12px] md:text-[13px] font-light leading-[1.5] line-clamp-2">
            {service.subtitle}
          </p>

          <div
            className="flex items-center gap-2 mt-auto pt-1 text-[12px] font-medium opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-[opacity,transform] duration-300"
            style={{ color: colors.accent }}
          >
            <span>Learn More</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});
ServiceCard.displayName = "ServiceCard";

const FALLBACK_ITEMS = [
  {
    title: "Influencer Marketing",
    subtitle: "Boost your brand through creators",
    description: "We connect brands with voices that matter. Through data-backed matchmaking and authentic collaborations, we help you reach audiences that trust and respond — turning influence into real impact.",
  },
  {
    title: "Social Media Management",
    subtitle: "We manage your brand's online presence with precision and creativity.",
    description: "From planning to posting, we craft engaging content, track performance, and grow loyal communities that keep your brand at the center of the conversation.",
  },
  {
    title: "Production",
    subtitle: "From concept to final cut, we bring bold ideas to life.",
    description: "Whether it's social content, branded visuals, or full-scale commercial shoots, our production team delivers quality storytelling that captures attention and drives action.",
  },
  {
    title: "Branding",
    subtitle: "We build brands that stand out and stand for something.",
    description: "From visual identity to brand voice, we shape how audiences see, feel, and remember you — creating clarity, consistency, and connection at every touchpoint.",
  },
];

const Services = memo(() => {
  const navigate = useNavigate();
  const { isRtl } = useI18nLanguage();
  const { fontBody } = useFontClass();
  const { t } = useTranslation();

  const handleCardClick = useCallback((link) => {
    navigate(link);
  }, [navigate]);

  const items = useMemo(() => {
    const translated = t("home.services.items", { returnObjects: true });
    const itemsArray = Array.isArray(translated) ? translated : FALLBACK_ITEMS;
    return itemsArray.map((item, index) => ({
      ...item,
      title: item.title || FALLBACK_ITEMS[index]?.title,
      subtitle: item.subtitle || FALLBACK_ITEMS[index]?.subtitle,
      description: item.description || FALLBACK_ITEMS[index]?.description,
      media: SERVICE_IMAGES[index] || SERVICE_IMAGES[0],
      link: SERVICE_ROUTES[index] || SERVICE_ROUTES[0],
    }));
  }, [t]);

  return (
    <div
      data-nav-color="black"
      className={`section my-4 md:my-8 relative overflow-visible ${
        fontBody
      } flex flex-col mx-auto z-10 w-[95vw] md:w-6/7 max-w-[1400px]`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
        <div
          className="w-full md:w-[35%] flex flex-col gap-3 md:gap-5 px-2 md:px-0"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <TikitTitle
            title={t("home.services.title")}
            mainWord=""
            disableAnimation
          />

          <p className="text-[var(--foreground)]/70 text-[14px] md:text-[16px] font-light leading-[1.6] max-w-[450px]">
            {t("services.hero.subdescription")}
          </p>

          <button
            onClick={() => navigate("/services")}
            className="w-fit mt-1 bg-transparent hover:bg-[#52C3C5] hover:text-white border border-[#52C3C5] text-[#52C3C5] transition-all duration-300 px-5 py-2 text-[13px] md:text-[14px] rounded-full font-semibold uppercase tracking-wide"
          >
            {t("home.services.explore")}
          </button>
        </div>

        <div className="w-full md:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 p-2">
          {items.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              onClick={() => handleCardClick(service.link)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

Services.displayName = "Services";

export default Services;
