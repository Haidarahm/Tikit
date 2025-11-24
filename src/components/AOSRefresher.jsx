// src/components/AOSRefresher.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";

export default function AOSRefresher() {
  const location = useLocation();
  useEffect(() => {
    // Only refresh if AOS is initialized
    if (window.AOS && window.aosInitialized) {
      setTimeout(() => {
        AOS.refresh();
      }, 100); // Small delay to ensure DOM is ready
    }
  }, [location.pathname]);
  return null;
}
