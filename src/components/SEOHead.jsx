import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useI18nLanguage } from "../store/I18nLanguageContext";

/**
 * SEOHead Component - AI Engine Optimization Ready
 * 
 * Provides comprehensive meta tags and structured data for:
 * - Search engines (Google, Bing)
 * - AI assistants (ChatGPT, Claude, Gemini, Perplexity)
 * - Social media platforms
 */
const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = "website",
  structuredData,
  /** When true, use `title` as the full document title (no automatic `| Tikit Agency` suffix). */
  skipTitleSuffix = false,
  // New props for enhanced AEO
  serviceType,
  breadcrumbs,
  faqItems,
  articleData,
}) => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const location = useLocation();

  const siteName = "Tikit Agency";
  const baseUrl = "https://tikit.ae";
  const defaultImage = `${baseUrl}/cover-image.png`;
  
  // Business constants for schema
  const businessInfo = {
    phone: "+971 4 577 4042",
    email: "Holla@tikit.ae",
    address: "The Burlington Tower, Marasi Drive, Dubai – Office 309",
    instagram: "https://www.instagram.com/tikit.ae/",
  };

  // Avoid duplicating site name if caller already includes it
  const hasSiteNameInTitle =
    typeof title === "string" &&
    title.toLowerCase().includes(siteName.toLowerCase());

  const fullTitle = title
    ? skipTitleSuffix || hasSiteNameInTitle
      ? title
      : `${title} | ${siteName}`
    : "Dubai Influencer Marketing Agency | Tikit – Creative Campaigns That Convert";
  const fullDescription =
    description ||
    t(
      "seo.defaultDescription",
      "We help brands in Dubai grow through smart strategy, creative content, and performance-focused campaigns. Work with a team that focuses on real results."
    );
  const fullKeywords =
    keywords ||
    t(
      "seo.defaultKeywords",
      "marketing agency Dubai, creative marketing Dubai, performance marketing UAE, branding agency Dubai, digital marketing Dubai"
    );
  
  // Use provided canonicalUrl, or fallback to current location pathname
  // Remove trailing slashes and ensure it starts with /
  const getCanonicalPath = () => {
    const currentPath = location.pathname;
    const normalizedCurrentPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
    
    // Homepage routes that should canonicalize to /
    const homepageRoutes = ['/'];
    const isHomepageRoute = homepageRoutes.includes(normalizedCurrentPath);
    
    // If canonicalUrl is explicitly provided
    if (canonicalUrl !== undefined && canonicalUrl !== null) {
      const normalizedCanonical = canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`;
      
      // If canonicalUrl is "/" but we're not on a homepage route, use current path instead
      if (normalizedCanonical === '/' && !isHomepageRoute) {
        return normalizedCurrentPath;
      }
      
      return normalizedCanonical;
    }
    
    // No canonicalUrl provided - use current pathname
    // For homepage routes, use "/", otherwise use the actual path
    return isHomepageRoute ? '/' : normalizedCurrentPath;
  };
  
  const fullCanonicalUrl = `${baseUrl}${getCanonicalPath()}`;
  const fullOgImage = ogImage || defaultImage;
  const getLocalizedUrl = (lang) => `${baseUrl}${getCanonicalPath()}?lang=${lang}`;

  // Generate Service Schema if serviceType is provided
  const generateServiceSchema = () => {
    if (!serviceType) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceType,
      "description": fullDescription,
      "provider": {
        "@type": "Organization",
        "name": siteName,
        "url": baseUrl,
        "telephone": businessInfo.phone,
        "email": businessInfo.email
      },
      "areaServed": ["Dubai", "Abu Dhabi", "Saudi Arabia", "Riyadh", "Jeddah", "Istanbul", "Turkey", "GCC"],
      "serviceType": serviceType
    };
  };

  // Generate base WebPage schema for consistent coverage across all routes
  const generateWebPageSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": fullTitle,
    "description": fullDescription,
    "url": fullCanonicalUrl,
    "inLanguage": isRtl ? "ar" : "en",
    "isPartOf": {
      "@type": "WebSite",
      "name": siteName,
      "url": baseUrl
    }
  });

  // Generate Breadcrumb Schema
  const generateBreadcrumbSchema = () => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${baseUrl}${crumb.url}`
      }))
    };
  };

  // Generate FAQ Schema
  const generateFAQSchema = () => {
    if (!faqItems || faqItems.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  };

  // Detect FAQPage schema in either a single schema object or @graph payload.
  const hasFAQPageSchema = (schema) => {
    if (!schema || typeof schema !== "object") return false;

    if (Array.isArray(schema)) {
      return schema.some(hasFAQPageSchema);
    }

    if (schema["@type"] === "FAQPage") return true;

    const graph = Array.isArray(schema["@graph"]) ? schema["@graph"] : [];
    return graph.some(
      (node) => node && typeof node === "object" && node["@type"] === "FAQPage"
    );
  };

  const hasSchemaType = (schema, type) => {
    if (!schema || typeof schema !== "object") return false;
    if (Array.isArray(schema)) return schema.some((item) => hasSchemaType(item, type));
    if (schema["@type"] === type) return true;
    const graph = Array.isArray(schema["@graph"]) ? schema["@graph"] : [];
    return graph.some((node) => node && typeof node === "object" && node["@type"] === type);
  };

  // Generate Article / BlogPosting Schema (for blog/news pages).
  // Uses `BlogPosting` (more precise for AI engines) when this page is rendered as an article.
  const generateArticleSchema = () => {
    if (!articleData) return null;

    const articleUrl = articleData.url || fullCanonicalUrl;
    const schemaType = ogType === "article" ? "BlogPosting" : "Article";

    const schema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "headline": articleData.title || title,
      "description": articleData.description || fullDescription,
      "image": articleData.image || fullOgImage,
      "url": articleUrl,
      "inLanguage": isRtl ? "ar" : "en",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      },
      "author": articleData.author
        ? {
            "@type": "Person",
            "name": articleData.author,
            ...(articleData.authorUrl ? { url: articleData.authorUrl } : {}),
          }
        : {
            "@type": "Organization",
            "name": siteName,
            "url": baseUrl,
          },
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo-light.png`,
          "width": 200,
          "height": 60
        }
      },
      "datePublished": articleData.publishDate,
      "dateModified": articleData.modifiedDate || articleData.publishDate,
    };

    if (fullKeywords) {
      schema.keywords = fullKeywords;
    }

    if (Array.isArray(articleData.articleSection) && articleData.articleSection.length) {
      schema.articleSection = articleData.articleSection;
    } else if (typeof articleData.articleSection === "string" && articleData.articleSection) {
      schema.articleSection = articleData.articleSection;
    }

    return schema;
  };

  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousTitle = document.title;
    document.title = fullTitle;

    const setMeta = (selector, attr, content, isProperty = false) => {
      if (!content) return;
      const key = isProperty ? "property" : "name";
      let tag = document.head.querySelector(`${selector}[${key}="${attr}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(key, attr);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
      return tag;
    };

    const setLink = (rel, href) => {
      if (!href) return;
      let link = document.head.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
      return link;
    };

    const setAlternateLink = (hreflang, href) => {
      if (!href) return;
      let link = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", hreflang);
        link.setAttribute("data-seo-hreflang", "true");
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
      return link;
    };

    const previous = [];

    const metaEntries = [
      ["description", fullDescription],
      ["keywords", fullKeywords],
      ["author", "Tikit Agency"],
      ["robots", "index, follow"],
      ["language", isRtl ? "ar" : "en"],
      ["revisit-after", "7 days"],
      ["viewport", "width=device-width, initial-scale=1.0"],
      ["theme-color", "#52C3C5"],
      ["msapplication-TileColor", "#52C3C5"],
      ["mobile-web-app-capable", "yes"], // Standard meta tag
      ["apple-mobile-web-app-capable", "yes"], // Keep for backward compatibility with older iOS
      ["apple-mobile-web-app-status-bar-style", "default"],
    ];

    metaEntries.forEach(([name, value]) => {
      if (!value) return;
      const tag = document.head.querySelector(`meta[name="${name}"]`);
      previous.push({ tag, name, value: tag?.getAttribute("content") });
      setMeta("meta", name, value);
    });

    const ogEntries = [
      ["og:title", fullTitle],
      ["og:description", fullDescription],
      ["og:image", fullOgImage],
      ["og:url", fullCanonicalUrl],
      ["og:type", ogType],
      ["og:site_name", siteName],
      ["og:locale", isRtl ? "ar_SA" : "en_US"],
    ];

    ogEntries.forEach(([prop, value]) => {
      if (!value) return;
      const tag = document.head.querySelector(`meta[property="${prop}"]`);
      previous.push({
        tag,
        name: prop,
        value: tag?.getAttribute("content"),
        property: true,
      });
      setMeta("meta", prop, value, true);
    });

    const twitterEntries = [
      ["twitter:card", "summary_large_image"],
      ["twitter:title", fullTitle],
      ["twitter:description", fullDescription],
      ["twitter:image", fullOgImage],
      ["twitter:site", "@tikitagency"],
      ["twitter:creator", "@tikitagency"],
    ];

    twitterEntries.forEach(([name, value]) => {
      if (!value) return;
      const tag = document.head.querySelector(`meta[name="${name}"]`);
      previous.push({ tag, name, value: tag?.getAttribute("content") });
      setMeta("meta", name, value);
    });

    const canonicalTag = setLink("canonical", fullCanonicalUrl);
    const alternates = [
      setAlternateLink("en", getLocalizedUrl("en")),
      setAlternateLink("fr", getLocalizedUrl("fr")),
      setAlternateLink("ar", getLocalizedUrl("ar")),
      setAlternateLink("x-default", getLocalizedUrl("en")),
    ].filter(Boolean);
    const htmlEl = document.documentElement;
    const prevLang = htmlEl.lang;
    const prevDir = htmlEl.dir;
    htmlEl.lang = isRtl ? "ar" : "en";
    htmlEl.dir = isRtl ? "rtl" : "ltr";

    // Handle structured data - support multiple schemas
    const scriptId = "seo-structured-data";
    let scriptTag = document.getElementById(scriptId);
    
    // Collect all schemas
    const schemas = [];
    
    if (structuredData) {
      schemas.push(structuredData);
    }

    // Ensure every route has at least one page-level schema entity.
    // Skip if caller already provides a WebPage node.
    if (!schemas.some((schema) => hasSchemaType(schema, "WebPage"))) {
      schemas.push(generateWebPageSchema());
    }

    // Add service schema if applicable
    const serviceSchema = generateServiceSchema();
    if (serviceSchema) schemas.push(serviceSchema);

    // Add breadcrumb schema if applicable
    const breadcrumbSchema = generateBreadcrumbSchema();
    if (breadcrumbSchema) schemas.push(breadcrumbSchema);

    // Add FAQ schema if applicable
    const faqSchema = generateFAQSchema();
    if (faqSchema && !schemas.some(hasFAQPageSchema)) {
      schemas.push(faqSchema);
    }

    // Add article schema if applicable
    const articleSchema = generateArticleSchema();
    if (articleSchema) schemas.push(articleSchema);

    // Inject all schemas
    if (schemas.length > 0) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }

      // If multiple schemas, wrap in @graph; otherwise use single schema
      if (schemas.length > 1) {
        scriptTag.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemas.map(s => {
            const { "@context": _, ...rest } = s;
            return rest;
          })
        });
      } else {
        scriptTag.textContent = JSON.stringify(schemas[0]);
      }
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      document.title = previousTitle;
      previous.forEach(({ tag, name, value, property }) => {
        if (!tag) return;
        if (value == null) {
          tag.remove();
        } else {
          tag.setAttribute(property ? "property" : "name", name);
          tag.setAttribute("content", value);
        }
      });
      if (canonicalTag && !canonicalTag.getAttribute("href")) {
        canonicalTag.remove();
      }
      alternates.forEach((link) => {
        if (link?.getAttribute("data-seo-hreflang") === "true") {
          link.remove();
        }
      });
      htmlEl.lang = prevLang;
      htmlEl.dir = prevDir;
    };
  }, [
    fullTitle,
    fullDescription,
    fullKeywords,
    fullCanonicalUrl,
    fullOgImage,
    ogType,
    siteName,
    isRtl,
    structuredData,
    serviceType,
    breadcrumbs,
    faqItems,
    articleData,
    location.pathname,
    canonicalUrl,
    language,
  ]);

  return null;
};

export default SEOHead;
