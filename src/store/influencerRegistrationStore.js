import { create } from "zustand";
import { registerInfluencer } from "../apis/influencers/influencerRigesteration";
import { useToastStore } from "./toastStore";

export const useInfluencerRegistrationStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  register: async (data, silent = false) => {
    set({ loading: true, error: null, success: false });

    try {
      const response = await registerInfluencer(data);

      if (response.status) {
        if (!silent) {
          useToastStore
            .getState()
            .addToast(
              response.message || "Registration successful!",
              "success"
            );
        }

        set({ success: true, loading: false });
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to register influencer";

      if (!silent) {
        useToastStore.getState().addToast(errorMsg, "error");
      }

      set({ error: errorMsg, loading: false, success: false });
      return { success: false, error: errorMsg };
    }
  },

  reset: () => set({ loading: false, error: null, success: false }),
}));
