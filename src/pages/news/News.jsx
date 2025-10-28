import React from "react";
import NewsHero from "./NewsHero";
import Content from "./Content";
import "./news.css"
export const News = () => {
  return (
    <main className="news-page">
      <NewsHero />
      <Content />
    </main>
  );
};

export default News;
