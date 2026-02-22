import React, { useEffect, useState, useMemo, memo, useRef } from "react";
import { useServicesStore } from "../../store/servicesStore";
import { useNavigate } from "react-router-dom";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";
import TikitTitle from "../../components/TikitTitle.jsx";

const CARD_COLORS = [
  { bg: "bg-[#35D5D0]/15", border: "border-[#35D5D0]/30", accent: "#35D5D0" },
  { bg: "bg-[#E84B43]/15", border: "border-[#E84B43]/30", accent: "#E84B43" },
  { bg: "bg-[#F3A67A]/15", border: "border-[#F3A67A]/30", accent: "#F3A67A" },
  { bg: "bg-[#252525]/15", border: "border-[#252525]/30", accent: "#6ACBCC" },
];

const ServiceCard = ({ service, index, onClick }) => {
  const colors = CARD_COLORS[index % CARD_COLORS.length];

  return (
    // Outer: stable grid cell — never transforms, prevents neighbors from jumping
    <div
      onClick={onClick}
      className="group relative cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={index * 120}
      data-aos-duration="700"
      style={{ perspective: "800px" }}
    >
      {/* Inner: the only element that scales — isolated from layout flow */}
      <div
        className={`relative rounded-[14px] overflow-hidden border ${colors.border} ${colors.bg} flex flex-col h-full`}
        style={{
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.025) translateZ(0)";
          e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1) translateZ(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div className="relative w-full h-[150px] md:h-[160px] overflow-hidden">
          <img
            src={service.media}
            alt={service.title}
            className="w-full h-full object-cover"
            style={{ transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08) translateZ(0)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateZ(0)"; }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-1.5 flex-1">
          <h3 className="font-antonio font-bold text-[18px] md:text-[20px] text-[var(--foreground)] group-hover:bg-gradient-to-r group-hover:from-[#6ACBCC] group-hover:to-[#1C6F6C] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {service.title}
          </h3>

          <p className="text-[var(--foreground)]/70 text-[12px] md:text-[13px] font-light leading-[1.5] line-clamp-2">
            {service.subtitle}
          </p>

          {/* Arrow — always visible on mobile, hover-reveal on desktop */}
          <div
            className="flex items-center gap-2 mt-auto pt-1 text-[12px] font-medium opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300"
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
};

const Services = memo(() => {
  const navigate = useNavigate();
  const { services, loadServices, loading, error } = useServicesStore();
  const { language, isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadServices({ lang: language, page: 1, per_page: 4 });
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px", threshold: 0.01 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [language, loadServices, isClient]);

  const SERVICE_ROUTE_SLUGS = [
    "influencer-marketing",
    "social-media-management",
    "production",
    "branding",
  ];

  const getServiceRoute = (title, index = 0) => {
    const raw = (title || "").trim();
    const titleLower = raw.toLowerCase();
    const normalized =
      typeof titleLower.normalize === "function"
        ? titleLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : titleLower;

    if (
      titleLower.includes("influencer marketing") ||
      titleLower.includes("تسويق المؤثرين") ||
      titleLower.includes("تسويق المؤثر") ||
      normalized.includes("marketing dinfluence") ||
      normalized.includes("marketing d'influence")
    )
      return `/services/${SERVICE_ROUTE_SLUGS[0]}`;

    if (
      titleLower.includes("social media management") ||
      titleLower.includes("social media marketing") ||
      titleLower.includes("إدارة وسائل التواصل") ||
      titleLower.includes("وسائل التواصل") ||
      normalized.includes("gestion des medias sociaux") ||
      normalized.includes("gestion des médias sociaux")
    )
      return `/services/${SERVICE_ROUTE_SLUGS[1]}`;

    if (
      titleLower.includes("production") ||
      titleLower.includes("الإنتاج") ||
      titleLower.includes("إنتاج")
    )
      return `/services/${SERVICE_ROUTE_SLUGS[2]}`;

    if (
      titleLower.includes("branding") ||
      titleLower.includes("العلامة التجارية") ||
      titleLower.includes("الهوية التجارية") ||
      normalized.includes("identite de marque") ||
      normalized.includes("identité de marque")
    )
      return `/services/${SERVICE_ROUTE_SLUGS[3]}`;

    const safeIndex = Math.min(Math.max(0, index), SERVICE_ROUTE_SLUGS.length - 1);
    return `/services/${SERVICE_ROUTE_SLUGS[safeIndex]}`;
  };

  const items = useMemo(
    () =>
      (services || []).map((s, index) => ({
        ...s,
        link: s?.slug ? `/services/${s.slug}` : getServiceRoute(s?.title, index),
      })),
    [services]
  );

  const SkeletonCard = () => (
    <div className="rounded-[14px] overflow-hidden border border-[var(--foreground)]/10 bg-[var(--foreground)]/5">
      <div className="w-full h-[150px] md:h-[160px] bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/5 to-[var(--foreground)]/10 animate-pulse" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-5 w-3/4 bg-[var(--foreground)]/10 rounded animate-pulse" />
        <div className="h-3.5 w-full bg-[var(--foreground)]/8 rounded animate-pulse" />
      </div>
    </div>
  );

  const showSkeleton = !isClient || loading || error || !items || items.length === 0;

  return (
    <div
      ref={sectionRef}
      data-nav-color="black"
      className={`section my-4 md:my-8 relative overflow-visible ${
        isRtl ? "font-cairo" : "font-hero-light"
      } flex flex-col mx-auto z-10 w-[95vw] md:w-6/7 max-w-[1400px]`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Two-column layout: Left text + Right cards */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
        {/* Left Section — Title, subtitle, description */}
        <div className="w-full md:w-[35%] flex flex-col gap-3 md:gap-5 px-2 md:px-0">
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

        {/* Right Section — Service cards grid — padding gives room for scale overflow */}
        <div className="w-full md:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 p-2">
          {showSkeleton
            ? Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} index={i} />
              ))
            : items.map((service, index) => (
                <ServiceCard
                  key={service.id || index}
                  service={service}
                  index={index}
                  onClick={() => navigate(service.link)}
                />
              ))}
        </div>
      </div>
    </div>
  );
});

Services.displayName = "Services";

export default Services;
