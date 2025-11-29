import React from "react";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const AdditionalInfoInput = ({
  followerCount,
  onFollowerCountChange,
  message,
  onMessageChange,
  followerLabel = "Follower Count",
  messageLabel = "Why do you want to join us?",
  followerPlaceholder = "e.g. 50,000",
  messagePlaceholder = "Tell us about yourself and why you'd like to be managed by Tikit...",
  name = "additionalInfo",
  required = false,
  disabled = false,
  className = "",
}) => {
  // Format number with commas
  const formatNumber = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (!numericValue) return "";
    return parseInt(numericValue, 10).toLocaleString();
  };
  const { isRtl } = useI18nLanguage();
  const handleFollowerChange = (e) => {
    const formattedValue = formatNumber(e.target.value);
    if (onFollowerCountChange) {
      onFollowerCountChange(formattedValue);
    }
  };

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      {/* Follower Count Input */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor={`${name}_followers`}
          dir={isRtl ? "rtl" : "ltr"}
          className="text-[var(--foreground)] text-sm md:text-base font-medium"
        >
          {followerLabel}
        </label>
        <div className="relative">
          <div
            className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none ${
              isRtl ? "right-4" : "left-4"
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <input
            id={`${name}_followers`}
            name={`${name}_followers`}
            type="text"
            inputMode="numeric"
            value={followerCount || ""}
            onChange={handleFollowerChange}
            placeholder={followerPlaceholder}
            required={required}
            disabled={disabled}
            dir={isRtl ? "rtl" : "ltr"}
            className={`w-full py-3 md:py-4 rounded-[20px] bg-[#f5f5f5] dark:bg-[var(--container-bg)] text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base outline-none border border-gray-200 dark:border-gray-700 focus:border-[var(--secondary)] dark:focus:border-[var(--secondary)] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
              isRtl ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"
            }`}
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor={`${name}_message`}
          dir={isRtl ? "rtl" : "ltr"}
          className="text-[var(--foreground)] text-sm md:text-base font-medium"
        >
          {messageLabel}
        </label>
        <div className="relative">
          <textarea
            id={`${name}_message`}
            name={`${name}_message`}
            value={message || ""}
            onChange={(e) => onMessageChange && onMessageChange(e.target.value)}
            placeholder={messagePlaceholder}
            required={required}
            disabled={disabled}
            rows={5}
            dir={isRtl ? "rtl" : "ltr"}
            className={`w-full px-4 py-3 md:py-4 rounded-[20px] bg-[#f5f5f5] dark:bg-[var(--container-bg)] text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base outline-none border border-gray-200 dark:border-gray-700 focus:border-[var(--secondary)] dark:focus:border-[var(--secondary)] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed resize-none ${
              isRtl ? "text-right" : "text-left"
            }`}
          />
          {/* Character count */}
          <div
            className={`absolute bottom-3 text-xs text-gray-400 dark:text-gray-500 ${
              isRtl ? "left-4" : "right-4"
            }`}
          >
            {(message || "").length} / 500
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoInput;
