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

const fetchWorkItemById = async (endpoint, id, params = {}) => {
  if (id == null) {
    throw new Error("id is required to fetch work item details");
  }

  const response = await api.get(`${endpoint}/${id}/show`, {
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

export const fetchWorkInfluence = (id, params = {}) =>
  fetchWorkItemById("/work-influences", id, params);

export const fetchWorkSocial = (id, params = {}) =>
  fetchWorkItemById("/work-socials", id, params);

export const fetchWorkCreative = (id, params = {}) =>
  fetchWorkItemById("/work-creatives", id, params);

export const fetchWorkDigital = (id, params = {}) =>
  fetchWorkItemById("/work-digitals", id, params);

export const fetchWorkEvent = (id, params = {}) =>
  fetchWorkItemById("/work-events", id, params);
