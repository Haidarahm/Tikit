import React, { useState } from "react";
import GradientText from "../../components/GradientText";
import { useTheme } from "../../store/ThemeContext";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaSnapchat,
  FaLink,
} from "react-icons/fa";

// Social media platforms with icons
const SOCIAL_PLATFORMS = [
  { value: "instagram", label: "Instagram", icon: FaInstagram },
  { value: "tiktok", label: "TikTok", icon: FaTiktok },
  { value: "youtube", label: "YouTube", icon: FaYoutube },
  { value: "facebook", label: "Facebook", icon: FaFacebook },
  { value: "twitter", label: "Twitter", icon: FaTwitter },
  { value: "linkedin", label: "LinkedIn", icon: FaLinkedin },
  { value: "snapchat", label: "Snapchat", icon: FaSnapchat },
  { value: "other", label: "Other", icon: FaLink },
];

// FloatingInput Component (placeholder - replace with your actual component)
const FloatingInput = ({ id, label, containerClassName }) => {
  const { isRtl } = useI18nLanguage();
  return (
    <div className={containerClassName}>
      <div className="relative">
        <input
          type="text"
          id={id}
          className="w-full px-4 py-3 bg-transparent border dark:border-white/30 rounded-lg text-[var(--foreground)] placeholder-transparent focus:border-[var(--foreground)] focus:outline-none peer"
          placeholder={label}
        />
        <label
          htmlFor={id}
          className={`absolute ${
            isRtl ? "right-4" : "left-4"
          } -top-2.5 bg-[var(--background)] px-1 text-[var(--foreground)] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

// GradientText Component (placeholder - replace with your actual component)

const SocialLinkInput = ({
  id,
  index,
  platform,
  link,
  onPlatformChange,
  onLinkChange,
  onRemove,
  canRemove,
  isRtl,
}) => {
  const selectedPlatform = SOCIAL_PLATFORMS.find((p) => p.value === platform);
  const Icon = selectedPlatform?.icon || FaLink;

  return (
    <div className="col-span-1 sm:col-span-2 flex gap-2 md:gap-3">
      {/* Platform Dropdown */}
      <div className="relative flex-none w-40 md:w-48">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="text-[var(--foreground)]" size={20} />
          </div>
          <select
            id={`${id}-platform`}
            value={platform}
            onChange={(e) => onPlatformChange(index, e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none appearance-none ${
              isRtl ? "text-right" : ""
            }`}
            style={{
              paddingLeft: isRtl ? "0.75rem" : "2.5rem",
              paddingRight: isRtl ? "2.5rem" : "1rem",
            }}
          >
            {SOCIAL_PLATFORMS.map((social) => {
              const SocialIcon = social.icon;
              return (
                <option key={social.value} value={social.value}>
                  {social.label}
                </option>
              );
            })}
          </select>
          {!isRtl && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-[var(--foreground)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
          {isRtl && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-[var(--foreground)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Link Input */}
      <div className="relative flex-1">
        <input
          type="url"
          id={`${id}-link`}
          value={link}
          onChange={(e) => onLinkChange(index, e.target.value)}
          className={`w-full px-4 py-3 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] placeholder-transparent focus:border-[var(--foreground)] focus:outline-none peer ${
            isRtl ? "text-right" : ""
          }`}
          placeholder="Enter link"
        />
        <label
          htmlFor={`${id}-link`}
          className={`absolute ${
            isRtl ? "right-4" : "left-4"
          } -top-2.5 bg-[var(--background)] px-1 text-[var(--foreground)] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm`}
        >
          Link
        </label>
      </div>

      {/* Remove Button */}
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="flex-none w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors hover:scale-105"
        >
          ×
        </button>
      )}
    </div>
  );
};

const Action = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  const [isSecondSlide, setIsSecondSlide] = useState(false);
  const [socialLinks, setSocialLinks] = useState([
    { platform: "instagram", link: "" },
  ]);

  const handleSlideClick = (slideNumber) => {
    setIsSecondSlide(slideNumber === 2);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "instagram", link: "" }]);
  };

  const removeSocialLink = (index) => {
    if (socialLinks.length > 1) {
      setSocialLinks(socialLinks.filter((_, i) => i !== index));
    }
  };

  const updateSocialPlatform = (index, platform) => {
    const updated = [...socialLinks];
    updated[index].platform = platform;
    setSocialLinks(updated);
  };

  const updateSocialLink = (index, link) => {
    const updated = [...socialLinks];
    updated[index].link = link;
    setSocialLinks(updated);
  };

  return (
    <div
      data-scroll-section
      className={`snap-start snap-always min-h-screen justify-center flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-24 xl:gap-32 py-8 md:py-12  px-4 md:px-8 lg:px-14 ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-start space-y-4 md:space-y-6">
        <h2 className="text-base md:text-2xl mb-0 lg:text-3xl xl:text-4xl text-[var(--foreground)]/80">
          {t("contact.action.subtitle")}
        </h2>
        <GradientText
          colors={gradientColors}
          animationSpeed={5}
          showBorder={false}
          className="text-4xl  md:text-5xl ml-0 lg:text-6xl text-center md:text-start font-bold leading-tight"
        >
          {t("contact.action.title")}{" "}
        </GradientText>
        {/* text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight */}
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-light text-[var(--foreground)]/90 leading-snug">
          {t("contact.action.description")}
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8 lg:gap-10">
        {/* Toggle Switch */}
        <div
          className={`w-full border flex relative border-[var(--secondary)] h-12 md:h-14 rounded-full ${
            isRtl ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`move-item absolute w-1/2 h-full bg-[var(--secondary)] rounded-full transition-all duration-300 ease-in-out ${
              isSecondSlide ? "left-1/2" : "left-0"
            }`}
          />
          <div
            className={`swiper-slide w-1/2 flex justify-center items-center relative z-10 cursor-pointer text-sm md:text-base font-medium transition-colors duration-300 ${
              !isSecondSlide
                ? "text-[var(--background)]"
                : "text-[var(--foreground)]"
            }`}
            onClick={() => handleSlideClick(1)}
          >
            {t("contact.action.client")}
          </div>
          <div
            className={`swiper-slide w-1/2 flex justify-center items-center relative z-10 cursor-pointer text-sm md:text-base font-medium transition-colors duration-300 ${
              isSecondSlide
                ? "text-[var(--background)]"
                : "text-[var(--foreground)]"
            }`}
            onClick={() => handleSlideClick(2)}
          >
            {t("contact.action.influencer")}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 flex-1">
          <FloatingInput
            id="contact-name"
            label={t("contact.action.form.name")}
            containerClassName="col-span-1"
          />
          <FloatingInput
            id="contact-email"
            label={t("contact.action.form.email")}
            containerClassName="col-span-1"
          />
          <FloatingInput
            id="contact-phone"
            label={t("contact.action.form.phone")}
            containerClassName="col-span-1"
          />
          {!isSecondSlide ? (
            <>
              <FloatingInput
                id="contact-subject"
                label={t("contact.action.form.subject")}
                containerClassName="col-span-1"
              />

              {/* Responsive Message Textarea */}
              <div className="col-span-1 sm:col-span-2">
                <div className="relative">
                  <textarea
                    id="contact-message"
                    rows={4}
                    className="w-full px-4 py-3 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] placeholder-transparent focus:border-[var(--foreground)] focus:outline-none peer resize-y min-h-[120px] md:min-h-[160px]"
                    placeholder={t("contact.action.form.message")}
                  />
                  <label
                    htmlFor="contact-message"
                    className={`absolute ${
                      isRtl ? "right-4" : "left-4"
                    } -top-2.5 bg-[var(--background)] px-1 text-[var(--foreground)] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm`}
                  >
                    {t("contact.action.form.message")}
                  </label>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Social Links Section */}
              {socialLinks.map((social, index) => (
                <SocialLinkInput
                  key={index}
                  id={`social-${index}`}
                  index={index}
                  platform={social.platform}
                  link={social.link}
                  onPlatformChange={updateSocialPlatform}
                  onLinkChange={updateSocialLink}
                  onRemove={removeSocialLink}
                  canRemove={socialLinks.length > 1}
                  isRtl={isRtl}
                />
              ))}

              {/* Add Social Link Button */}
              <button
                type="button"
                onClick={addSocialLink}
                className="col-span-1 sm:col-span-2 flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-[var(--secondary)] dark:border-white/30 rounded-lg text-[var(--secondary)] hover:bg-[var(--secondary)]/10 transition-all hover:scale-105"
              >
                <span className="text-xl font-bold">+</span>
                <span>
                  {t("contact.action.addSocialLink") || "Add Social Link"}
                </span>
              </button>
            </>
          )}

          {/* Submit Button */}
          <button className="px-5 h-12 md:h-14 cursor-pointer relative col-span-1 sm:col-span-2 rounded-full group  font-medium bg-transparent text-[var(--secondary)] border border-[var(--secondary)] flex items-center justify-center transition-all hover:scale-105 overflow-hidden">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out rounded-full transform translate-y-0 bg-[var(--secondary)]  group-hover:h-full opacity-90"></span>
            <span className="relative uppercase group-hover:text-[var(--background)]  text-sm md:text-base font-semibold">
              {t("contact.action.form.submit")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Action;
