// src/components/AOSRefresher.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AOSRefresher() {
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const ensureAOS = async () => {
      // If AOS is already initialized, just refresh animations
      if (window.AOS && window.aosInitialized) {
        window.AOS.refresh();
        return;
      }

      try {
        // Dynamically load AOS and its CSS only when needed
        const [{ default: AOS }] = await Promise.all([
          import("aos"),
          import("aos/dist/aos.css"),
        ]);

        if (!isMounted) return;

        AOS.init({
          duration: 800,
          easing: "ease-out-quart",
          once: false,
          offset: 100,
          delay: 0,
        });

        window.AOS = AOS;
        window.aosInitialized = true;
      } catch (error) {
        // Fail silently if AOS cannot be loaded
        console.error("Failed to load AOS", error);
      }
    };

    ensureAOS();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  return null;
}
