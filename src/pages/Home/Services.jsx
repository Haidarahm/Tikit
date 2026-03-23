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
import digitalMarketing from "../../assets/services/digital_marketing.webp";
import webDevelopment from "../../assets/services/web_development.webp";

const SERVICE_IMAGES = [
  influencerMarketing,
  socialMedia,
  production,
  branding,
  digitalMarketing,
  webDevelopment,
];

const SERVICE_ROUTES = [
  "/influencer-marketing-agency-dubai",
  "/social-media-management",
  "/production",
  "/branding-agency-dubai",
  "/digital-marketing-agency-dubai",
  "/web-development-dubai",
];

const ServiceCard = memo(({ service, index, onClick, isRtl, t }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer"
    data-aos="fade-up"
    data-aos-delay={index * 100}
    data-aos-duration="600"
    data-aos-easing="ease-out"
  >
    <div className="h-full rounded-xl overflow-hidden border border-[var(--foreground)]/10 bg-[var(--background)] transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.media}
          alt={service.title}
          width={400}
          height={250}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[var(--foreground)] text-[15px] md:text-[16px] leading-snug mb-1">
          {service.title}
        </h3>
        <p className="text-[var(--foreground)]/60 text-[13px] leading-relaxed line-clamp-2">
          {service.subtitle}
        </p>
        <p className="mt-2 text-[13px] font-medium text-[#52C3C5] flex items-center gap-1">
          <span>{t("home.services.learnMore", { defaultValue: "Learn more" })}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={isRtl ? "rotate-180" : ""}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </p>
      </div>
    </div>
  </div>
));
ServiceCard.displayName = "ServiceCard";

const FALLBACK_ITEMS = [
  { title: "Influencer Marketing", subtitle: "Boost your brand through creators", description: "" },
  { title: "Social Media Management", subtitle: "We manage your brand's online presence with precision and creativity.", description: "" },
  { title: "Production", subtitle: "From concept to final cut, we bring bold ideas to life.", description: "" },
  { title: "Branding", subtitle: "We build brands that stand out and stand for something.", description: "" },
  { title: "Digital Marketing", subtitle: "Data-driven campaigns that drive growth and measurable ROI.", description: "" },
  { title: "Web Development", subtitle: "Fast, scalable websites and web apps that convert.", description: "" },
];

const Services = memo(() => {
  const navigate = useNavigate();
  const { isRtl } = useI18nLanguage();
  const { fontBody } = useFontClass();
  const { t } = useTranslation();

  const handleCardClick = useCallback((link) => navigate(link), [navigate]);

  const items = useMemo(() => {
    const translated = t("home.services.items", { returnObjects: true });
    const itemsArray = Array.isArray(translated) ? translated : FALLBACK_ITEMS;
    return itemsArray.slice(0, 3).map((item, index) => ({
      ...item,
      title: item.title || FALLBACK_ITEMS[index]?.title,
      subtitle: item.subtitle || FALLBACK_ITEMS[index]?.subtitle,
      media: SERVICE_IMAGES[index] ?? SERVICE_IMAGES[0],
      link: SERVICE_ROUTES[index] ?? SERVICE_ROUTES[0],
    }));
  }, [t]);

  return (
    <div
      data-nav-color="black"
      className={`section my-6 md:my-10 ${fontBody} flex flex-col mx-auto z-10 w-[95vw] md:w-[90%] max-w-[1200px]`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">
        <div className="w-full lg:w-[28%] flex flex-col gap-3 px-1" data-aos="fade-up" data-aos-duration="500">
          <TikitTitle title={t("home.services.title")} mainWord="" disableAnimation />
          <p className="text-[var(--foreground)]/70 text-[14px] md:text-[15px] leading-relaxed max-w-[320px]">
            {t("services.hero.subdescription")}
          </p>
          <button
            onClick={() => navigate("/services")}
            className="w-fit mt-2 text-[13px] font-medium text-[#52C3C5] hover:underline focus:outline-none"
          >
            {t("home.services.explore")} {isRtl ? "←" : "→"}
          </button>
        </div>

        <div className="w-full lg:w-[72%] grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((service, index) => (
            <ServiceCard
              key={`${service.link}-${index}`}
              service={service}
              index={index}
              isRtl={isRtl}
              t={t}
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
