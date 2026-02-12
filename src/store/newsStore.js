import { create } from "zustand";
import { getAllNewsItems, getNewsDetails, showOneNews } from "../apis/news";

export const useNewsStore = create((set, get) => ({
  newsItems: [],
  newsDetails: {}, // key: slug -> details object
  activeNewsSlug: null,
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

  // Load single news details by id (returns array of detail items)
  loadNewsDetails: async (id, lang) => {
    if (!id) return null;

    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });

    try {
      const response = await getNewsDetails(id, { lang: effectiveLang });
      const data = Array.isArray(response?.data) 
        ? response.data
        : [];

      set((state) => ({
        newsDetails: { ...state.newsDetails, [id]: data },
        lang: effectiveLang,
        loading: false,
      }));

      return response;
    } catch (error) {
      set({
        error: error?.message || "Failed to load news details",
        loading: false,
      });
      throw error;
    }
  },

  // Show single news by slug
  loadOneNews: async (slug, lang) => {
    if (!slug) return null;

    // Return cached data if already loaded
    const cached = get().newsDetails[slug];
    if (cached && typeof cached === "object" && (cached.id || cached.slug)) {
      return cached;
    }

    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });

    try {
      const response = await showOneNews(slug, { lang: effectiveLang });
      const data = response?.data ?? response ?? null;

      if (!data) {
        throw new Error("News not found");
      }

      set((state) => ({
        newsDetails: { ...state.newsDetails, [slug]: data },
        activeNewsSlug: slug,
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

