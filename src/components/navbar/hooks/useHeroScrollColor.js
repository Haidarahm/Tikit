import { useState, useEffect } from "react";

export function useHeroScrollColor() {
  const [textColor, setTextColor] = useState("text-white");

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // If we are still in the hero section (scrolled less than hero height)
      if (scrollPosition < heroHeight - 100) {
        setTextColor("text-white");
      } else {
        setTextColor("text-[var(--foreground)]");
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return textColor;
}
