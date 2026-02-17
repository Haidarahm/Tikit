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
  requestId: null,
  activeWorkSlug: null,
});

const createInitialState = () => ({
  influence: createCategoryState(),
  social: createCategoryState(),
  creative: createCategoryState(),
  digital: createCategoryState(),
  events: createCategoryState(),
});

export const useWorkItemsStore = create((set, get) => {
  const loadCategory = async (category, params = {}) => {
    const config = CATEGORY_CONFIG[category];
    if (!config) throw new Error(`Unknown work category "${category}"`);

    // unique request ID to prevent overwrites
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const incomingWorkSlug = params?.slug ?? null;

    // start loading
    set((state) => ({
      ...state,
      [category]: {
        ...createCategoryState(),
        loading: true,
        error: null,
        requestId,
        activeWorkSlug: incomingWorkSlug,
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

      // only update if requestId still matches
      set((state) => {
        if (state[category].requestId !== requestId) return state;
        return {
          ...state,
          [category]: {
            ...state[category],
            items: normalized,
            pagination: response?.pagination ?? null,
            message: response?.message ?? null,
            loading: false,
          },
        };
      });

      return normalized;
    } catch (error) {
      set((state) => {
        if (state[category].requestId !== requestId) return state;
        return {
          ...state,
          [category]: {
            ...state[category],
            error: error?.message || config.errorMessage,
            loading: false,
          },
        };
      });
      throw error;
    }
  };

  return {
    ...createInitialState(),

    // ✅ Clears category immediately & cancels old requestId
    resetCategory: (category) => {
      if (!CATEGORY_CONFIG[category]) return;
      set((state) => ({
        ...state,
        [category]: {
          ...createCategoryState(),
          requestId: `reset-${Date.now()}`,
        },
      }));
    },

    resetAll: () => set(() => createInitialState()),

    // loaders
    loadInfluenceItems: (params) => loadCategory("influence", params),
    loadSocialItems: (params) => loadCategory("social", params),
    loadCreativeItems: (params) => loadCategory("creative", params),
    loadDigitalItems: (params) => loadCategory("digital", params),
    loadEventItems: (params) => loadCategory("events", params),
  };
});
