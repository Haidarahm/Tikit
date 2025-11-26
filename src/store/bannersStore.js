import { create } from "zustand";
import { fetchVideos } from "../apis/banners/banner";

export const useBannersStore = create((set, get) => ({
  videos: [], // normalized as [{ id, videoUrl }]
  pagination: null,
  loading: false,
  error: null,

  loadVideos: async ({ page = 1, per_page = 10, force = false } = {}) => {
    const state = get();
    // Prevent duplicate calls: skip if already loading or videos already loaded (unless force=true)
    if (!force && (state.loading || (state.videos.length > 0 && page === 1))) {
      return;
    }
    set({ loading: true, error: null });
    try {
      console.log("loading videos");
      const res = await fetchVideos({ page, per_page });
      const list = Array.isArray(res?.data) ? res.data : [];
      const normalized = list.map((it) => ({
        id: it.id,
        videoUrl: it.video,
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
