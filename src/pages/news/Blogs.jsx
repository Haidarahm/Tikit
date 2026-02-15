import React, { useEffect, useState } from "react";
import NewsHero from "./NewsHero";
import "./news.css";
import SEOHead from "../../components/SEOHead";
import Content from "./Content";
import { useTheme } from "../../store/ThemeContext.jsx";
import Footer from "../../components/Footer.jsx";
import ContactUs from "../Home/ContactUs.jsx";

export const Blogs = () => {
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
        title="Blogs & Insights"
        description="Stay updated with the latest blogs, insights, and updates from Tikit Agency. Discover industry trends, marketing tips, and our latest achievements."
        keywords="blogs, digital marketing insights, agency updates, marketing trends, industry news, Tikit Agency blogs"
        canonicalUrl="/blogs"
      />
      <NewsHero />
      <Content />
      <ContactUs />
      <Footer />
    </main>
  );
};

export default Blogs;
