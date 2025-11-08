import { api } from "../../config/backend";

// GET /api/banners/get
// Optional params: { page, per_page }
export const fetchVideos = async (params = {}) => {
  const response = await api.get("/api/banners/get", {
    params,
  });
  return response.data;
};
