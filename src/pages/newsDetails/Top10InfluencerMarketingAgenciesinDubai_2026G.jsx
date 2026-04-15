import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEOHead from "../../components/SEOHead";
import NewsDetailsHeader from "./NewsDetailsHeader";
import rawArticleHtml from "./Top10InfluencerMarketingAgenciesinDubai_2026G.html?raw";

gsap.registerPlugin(ScrollTrigger);

const STATIC_SLUG = "top-10-influencer-marketing-agencies-in-dubai-2026-guide";

const staticNewsData = {
  slug: STATIC_SLUG,
  title: "Top 10 Influencer Marketing Agencies in Dubai (2026 Guide)",
  subtitle:
    "Discover the top influencer marketing agencies in Dubai for 2026. Compare TikTok, Instagram and ROI-driven agencies to grow your brand faster.",
  description:
    "A complete 2026 guide comparing the top influencer marketing agencies in Dubai with services, pricing, and selection tips.",
  image: "/cover-image.png",
  created_at: "2026-01-01T00:00:00.000Z",
};

const extractBodyHtml = (fullHtml) => {
  if (!fullHtml) return "";
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch?.[1] ?? fullHtml;
};

const normalizeText = (value = "") =>
  String(value)
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const normalizeArticleHtml = (fullHtml, pageTitle, pageSubtitle) => {
  const bodyHtml = extractBodyHtml(fullHtml);
  if (typeof window === "undefined") {
    return { html: bodyHtml, toc: [] };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<body>${bodyHtml}</body>`, "text/html");
  const { body } = doc;
  const toc = [];
  const usedIds = new Set();

  // Remove heavy exported document attributes/classes that disturb page styling.
  body.querySelectorAll("*").forEach((el) => {
    el.removeAttribute("class");
    el.removeAttribute("style");
    el.removeAttribute("id");
  });

  // Convert Google redirect links to direct URLs.
  body.querySelectorAll('a[href*="google.com/url?"]').forEach((anchor) => {
    try {
      const url = new URL(anchor.href);
      const target = url.searchParams.get("q");
      if (target) {
        anchor.setAttribute("href", decodeURIComponent(target));
      }
    } catch {
      // keep original href if parsing fails
    }
  });

  const titleNorm = normalizeText(pageTitle);
  const subtitleNorm = normalizeText(pageSubtitle);

  // Remove duplicate top title/subtitle blocks already shown in NewsDetailsHeader.
  const removableTopNodes = Array.from(body.children).filter((node, index) => {
    if (index > 5) return false;
    if (!["P", "H1", "H2"].includes(node.tagName)) return false;
    const text = normalizeText(node.textContent);
    return text === titleNorm || text === subtitleNorm;
  });
  removableTopNodes.forEach((node) => node.remove());

  // Build heading ids and TOC map (H1/H2/H3) after normalization.
  body.querySelectorAll("h1, h2, h3").forEach((heading) => {
    const title = heading.textContent?.trim();
    if (!title) return;

    let id = slugify(title) || `section-${toc.length + 1}`;
    if (usedIds.has(id)) {
      let index = 2;
      while (usedIds.has(`${id}-${index}`)) index += 1;
      id = `${id}-${index}`;
    }

    usedIds.add(id);
    heading.setAttribute("id", id);

    toc.push({
      id,
      title,
      level:
        heading.tagName === "H1" ? 1 : heading.tagName === "H2" ? 2 : 3,
    });
  });

  return { html: body.innerHTML, toc };
};

const Top10InfluencerMarketingAgenciesinDubai2026G = () => {
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const activeHeadingRef = useRef("");
  const articleContentRef = useRef(null);
  const [tocAsideEl, setTocAsideEl] = useState(null);
  const [articleColEl, setArticleColEl] = useState(null);
  const { html: articleBodyHtml, toc: tocItems } = useMemo(
    () =>
      normalizeArticleHtml(
        rawArticleHtml,
        staticNewsData.title,
        staticNewsData.subtitle
      ),
    []
  );

  useEffect(() => {
    if (!tocItems.length) return;
    let rafId = 0;

    const setActive = (id) => {
      if (!id || activeHeadingRef.current === id) return;
      activeHeadingRef.current = id;
      setActiveHeadingId(id);
    };

    const getLiveHeadingElements = () => {
      const root = articleContentRef.current;
      if (!root) return [];
      return tocItems
        .map((item) => document.getElementById(item.id))
        .filter((el) => el && root.contains(el))
        .filter(Boolean);
    };

    const computeActiveHeading = () => {
      const headingElements = getLiveHeadingElements();
      if (!headingElements.length) return;

      const markerDocY = window.scrollY + window.innerHeight * 0.24;
      let currentHeading = headingElements[0];

      for (const heading of headingElements) {
        const top = heading.getBoundingClientRect().top + window.scrollY;
        if (top <= markerDocY) currentHeading = heading;
        else break;
      }

      setActive(currentHeading.id);
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        computeActiveHeading();
      });
    };

    // Run after paint, then bind listeners.
    rafId = window.requestAnimationFrame(() => {
      rafId = 0;
      computeActiveHeading();
    });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [tocItems]);

  useEffect(() => {
    if (!tocAsideEl || !articleColEl) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: articleColEl,
        start: "top top+=112",
        end: "bottom bottom-=40",
        pin: tocAsideEl,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, [tocAsideEl, articleColEl]);

  const handleTocClick = (id) => {
    activeHeadingRef.current = id;
    setActiveHeadingId(id);
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEOHead
        title={staticNewsData.title}
        description={staticNewsData.description}
        canonicalUrl={`/blogs/${STATIC_SLUG}`}
        ogImage={staticNewsData.image}
        ogType="article"
        articleData={{
          title: staticNewsData.title,
          description: staticNewsData.description,
          image: staticNewsData.image,
          publishDate: staticNewsData.created_at,
          modifiedDate: staticNewsData.created_at,
          url: `https://tikit.ae/blogs/${STATIC_SLUG}`,
        }}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blogs", url: "/blogs" },
          { name: staticNewsData.title, url: `/blogs/${STATIC_SLUG}` },
        ]}
      />

      <section className="sr-only" aria-hidden="true">
        <h1>{staticNewsData.title}</h1>
        <p>{staticNewsData.subtitle}</p>
        <p>{staticNewsData.description}</p>
      </section>

      <div data-nav-color="black" className="news-details w-full overflow-x-hidden">
        <NewsDetailsHeader newsData={staticNewsData} loading={false} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-8 sm:my-10 md:my-12 lg:my-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="paragraph-item lg:col-span-8" ref={setArticleColEl}>
              <div
                ref={articleContentRef}
                className="paragraph-description news-detail-html text-sm sm:text-base md:text-lg text-[var(--foreground)]/80 leading-relaxed mb-6 sm:mb-8 md:mb-10 lg:mb-12 [&_h2]:scroll-mt-28 [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[var(--foreground)] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:scroll-mt-28 [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-[var(--foreground)] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 sm:[&_ul]:pl-8 [&_ul]:my-4 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 sm:[&_ol]:pl-8 [&_ol]:my-4 [&_ol]:space-y-1 [&_li]:mb-1 [&_li_p]:mb-1 [&_li_p:last-child]:mb-0 [&_a]:text-[var(--secondary)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:opacity-90 [&_a]:break-words [&_i]:italic [&_b]:font-bold [&_hr]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table_td]:border [&_table_td]:border-[var(--foreground)]/20 [&_table_td]:p-2 [&_table_th]:border [&_table_th]:border-[var(--foreground)]/20 [&_table_th]:p-2"
                dangerouslySetInnerHTML={{ __html: articleBodyHtml }}
              />
            </div>

            {tocItems.length > 0 && (
              <aside
                className="hidden lg:block lg:col-span-4 self-start"
                ref={setTocAsideEl}
              >
                <div className="rounded-2xl border border-[var(--foreground)]/10 bg-[var(--container-bg)]/50 backdrop-blur-sm p-4 max-h-[70vh] overflow-auto">
                  <p className="text-xs uppercase tracking-[0.35em] text-[var(--foreground)]/60 mb-4">
                    On this page
                  </p>
                  <nav aria-label="Article table of contents" className="space-y-1">
                    {tocItems.map((item) => {
                      const isActive = activeHeadingId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleTocClick(item.id)}
                          className={`w-full text-left rounded-lg px-3 py-2 text-sm transition ${
                            item.level === 3 ? "ml-6" : item.level === 2 ? "ml-3" : ""
                          } ${
                            isActive
                              ? "bg-[var(--secondary)]/20 text-[var(--foreground)] font-semibold"
                              : "text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
                          }`}
                        >
                          {item.title}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Top10InfluencerMarketingAgenciesinDubai2026G;
