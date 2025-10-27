import { create } from "zustand";
import {
  fetchAllServices,
  getServiceDetails,
  getServiceCases,
} from "../apis/services";

export const useServicesStore = create((set, get) => ({
  services: [],
  serviceDetails: {}, // key: serviceId -> details object
  serviceCases: [],
  lang: undefined,
  loading: false,
  error: null,

  setLang: (lang) => set({ lang }),

  // Fetch list of services
  loadServices: async (params) => {
    const { lang, page, per_page } = params || {};
    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });
    try {
      const data = await fetchAllServices({
        lang: effectiveLang,
        page,
        per_page,
      });
      set({
        services: Array.isArray(data) ? data : data?.data ?? [],
        loading: false,
      });
      set({ lang: effectiveLang });
    } catch (err) {
      set({ error: err?.message || "Failed to load services", loading: false });
    }
  },

  // Fetch single service details
  loadServiceDetails: async (id, lang) => {
    if (!id) return;
    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });
    try {
      const data = await getServiceDetails(id, effectiveLang);
      set((state) => ({
        serviceDetails: { ...state.serviceDetails, [id]: data?.data ?? data },
        loading: false,
      }));
    } catch (err) {
      set({
        error: err?.message || "Failed to load service details",
        loading: false,
      });
    }
  },

  // Fetch service cases list
  loadServiceCases: async (subId, lang) => {
    const effectiveLang = lang ?? get().lang ?? "en";
    set({ loading: true, error: null });
    try {
      const data = await getServiceCases(subId, effectiveLang);
      set({
        serviceCases: data.data,
        loading: false,
      });
    } catch (err) {
      set({
        error: err?.message || "Failed to load service cases",
        loading: false,
      });
    }
  },
}));
