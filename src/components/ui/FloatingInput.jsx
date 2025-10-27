import React from "react";

const FloatingInput = ({
  id,
  label,
  type = "text",
  className = "",
  containerClassName = "",
  inputProps = {},
}) => {
  return (
    <div className={`relative ${containerClassName}`.trim()}>
      <input
        id={id}
        type={type}
        placeholder=" "
        className={`peer w-full bg-transparent text-[var(--foreground)] outline-none border-0 border-b border-[var(--foreground)]/40 focus:border-[var(--foreground)]  transition-colors duration-200 py-2 ${className}`.trim()}
        autoComplete="off"
        {...inputProps}
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-0 -translate-y-0 text-xs text-[var(--foreground)] transition-all duration-200
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--foreground)]/70
          peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-[var(--foreground)]
          peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
