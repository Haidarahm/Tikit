import { api } from "../../config/backend";

const buildParams = (params = {}) => {
  const { page, per_page, lang } = params || {};

  return {
    ...(page !== undefined ? { page } : {}),
    ...(per_page !== undefined ? { per_page } : {}),
    ...(lang ? { lang } : {}),
  };
};

const fetchWorkItemsBySlug = async (endpointBase, slug, params = {}) => {
  if (slug == null || String(slug).trim() === "") {
    throw new Error("slug is required to fetch work items");
  }

  const response = await api.get(`${endpointBase}/${encodeURIComponent(slug)}`, {
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
  fetchWorkItemsBySlug("/work-influences", params.slug, params);

export const getSocialItems = (params = {}) =>
  fetchWorkItemsBySlug("/work-socials", params.slug, params);

export const getCreativeItems = (params = {}) =>
  fetchWorkItemsBySlug("/work-creatives", params.slug, params);

export const getDigitalItems = (params = {}) =>
  fetchWorkItemsBySlug("/work-digitals", params.slug, params);

export const getEventItems = (params = {}) =>
  fetchWorkItemsBySlug("/work-events", params.slug, params);

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
