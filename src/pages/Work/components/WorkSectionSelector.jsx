import React from "react";

const WorkSectionSelector = ({
  sections,
  loading,
  error,
  activeSectionId,
  onSelect,
  isRtl,
}) => {
  return (
    <div className="w-full mt-10">
      <div
        className={`section-swiper flex gap-6 overflow-x-auto px-6 py-2 md:px-10 md:py-4 scrollbar-hide relative ${
          isRtl ? "flex-row-reverse" : ""
        }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {loading && (!sections || sections.length === 0) ? (
          <div className="min-w-[200px] text-center text-sm opacity-70">
            Loading sections...
          </div>
        ) : null}

        {error ? (
          <div className="min-w-[200px] text-center text-sm text-red-400">
            {error}
          </div>
        ) : null}

        {(sections || []).map((section) => {
          const isActive = section.id === activeSectionId;
          return (
            <button
              key={section.id}
              type="button"
              className={`group relative h-[140px] min-w-[220px] shrink-0 overflow-hidden rounded-3xl border transition-all duration-500 ease-out md:h-[160px] md:min-w-[260px] ${
                isActive
                  ? "scale-105 border-white/70 shadow-lg shadow-white/10"
                  : "opacity-80 hover:opacity-100 hover:scale-105 border-white/20"
              }`}
              style={{
                backgroundImage: section.media
                  ? `url(${section.media})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "var(--muted)",
              }}
              onClick={() => {
                if (section.id !== activeSectionId) {
                  onSelect(section);
                }
              }}
              aria-pressed={isActive}
            >
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-[var(--accent)]/50 to-[var(--accent-foreground)]/50 opacity-90"
                    : "bg-black/40 hover:bg-black/20"
                }`}
              />

              <span className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center text-base font-semibold text-white md:text-xl">
                {section.title}
              </span>

              <span
                className={`absolute bottom-4 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-foreground)] transition-all duration-500 ${
                  isActive
                    ? "w-3/4 opacity-100"
                    : "group-hover:w-3/4 opacity-80"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WorkSectionSelector;
