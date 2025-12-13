import React from "react";
import GradientText from "../../../../components/GradientText.jsx";
import { FiArrowLeft } from "react-icons/fi";

const gradientPalette = (theme, isRtl) => {
  if (theme === "dark") {
    return ["#07D9F5", "#06AEC4", "#4E7CC6"];
  }
  if (isRtl) {
    return ["#FB8DEF", "#CE88C6", "#4E7CC6"];
  }
  return ["#52C3C5", "#5269C5", "#52A0C5"];
};

const CreativeHero = ({ mainImage, title, logo, theme, isRtl, t, onBack }) => {
  const fontClass = isRtl ? "font-cairo" : "font-antonio";
  const gradientColors = gradientPalette(theme, isRtl);

  if (mainImage) {
    return (
      <div className="relative overflow-hidden rounded-[32px] border border-[var(--foreground)]/10 shadow-2xl min-h-[500px] md:min-h-[600px]">
        <img
          src={mainImage}
          alt={title}
          width={1920}
          height={600}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[500px] md:min-h-[600px] p-8 md:p-10">
          <div className="flex flex-col items-center gap-8 text-center">
            {logo && (
              <div className="flex h-32 w-32 md:h-40 md:w-40 items-center justify-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-3 shadow-lg">
                <img
                  src={logo}
                  alt={title}
                  width={160}
                  height={160}
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm md:text-base uppercase tracking-[0.5em] text-white/80">
                {t("work.details.creative.campaign")}
              </p>
              <GradientText
                colors={gradientColors}
                animationSpeed={6}
                showBorder={false}
                className={`text-[48px] md:text-[64px] lg:text-[80px] font-bold leading-tight max-w-full ${fontClass}`}
              >
                {title}
              </GradientText>
            </div>

            <button
              onClick={onBack}
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20 hover:border-white/30"
            >
              <FiArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
              {t("work.details.creative.back")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[var(--foreground)]/10 bg-[var(--background)] p-8 md:p-10 shadow-xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-[var(--secondary)]/20 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-[var(--secondary)]/15 blur-3xl" />
      </div>
      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-1 items-start gap-5">
            {logo && (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--foreground)]/10 bg-[var(--background)]/50 p-2 shadow-lg">
                <img
                  src={logo}
                  alt={title}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div className="space-y-3 flex-1">
              <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">
                {t("work.details.creative.campaign")}
              </p>
              <GradientText
                colors={gradientColors}
                animationSpeed={6}
                showBorder={false}
                className={`text-[32px] md:text-[48px] font-bold ${fontClass}`}
              >
                {title}
              </GradientText>
            </div>
          </div>

          <button
            onClick={onBack}
            className="self-start inline-flex items-center gap-2 rounded-full border border-[var(--foreground)]/10 bg-[var(--container-bg)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
          >
            <FiArrowLeft className="h-4 w-4" />
            {t("work.details.creative.back")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreativeHero;
