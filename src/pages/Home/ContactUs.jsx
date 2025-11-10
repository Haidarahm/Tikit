import React, { useEffect, useState, useMemo, useRef, memo } from "react";
import FloatingInput from "../../components/ui/FloatingInput";
import LogoLoop from "../../components/LogoLoop";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import b1 from "../../assets/brands/1.svg";
import b2 from "../../assets/brands/2.svg";
import b3 from "../../assets/brands/3.svg";
import b4 from "../../assets/brands/4.svg";
import b5 from "../../assets/brands/5.svg";
import b1Light from "../../assets/brands/1-light.svg";
import b2Light from "../../assets/brands/2-light.svg";
import b3Light from "../../assets/brands/3-light.svg";
import b4Light from "../../assets/brands/4-light.svg";
import b5Light from "../../assets/brands/5-light.svg";
import GradientText from "../../components/GradientText";
import { useTheme } from "../../store/ThemeContext";
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

// Social Platform Dropdown
const SocialPlatformDropdown = ({ id, value, onChange, isRtl, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = SOCIAL_PLATFORMS.find((opt) => opt.value === value);
  const SelectedIcon = selectedOption?.icon || FaLink;

  const getTranslatedLabel = (platformValue) => {
    return (
      t(`contact.action.socialPlatforms.${platformValue}`) ||
      selectedOption?.label
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none social-select flex items-center gap-2 ${
          isRtl ? "text-right" : "text-left"
        } ${isOpen ? "border-[var(--secondary)]" : ""}`}
      >
        <SelectedIcon
          className="text-[var(--foreground)] opacity-70 flex-shrink-0"
          size={18}
        />
        <span className="flex-1 truncate  text-sm">
          {getTranslatedLabel(value) || t("contact.action.selectPlatform")}
        </span>
        <svg
          className={`w-3 h-3 text-[var(--foreground)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
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
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu">
          {SOCIAL_PLATFORMS.map((option) => {
            const OptionIcon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`custom-dropdown-item ${
                  value === option.value ? "selected" : ""
                }`}
              >
                <OptionIcon
                  className="text-[var(--foreground)] flex-shrink-0"
                  size={18}
                />
                <span className="truncate text-sm">
                  {getTranslatedLabel(option.value)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

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
  removingIndex,
  t,
}) => {
  return (
    <div
      className={`col-span-1 flex gap-2 social-link-container ${
        removingIndex === index ? "removing" : ""
      }`}
    >
      <div className="relative flex-none w-32">
        <SocialPlatformDropdown
          id={`${id}-platform`}
          value={platform}
          onChange={(value) => onPlatformChange(index, value)}
          isRtl={isRtl}
          t={t}
        />
      </div>
      <div className="relative flex-1">
        <input
          type="url"
          id={`${id}-link`}
          value={link}
          onChange={(e) => onLinkChange(index, e.target.value)}
          className={`w-full px-3 py-2 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] text-sm placeholder-transparent focus:border-[var(--foreground)] focus:outline-none peer social-link-input ${
            isRtl ? "text-right" : ""
          }`}
          placeholder="Enter link"
        />
        <label
          htmlFor={`${id}-link`}
          className={`absolute ${
            isRtl ? "right-3" : "left-3"
          } -top-2.5 bg-[#F5F7FB] dark:bg-[#000] px-1 text-[var(--foreground)] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-xs`}
        >
          {t("contact.action.form.link")}
        </label>
      </div>
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="flex-none w-8 h-8 flex items-center justify-center rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 social-remove-btn text-lg"
        >
          ×
        </button>
      )}
    </div>
  );
};

const ContactUs = memo(({ className = "" }) => {
  const [isSecondSlide, setIsSecondSlide] = useState(false);
  const [socialLinks, setSocialLinks] = useState([
    { platform: "instagram", link: "" },
  ]);
  const [removingIndex, setRemovingIndex] = useState(null);

  const handleSlideClick = (slideNumber) => {
    setIsSecondSlide(slideNumber === 2);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "instagram", link: "" }]);
  };

  const removeSocialLink = (index) => {
    if (socialLinks.length > 1) {
      setRemovingIndex(index);
      setTimeout(() => {
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
        setRemovingIndex(null);
      }, 300);
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

  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  const imageLogos = useMemo(
    () =>
      theme === "light"
        ? [
            { src: b1Light, alt: "Brand 1" },
            { src: b2Light, alt: "Brand 2" },
            { src: b3Light, alt: "Brand 3" },
            { src: b4Light, alt: "Brand 4" },
            { src: b5Light, alt: "Brand 5" },
          ]
        : [
            { src: b1, alt: "Brand 1" },
            { src: b2, alt: "Brand 2" },
            { src: b3, alt: "Brand 3" },
            { src: b4, alt: "Brand 4" },
            { src: b5, alt: "Brand 5" },
          ],
    [theme]
  );
  // "bg-[#F5F7FB] text-[var(--foreground)] border border-black/5"
  return (
    <div
      data-scroll-section
      className={`relative my-5 h-[80vh] md:h-screen md:my-10 gap-3.5  overflow-hidden text-[var(--foreground)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      } rounded-[25px] flex flex-col mx-auto py-[40px] md:py-[60px] px-[40px] md:px-[50px]  w-[95vw] bg-[#F5F7FB]  dark:bg-black ${className}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="email  w-full flex flex-col md:flex-row h-2/3 justify-between items-center md:items-stretch relative z-10 ">
        <div className="texts flex  flex-col relative   ">
          <h3 className="subtitle text-center md:text-start text-[16px] md:text-[50px]">
            {t("home.contactUs.subtitle")}
          </h3>
          <GradientText
            // colors={["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]}
            colors={gradientColors}
            animationSpeed={5}
            showBorder={false}
            className="title text-[32px] text-center md:text-start md:text-[70px] font-bold "
          >
            {t("home.contactUs.title")}{" "}
          </GradientText>

          <p className="description  hidden md:block text-[16px] md:text-[24px] font-light w-full">
            {t("home.contactUs.description")} <br className="hidden md:block" />{" "}
            {t("home.contactUs.description2")}
          </p>
        </div>
        <div className="action w-full md:w-[45%] gap-[20px] md:gap-0 flex-col flex justify-between">
          <div className="title text-center font-light md:font-medium md:text-start text-[20px] md:text-[24px]">
            {t("home.contactUs.helpText")}
          </div>
          <div
            className={`swiper-wrapper w-full border flex ${
              isRtl ? "flex-row-reverse" : ""
            } relative border-[var(--secondary)]  h-[50px] rounded-full`}
          >
            <div
              className={`move-item absolute  w-1/2 h-full bg-[var(--secondary)] rounded-full transition-all duration-300 ease-in-out ${
                isSecondSlide
                  ? isRtl
                    ? "right-0"
                    : "left-1/2"
                  : isRtl
                  ? "right-1/2"
                  : "left-0"
              }`}
            />
            <div
              className={`swiper-slide w-1/2 flex justify-center items-center relative z-10 cursor-pointer ${
                !isSecondSlide
                  ? "text-[var(--background)]"
                  : "text-[var(--foreground)] "
              }`}
              onClick={() => handleSlideClick(1)}
            >
              {t("home.contactUs.client")}
            </div>
            <div
              className={`swiper-slide w-1/2 flex justify-center items-center relative z-10 cursor-pointer ${
                isSecondSlide
                  ? "text-[var(--background)]"
                  : "text-[var(--foreground)] "
              }`}
              onClick={() => handleSlideClick(2)}
            >
              {t("home.contactUs.influencer")}
            </div>
          </div>
          <div className="inputs-wrapper flex flex-col gap-3 mt-3">
            <div className="inputs flex justify-between gap-[20px]">
              <FloatingInput
                id="name"
                label={t("home.contactUs.name")}
                containerClassName="flex-1 hidden md:block"
              />
              <FloatingInput
                id="email"
                label={t("home.contactUs.email")}
                containerClassName="flex-1"
              />
            </div>

            <FloatingInput
              id="phone"
              label={t("contact.action.form.phone")}
              type="tel"
              containerClassName="w-full"
            />

            {!isSecondSlide ? (
              <>
                <FloatingInput
                  id="subject"
                  label={t("contact.action.form.subject")}
                  containerClassName="w-full"
                />
                <div className="relative">
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-3 py-2 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] placeholder-transparent focus:border-[var(--foreground)] focus:outline-none peer resize-y min-h-[80px] text-sm"
                    placeholder={t("contact.action.form.message")}
                  />
                  <label
                    htmlFor="message"
                    className={`absolute ${
                      isRtl ? "right-3" : "left-3"
                    } -top-2.5 bg-[var(--background)] px-1 text-[var(--foreground)] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-xs`}
                  >
                    {t("contact.action.form.message")}
                  </label>
                </div>
              </>
            ) : (
              <>
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
                    removingIndex={removingIndex}
                    t={t}
                  />
                ))}

                <button
                  type="button"
                  onClick={addSocialLink}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-transparent border border-[var(--secondary)] dark:border-white/30 rounded-lg text-[var(--secondary)] hover:bg-[var(--secondary)]/10 social-add-btn text-sm"
                >
                  <span className="text-lg font-bold">+</span>
                  <span>
                    {t("contact.action.addSocialLink") || "Add Social Link"}
                  </span>
                </button>
              </>
            )}
          </div>
          <button className="px-5 h-12 md:h-14 cursor-pointer relative mt-3 rounded-full group  font-medium bg-transparent text-[var(--secondary)] border border-[var(--secondary)] flex items-center justify-center transition-all hover:scale-105 overflow-hidden">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out rounded-full transform translate-y-0 bg-[var(--secondary)]  group-hover:h-full opacity-90"></span>
            <span className="relative uppercase group-hover:text-[var(--background)]  text-sm md:text-base font-semibold">
              {t("home.contactUs.button")}
            </span>
          </button>
        </div>
      </div>
      <div className="brands flex-1 w-full relative z-10">
        <div className="flex w-full justify-between items-center gap-4 mb-4">
          <div className="h-[1px] w-[42%] bg-gray-400"></div>

          <div className="title font-light text-[14px] text-center">
            {t("home.contactUs.brandsTrust")}
          </div>

          <div className="h-[1px] w-[42%] bg-gray-400"></div>
        </div>
        <div
          style={{
            height: "120px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LogoLoop
            logos={imageLogos}
            speed={50}
            direction={isRtl ? "right" : "left"}
            logoHeight={70}
            gap={150}
            pauseOnHover
            scaleOnHover
            className={isRtl ? "flex-row-reverse" : ""}
            fadeOut
            fadeOutColor={theme === "light" ? "#F5F7FB" : "#000"}
            ariaLabel="Brand partners"
          />
        </div>
      </div>
    </div>
  );
});

ContactUs.displayName = "ContactUs";

export default ContactUs;
