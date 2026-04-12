import { create } from "zustand";
import {
  getAllSections,
  getAllInfluencers,
  getInfluencers,
} from "../apis/influencers/influencers";

const toSectionCacheKey = (sectionId) =>
  sectionId == null || sectionId === "" ? "" : String(sectionId);

const initialState = {
  sections: [],
  sectionsPagination: null,
  sectionsLoading: false,
  sectionsError: null,

  allInfluencers: [],
  allInfluencersPagination: null,
  allInfluencersLoading: false,
  allInfluencersError: null,

  influencersBySection: {},
  influencersPagination: {},
  influencersLoading: false,
  influencersError: null,
};

export const useInfluencersStore = create((set) => ({
  ...initialState,

  reset: () => set(initialState),

  loadSections: async (params = {}) => {
    set({ sectionsLoading: true, sectionsError: null });
    try {
      const response = await getAllSections(params);
      const items = Array.isArray(response?.data) ? response.data : [];

      set({
        sections: items,
        sectionsPagination: response?.pagination ?? null,
        sectionsLoading: false,
      });
    } catch (error) {
      set({
        sectionsError: error?.message || "Failed to load sections",
        sectionsLoading: false,
      });
    }
  },

  loadAllInfluencers: async (params = {}) => {
    set({ allInfluencersLoading: true, allInfluencersError: null });
    try {
      const response = await getAllInfluencers({
        per_page: 40,
        ...params,
      });
      const items = Array.isArray(response?.data) ? response.data : [];

      set({
        allInfluencers: items,
        allInfluencersPagination: response?.pagination ?? null,
        allInfluencersLoading: false,
      });
    } catch (error) {
      set({
        allInfluencersError: error?.message || "Failed to load influencers",
        allInfluencersLoading: false,
      });
    }
  },

  loadInfluencers: async (sectionId, params = {}) => {
    const cacheKey = toSectionCacheKey(sectionId);
    if (!cacheKey) return;

    set({ influencersLoading: true, influencersError: null });
    try {
      const response = await getInfluencers(sectionId, {
        per_page: 10, // Default value, can be overridden by params
        ...params,
      });
      const items = Array.isArray(response?.data) ? response.data : [];

      set((state) => ({
        influencersBySection: {
          ...state.influencersBySection,
          [cacheKey]: items,
        },
        influencersPagination: {
          ...state.influencersPagination,
          [cacheKey]: response?.pagination ?? null,
        },
        influencersLoading: false,
      }));
    } catch (error) {
      set({
        influencersError: error?.message || "Failed to load influencers",
        influencersLoading: false,
      });
    }
  },

  clearSection: (sectionId) => {
    if (sectionId == null || sectionId === "") {
      set({ influencersBySection: {}, influencersPagination: {} });
      return;
    }

    const key = toSectionCacheKey(sectionId);
    set((state) => {
      const nextInfluencers = { ...state.influencersBySection };
      const nextPagination = { ...state.influencersPagination };
      delete nextInfluencers[key];
      delete nextPagination[key];
      return {
        influencersBySection: nextInfluencers,
        influencersPagination: nextPagination,
      };
    });
  },
}));
