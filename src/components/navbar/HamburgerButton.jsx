import { forwardRef } from "react";
import { useNavColor } from "./hooks/useNavColor";

const HamburgerButton = forwardRef(function HamburgerButton(
  { onClick, language, isOpen },
  ref
) {
  const navColor = useNavColor();
  const lineColor =
    navColor === "white" ? "bg-white" : "bg-[var(--foreground)]";

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
      <span
        className={`hamburger-line w-6 h-0.5 ${lineColor} transform transition-all duration-300 ease-out origin-center`}
      ></span>
      <span
        className={`hamburger-line w-6 h-0.5 ${lineColor} transform transition-all duration-300 ease-out origin-center`}
      ></span>
      <span
        className={`hamburger-line w-6 h-0.5 ${lineColor} transform transition-all duration-300 ease-out origin-center`}
      ></span>
    </button>
  );
});

export default HamburgerButton;
