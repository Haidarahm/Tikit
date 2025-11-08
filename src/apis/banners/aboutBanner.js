import { api } from "../../config/backend";

// GET /api/about-us-banners/get
// Optional params: { page, per_page }
export const getBannerVideos = async (params = {}) => {
  const response = await api.get("/api/about-us-banners/get", {
    params,
  });
  return response.data;
};
