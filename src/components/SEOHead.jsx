import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  // New props for enhanced AEO
  serviceType,
  breadcrumbs,
  faqItems,
  articleData,
}) => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();

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

  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} - Best Social Media Management Company in Emirates & Saudi Arabia | Influencer Marketing & Branding`;
  const fullDescription =
    description ||
    t(
      "seo.defaultDescription",
      "Tikit Agency is the best social media management company in Emirates (UAE) and Saudi Arabia. We offer comprehensive influencer marketing, social media management, and branding services. Connect with authentic creators, build engaged communities, and create memorable brand identities across Dubai, Abu Dhabi, Riyadh, Jeddah, and the GCC region. 300+ happy clients, 50+ team members."
    );
  const fullKeywords =
    keywords ||
    t(
      "seo.defaultKeywords",
      "best social media management company Emirates, best social media management company Saudi Arabia, best social media management company UAE, influencer marketing Emirates, influencer marketing Saudi Arabia, branding company Emirates, branding company Saudi Arabia, social media agency Dubai, influencer marketing agency Dubai, branding agency Dubai, social media management Dubai, influencer marketing or branding, best influencer marketing company Emirates"
    );
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullOgImage = ogImage || defaultImage;

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

  // Generate Article Schema (for blog/news pages)
  const generateArticleSchema = () => {
    if (!articleData) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": articleData.title || title,
      "description": articleData.description || fullDescription,
      "image": articleData.image || fullOgImage,
      "author": {
        "@type": "Organization",
        "name": siteName
      },
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo-light.svg`
        }
      },
      "datePublished": articleData.publishDate,
      "dateModified": articleData.modifiedDate || articleData.publishDate
    };
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
      ["apple-mobile-web-app-capable", "yes"],
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
    } else {
      // Default Organization schema optimized for AI engines
      const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteName,
        "description": fullDescription,
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo-light.svg`,
          "width": 200,
          "height": 60
        },
        "image": `${baseUrl}/cover-image.png`,
        "telephone": businessInfo.phone,
        "email": businessInfo.email,
        "sameAs": [
          businessInfo.instagram
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": businessInfo.phone,
          "contactType": "customer service",
          "email": businessInfo.email,
          "availableLanguage": ["English", "Arabic", "French"],
          "areaServed": ["AE", "SA", "TR", "SY"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "The Burlington Tower, Marasi Drive, Office 309",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        },
        "foundingDate": "2020",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 50
        },
        "areaServed": ["United Arab Emirates", "Saudi Arabia", "Turkey", "GCC Region", "MENA Region"],
        "knowsAbout": [
          "Influencer Marketing",
          "Talent Management", 
          "Social Media Marketing",
          "Social Media Management",
          "Branding",
          "Brand Identity Design",
          "Content Production",
          "Digital Marketing",
          "Community Management",
          "Brand Strategy"
        ],
        "alternateName": [
          "Best Social Media Management Company Emirates",
          "Best Social Media Management Company Saudi Arabia",
          "Best Influencer Marketing Company Emirates",
          "Best Branding Company UAE",
          "Social Media Agency Dubai",
          "Influencer Marketing Agency Dubai"
        ]
      };
      schemas.push(defaultSchema);
    }

    // Add service schema if applicable
    const serviceSchema = generateServiceSchema();
    if (serviceSchema) schemas.push(serviceSchema);

    // Add breadcrumb schema if applicable
    const breadcrumbSchema = generateBreadcrumbSchema();
    if (breadcrumbSchema) schemas.push(breadcrumbSchema);

    // Add FAQ schema if applicable
    const faqSchema = generateFAQSchema();
    if (faqSchema) schemas.push(faqSchema);

    // Add article schema if applicable
    const articleSchema = generateArticleSchema();
    if (articleSchema) schemas.push(articleSchema);

    // Inject all schemas
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
  ]);

  return null;
};

export default SEOHead;
