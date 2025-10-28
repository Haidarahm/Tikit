import React, { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import NewsHero from "./NewsHero";
import Content from "./Content";
import "./news.css";

export const News = () => {
  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (!scrollContainer) return;

    const locomotiveScroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return (
    <main className="news-page" data-scroll-container>
      <NewsHero />
      <Content />
    </main>
  );
};

export default News;
