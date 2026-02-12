import { api } from "../config/backend";

/**
 * Send a message to the chatbot API.
 * @param {Object} params
 * @param {string} params.message - User message
 * @param {string} [params.session_id] - Optional session ID for conversation continuity
 * @returns {Promise<{reply: string, session_id: string, detected_categories: string[]}>}
 */
export const chat = async ({ message, session_id }) => {
  const body = { message };
  if (session_id) {
    body.session_id = session_id;
  }
  const response = await api.post("/chat", body);
  return response.data;
};
