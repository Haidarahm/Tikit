import React, { useEffect, useMemo, useLayoutEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";
import { useWorkItemDetailsStore } from "../../store/work/workItemDetailsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTheme } from "../../store/ThemeContext.jsx";
import SEOHead from "../../components/SEOHead.jsx";
import Footer from "../../components/Footer.jsx";
import ContactUs from "../Home/ContactUs.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, isRtl } = useI18nLanguage();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const eventState = useWorkItemDetailsStore((state) => state.events);
  const loadEventDetail = useWorkItemDetailsStore(
    (state) => state.loadEventDetail
  );
  const resetCategory = useWorkItemDetailsStore((state) => state.resetCategory);

  const item = eventState.item;
  const media = Array.isArray(eventState.media) ? eventState.media : [];

  const title = useMemo(() => {
    if (!item) return "";
    return item.title ?? "";
  }, [item]);

  const objective = useMemo(() => {
    if (!item) return "";
    return item.objective ?? "";
  }, [item]);

  const gallery = useMemo(() => {
    if (media.length) return media;
    if (item?.logo) {
      return [item.logo];
    }
    return [];
  }, [item, media]);

  const heroMedia = gallery[0] ?? null;

  const heroRef = useRef(null);
  const galleryRef = useRef(null);

  useLayoutEffect(() => {
    if (!item || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const heroChildren =
        heroRef.current.querySelectorAll("[data-hero-child]");

      gsap.fromTo(
        heroRef.current,
        { autoAlpha: 0, y: 80, rotateX: 8, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
        }
      );

      if (heroChildren.length) {
        gsap.fromTo(
          heroChildren,
          { autoAlpha: 0, y: 30, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.1,
            delay: 0.15,
            ease: "power3.out",
          }
        );
      }

      if (galleryRef.current) {
        const cards = galleryRef.current.querySelectorAll(
          "[data-gallery-card]"
        );
        if (cards.length) {
          gsap.from(cards, {
            autoAlpha: 0,
            y: 40,
            rotateY: 6,
            stagger: 0.12,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
            },
          });
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, [item?.id, media.length]);

  useEffect(() => {
    if (!id) return;

    loadEventDetail(id, { lang: language }).catch((error) => {
      console.error("Failed to load event details", error);
    });

    return () => {
      resetCategory("events");
    };
  }, [id, language, loadEventDetail, resetCategory]);

  return (
    <div
      className={`event-details min-h-screen bg-[var(--background)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
    >
      <SEOHead
        title={
          title
            ? `${title} | ${t("work.details.event.title", "Event Details")}`
            : t("work.details.event.title", "Event Details")
        }
        description={objective || title || ""}
        canonicalUrl={`/work/event/${id}`}
      />

      {eventState.loading ? (
        <div className="px-4 md:px-10 pt-28 pb-16 space-y-6">
          {[0, 1].map((idx) => (
            <div
              key={`event-skeleton-${idx}`}
              className="rounded-[32px] border border-[var(--foreground)]/50 bg-[var(--card-background)]/70 p-6 md:p-10"
            >
              <Skeleton active avatar paragraph={{ rows: 4 }} />
            </div>
          ))}
        </div>
      ) : item ? (
        <div className="px-4 md:px-10 pb-20 pt-28 space-y-14">
          <section
            ref={heroRef}
            className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center rounded-[36px] border border-[var(--foreground)] bg-[var(--card-background)]/90 p-6 md:p-12 shadow-xl backdrop-blur"
          >
            <div className="space-y-6">
              <button
                data-hero-child
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground)] px-4 py-2 text-sm text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                onClick={() => navigate(-1)}
              >
                {t("common.back", "Back")}
              </button>
              <p
                data-hero-child
                className="text-xs uppercase tracking-[0.4em] text-[var(--foreground)]/60"
              >
                {t("work.details.event.label", "Event")}
              </p>
              <h1
                data-hero-child
                className="text-3xl md:text-5xl font-semibold text-[var(--foreground)]"
              >
                {title || t("work.details.event.titleFallback", "Event Title")}
              </h1>
              {objective ? (
                <p
                  data-hero-child
                  className="text-base leading-relaxed text-[var(--foreground)]/80 whitespace-pre-line"
                >
                  {objective}
                </p>
              ) : null}
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-[var(--foreground)] bg-[var(--surface)] shadow-inner">
              {heroMedia ? (
                <img
                  src={heroMedia}
                  alt={title || "event hero"}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-[var(--foreground)]/50">
                  {t("work.details.event.noMedia", "Media coming soon")}
                </div>
              )}
              {item?.logo ? (
                <div className="absolute bottom-4 right-4 flex items-center justify-center rounded-2xl border border-white/70 bg-white/80 p-3 shadow-lg backdrop-blur">
                  <img
                    src={item.logo}
                    alt={`${
                      item.title ?? t("work.details.event.label", "Event")
                    } logo`}
                    className="max-h-14 max-w-[120px] object-contain"
                    loading="lazy"
                  />
                </div>
              ) : null}
            </div>
          </section>

          {gallery.length > 1 ? (
            <section ref={galleryRef} className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[var(--foreground)]/60">
                    {t("work.details.event.galleryLabel", "Highlights")}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[var(--foreground)]">
                    {t("work.details.event.galleryTitle", "Event Gallery")}
                  </h2>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.slice(1).map((image, index) => (
                  <div
                    data-gallery-card
                    key={`${image}-${index}`}
                    className="group relative overflow-hidden rounded-3xl border border-[var(--foreground)] bg-[var(--surface)] shadow-md"
                  >
                    <img
                      src={image}
                      alt={`${title || "event"} media ${index + 2}`}
                      className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center py-32 text-center text-sm text-red-400">
          {eventState.error ??
            t("work.details.event.notAvailable", "Event currently unavailable")}
        </div>
      )}

      <ContactUs />
      <Footer />
    </div>
  );
};

export default EventDetails;
