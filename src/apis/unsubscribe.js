import { api } from "../config/backend";

export const unsubscribe = async (token) => {
  const response = await api.delete(`/unsubscribe/${token}`);
  return response.data;
};

