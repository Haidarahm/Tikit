import { api } from "../config/backend";

export const getAllNewsItems = async (params = {}) => {
  const { page, per_page, lang } = params;
  const response = await api.get("/blogs/get", {
    params: {
      ...(page !== undefined ? { page } : {}),
      ...(per_page !== undefined ? { per_page } : {}),
      ...(lang ? { lang } : {}),
    },
  });

  return response.data;
};

// Fetch news details (paragraphs) by blog slug
export const getNewsDetails = async (slug, params = {}) => {
  const { lang } = params;
  const response = await api.get(`/blogs-details/${encodeURIComponent(slug)}/get`, {
    params: {
      ...(lang ? { lang } : {}),
    },
  });

  return response.data;
};

export const showOneNews = async (slug, params = {}) => {
  const { lang } = params;
  const response = await api.get(`/blogs/${slug}`, {
    params: {
      ...(lang ? { lang } : {}),
    },
  });

  return response.data;
};