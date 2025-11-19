import { create } from "zustand";
import {
  fetchWorkInfluence,
  fetchWorkSocial,
  fetchWorkCreative,
  fetchWorkDigital,
  fetchWorkEvent,
} from "../../apis/work/worksITems";

const createDetailState = () => ({
  item: null,
  media: [],
  raw: null,
  message: null,
  loading: false,
  error: null,
});

const CATEGORY_CONFIG = {
  influence: {
    fetcher: fetchWorkInfluence,
    transform: (response) => {
      const payload = response?.data ?? {};
      return {
        item: payload?.data ?? null,
        media: Array.isArray(payload?.media) ? payload.media : [],
        raw: response,
        message: response?.message ?? null,
      };
    },
    errorMessage: "Failed to load influence details",
  },
  social: {
    fetcher: fetchWorkSocial,
    transform: (response) => {
      console.log(response);
      const payload = response ?? {};
      
      return {
        item: payload?.data ?? null,
        media: Array.isArray(payload?.data.media) ? payload.data.media : [],
        raw: response,
        message: response?.message ?? null,
      };
    },
    errorMessage: "Failed to load social details",
  },
  creative: {
    fetcher: fetchWorkCreative,
    transform: (response) => {
      const payload = response?.data ?? {};
      const media = Array.isArray(payload?.media)
        ? payload.media
        : [
            payload?.brand_image_1,
            payload?.brand_image_2,
            payload?.brand_image_3,
          ].filter(Boolean);
      return {
        item: payload ?? null,
        media,
        raw: response,
        message: response?.message ?? null,
      };
    },
    errorMessage: "Failed to load creative details",
  },
  digital: {
    fetcher: fetchWorkDigital,
    transform: (response) => {
      const payload = response?.data ?? {};
      return {
        item: payload ?? null,
        media: Array.isArray(payload?.media) ? payload.media : [],
        raw: response,
        message: response?.message ?? null,
      };
    },
    errorMessage: "Failed to load digital details",
  },
  events: {
    fetcher: fetchWorkEvent,
    transform: (response) => {
      const payload = response?.data ?? {};
      return {
        item: payload?.event ?? null,
        media: Array.isArray(payload?.media) ? payload.media : [],
        raw: response,
        message: response?.message ?? null,
      };
    },
    errorMessage: "Failed to load event details",
  },
};

const initialState = {
  influence: createDetailState(),
  social: createDetailState(),
  creative: createDetailState(),
  digital: createDetailState(),
  events: createDetailState(),
};

export const useWorkItemDetailsStore = create((set) => {
  const loadCategory = async (category, id, params = {}) => {
    const config = CATEGORY_CONFIG[category];
    if (!config) throw new Error(`Unknown work category "${category}"`);

    set((state) => ({
      ...state,
      [category]: {
        ...state[category],
        loading: true,
        error: null,
      },
    }));

    try {
      const response = await config.fetcher(id, params);
      const { item, media, raw, message } = config.transform(response);

      set((state) => ({
        ...state,
        [category]: {
          ...state[category],
          item,
          media,
          raw,
          message,
          loading: false,
          error: null,
        },
      }));

      return { item, media, raw };
    } catch (error) {
      set((state) => ({
        ...state,
        [category]: {
          ...state[category],
          loading: false,
          error:
            error?.message ||
            error?.response?.data?.message ||
            config.errorMessage,
        },
      }));
      throw error;
    }
  };

  return {
    ...initialState,
    resetCategory: (category) =>
      set((state) => {
        if (!CATEGORY_CONFIG[category]) {
          return state;
        }
        return {
          ...state,
          [category]: createDetailState(),
        };
      }),
    resetAll: () => set(() => ({ ...initialState })),
    loadInfluenceDetail: (id, params) => loadCategory("influence", id, params),
    loadSocialDetail: (id, params) => loadCategory("social", id, params),
    loadCreativeDetail: (id, params) => loadCategory("creative", id, params),
    loadDigitalDetail: (id, params) => loadCategory("digital", id, params),
    loadEventDetail: (id, params) => loadCategory("events", id, params),
  };
});
