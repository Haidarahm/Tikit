import { api } from "../config/backend";

// GET /showcase-projects/get?lang={lang}
export const getAllCases = async (lang = "en") => {
  const response = await api.get("/showcase-projects/get", {
    params: { lang },
  });
  return response.data;
};

// GET /showcase-projects/show/{slug}?lang={lang}
export const getCase = async (slug, lang = "en") => {
  if (slug == null) {
    throw new Error("slug is required to fetch showcase case details");
  }

  const response = await api.get(`/showcase-projects/${slug}`, {
    params: { lang },
  });

  return response.data;
};


