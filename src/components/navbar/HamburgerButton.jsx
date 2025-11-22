import { forwardRef } from "react";

const HamburgerButton = forwardRef(function HamburgerButton(
  { onClick, language, isOpen },
  ref
) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`lg:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 focus:outline-none relative ${
        language === "ar" ? "order-3" : ""
      }`}
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
    >
      <span className="hamburger-line w-6 h-0.5 bg-[var(--foreground)] transform transition-all duration-300 ease-out origin-center"></span>
      <span className="hamburger-line w-6 h-0.5 bg-[var(--foreground)] transform transition-all duration-300 ease-out origin-center"></span>
      <span className="hamburger-line w-6 h-0.5 bg-[var(--foreground)] transform transition-all duration-300 ease-out origin-center"></span>
    </button>
  );
});

export default HamburgerButton;
