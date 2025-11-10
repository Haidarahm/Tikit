import { create } from "zustand";
import { getWorksSections } from "../../apis/work/sections";

const initialState = {
  sections: [],
  pagination: null,
  loading: false,
  error: null,
  message: null,
};

export const useWorksSectionsStore = create((set) => ({
  ...initialState,

  reset: () => set(initialState),

  loadSections: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await getWorksSections(params);
      const payload = response?.data ?? [];
      const normalizedData = Array.isArray(payload)
        ? payload
        : payload
        ? [payload]
        : [];

      set({
        sections: normalizedData,
        pagination: response?.pagination ?? null,
        message: response?.message ?? null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error?.message || "Failed to load work sections",
        loading: false,
      });
    }
  },
}));
