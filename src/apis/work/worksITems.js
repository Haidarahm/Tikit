import { api } from "../../config/backend";

const buildParams = (params = {}) => {
  const { page, per_page, lang, work_id } = params || {};

  return {
    ...(page !== undefined ? { page } : {}),
    ...(per_page !== undefined ? { per_page } : {}),
    ...(lang ? { lang } : {}),
    ...(work_id !== undefined ? { work_id } : {}),
  };
};

const fetchWorkItems = async (endpoint, params = {}) => {
  const response = await api.get(endpoint, {
    params: buildParams(params),
  });

  return response.data;
};

export const getInfluenceItems = (params = {}) =>
  fetchWorkItems("/work-influences/get", params);

export const getSocialItems = (params = {}) =>
  fetchWorkItems("/work-socials/get", params);

export const getCreativeItems = (params = {}) =>
  fetchWorkItems("/work-creatives/get", params);

export const getDigitalItems = (params = {}) =>
  fetchWorkItems("/work-digitals/get", params);

export const getEventItems = (params = {}) =>
  fetchWorkItems("/work-events/get", params);
