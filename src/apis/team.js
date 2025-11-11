import { api } from "../config/backend";

const normalizeQueryParams = (params = {}) => {
  const { lang = "en", page, per_page } = params;
  return {
    lang,
    ...(page !== undefined ? { page } : {}),
    ...(per_page !== undefined ? { per_page } : {}),
  };
};

// GET /teams/get?lang={lang}&page={page}&per_page={per_page}
export const getAllTeamMembers = async (params = {}) => {
  const response = await api.get("/teams/get", {
    params: normalizeQueryParams(params),
  });
  return response.data;
};
