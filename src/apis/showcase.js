import { api } from "../config/backend";

// GET /showcase-projects/get?lang={lang}
export const getAllCases = async (lang = "en") => {
  const response = await api.get("/showcase-projects/get", {
    params: { lang },
  });
  return response.data;
};

// GET /showcase-projects/show/{id}?lang={lang}
export const getCase = async (id, lang = "en") => {
  if (id == null) {
    throw new Error("id is required to fetch showcase case details");
  }

  const response = await api.get(`/showcase-projects/show/${id}`, {
    params: { lang },
  });

  return response.data;
};


