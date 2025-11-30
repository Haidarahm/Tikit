import { create } from "zustand";
import {
  getAllSections,
  getInfluencers,
} from "../apis/influencers/influencers";

const initialState = {
  sections: [],
  sectionsPagination: null,
  sectionsLoading: false,
  sectionsError: null,

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

  loadInfluencers: async (sectionId, params = {}) => {
    if (!sectionId) return;

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
          [sectionId]: items,
        },
        influencersPagination: {
          ...state.influencersPagination,
          [sectionId]: response?.pagination ?? null,
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
    if (!sectionId) {
      set({ influencersBySection: {}, influencersPagination: {} });
      return;
    }

    set((state) => {
      const nextInfluencers = { ...state.influencersBySection };
      const nextPagination = { ...state.influencersPagination };
      delete nextInfluencers[sectionId];
      delete nextPagination[sectionId];
      return {
        influencersBySection: nextInfluencers,
        influencersPagination: nextPagination,
      };
    });
  },
}));
