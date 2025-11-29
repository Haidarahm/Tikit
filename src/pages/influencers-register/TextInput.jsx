import React from "react";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
  required = false,
  disabled = false,
  className = "",
}) => {
  const { isRtl } = useI18nLanguage();
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          dir={isRtl ? "rtl" : "ltr"}
          className="text-[var(--foreground)] text-sm md:text-base font-medium"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        dir={isRtl ? "rtl" : "ltr"}
        className={`w-full px-4 py-3 md:py-4 rounded-[20px] bg-[#f5f5f5] dark:bg-[var(--container-bg)] text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base outline-none border border-gray-200 dark:border-gray-700 focus:border-[var(--secondary)] dark:focus:border-[var(--secondary)] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
          isRtl ? "text-right" : "text-left"
        }`}
      />
    </div>
  );
};

export default TextInput;
