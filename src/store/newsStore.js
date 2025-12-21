import { create } from "zustand";
import { getAllNewsItems, getNewsDetails, showOneNews } from "../apis/news";

export const useNewsStore = create((set, get) => ({
  newsItems: [],
  newsDetails: {}, // key: id -> details object
  activeNewsId: null,
  lang: undefined,
  loading: false,
  error: null,

  setLang: (lang) => set({ lang }),

  // Load all news items
  loadNewsItems: async (params = {}) => {
    const { page, per_page, lang } = params;
    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });

    try {
      const response = await getAllNewsItems({
        page,
        per_page,
        lang: effectiveLang,
      });
      
      const data = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
        ? response
        : [];

      set({
        newsItems: data,
        lang: effectiveLang,
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        error: error?.message || "Failed to load news items",
        loading: false,
      });
      throw error;
    }
  },

  // Load single news details by id
  loadNewsDetails: async (id, lang) => {
    if (!id) return null;

    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });

    try {
      const response = await getNewsDetails(id, { lang: effectiveLang });
      const data = Array.isArray(response?.data) && response.data.length > 0
        ? response.data[0]
        : response?.data
        ? response.data
        : null;

      if (!data) {
        throw new Error("News details not found");
      }

      set((state) => ({
        newsDetails: { ...state.newsDetails, [id]: data },
        activeNewsId: id,
        lang: effectiveLang,
        loading: false,
      }));

      return data;
    } catch (error) {
      set({
        error: error?.message || "Failed to load news details",
        loading: false,
      });
      throw error;
    }
  },

  // Show single news by id
  loadOneNews: async (id, lang) => {
    if (!id) return null;

    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });

    try {
      const response = await showOneNews(id, { lang: effectiveLang });
      const data = response?.data ?? response ?? null;

      if (!data) {
        throw new Error("News not found");
      }

      set((state) => ({
        newsDetails: { ...state.newsDetails, [id]: data },
        activeNewsId: id,
        lang: effectiveLang,
        loading: false,
      }));

      return data;
    } catch (error) {
      set({
        error: error?.message || "Failed to load news",
        loading: false,
      });
      throw error;
    }
  },
}));

