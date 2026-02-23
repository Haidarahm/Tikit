import { api } from "../../config/backend";

export const getAllInfluencers = async (params = {}) => {
  const { page, per_page = 40, lang } = params;

  const response = await api.get("/influencers/get/all", {
    params: {
      ...(page !== undefined ? { page } : {}),
      ...(per_page !== undefined ? { per_page } : {}),
      ...(lang ? { lang } : {}),
    },
  });

  return response.data;
};

export const getAllSections = async (params = {}) => {
  const { page, per_page, lang } = params;

  const response = await api.get("/sections/get", {
    params: {
      ...(page !== undefined ? { page } : {}),
      ...(per_page !== undefined ? { per_page } : {}),
      ...(lang ? { lang } : {}),
    },
  });

  return response.data;
};

export const getInfluencers = async (sectionId, params = {}) => {
  if (!sectionId) {
    throw new Error("sectionId is required to fetch influencers");
  }

  const { page, per_page, lang } = params;

  const response = await api.get(`/influencers/sections/${sectionId}/get`, {
    params: {
      ...(page !== undefined ? { page } : {}),
      ...(per_page !== undefined ? { per_page } : {}),
      ...(lang ? { lang } : {}),
    },
  });

  return response.data;
};
