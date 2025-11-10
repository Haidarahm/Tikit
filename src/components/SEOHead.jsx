import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../store/I18nLanguageContext";

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = "website",
  structuredData,
}) => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const siteName = "Tikit Agency";
  const baseUrl = "https://tikit.ae";
  const defaultImage = `${baseUrl}/logo-light.svg`;

  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} - Full-Service Marketing Agency`;
  const fullDescription =
    description ||
    t(
      "seo.defaultDescription",
      "We are Tikit — a full-service marketing agency driven by insight and creativity. Partnering with brands to deliver results through expert strategy, creative firepower, and flawless execution."
    );
  const fullKeywords =
    keywords ||
    t(
      "seo.defaultKeywords",
      "marketing agency, digital marketing, influencer marketing, social media management, branding, production, creative agency, marketing strategy"
    );
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullOgImage = ogImage || defaultImage;

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

    const scriptId = "seo-structured-data";
    let scriptTag = document.getElementById(scriptId);
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    } else {
      const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        description: fullDescription,
        url: baseUrl,
        logo: `${baseUrl}/logo-light.svg`,
        sameAs: [
          "https://www.linkedin.com/company/tikit-agency",
          "https://www.instagram.com/tikitagency",
          "https://twitter.com/tikitagency",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-555-TIKIT-01",
          contactType: "customer service",
          availableLanguage: ["English", "French", "Arabic"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "US",
        },
        foundingDate: "2020",
        numberOfEmployees: "50-100",
        industry: "Marketing and Advertising",
      };

      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(defaultSchema);
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
