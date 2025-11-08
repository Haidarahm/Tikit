import { create } from "zustand";
import { getBannerVideos } from "../apis/banners/aboutBanner";

export const useAboutBannersStore = create((set, get) => ({
  videos: [], // normalized as [{ id, media, mediaType, createdAt, updatedAt }]
  pagination: null,
  loading: false,
  error: null,

  loadVideos: async ({ page = 1, per_page = 10 } = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await getBannerVideos({ page, per_page });
      const list = Array.isArray(res?.data) ? res.data : [];
      const normalized = list.map((it) => ({
        id: it.id,
        media: it.media,
        mediaType: it.media_type,
        createdAt: it.created_at,
        updatedAt: it.updated_at,
      }));
      set({
        videos: normalized,
        pagination: res?.pagination ?? null,
        loading: false,
      });
    } catch (err) {
      set({ error: err?.message || "Failed to load videos", loading: false });
    }
  },
}));
