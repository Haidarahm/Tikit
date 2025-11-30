import { create } from "zustand";
import { getNiches } from "../apis/influencers/influencerRigesteration";

const initialState = {
  niches: [],
  lang: undefined,
  loading: false,
  error: null,
  hasFetched: false,
};

export const useNichesStore = create((set, get) => ({
  ...initialState,

  setLang: (lang) => set({ lang, hasFetched: false }),

  reset: () => set(initialState),

  fetchNiches: async (params = {}) => {
    const state = get();

    // Prevent duplicate fetches
    if (state.loading) return;

    const { lang } = params;
    const effectiveLang = lang ?? state.lang ?? "en";

    // If already fetched for this language, don't fetch again
    if (
      state.hasFetched &&
      state.lang === effectiveLang &&
      state.niches.length > 0
    ) {
      return;
    }

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
        hasFetched: true,
      });
    } catch (error) {
      set({
        error: error?.message || "Failed to load niches",
        loading: false,
        hasFetched: true,
      });
    }
  },
}));
