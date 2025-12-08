import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./locales/i18n";
import { I18nLanguageProvider } from "./store/I18nLanguageContext.jsx";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Smooth Scroll Init
function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: true,
      infinite: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // REQUIRED
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(() => {});
    };
  }, []);

  return children;
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <I18nLanguageProvider>
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </I18nLanguageProvider>
    </StrictMode>
  </BrowserRouter>
);
