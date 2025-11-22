import { useTheme } from "../../store/ThemeContext.jsx";

export default function ThemeToggle({ isMobile = false }) {
  const { theme, toggleTheme } = useTheme();

  const buttonClasses = isMobile
    ? "h-12 w-12 rounded-full border border-white/15 bg-[var(--secondary)] text-[var(--background)] flex items-center justify-center shadow-sm hover:ring-2 ring-primary/40 transition"
    : "h-10 w-10 rounded-full border border-white/15 bg-[var(--secondary)] text-[var(--background)] flex items-center justify-center shadow-sm hover:ring-2 ring-primary/40 transition";

  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      role="switch"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          fill="currentColor"
        >
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 7h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM3 12H2a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Zm15.657 7.071-0.707-0.707a1 1 0 0 1 1.414-1.414l0.707 0.707a1 1 0 1 1-1.414 1.414ZM4.636 6.343 3.929 5.636A1 1 0 1 1 5.343 4.222l0.707 0.707A1 1 0 1 1 4.636 6.343Zm13.435-2.121-0.707 0.707A1 1 0 1 1 15.95 3.515l0.707-0.707a1 1 0 1 1 1.414 1.414ZM6.05 19.778l-0.707-0.707a1 1 0 1 1 1.414-1.414l0.707 0.707A1 1 0 0 1 6.05 19.778Z" />
        </svg>
      )}
    </button>
  );
}

