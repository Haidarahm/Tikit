import React, { useEffect, useMemo, useState, memo, useRef } from "react";
import StickyPinnedSection from "../../components/ui/StickyPinnedSection";
import { useWorksSectionsStore } from "../../store/work/worksSectionsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Image component with skeleton placeholder
const ImageWithSkeleton = ({ src, alt, className, ...props }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (src && imgRef.current) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [src]);

  const handleLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="relative w-full h-full uhjtryu">
      {imageLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 animate-pulse rounded-[20px]" />
      )}
      {imageError ? (
        <div className="w-full h-full bg-gradient-to-br from-[var(--foreground)]/10 to-[var(--foreground)]/5 flex items-center justify-center rounded-[20px]">
          <div className="text-[var(--foreground)]/30 text-sm">Image unavailable</div>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

const WorkSection = memo(() => {
  const { sections, loadSections, loading, error } = useWorksSectionsStore();
  const { language, isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const retryTimeoutRef = useRef(null);
  const maxRetries = 3;

  // Ensure we're on the client side before making API calls
  useEffect(() => {
    setIsClient(true);
  }, []);

  const sectionRef = React.useRef(null);

  // Reset retry count when sections load successfully
  useEffect(() => {
    if (sections && sections.length > 0 && !loading && !error) {
      setRetryCount(0);
    }
  }, [sections, loading, error]);

  // Retry logic for API calls
  useEffect(() => {
    if (error && retryCount < maxRetries && isClient) {
      // Clear any existing timeout
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      
      // Retry after exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, retryCount) * 1000;
      retryTimeoutRef.current = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        if (sectionRef.current) {
          loadSections({ lang: language, page: 1, per_page: 3 });
        }
      }, delay);
    }

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [error, retryCount, loadSections, language, isClient]);

  useEffect(() => {
    if (!isClient) return;
    setRetryCount(0);
    loadSections({ lang: language, page: 1, per_page: 3 });
  }, [loadSections, language, isClient]);

  const getLocalizedField = (item, baseKey) => {
    if (!item) return "";
    const langCode = (language || "en").toLowerCase();
    const primaryKey = `${baseKey}_${langCode}`;
    const shortLang =
      langCode.length > 2 ? `${baseKey}_${langCode.slice(0, 2)}` : null;

    return (
      item[primaryKey] ??
      (shortLang && item[shortLang]) ??
      item[`${baseKey}_en`] ??
      item[baseKey] ??
      ""
    );
  };

  const items = useMemo(() => {
    if (!isClient) return []; // Return empty array during SSR

    const list = Array.isArray(sections) ? sections : [];
    return list.map((section) => {
      const title = getLocalizedField(section, "title");
      const subtitle = getLocalizedField(section, "subtitle");
      const description = getLocalizedField(section, "description");
      const mediaUrl = section?.media;

      return {
        id: section?.id ?? `${title}-${section?.type ?? "work"}`,
        title,
        subtitle,
        description,
        media: mediaUrl ? (
          <ImageWithSkeleton
            src={mediaUrl}
            alt={title || "work"}
            width={400}
            height={300}
            className="h-full rounded-[20px] w-full object-cover"
          />
        ) : (
          // Show skeleton placeholder when no media URL
          <div className="w-full h-full bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 animate-pulse rounded-[20px]" />
        ),
        mediaUrl, // Keep original URL for reference
      };
    });
  }, [sections, isClient, language]);

  const showSkeleton = !isClient || loading || (error && retryCount < maxRetries);

  return (
    <div ref={sectionRef} className="w-full">
      {showSkeleton ? (
        <div className="min-h-[1400px] md:min-h-[350vh] my-6 md:my-16 work-section-container relative flex flex-col mx-auto z-10 w-full justify-center">
          <div className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center">
            <h2 className="text-[var(--foreground)] md:text-center font-bold text-[18px] md:text-[32px]">
              {t("home.work.title")}
            </h2>
          </div>
          <div className="hidden md:block min-h-[1200px]">
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col gap-8 w-full max-w-6xl px-10">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="flex gap-10 items-center">
                    <div className="flex-1 space-y-4">
                      <div className="h-8 w-3/4 bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 rounded animate-pulse" />
                      <div className="h-6 w-1/2 bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 rounded animate-pulse" />
                      <div className="h-4 w-full bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 rounded animate-pulse" />
                    </div>
                    <div className="w-[25rem] lg:w-[35rem] h-[65vh] bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 rounded-xl animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:hidden px-[20px] space-y-6">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="flex flex-col gap-[20px]">
                <div className="space-y-3">
                  <div className="h-6 w-3/4 bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 rounded animate-pulse" />
                </div>
                <div className="w-full h-[250px] bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 rounded-[20px] animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {items && items.length > 0 && (
            <div
              className={`relative hidden md:block z-10 w-full overflow-visible text-[var(--foreground)] ${
                isRtl ? "font-cairo" : "font-hero-light"
              }`}
              dir={isRtl ? "rtl" : "ltr"}
            >
              <StickyPinnedSection items={items} heightPerItemVh={100} />
            </div>
          )}
          <div
            className={`mobile-view gap-[30px] min-h-[1400px] h-full md:hidden relative text-[var(--foreground)] flex flex-col w-full px-[20px] ${
              isRtl ? "font-cairo" : "font-hero-light"
            }`}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="main-content w-full flex flex-col gap-[20px] mt-16">
              <h2 className="text-[24px] font-bold font-antonio text-center">
                Our Works
              </h2>
              {(items || []).map((item, index) => (
                <div
                  key={(item.title || "") + String(index)}
                  className="element-wrapper mb-6 flex flex-col w-full gap-[30px]"
                >
                  <div className="text flex flex-col gap-[5px]">
                    <div className="flex items-center justify-between">
                      {item.title && (
                        <h2 className="text-[20px] font-bold">{item.title}</h2>
                      )}
                      <button
                        className="rounded-full border font-light 
                        border-[var(--secondary)] text-[var(--secondary)] text-[11px] uppercase 
                        px-4 py-1 
                        transition-colors"
                        onClick={() => {
                          try {
                            if (item.slug != null) {
                              navigate(`/work/${encodeURIComponent(item.slug)}`);
                            }
                          } catch (_) {}
                        }}
                      >
                        {t("home.work.viewWork")}
                      </button>
                    </div>
                    {item.subtitle ? (
                      <div className="subtitle text-[16px] opacity-80">
                        {item.subtitle}
                      </div>
                    ) : null}
                    {item.description ? (
                      <div className=" description text-[14px] opacity-80">
                        {item.description}
                      </div>
                    ) : null}
                  </div>
                  <div className="image relative w-full h-[250px] rounded-[20px] overflow-hidden">
                    {item.media || (
                      <div className="w-full h-full bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 animate-pulse rounded-[20px]" />
                    )}
                  </div>
                </div>
              ))}
              {(!items || items.length === 0) && !loading ? (
                <div className="text-center text-sm opacity-70">
                  {t("home.work.noWorks")}
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
});

WorkSection.displayName = "WorkSection";

export default WorkSection;
