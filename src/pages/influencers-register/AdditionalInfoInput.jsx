import React from "react";

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
          className="text-[var(--foreground)] text-sm md:text-base font-medium"
        >
          {followerLabel}
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
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
            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-[20px] bg-[#f5f5f5] dark:bg-[var(--container-bg)] text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base outline-none border border-transparent focus:border-[var(--secondary)] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor={`${name}_message`}
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
            className="w-full px-4 py-3 md:py-4 rounded-[20px] bg-[#f5f5f5] dark:bg-[var(--container-bg)] text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base outline-none border border-transparent focus:border-[var(--secondary)] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
          {/* Character count */}
          <div className="absolute bottom-3 right-4 text-xs text-gray-400">
            {(message || "").length} / 500
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoInput;
