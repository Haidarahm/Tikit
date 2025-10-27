import { api } from "../config/backend";

// GET /api/works?lang={lang} (defaults to "en")
export const fetchAllWorks = async ({ lang, page, per_page }) => {
  const response = await api.get("/api/works", {
    params: { lang: lang ?? "en", page, per_page },
  });
  return response.data;
};

// GET /api/works/{id}/cases
export const fetchAllCases = async (id, lang = "en") => {
  const response = await api.get(`/api/works/${id}/cases`, {
    params: { lang },
  });
  return response.data;
};

// GET /api/works/{id}?lang={lang}
export const getWorkDetails = async (id, lang) => {
  const response = await api.get(`/api/works/${id}`, {
    params: { lang: lang ?? "en" },
  });
  return response.data;
};

// GET /api/cases/{id}
export const getCaseDetails = async (id) => {
  const response = await api.get(`/api/cases/${id}`);
  return response.data;
};
