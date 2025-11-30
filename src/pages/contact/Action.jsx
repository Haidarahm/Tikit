import React, { useState, useRef, useEffect } from "react";
import GradientText from "../../components/GradientText";
import { useTheme } from "../../store/ThemeContext";
import { useClient } from "../../store/ClientContext";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useContactStore } from "../../store/contactStore";
import { useToastStore } from "../../store/toastStore";
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
import "./contact.css";

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
const FloatingInput = ({ id, label, containerClassName, inputProps = {} }) => {
  const { isRtl } = useI18nLanguage();
  return (
    <div className={containerClassName}>
      <div className="relative">
        <input
          type="text"
          id={id}
          className="w-full px-4 py-3 bg-transparent border dark:border-white/30 rounded-lg text-[var(--foreground)] placeholder-transparent focus:border-[var(--foreground)] focus:outline-none peer"
          placeholder={label}
          {...inputProps}
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

// Social Platform Dropdown with translations
const SocialPlatformDropdown = ({ id, value, onChange, isRtl, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  // Get translated label
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
        className={`w-full px-4 py-3 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none social-select flex items-center gap-2 ${
          isRtl ? "text-right" : "text-left"
        } ${isOpen ? "border-[var(--secondary)]" : ""}`}
      >
        <SelectedIcon
          className="text-[var(--foreground)] opacity-70 flex-shrink-0"
          size={22}
        />
        <span className="flex-1 truncate">
          {getTranslatedLabel(value) || t("contact.action.selectPlatform")}
        </span>
        <svg
          className={`w-4 h-4 text-[var(--foreground)] transition-transform duration-200 ${
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

      {/* Dropdown Menu */}
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
                  size={22}
                />
                <span className="truncate">
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
      className={`col-span-1 sm:col-span-2 flex gap-2 md:gap-3 social-link-container ${
        removingIndex === index ? "removing" : ""
      }`}
    >
      {/* Platform Dropdown */}
      <div className="relative flex-none w-40 md:w-48">
        <SocialPlatformDropdown
          id={`${id}-platform`}
          value={platform}
          onChange={(value) => onPlatformChange(index, value)}
          isRtl={isRtl}
          t={t}
        />
      </div>

      {/* Link Input */}
      <div className="relative flex-1">
        <input
          type="url"
          id={`${id}-link`}
          value={link}
          onChange={(e) => onLinkChange(index, e.target.value)}
          className={`w-full px-4 py-3 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] placeholder-transparent focus:border-[var(--foreground)] focus:outline-none peer social-link-input ${
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
          {t("contact.action.form.link")}
        </label>
      </div>

      {/* Remove Button */}
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="flex-none w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 social-remove-btn"
        >
          ×
        </button>
      )}
    </div>
  );
};

const Action = () => {
  const { theme } = useTheme();
  const { clientType } = useClient();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const actionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { sendContactEmail, loading } = useContactStore();

  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  const [isSecondSlide, setIsSecondSlide] = useState(false);
  const [socialLinks, setSocialLinks] = useState([
    { platform: "instagram", link: "" },
  ]);
  const [removingIndex, setRemovingIndex] = useState(null);

  // Check session storage on mount and set the swiper to influencer if needed
  useEffect(() => {
    const storedClientType = sessionStorage.getItem("client");
    if (storedClientType === "influencer") {
      setIsSecondSlide(true);
    }
  }, []);

  // Scroll to action section on mount if flagged
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("shouldScrollToAction");
    if (shouldScroll === "true" && actionRef.current) {
      // Clear the flag
      sessionStorage.removeItem("shouldScrollToAction");

      // Scroll to the action section
      setTimeout(() => {
        actionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, []);

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Basic validation
    if (!formData.email || !formData.email.trim()) {
      useToastStore
        .getState()
        .addToast("Please enter your email address", "error");
      return;
    }

    // For influencer form, include social links in message
    let messageToSend = formData.message;
    if (isSecondSlide && socialLinks.length > 0) {
      const socialLinksText = socialLinks
        .map((social) => `${social.platform}: ${social.link}`)
        .join("\n");
      messageToSend = messageToSend
        ? `${messageToSend}\n\nSocial Links:\n${socialLinksText}`
        : `Social Links:\n${socialLinksText}`;
    }

    const emailData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: isSecondSlide
        ? "Influencer Registration"
        : formData.subject || "Contact Form",
      message:
        messageToSend ||
        (isSecondSlide ? "Influencer registration request" : ""),
    };

    const success = await sendContactEmail(emailData);
    if (success) {
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSocialLinks([{ platform: "instagram", link: "" }]);
    }
  };

  return (
    <div
      ref={actionRef}
      id="contact-action-section"
      data-scroll-section
      className={`snap-start snap-always min-h- justify-center flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-24 xl:gap-32 py-16 md:py-12  px-4 md:px-8 lg:px-14 ${
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
            className={`swiper-slide-contact w-1/2 flex justify-center items-center relative z-10 cursor-pointer text-sm md:text-base font-medium transition-colors duration-300 ${
              !isSecondSlide
                ? "text-[var(--background)]"
                : "text-[var(--secondary)]"
            }`}
            onClick={() => handleSlideClick(1)}
          >
            {t("contact.action.client")}
          </div>
          <div
            className={`swiper-slide-contact w-1/2 flex justify-center items-center relative z-10 cursor-pointer text-sm md:text-base font-medium transition-colors duration-300 ${
              isSecondSlide
                ? "text-[var(--background)]"
                : "text-[var(--secondary)]"
            }`}
            onClick={() => handleSlideClick(2)}
          >
            {t("contact.action.influencer")}
          </div>
        </div>

        {/* Form Inputs */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 flex-1"
        >
          <FloatingInput
            id="contact-name"
            label={t("contact.action.form.name")}
            containerClassName="col-span-1"
            inputProps={{
              value: formData.name,
              onChange: (e) => handleInputChange("name", e.target.value),
            }}
          />
          <FloatingInput
            id="contact-email"
            label={t("contact.action.form.email")}
            containerClassName="col-span-1"
            inputProps={{
              value: formData.email,
              onChange: (e) => handleInputChange("email", e.target.value),
              type: "email",
            }}
          />
          <FloatingInput
            id="contact-phone"
            label={t("contact.action.form.phone")}
            containerClassName="col-span-1"
            inputProps={{
              value: formData.phone,
              onChange: (e) => handleInputChange("phone", e.target.value),
            }}
          />
          {!isSecondSlide ? (
            <>
              <FloatingInput
                id="contact-subject"
                label={t("contact.action.form.subject")}
                containerClassName="col-span-1"
                inputProps={{
                  value: formData.subject,
                  onChange: (e) => handleInputChange("subject", e.target.value),
                }}
              />

              {/* Responsive Message Textarea */}
              <div className="col-span-1 sm:col-span-2">
                <div className="relative">
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
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
                  removingIndex={removingIndex}
                  t={t}
                />
              ))}

              {/* Add Social Link Button */}
              <button
                type="button"
                onClick={addSocialLink}
                className="col-span-1 sm:col-span-2 flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-[var(--secondary)] dark:border-white/30 rounded-lg text-[var(--secondary)] hover:bg-[var(--secondary)]/10 social-add-btn"
              >
                <span className="text-xl font-bold">+</span>
                <span>
                  {t("contact.action.addSocialLink") || "Add Social Link"}
                </span>
              </button>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`px-5 h-12 md:h-14 cursor-pointer relative col-span-1 sm:col-span-2 rounded-full group font-medium bg-transparent text-[var(--secondary)] border border-[var(--secondary)] flex items-center justify-center transition-all hover:scale-105 overflow-hidden ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out rounded-full transform translate-y-0 bg-[var(--secondary)]  group-hover:h-full opacity-90"></span>
            <span className="relative uppercase group-hover:text-[var(--background)]  text-sm md:text-base font-semibold flex items-center gap-2">
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 md:h-5 md:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {t("contact.action.form.submit")}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Action;
