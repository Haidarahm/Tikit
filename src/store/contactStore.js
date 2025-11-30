import { create } from "zustand";
import { sendEmail } from "../apis/Contact";
import { useToastStore } from "./toastStore";

const STORAGE_KEY = "contact_email_tracking";
const MAX_MESSAGES_PER_EMAIL = 3;

// Get email tracking data from localStorage
const getEmailTracking = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error("Error reading email tracking from localStorage:", err);
  }
  return {};
};

// Save email tracking data to localStorage
const saveEmailTracking = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving email tracking to localStorage:", err);
  }
};

// Check if email can send message (hasn't exceeded limit)
const canSendMessage = (email) => {
  if (!email) return false;
  const tracking = getEmailTracking();
  const emailLower = email.toLowerCase().trim();
  const count = tracking[emailLower] || 0;
  return count < MAX_MESSAGES_PER_EMAIL;
};

// Increment message count for email
const incrementMessageCount = (email) => {
  if (!email) return;
  const tracking = getEmailTracking();
  const emailLower = email.toLowerCase().trim();
  tracking[emailLower] = (tracking[emailLower] || 0) + 1;
  saveEmailTracking(tracking);
};

export const useContactStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  sendContactEmail: async (data, silent = false) => {
    // Check if email has exceeded message limit
    if (!canSendMessage(data.email)) {
      const errorMsg = `You have exceeded the maximum number of messages (${MAX_MESSAGES_PER_EMAIL}) allowed per email address. Please wait before sending another message.`;
      set({ error: errorMsg, loading: false });
      if (!silent) {
        useToastStore.getState().addToast(errorMsg, "error");
      }
      return false;
    }

    set({ loading: true, error: null, success: false });
    try {
      const res = await sendEmail(data);

      if (res.status) {
        // Increment message count on success
        incrementMessageCount(data.email);

        const msg = res.message || "Message sent successfully";

        if (!silent) {
          useToastStore.getState().addToast(msg, "success");
        }

        set({ success: true, loading: false });
        return true;
      } else {
        throw new Error(res.message || "Failed to send message");
      }
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send message";

      if (!silent) {
        useToastStore.getState().addToast(errorMsg, "error");
      }

      set({ error: errorMsg, loading: false });
      return false;
    }
  },
}));
