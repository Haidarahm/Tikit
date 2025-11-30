import { create } from "zustand";
import { getNiches } from "../apis/influencers/influencerRigesteration";

const initialState = {
  niches: [],
  lang: undefined,
  loading: false,
  error: null,
};

export const useNichesStore = create((set, get) => ({
  ...initialState,

  setLang: (lang) => set({ lang }),

  reset: () => set(initialState),

  fetchNiches: async (params = {}) => {
    const { lang } = params;
    const effectiveLang = lang ?? get().lang ?? "en";

    set({ loading: true, error: null });

    try {
      const response = await getNiches({
        lang: effectiveLang,
      });

      const nichesList = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
        ? response
        : [];

      set({
        niches: nichesList,
        lang: effectiveLang,
        loading: false,
      });
    } catch (error) {
      set({
        error: error?.message || "Failed to load niches",
        loading: false,
      });
    }
  },
}));
