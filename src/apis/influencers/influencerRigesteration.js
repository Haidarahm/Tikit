import { api } from "../../config/backend";

/**
 * Register an influencer
 * POST /influencers/register
 * @param {Object} data - Registration data
 * @param {string} data.name
 * @param {string} data.nationality
 * @param {string} data.residence
 * @param {string} data.email
 * @param {string} data.phone
 * @param {string} data.type
 * @param {Array} data.socialLinks - Array of social links with platform, link, and prices
 * @param {Array} data.niches - Array of niche IDs
 * @param {number} data.followerCount
 * @param {string} data.whyJoin
 * @param {File} data.media - PDF file
 */
export const registerInfluencer = async (data) => {
  const formData = new FormData();

  // Add simple fields
  formData.append("name", data.name || "");
  formData.append("nationality", data.nationality || "");
  formData.append("residence", data.residence || "");
  formData.append("email", data.email || "");
  formData.append("phone", data.phone || "");
  formData.append("type", data.type || "");
  formData.append("followerCount", data.followerCount || 0);
  formData.append("whyJoin", data.whyJoin || "");

  // Add niches array
  if (Array.isArray(data.niches)) {
    data.niches.forEach((niche, index) => {
      formData.append(`niches[${index}]`, niche);
    });
  }

  // Add social links array
  if (Array.isArray(data.socialLinks)) {
    data.socialLinks.forEach((socialLink, index) => {
      formData.append(
        `socialLinks[${index}][platform]`,
        socialLink.platform || ""
      );
      formData.append(`socialLinks[${index}][link]`, socialLink.link || "");

      // Add prices for this social link
      if (Array.isArray(socialLink.prices)) {
        socialLink.prices.forEach((price, priceIndex) => {
          formData.append(
            `socialLinks[${index}][prices][${priceIndex}][type]`,
            price.type || ""
          );
          formData.append(
            `socialLinks[${index}][prices][${priceIndex}][price]`,
            price.price || ""
          );
        });
      }
    });
  }

  // Add media file (PDF)
  if (data.media instanceof File) {
    formData.append("media", data.media);
  }

  const response = await api.post("/influencers/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * Get niches
 * GET /niches?lang={lang}
 * @param {Object} params - Query parameters
 * @param {string} params.lang - Language code (default: "en")
 */
export const getNiches = async (params = {}) => {
  const { lang = "en" } = params;
  const response = await api.get("/niches", {
    params: { lang },
  });
  return response.data;
};
