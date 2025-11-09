import { api } from "../config/backend";

export const getAllNewsItems = async (params = {}) => {
  const { page, per_page, lang } = params;
  const response = await api.get("/api/news/get", {
    params: {
      ...(page !== undefined ? { page } : {}),
      ...(per_page !== undefined ? { per_page } : {}),
      ...(lang ? { lang } : {}),
    },
  });

  return response.data;
};
