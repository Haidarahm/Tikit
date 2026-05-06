import React, { useEffect, useState } from "react";
import NewsHero from "./NewsHero";
import "./news.css";
import SEOHead from "../../components/SEOHead";
import Content from "./Content";
import { useTheme } from "../../store/ThemeContext.jsx";
import ContactUs from "../Home/ContactUs.jsx";
import { useTranslation } from "react-i18next";

export const Blogs = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
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
        title={t("seo.pages.blogs.title")}
        description={t("seo.pages.blogs.description")}
        keywords={t("seo.pages.blogs.keywords")}
        canonicalUrl="/blogs"
      />
      <NewsHero />
      <Content />
      <ContactUs />
      
    </main>
  );
};

export default Blogs;
