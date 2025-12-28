import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./locales/i18n";
import { I18nLanguageProvider } from "./store/I18nLanguageContext.jsx";

// Smooth Scroll Init - lazy loaded to reduce initial bundle size
function SmoothScrollProvider({ children }) {
  useEffect(() => {
    let lenis = null;
    let gsapInstance = null;
    let tickerCallback = null;
    let isMounted = true;

    // Defer loading of heavy animation libraries
    const initSmoothScroll = async () => {
      try {
        // Load libraries asynchronously after initial render
        const [LenisModule, gsapModule, scrollTriggerModule] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger")
        ]);

        if (!isMounted) return;

        const Lenis = LenisModule.default;
        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;
        
        gsapInstance = gsap;
        gsap.registerPlugin(ScrollTrigger);
        
        lenis = new Lenis({
          duration: 1.2,
          smooth: true,
          smoothTouch: true,
          infinite: false,
          orientation: "vertical",
          gestureOrientation: "vertical",
        });

        // Sync Lenis with ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        tickerCallback = (time) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);
      } catch (error) {
        console.error("Failed to load smooth scroll libraries", error);
      }
    };

    // Defer initialization using requestIdleCallback or setTimeout
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(initSmoothScroll, { timeout: 1000 });
    } else {
      setTimeout(initSmoothScroll, 100);
    }

    return () => {
      isMounted = false;
      if (gsapInstance && tickerCallback) {
        gsapInstance.ticker.remove(tickerCallback);
      }
      if (lenis) {
        lenis.destroy();
      }
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
