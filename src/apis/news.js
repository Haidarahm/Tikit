import { api } from "../config/backend";

export const getAllNewsItems = async (params = {}) => {
  const { page, per_page, lang } = params;
  const response = await api.get("/news/get", {
    params: {
      ...(page !== undefined ? { page } : {}),
      ...(per_page !== undefined ? { per_page } : {}),
      ...(lang ? { lang } : {}),
    },
  });

  return response.data;
};

export const getNewsDetails = async (id, params = {}) => {
  const { lang } = params;
  const response = await api.get(`/news-details/${id}/get`, {
    params: {
      ...(lang ? { lang } : {}),
    },
  });

  return response.data;
};

export const showOneNews = async (id, params = {}) => {
  const { lang } = params;
  const response = await api.get(`/news/${id}/show`, {
    params: {
      ...(lang ? { lang } : {}),
    },
  });

  return response.data;
};