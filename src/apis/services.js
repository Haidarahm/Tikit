import { api } from "../config/backend";

// GET /api/services?lang={lang}&page={page}&per_page={per_page}
export const fetchAllServices = async (
  params = { lang: "en", page: 1, per_page: 10 }
) => {
  const { lang = "en", page, per_page } = params || {};
  const response = await api.get("/services/get", {
    params: { lang, page, per_page },
  });
  return response.data;
};

// GET /api/services/{id}?lang={lang}
export const getServiceDetails = async (id, lang = "en") => {
  const response = await api.get(`/services/show/${id}`, {
    params: { lang },
  });
  return response.data;
};

// GET /api/sub/{id}/services?lang={lang}
export const getServiceCases = async (subId, lang = "en") => {
  const response = await api.get(`/services/${subId}/cases/get`, {
    params: { lang },
  });
  return response.data;
};
