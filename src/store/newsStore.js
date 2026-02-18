import { create } from "zustand";
import { getAllNewsItems, getNewsDetails, showOneNews } from "../apis/news";

export const useNewsStore = create((set, get) => ({
  newsItems: [],
  // newsDetails map:
  // key: slug -> {
  //   ...blog header fields,
  //   paragraphs?: array of detail items
  // }
  newsDetails: {},
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

  // Load single news details (paragraphs) by slug (returns array of detail items)
  loadNewsDetails: async (slug, lang) => {
    if (!slug) return null;

    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });

    try {
      const response = await getNewsDetails(slug, { lang: effectiveLang });
      const data = Array.isArray(response?.data) 
        ? response.data
        : [];

      set((state) => ({
        newsDetails: {
          ...state.newsDetails,
          [slug]: {
            ...(state.newsDetails[slug] || {}),
            paragraphs: data,
          },
        },
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

    // Return cached header data if already loaded
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
        newsDetails: {
          ...state.newsDetails,
          [slug]: {
            ...(state.newsDetails[slug] || {}),
            ...data,
          },
        },
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

