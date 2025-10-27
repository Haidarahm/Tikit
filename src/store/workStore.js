import { create } from "zustand";
import {
  fetchAllWorks,
  fetchAllCases,
  getWorkDetails,
  getCaseDetails,
} from "../apis";

export const useWorkStore = create((set, get) => ({
  works: [],
  cases: {}, // key: workId -> cases array
  workDetails: {}, // key: workId -> details object
  caseDetails: {}, // key: caseId -> details object
  lang: undefined,
  selectedWorkId: undefined,
  loading: false,
  error: null,
  // simple client-side pagination defaults
  page: 1,
  pageSize: 3,

  setLang: (lang) => set({ lang }),
  setSelectedWork: (id) => set({ selectedWorkId: id }),

  setPage: (page) => set({ page: Math.max(1, Number(page) || 1) }),
  nextPage: () => {
    const { page } = get();
    set({ page: page + 1 });
  },
  prevPage: () => {
    const { page } = get();
    set({ page: Math.max(1, page - 1) });
  },

  // Derive current page slice (client-side)
  getPagedWorks: () => {
    const { works, page, pageSize } = get();
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return (works || []).slice(start, end);
  },

  // Fetch list of works (accept optional pagination params; backend may ignore)
  loadWorks: async ({ lang, page, per_page }) => {
    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });
    try {
      const effectivePerPage = per_page ?? get().pageSize ?? 3;
      const data = await fetchAllWorks({
        lang: effectiveLang,
        page,
        per_page: effectivePerPage,
      });
      set({
        works: Array.isArray(data) ? data : data?.data ?? [],
        loading: false,
      });
      // remember lang for subsequent calls
      set({ lang: effectiveLang });
    } catch (err) {
      set({ error: err?.message || "Failed to load works", loading: false });
    }
  },

  // Fetch cases for a work id
  loadCases: async (id, lang) => {
    if (!id) return;
    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });
    try {
      const data = await fetchAllCases(id, effectiveLang);
      set((state) => ({
        cases: {
          ...state.cases,
          [id]: Array.isArray(data) ? data : data?.data ?? [],
        },
        loading: false,
      }));
    } catch (err) {
      set({ error: err?.message || "Failed to load cases", loading: false });
    }
  },

  // Fetch work details for an id (honors lang from param or store)
  loadWorkDetails: async (id, lang) => {
    if (!id) return;
    const effectiveLang = lang ?? get().lang;
    set({ loading: true, error: null });
    try {
      const data = await getWorkDetails(id, effectiveLang);
      set((state) => ({
        workDetails: { ...state.workDetails, [id]: data?.data ?? data },
        loading: false,
      }));
    } catch (err) {
      set({
        error: err?.message || "Failed to load work details",
        loading: false,
      });
    }
  },

  // Fetch case details for an id
  loadCaseDetails: async (id) => {
    if (!id) return;
    set({ loading: true, error: null });
    try {
      const data = await getCaseDetails(id);
      set((state) => ({
        caseDetails: { ...state.caseDetails, [id]: data?.data ?? data },
        loading: false,
      }));
    } catch (err) {
      set({
        error: err?.message || "Failed to load case details",
        loading: false,
      });
    }
  },
}));
