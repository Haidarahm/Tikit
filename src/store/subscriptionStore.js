import { create } from "zustand";
import { subscribe } from "../apis/subscription";
import { useToastStore } from "./toastStore";

export const useSubscriptionStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  subscribe: async (data, silent = false) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await subscribe(data);

      if (res.status) {
        let msg = res.message;
        if (msg === "Pre-subscribed") {
          msg = "You subscribed before";
        }

        if (!silent) {
          useToastStore.getState().addToast(msg, "success");
        }

        set({ success: true, loading: false });
        return true;
      } else {
        // Handle case where status is false but no error thrown
        throw new Error(res.message || "Subscription failed");
      }
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || err?.message || "Failed to subscribe";

      if (!silent) {
        useToastStore.getState().addToast(errorMsg, "error");
      }

      set({ error: errorMsg, loading: false });
      return false;
    }
  },
}));
