import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllNewsItems } from "../../apis/news";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Card component
const Card = ({ item }) => {
  const cardRef = useRef(null);
  const coverRef = useRef(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const cover = coverRef.current;
    if (!card || !cover) return;

    // Card parallax effect
    const scrollTrigger = gsap.to(cover, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      if (scrollTrigger && scrollTrigger.scrollTrigger) {
        scrollTrigger.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <div ref={cardRef} className="card">
      {/* Cover */}
      <figure className="card-cover-container">
        {/* Cover image */}
        <img
          ref={coverRef}
          src={item.images || item.image || ""}
          alt={item.title || "News item"}
          className="card-cover"
        />
      </figure>
      {/* Content overlay */}
      <div className="card-content">
        <span className="card-subtitle">{item.subtitle}</span>
        <h2 className="card-title">{item.title}</h2>
        <p className="card-description">{item.description}</p>
      </div>
    </div>
  );
};

// React app
const Content = () => {
  const cardsRef = useRef(null);
  const { language } = useI18nLanguage();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger on resize
      const refreshScrollTrigger = () => {
        ScrollTrigger.refresh();
      };

      // Refresh on resize
      window.addEventListener("resize", refreshScrollTrigger);

      // Initial refresh after a small delay
      setTimeout(refreshScrollTrigger, 100);

      return () => {
        window.removeEventListener("resize", refreshScrollTrigger);
      };
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getAllNewsItems({
          page: 1,
          per_page: 10,
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
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, [language]);

  useEffect(() => {
    if (loading) return;
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(id);
  }, [newsItems, loading]);

  return (
    <div ref={cardsRef} className="news-cards-container">
      <section className="cards">
        {loading && <div className="cards-status">Loading news…</div>}
        {!loading && error && (
          <div className="cards-status">
            Unable to load news right now. Please try again later.
          </div>
        )}
        {!loading && !error && newsItems.length === 0 && (
          <div className="cards-status">No news available.</div>
        )}
        {!loading &&
          !error &&
          newsItems.map((item) => (
            <Card
              key={item.id ?? `${item.title}-${item.created_at}`}
              item={item}
            />
          ))}
      </section>
    </div>
  );
};

export default Content;
