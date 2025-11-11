import { create } from "zustand";
import { getAllTeamMembers } from "../apis/team";

const initialState = {
  teamMembers: [],
  pagination: null,
  lang: undefined,
  loading: false,
  error: null,
};

export const useTeamStore = create((set, get) => ({
  ...initialState,

  setLang: (lang) => set({ lang }),

  reset: () => set(initialState),

  loadTeamMembers: async (params = {}) => {
    const { page, per_page, lang } = params;
    const effectiveLang = lang ?? get().lang ?? "en";

    set({ loading: true, error: null });

    try {
      const response = await getAllTeamMembers({
        lang: effectiveLang,
        page,
        per_page,
      });

      const list = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
        ? response
        : [];

      set({
        teamMembers: list,
        pagination: response?.pagination ?? null,
        lang: effectiveLang,
        loading: false,
      });
    } catch (error) {
      set({
        error: error?.message || "Failed to load team members",
        loading: false,
      });
    }
  },
}));
