import { api } from "../../config/backend";

/**
 * Fetch works sections from the /works/add endpoint.
 * Optional params: lang, page, per_page.
 */
export const getWorksSections = async (params = {}) => {
  const { lang, page, per_page } = params || {};

  const response = await api.get("/works/get", {
    params: {
      ...(lang ? { lang } : {}),
      ...(page !== undefined ? { page } : {}),
      ...(per_page !== undefined ? { per_page } : {}),
    },
  });

  return response.data;
};
