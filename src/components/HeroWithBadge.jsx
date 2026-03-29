import React from "react";
import TikitTitle from "./TikitTitle";

/**
 * Reusable hero section with optional badge, TikitTitle, and description.
 * Props:
 *   - badge: string | ReactNode (optional)
 *   - title: string
 *   - mainWord: string (optional)
 *   - description: string | React.ReactNode (optional)
 *   - badgeVariant: "default" | "pulse" - pulse adds animated dot
 *   - titleClassName: string (e.g. "hero-animate block", "blogs-hero-animate block")
 *   - descriptionClassName: string
 *   - disableAnimation: boolean
 *   - contentClassName: string (wrapper classes)
 */
const HeroWithBadge = ({
  badge,
  title,
  mainWord = "",
  description,
  badgeVariant = "default",
  titleClassName = "hero-animate block",
  descriptionClassName = "text-lg md:text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto leading-relaxed",
  disableAnimation = false,
  contentClassName = "relative z-10 max-w-6xl mx-auto text-center mt-12",
}) => {
  const badgeBaseClasses = "inline-block px-6 py-2 mb-6 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-semibold uppercase tracking-wider";

  const renderBadge = () => {
    if (!badge) return null;

    if (badgeVariant === "pulse") {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#52C3C5]/10 dark:bg-[#52C3C5]/20 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#52C3C5] animate-pulse" />
          <span className="text-sm font-medium text-[#52C3C5]">{badge}</span>
        </div>
      );
    }

    return (
      <span className={`${badgeBaseClasses} hero-animate`}>
        {badge}
      </span>
    );
  };

  return (
    <div className={contentClassName}>
      {renderBadge()}
      <TikitTitle
        className={titleClassName}
        title={title}
        mainWord={mainWord}
        disableAnimation={disableAnimation}
      />
      {description != null && description !== "" && (
        <p className={descriptionClassName}>{description}</p>
      )}
    </div>
  );
};

export default HeroWithBadge;
