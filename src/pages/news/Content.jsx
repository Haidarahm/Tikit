import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllNewsItems } from "../../apis/news";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useTranslation } from "react-i18next";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const ITEMS_PER_PAGE = 6;

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
          width={600}
          height={400}
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
// Skeleton Card Component
// ======================
const SkeletonCard = () => {
  return (
    <div className="card skeleton-card" aria-hidden="true">
      <div className="skeleton-cover" />
      <div className="skeleton-content">
        <div className="skeleton-pill" />
        <div className="skeleton-title" />
        <div className="skeleton-text" />
      </div>
    </div>
  );
};

// ======================
// Main Content Component
// ======================
const Content = () => {
  const containerRef = useRef(null);
  const { language, isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch news (initial load)
  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      setPage(1);
      try {
        const response = await getAllNewsItems({
          page: 1,
          per_page: ITEMS_PER_PAGE,
          lang: language,
        });
        if (!isMounted) return;
        const items = Array.isArray(response?.data) ? response.data : [];
        setNewsItems(items);
        // Check if there are more items based on pagination info
        const pagination = response?.pagination;
        if (pagination) {
          setHasMore(pagination.current_page < pagination.last_page);
        } else {
          setHasMore(items.length >= ITEMS_PER_PAGE);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err);
        setNewsItems([]);
        setHasMore(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNews();
    return () => {
      isMounted = false;
    };
  }, [language]);

  // Load more handler
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const response = await getAllNewsItems({
        page: nextPage,
        per_page: ITEMS_PER_PAGE,
        lang: language,
      });
      const newItems = Array.isArray(response?.data) ? response.data : [];
      
      if (newItems.length > 0) {
        setNewsItems((prev) => [...prev, ...newItems]);
        setPage(nextPage);
        // Check if there are more items based on pagination info
        const pagination = response?.pagination;
        if (pagination) {
          setHasMore(pagination.current_page < pagination.last_page);
        } else {
          setHasMore(newItems.length >= ITEMS_PER_PAGE);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load more news:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // GSAP parallax for visible cards
  useLayoutEffect(() => {
    if (loading || !newsItems.length) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-parallax-card]");
      cards.forEach((card) => {
        const img = card.querySelector("[data-parallax-image]");
        if (!img) return;
        
        // Set GPU acceleration hints
        gsap.set(img, {
          force3D: true,
          willChange: "transform",
        });

        gsap.to(img, {
          yPercent: 40,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Use numeric scrub for better performance
            fastScrollEnd: true, // Better performance for fast scrolling
            refreshPriority: -1, // Lower priority for parallax effects
            invalidateOnRefresh: false, // Don't recalculate on refresh
          },
        });
      });
      
      // Defer refresh to next frame for better performance
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, containerRef);

    return () => ctx.revert();
  }, [newsItems, loading]);

  // Refresh ScrollTrigger on window resize (debounced)
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, 150);
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`news-cards-container ${isRtl ? "font-cairo" : "font-hero-light"}`}>
      {loading && (
        <div className="cards-skeleton">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
      {!loading && error && (
        <div className="cards-status">
          {t("news.error", "Unable to load news right now. Please try again later.")}
        </div>
      )}
      {!loading && !error && newsItems.length === 0 && (
        <div className="cards-status">{t("news.noNews", "No news available.")}</div>
      )}
      {!loading && !error && newsItems.length > 0 && (
        <>
          <div className="cards">
            {newsItems.map((item, index) => (
              <Card key={item.id || index} item={item} />
            ))}
          </div>
          
          {/* Show More Button */}
          {hasMore && (
            <div className="flex justify-center mt-12 mb-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className={`px-8 py-3 rounded-full border-2 border-[var(--secondary)] text-[var(--secondary)] font-semibold transition-all duration-300 hover:bg-[var(--secondary)] hover:text-[var(--background)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
              >
                {loadingMore ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("news.loading", "Loading...")}
                  </>
                ) : (
                  t("news.showMore", "Show More")
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Content;
