import { create } from "zustand";
import {
  getInfluenceItems,
  getSocialItems,
  getCreativeItems,
  getDigitalItems,
  getEventItems,
} from "../../apis/work/worksITems";

const CATEGORY_CONFIG = {
  influence: {
    fetcher: getInfluenceItems,
    errorMessage: "Failed to load influence items",
  },
  social: {
    fetcher: getSocialItems,
    errorMessage: "Failed to load social items",
  },
  creative: {
    fetcher: getCreativeItems,
    errorMessage: "Failed to load creative items",
  },
  digital: {
    fetcher: getDigitalItems,
    errorMessage: "Failed to load digital items",
  },
  events: {
    fetcher: getEventItems,
    errorMessage: "Failed to load event items",
  },
};

const createCategoryState = () => ({
  items: [],
  pagination: null,
  message: null,
  loading: false,
  error: null,
});

const createInitialState = () => ({
  influence: createCategoryState(),
  social: createCategoryState(),
  creative: createCategoryState(),
  digital: createCategoryState(),
  events: createCategoryState(),
});

export const useWorkItemsStore = create((set) => {
  const loadCategory = async (category, params = {}) => {
    const config = CATEGORY_CONFIG[category];
    if (!config) {
      throw new Error(`Unknown work category "${category}"`);
    }

    set((state) => ({
      ...state,
      [category]: {
        ...state[category],
        loading: true,
        error: null,
      },
    }));

    try {
      const response = await config.fetcher(params);
      const payload = response?.data ?? response ?? [];
      const normalized = Array.isArray(payload)
        ? payload
        : payload
        ? [payload]
        : [];

      set((state) => ({
        ...state,
        [category]: {
          ...state[category],
          items: normalized,
          pagination: response?.pagination ?? null,
          message: response?.message ?? null,
          loading: false,
        },
      }));

      return normalized;
    } catch (error) {
      set((state) => ({
        ...state,
        [category]: {
          ...state[category],
          error: error?.message || config.errorMessage,
          loading: false,
        },
      }));
      throw error;
    }
  };

  return {
    ...createInitialState(),

    resetCategory: (category) =>
      set((state) => {
        if (!CATEGORY_CONFIG[category]) {
          return state;
        }
        return {
          ...state,
          [category]: createCategoryState(),
        };
      }),

    resetAll: () => set(() => createInitialState()),

    loadInfluenceItems: (params) => loadCategory("influence", params),
    loadSocialItems: (params) => loadCategory("social", params),
    loadCreativeItems: (params) => loadCategory("creative", params),
    loadDigitalItems: (params) => loadCategory("digital", params),
    loadEventItems: (params) => loadCategory("events", params),
  };
});
