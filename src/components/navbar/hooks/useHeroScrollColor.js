import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useHeroScrollColor() {
  const [textColor, setTextColor] = useState("text-white");
  const { pathname } = useLocation();

  useEffect(() => {
    // Keep navbar text white across the immersive services experience (index + section pages)
    const servicePaths = [
      "/services",
      "/influencer-marketing-agency-dubai",
      "/social-media-management",
      "/production",
      "/branding-agency-dubai",
      "/web-development-dubai",
      "/digital-marketing-agency-dubai",
    ];
    const isServicePage = servicePaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
    if (isServicePage) {
      setTextColor("text-white");
      return () => {};
    }

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
  }, [pathname]);

  return textColor;
}
