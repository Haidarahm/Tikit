import { useI18nLanguage } from "../store/I18nLanguageContext";

/**
 * Returns RTL-aware font class names.
 * - fontHeading: for headings/bold (font-cairo | font-antonio)
 * - fontBody: for body text (font-cairo | font-hero-light)
 * - fontHeadingAligned: fontHeading + text-right/left
 * - fontBodyAligned: fontBody + text-right/left
 */
export function useFontClass() {
  const { isRtl } = useI18nLanguage();

  return {
    fontHeading: isRtl ? "font-cairo" : "font-antonio",
    fontBody: isRtl ? "font-cairo" : "font-hero-light",
    fontHeadingAligned: isRtl ? "font-cairo text-right" : "font-antonio text-left",
    fontBodyAligned: isRtl ? "font-cairo text-right" : "font-hero-light text-left",
    isRtl,
  };
}
