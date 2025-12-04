import { create } from "zustand";
import { getAllCases, getCase } from "../apis/showcase";

export const useShowcaseStore = create((set, get) => ({
  cases: [],
  caseDetails: {}, // key: id -> case object
  activeCaseId: null,
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

  // Load single showcase case by id
  loadCaseById: async (id, lang) => {
    if (!id) return null;

    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });

    try {
      const response = await getCase(id, effectiveLang);
      const data = response?.data ?? response ?? null;

      if (!data) {
        throw new Error("Showcase case not found");
      }

      set((state) => ({
        caseDetails: { ...state.caseDetails, [id]: data },
        activeCaseId: id,
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


