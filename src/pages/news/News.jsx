import React from "react";
import NewsHero from "./NewsHero";
import "./news.css";
import SEOHead from "../../components/SEOHead";

export const News = () => {
  return (
    <main className="news-page">
      <SEOHead
        title="News & Insights"
        description="Stay updated with the latest news, insights, and updates from Tikit Agency. Discover industry trends, marketing tips, and our latest achievements."
        keywords="marketing news, digital marketing insights, agency updates, marketing trends, industry news, Tikit Agency news"
        canonicalUrl="/news"
      />
      <NewsHero />
    </main>
  );
};

export default News;
