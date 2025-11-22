export default function HamburgerButton({ onClick, language }) {
  return (
    <button
      onClick={onClick}
      className={`lg:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 focus:outline-none ${
        language === "ar" ? "order-3" : ""
      }`}
      aria-label="Toggle mobile menu"
    >
      <span className="hamburger-line w-6 h-0.5 bg-[var(--foreground)] transform transition-all duration-300"></span>
      <span className="hamburger-line w-6 h-0.5 bg-[var(--foreground)] transform transition-all duration-300"></span>
      <span className="hamburger-line w-6 h-0.5 bg-[var(--foreground)] transform transition-all duration-300"></span>
    </button>
  );
}

