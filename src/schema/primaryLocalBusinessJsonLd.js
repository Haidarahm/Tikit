/**
 * Primary Dubai LocalBusiness node for JSON-LD @graph.
 *
 * Kept aligned with `index.html` (`@id`: `https://tikit.ae/#dubai-office`) so
 * search engines can reconcile entities. Injected from `SEOHead` on every route
 * that uses `<SEOHead />` unless disabled or already present in `structuredData`.
 */

import { TIKIT_DUBAI_POSTAL_ADDRESS } from "./businessPostalAddress.js";

export function generatePrimaryLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://tikit.ae/#dubai-office",
    name: "Tikit Agency - Dubai",
    description:
      "Best influencer marketing agency in Emirates (UAE) and Dubai. Tikit is the leading influencer marketing agency in Emirates, connecting brands with top influencers and content creators across the UAE and GCC region.",
    url: "https://tikit.ae/",
    telephone: "+971 4 577 4042",
    email: "Holla@tikit.ae",
    image: "https://tikit.ae/cover-image.png",
    logo: "https://tikit.ae/logo-light.png",
    priceRange: "$$$",
    address: TIKIT_DUBAI_POSTAL_ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2048,
      longitude: 55.2708,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [{ "@type": "City", name: "Dubai" }, { "@type": "Country", name: "United Arab Emirates" }],
    sameAs: ["https://www.instagram.com/tikit.ae/"],
  };
}
