import React, { useEffect, useState } from "react";
import NewsHero from "./NewsHero";
import "./news.css";
import SEOHead from "../../components/SEOHead";
import Content from "./Content";
import { useTheme } from "../../store/ThemeContext.jsx";
import Footer from "../../components/Footer.jsx";
import ContactUs from "../Home/ContactUs.jsx";

export const News = () => {
  const { theme } = useTheme();
  const [isReady, setIsReady] = useState(false);

  // Check if theme is ready before rendering
  useEffect(() => {
    if (theme) {
      setIsReady(true);
    }
  }, [theme]);

  useEffect(() => {
    if (!isReady) return;

    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");
    window.scrollTo(0, 0);
  }, [isReady]);

  // Don't render until theme is loaded
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
        <div className="text-[var(--foreground)] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <main
      data-nav-color="black"
      className={`news-page ${theme === "dark" ? "dark-mode" : "light-mode"}`}
    >
      <SEOHead
        title="News & Insights"
        description="Stay updated with the latest news, insights, and updates from Tikit Agency. Discover industry trends, marketing tips, and our latest achievements."
        keywords="marketing news, digital marketing insights, agency updates, marketing trends, industry news, Tikit Agency news"
        canonicalUrl="/news"
      />
      <NewsHero />
      <Content />
      <ContactUs />
      <Footer />
    </main>
  );
};

export default News;
