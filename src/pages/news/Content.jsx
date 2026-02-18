import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllNewsItems } from "../../apis/news";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useNewsStore } from "../../store/newsStore";
import { useTranslation } from "react-i18next";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const ITEMS_PER_PAGE = 6;

const DEFAULT_BLOG_KEYWORDS =
  "blogs, digital marketing insights, agency updates, marketing trends, industry news, Tikit Agency blogs, influencer marketing, social media management";

const BASE_URL = "https://tikit.ae";

/**
 * Truncate description to optimal SEO length (150-160 characters)
 */
function truncateDescription(text, maxLength = 160) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim().replace(/[.,;:!?]$/, "") + "...";
}

/**
 * Generate keywords from blog content (title, subtitle, description)
 */
function generateKeywords(blog, defaultKeywords) {
  if (blog?.meta_keywords) return blog.meta_keywords;
  
  const keywords = [defaultKeywords];
  
  // Extract keywords from title
  if (blog?.title) {
    const titleWords = blog.title
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 5);
    keywords.push(...titleWords);
  }
  
  // Extract keywords from subtitle
  if (blog?.subtitle) {
    const subtitleWords = blog.subtitle
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 3);
    keywords.push(...subtitleWords);
  }
  
  return [...new Set(keywords)].join(", ");
}

/**
 * Build dynamic SEO props for a single blog post. Use on the blog detail page (e.g. NewsDetails).
 * @param {Object} blog - Blog item from API (title, subtitle, description, meta_title?, meta_description?, meta_keywords?, image?, images?, created_at?, updated_at?, slug?)
 * @param {string} slug - URL slug for canonical (e.g. from useParams)
 * @returns {{ title: string, description: string, keywords: string, canonicalUrl: string, ogImage?: string, articleData?: Object, breadcrumbs?: Array }}
 */
export function getBlogSEOProps(blog, slug) {
  if (!slug) {
    return {
      title: "Blogs & Insights | Tikit Agency",
      description: "Stay updated with the latest blogs, insights, and updates from Tikit Agency. Discover industry trends, marketing tips, and our latest achievements.",
      keywords: DEFAULT_BLOG_KEYWORDS,
      canonicalUrl: "/blogs",
    };
  }
  
  // Title: Use meta_title if available, otherwise use title (SEOHead will add "| Tikit Agency")
  const blogTitle = blog?.meta_title || blog?.title || "Blog";
  const title = blogTitle;
  
  // Description: Optimize length for SEO (150-160 chars)
  let description = blog?.meta_description || blog?.description || "";
  if (!description && blog?.subtitle) {
    description = blog.subtitle;
  }
  if (!description) {
    description = `Read ${blog?.title || "this article"} on Tikit Agency blog. Discover insights, trends, and updates from the leading influencer marketing agency.`;
  }
  description = truncateDescription(description, 160);
  
  // Keywords: Generate from content or use meta_keywords
  const keywords = generateKeywords(blog, DEFAULT_BLOG_KEYWORDS);
  
  // Canonical URL: Path only; SEOHead prepends baseUrl
  const canonicalUrl = `/blogs/${slug}`;
  const fullUrl = `${BASE_URL}${canonicalUrl}`;
  
  // OG Image: Use blog image or fallback
  const ogImage = blog?.image || blog?.images || null;
  
  // Article Data for structured data
  const articleData = blog
    ? {
        title: blog?.title || blogTitle,
        description: description,
        image: blog?.image || blog?.images || null,
        publishDate: blog?.created_at,
        modifiedDate: blog?.updated_at || blog?.created_at,
        url: fullUrl, // Add URL for Article schema
      }
    : undefined;
  
  // Breadcrumbs for better navigation
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
    { name: blog?.title || "Blog Post", url: canonicalUrl },
  ];
  
  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    articleData,
    breadcrumbs,
  };
}

// ======================
// Card Component
// ======================
const Card = ({ item }) => {
  const navigate = useNavigate();
  const imgSrc = item?.images || item?.image || null;
  const blogUrl = item.slug ? `/blogs/${item.slug}` : null;

  const handleCardClick = (e) => {
    // Allow Link to handle navigation, but also support programmatic navigation as fallback
    if (!blogUrl) {
      e.preventDefault();
      return;
    }
    // Optional: You can still use navigate for analytics or other purposes
    // But the Link component ensures SEO crawlability
  };

  // Use Link for SEO crawlability, wrap the entire card
  const cardContent = (
    <>
      <figure className="card-cover-container">
        {imgSrc ? (
          <img
            data-parallax-image
            src={imgSrc}
            alt={item.title || "News item"}
            width={600}
            height={400}
            className="card-cover"
            loading="lazy"
          />
        ) : null}
      </figure>
      <div className="card-content">
        <span className="card-subtitle">{item.subtitle}</span>
        <h2 className="card-title">{item.title}</h2>
        <p className="card-description">{item.description}</p>
      </div>
    </>
  );

  // If we have a slug, wrap in Link for SEO; otherwise use div
  if (blogUrl) {
    return (
      <Link
        to={blogUrl}
        className="card cursor-pointer"
        data-parallax-card
        onClick={handleCardClick}
        aria-label={`Read ${item.title || 'blog post'}`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="card" data-parallax-card>
      {cardContent}
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
  const { cacheNewsItems } = useNewsStore();
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
        // Cache news items in store so NewsDetails can reuse header data
        cacheNewsItems(items);
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
        // Cache new news items in store so NewsDetails can reuse header data
        cacheNewsItems(newItems);
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
      
      // Defer refresh to next frame for better performance (only if triggers are active)
      requestAnimationFrame(() => {
        try {
          const activeTriggers = ScrollTrigger.getAll().filter(t => 
            t.vars && t.vars.trigger && t.vars.trigger.isConnected
          );
          if (activeTriggers.length > 0) {
            ScrollTrigger.refresh();
          }
        } catch (e) {
          // Ignore refresh errors
        }
      });
    }, containerRef);

    return () => {
      // Kill ScrollTrigger instances FIRST
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.vars?.trigger;
        if (triggerElement && containerRef.current && 
            (triggerElement === containerRef.current || containerRef.current.contains(triggerElement))) {
          try {
            trigger.kill();
          } catch (e) {
            // Ignore errors during cleanup
          }
        }
      });
      
      // Revert context AFTER ScrollTrigger is killed
      try {
        ctx.revert();
      } catch (e) {
        // Ignore errors during cleanup
      }
    };
  }, [newsItems, loading]);

  // Refresh ScrollTrigger on window resize (debounced)
  useEffect(() => {
    let isMounted = true;
    let resizeTimeout;
    
    const safeRefresh = () => {
      if (!isMounted) return;
      try {
        const activeTriggers = ScrollTrigger.getAll().filter(t => 
          t.vars && t.vars.trigger && t.vars.trigger.isConnected
        );
        if (activeTriggers.length > 0) {
          ScrollTrigger.refresh();
        }
      } catch (e) {
        // Ignore refresh errors
      }
    };
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(safeRefresh);
      }, 150);
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      isMounted = false;
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
