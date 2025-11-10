import React, { useEffect, useMemo, useState, memo } from "react";
import StickyPinnedSection from "../../components/ui/StickyPinnedSection";
import { useWorksSectionsStore } from "../../store/work/worksSectionsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const WorkSection = memo(() => {
  const { sections, loadSections, loading, error } = useWorksSectionsStore();
  const { language, isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before making API calls
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      loadSections({ lang: language ,page: 1, per_page: 3});
    }
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
          <img
            src={mediaUrl}
            alt={title || "work"}
            className="h-full rounded-[20px] w-full object-cover"
            loading="lazy"
          />
        ) : null,
      };
    });
  }, [sections, isClient, language]);

  // Show loading state during initial load
  if (!isClient || loading) {
    return (
      <div className="section work-section-container my-6 md:my-16 relative flex flex-col mx-auto z-10 w-full justify-center">
        <div className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center">
          <h1 className="text-[var(--foreground)] md:text-center font-bold text-[18px] md:text-[32px]">
            {t("home.work.title")}
          </h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-[var(--foreground)]">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state if API call failed
  if (error) {
    return (
      <div className="section my-6 md:my-16 relative flex flex-col mx-auto z-10 w-full justify-center">
        <div className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center">
          <h1 className="text-[var(--foreground)] md:text-center font-bold text-[18px] md:text-[32px]">
            {t("home.work.title")}
          </h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error loading works: {error}</div>
        </div>
      </div>
    );
  }

  return (
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
        className={`mobile-view gap-[30px] h-full md:hidden relative text-[var(--foreground)] flex flex-col w-full px-[20px] ${
          isRtl ? "font-cairo" : "font-hero-light"
        }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="main-content w-full flex flex-col gap-[20px] mt-16">
          {(items || []).map((item, index) => (
            <div
              key={(item.title || "") + String(index)}
              className="element-wrapper flex flex-col w-full gap-[30px]"
            >
              <div className="text flex flex-col gap-[10px]">
                <div className="flex items-center justify-between">
                  {item.title && (
                    <h2 className="text-[20px] font-bold">{item.title}</h2>
                  )}
                  <button
                    className="rounded-full border font-light 
                    border-[var(--secondary)] text-[var(--secondary)] text-[11px] uppercase 
                    px-4 py-1 
                    transition-colors"
                    onClick={() =>
                      navigate(`/details/${encodeURIComponent(item.id)}`)
                    }
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
              {item.media ? (
                <div className="image relative w-full h-[250px] rounded-[20px] overflow-hidden">
                  {item.media}
                </div>
              ) : null}
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
  );
});

WorkSection.displayName = "WorkSection";

export default WorkSection;
