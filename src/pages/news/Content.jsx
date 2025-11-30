import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllNewsItems } from "../../apis/news";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// ======================
// Card Component
// ======================
const Card = ({ item }) => {
  return (
    <div className="card" data-parallax-card>
      <figure className="card-cover-container">
        <img
          data-parallax-image
          src={item.images || item.image || ""}
          alt={item.title || "News item"}
          className="card-cover"
          loading="lazy"
        />
      </figure>
      <div className="card-content">
        <span className="card-subtitle">{item.subtitle}</span>
        <h2 className="card-title">{item.title}</h2>
        <p className="card-description">{item.description}</p>
      </div>
    </div>
  );
};

// ======================
// Main Content Component
// ======================
const Content = () => {
  const containerRef = useRef(null);
  const { language } = useI18nLanguage();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news
  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllNewsItems({
          page: 1,
          per_page: 100,
          lang: language,
        });
        if (!isMounted) return;
        const items = Array.isArray(response?.data) ? response.data : [];
        setNewsItems(items);
      } catch (err) {
        if (!isMounted) return;
        setError(err);
        setNewsItems([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNews();
    return () => {
      isMounted = false;
    };
  }, [language]);

  // GSAP parallax for visible cards
  useLayoutEffect(() => {
    if (loading || !newsItems.length) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-parallax-card]");
      cards.forEach((card) => {
        const img = card.querySelector("[data-parallax-image]");
        gsap.to(img, {
          yPercent: 40,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [newsItems, loading]);

  // Refresh ScrollTrigger on window resize
  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="news-cards-container">
      {loading && <div className="cards-status">Loading news…</div>}
      {!loading && error && (
        <div className="cards-status">
          Unable to load news right now. Please try again later.
        </div>
      )}
      {!loading && !error && newsItems.length === 0 && (
        <div className="cards-status">No news available.</div>
      )}
      {!loading && !error && newsItems.length > 0 && (
        <div className="cards">
          {newsItems.map((item, index) => (
            <Card key={item.id || index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
