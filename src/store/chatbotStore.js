import { create } from "zustand";
import { chat } from "../apis/chatbot";

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Hi! I'm your Tikit Agency assistant. Ask me anything about our services, team, contact info, or how we can help your brand."
};

export const useChatbotStore = create((set, get) => ({
  messages: [INITIAL_MESSAGE],
  sessionId: null,
  loading: false,
  error: null,

  sendMessage: async (message) => {
    const trimmed = (message || "").trim();
    if (!trimmed) return;

    set({ loading: true, error: null });

    const userMessage = { role: "user", content: trimmed };
    set((state) => ({
      messages: [...state.messages, userMessage]
    }));

    try {
      const { session_id, sessionId, reply } = await chat({
        message: trimmed,
        session_id: get().sessionId
      });
      const sid = session_id || sessionId;
      const assistantMessage = { role: "assistant", content: reply };
      set((state) => ({
        messages: [...state.messages, assistantMessage],
        sessionId: sid || state.sessionId,
        loading: false,
        error: null
      }));
      return reply;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err?.message || "Failed to get response. Please try again.";
      const fallbackMessage = {
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again or contact us at Holla@tikit.ae."
      };
      set((state) => ({
        messages: [...state.messages, fallbackMessage],
        loading: false,
        error: errorMsg
      }));
      throw err;
    }
  },

  resetChat: () => {
    set({
      messages: [INITIAL_MESSAGE],
      sessionId: null,
      error: null
    });
  }
}));
