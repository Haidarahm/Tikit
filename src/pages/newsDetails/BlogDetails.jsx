import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEOHead from "../../components/SEOHead";
import NewsDetailsHeader from "./NewsDetailsHeader";
import { useNewsStore } from "../../store/newsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { api, BASE_URL as API_BASE_URL } from "../../config/backend";

gsap.registerPlugin(ScrollTrigger);

const BASE_URL = "https://tikit.ae";
const API_ORIGIN = (() => {
  try {
    if (!API_BASE_URL) return "";
    const apiUrl = new URL(API_BASE_URL);
    return `${apiUrl.protocol}//${apiUrl.host}`;
  } catch {
    return "";
  }
})();

const resolveHtmlFileUrl = (htmlFile) => {
  if (!htmlFile) return "";
  try {
    const parsed = new URL(htmlFile);
    // Backend may return local URLs; remap to configured API origin.
    const isLocalHost =
      parsed.hostname === "127.0.0.1" || parsed.hostname === "localhost";
    if (isLocalHost && API_ORIGIN) {
      return `${API_ORIGIN}${parsed.pathname}${parsed.search}`;
    }
    return parsed.toString();
  } catch {
    // Handle relative paths like /news_html/file.html
    if (htmlFile.startsWith("/") && API_ORIGIN) {
      return `${API_ORIGIN}${htmlFile}`;
    }
    return htmlFile;
  }
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

const extractBodyHtml = (fullHtml) => {
  if (!fullHtml) return "";
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch?.[1] ?? fullHtml;
};

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

  body.querySelectorAll("*").forEach((el) => {
    el.removeAttribute("class");
    el.removeAttribute("style");
    el.removeAttribute("id");
  });

  body.querySelectorAll('a[href*="google.com/url?"]').forEach((anchor) => {
    try {
      const url = new URL(anchor.href);
      const target = url.searchParams.get("q");
      if (target) {
        anchor.setAttribute("href", decodeURIComponent(target));
      }
    } catch {
      // Keep original URL if parsing fails.
    }
  });

  const titleNorm = normalizeText(pageTitle);
  const subtitleNorm = normalizeText(pageSubtitle);
  const removableTopNodes = Array.from(body.children).filter((node, index) => {
    if (index > 5) return false;
    if (!["P", "H1", "H2"].includes(node.tagName)) return false;
    const text = normalizeText(node.textContent);
    return text === titleNorm || text === subtitleNorm;
  });
  removableTopNodes.forEach((node) => node.remove());

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

const BlogDetails = () => {
  const { slug } = useParams();
  const { language } = useI18nLanguage();
  const { loadOneNews, newsDetails } = useNewsStore();

  const [newsData, setNewsData] = useState(null);
  const [loadingHeader, setLoadingHeader] = useState(true);
  const [loadingHtml, setLoadingHtml] = useState(true);
  const [htmlError, setHtmlError] = useState(null);
  const [rawHtml, setRawHtml] = useState("");
  const [activeHeadingId, setActiveHeadingId] = useState("");

  const articleContentRef = useRef(null);
  const tocNavRef = useRef(null);
  const activeHeadingRef = useRef("");
  const [tocAsideEl, setTocAsideEl] = useState(null);
  const [articleColEl, setArticleColEl] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchHeader = async () => {
      if (!slug) return;
      setLoadingHeader(true);
      try {
        const data = await loadOneNews(slug, language);
        if (!mounted) return;
        setNewsData(data || newsDetails[slug] || null);
      } catch (error) {
        if (!mounted) return;
        setNewsData(null);
      } finally {
        if (mounted) setLoadingHeader(false);
      }
    };
    fetchHeader();
    return () => {
      mounted = false;
    };
  }, [slug, language, loadOneNews, newsDetails]);

  useEffect(() => {
    let mounted = true;
    const fetchHtml = async () => {
      if (!newsData?.html_file) {
        setRawHtml("");
        setLoadingHtml(false);
        return;
      }
      setLoadingHtml(true);
      setHtmlError(null);
      try {
        const resolvedHtmlUrl = resolveHtmlFileUrl(newsData.html_file);
        const response = await api.get(resolvedHtmlUrl, {
          responseType: "text",
          headers: { Accept: "text/html,*/*" },
        });
        const html = typeof response?.data === "string" ? response.data : "";
        if (!html) throw new Error("Empty html file response");
        if (!mounted) return;
        setRawHtml(html);
      } catch (error) {
        if (!mounted) return;
        console.error("Failed to load blog html_file", {
          html_file: newsData?.html_file,
          resolved: resolveHtmlFileUrl(newsData?.html_file),
          error,
        });
        setHtmlError(error);
        setRawHtml("");
      } finally {
        if (mounted) setLoadingHtml(false);
      }
    };
    fetchHtml();
    return () => {
      mounted = false;
    };
  }, [newsData?.html_file]);

  const { html: articleBodyHtml, toc: tocItems } = useMemo(
    () =>
      normalizeArticleHtml(rawHtml, newsData?.title || "", newsData?.subtitle || ""),
    [rawHtml, newsData?.title, newsData?.subtitle]
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
    if (!activeHeadingId || !tocNavRef.current) return;
    const activeButton = tocNavRef.current.querySelector(
      `[data-toc-id="${activeHeadingId}"]`
    );
    if (!activeButton) return;

    activeButton.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeHeadingId]);

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

  const seoTitle = newsData?.meta_title || newsData?.title || "Blog Details";
  const seoDescription =
    newsData?.meta_description ||
    newsData?.description ||
    "Read this article on Tikit Agency blog.";
  const canonicalPath = `/blogs/${slug}/html`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={newsData?.focus_keyword || ""}
        canonicalUrl={canonicalPath}
        ogImage={newsData?.image || null}
        ogType="article"
        articleData={{
          title: newsData?.title || seoTitle,
          description: seoDescription,
          image: newsData?.image || null,
          publishDate: newsData?.created_at,
          modifiedDate: newsData?.updated_at || newsData?.created_at,
          url: `${BASE_URL}${canonicalPath}`,
        }}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blogs", url: "/blogs" },
          { name: newsData?.title || "Blog", url: canonicalPath },
        ]}
      />

      <div data-nav-color="black" className="news-details w-full overflow-x-hidden">
        <NewsDetailsHeader newsData={newsData} loading={loadingHeader} />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 md:px-8 my-8 sm:my-10 md:my-12 lg:my-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="paragraph-item lg:col-span-8" ref={setArticleColEl}>
              {loadingHtml ? (
                <div className="text-[var(--foreground)]/70 text-base">
                  Loading article...
                </div>
              ) : htmlError ? (
                <div className="text-red-400 text-base">
                  Failed to load article content.
                </div>
              ) : articleBodyHtml ? (
                <>
                  <div
                    ref={articleContentRef}
                    className="paragraph-description news-detail-html text-sm sm:text-base md:text-lg text-[var(--foreground)]/80 leading-relaxed mb-6 sm:mb-8 md:mb-10 lg:mb-12 [&_h2]:scroll-mt-28 [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[var(--foreground)] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:scroll-mt-28 [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-[var(--foreground)] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 sm:[&_ul]:pl-8 [&_ul]:my-4 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 sm:[&_ol]:pl-8 [&_ol]:my-4 [&_ol]:space-y-1 [&_li]:mb-1 [&_li_p]:mb-1 [&_li_p:last-child]:mb-0 [&_a]:text-[var(--secondary)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:opacity-90 [&_a]:break-words [&_i]:italic [&_b]:font-bold [&_hr]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table_td]:border [&_table_td]:border-[var(--foreground)]/20 [&_table_td]:p-2 [&_table_th]:border [&_table_th]:border-[var(--foreground)]/20 [&_table_th]:p-2"
                    dangerouslySetInnerHTML={{ __html: articleBodyHtml }}
                  />

                  {newsData?.written_by && (
                    <div className="mt-6 rounded-2xl border border-[var(--foreground)]/10 bg-[var(--container-bg)]/50 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--foreground)]/60 mb-2">
                        Written by
                      </p>
                      <p className="text-lg font-semibold text-[var(--foreground)] mb-4">
                        {newsData.written_by}
                      </p>
                      {newsData?.writer_link && (
                        <a
                          href={newsData.writer_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground)]/15 bg-[var(--background)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                        >
                          Visit Writer Profile
                        </a>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-[var(--foreground)]/70 text-base">
                  No article content available.
                </div>
              )}
            </div>

            {tocItems.length > 0 && (
              <aside
                className="hidden lg:block lg:col-span-4 self-start"
                ref={setTocAsideEl}
              >
                <div className="rounded-2xl border border-[var(--foreground)]/10 bg-[var(--container-bg)]/50 backdrop-blur-sm p-4 max-h-[70vh] overflow-y-auto overflow-x-hidden">
                  <p className="text-xs uppercase tracking-[0.35em] text-[var(--foreground)]/60 mb-4">
                    On this page
                  </p>
                  <nav
                    ref={tocNavRef}
                    aria-label="Article table of contents"
                    className="space-y-1"
                  >
                    {tocItems.map((item) => {
                      const isActive = activeHeadingId === item.id;
                      return (
                        <button
                          key={item.id}
                          data-toc-id={item.id}
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

export default BlogDetails;
