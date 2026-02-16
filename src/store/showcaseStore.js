import { create } from "zustand";
import { getAllCases, getCase } from "../apis/showcase";

export const useShowcaseStore = create((set, get) => ({
  cases: [],
  caseDetails: {}, // key: slug -> case object
  activeCaseSlug: null,
  lang: undefined,
  loading: false,
  error: null,

  setLang: (lang) => set({ lang }),

  // Load all showcase cases
  loadCases: async (lang) => {
    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });

    try {
      const response = await getAllCases(effectiveLang);
      const data = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
        ? response
        : [];

      set({
        cases: data,
        lang: effectiveLang,
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        error: error?.message || "Failed to load showcase cases",
        loading: false,
      });
      throw error;
    }
  },

  // Load single showcase case by slug
  loadCaseBySlug: async (slug, lang) => {
    if (!slug) return null;

    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });

    try {
      const response = await getCase(slug, effectiveLang);
      const data = response?.data ?? response ?? null;

      if (!data) {
        throw new Error("Showcase case not found");
      }

      set((state) => ({
        caseDetails: { ...state.caseDetails, [slug]: data },
        activeCaseSlug: slug,
        lang: effectiveLang,
        loading: false,
      }));

      return data;
    } catch (error) {
      set({
        error: error?.message || "Failed to load showcase case",
        loading: false,
      });
      throw error;
    }
  },
}));


