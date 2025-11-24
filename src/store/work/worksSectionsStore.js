import { create } from "zustand";
import { getWorksSections } from "../../apis/work/sections";

const initialState = {
  sections: [],
  pagination: null,
  loading: false,
  error: null,
  message: null,
};

const normalizePayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload) return [payload];
  return [];
};

export const useWorksSectionsStore = create((set) => ({
  ...initialState,

  reset: () => set(initialState),

  loadSections: async (params = {}) => {
    set({ loading: true, error: null });
    const safeParams = params || {};

    try {
      let response = await getWorksSections(safeParams);
      let normalizedData = normalizePayload(response?.data);

      const shouldFallbackToEn =
        normalizedData.length === 0 &&
        safeParams?.lang &&
        safeParams.lang !== "en";

      if (shouldFallbackToEn) {
        const fallbackParams = { ...safeParams, lang: "en" };
        const fallbackResponse = await getWorksSections(fallbackParams);
        const fallbackData = normalizePayload(fallbackResponse?.data);
        if (fallbackData.length > 0) {
          response = fallbackResponse;
          normalizedData = fallbackData;
        }
      }

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
