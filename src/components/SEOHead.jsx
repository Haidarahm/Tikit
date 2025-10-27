import { Helmet } from "react-helmet-async";
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

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="Tikit Agency" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={isRtl ? "ar" : "en"} />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={isRtl ? "ar_SA" : "en_US"} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@tikitagency" />
      <meta name="twitter:creator" content="@tikitagency" />

      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#52C3C5" />
      <meta name="msapplication-TileColor" content="#52C3C5" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Language and Direction */}
      <html lang={isRtl ? "ar" : "en"} dir={isRtl ? "rtl" : "ltr"} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Default Structured Data for Organization */}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Tikit Agency",
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
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
