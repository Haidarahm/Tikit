import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNewsStore } from "../../store/newsStore";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import TikitTitle from "../../components/TikitTitle";

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [visibleCards, setVisibleCards] = useState([]);
  const cardsRef = useRef([]);
  const titleSectionRef = useRef(null);
  const { newsItems, loadNewsItems, loading } = useNewsStore();

  useEffect(() => {
    // Load first 4 news items
    loadNewsItems({ per_page: 4, page: 1 });
  }, [loadNewsItems]);

  /* GSAP - Title section staggered appear */
  useEffect(() => {
    if (!titleSectionRef.current) return;

    const ctx = gsap.context(() => {
      const heroElements = titleSectionRef.current.querySelectorAll(".blogs-hero-animate");
      if (heroElements.length > 0) {
        gsap.fromTo(
          heroElements,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              refreshPriority: 0, // Default priority
            },
          }
        );
      }
    }, titleSectionRef.current);

    return () => ctx?.revert();
  }, [loading]);

  useEffect(() => {
    const observers = [];

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [newsItems]);

  const handleCardClick = (item) => {
    if (item.slug) navigate(`/blogs/${item.slug}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getReadTime = (content) => {
    if (!content) return "5 min read";
    const words = content.split(" ").length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  if (loading && newsItems.length === 0) {
    return (
      <section className="w-full py-16 md:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[400px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 md:py-24 bg-[var(--background)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleSectionRef}
          className="mb-12 md:mb-16 text-center"
        >
          <TikitTitle
            className="blogs-hero-animate block"
            title={t("home.blogs.title")}
            mainWord={t("home.blogs.mainWord")}
            disableAnimation
          />
          <p className="blogs-hero-animate text-lg md:text-xl text-[var(--foreground)] opacity-70 max-w-2xl mx-auto">
            {t("home.blogs.description")}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {newsItems.slice(0, 4).map((item, index) => (
            <article
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => item.slug && handleCardClick(item)}
              className={`group relative bg-[var(--primary)] dark:bg-[var(--container-bg)] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-[#6ACBCC]/20 to-[#1C6F6C]/20">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl md:text-7xl font-bold tikit-gradient opacity-30">
                      Tikit
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-[var(--foreground)] opacity-60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{getReadTime(item.description)}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-3 line-clamp-2 group-hover:tikit-gradient transition-all duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--foreground)] opacity-70 mb-4 line-clamp-3">
                  {item.description || "Read more to discover insights..."}
                </p>

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-[#52c3c5] font-semibold group-hover:gap-4 transition-all duration-300">
                  <span>Read More</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Hover Gradient Border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6ACBCC]/20 to-[#1C6F6C]/20 rounded-xl" />
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 md:mt-16 text-center">
          <button
            onClick={() => navigate("/blogs")}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span className="text-lg">View All Articles</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;