import { api } from "../config/backend";

export const subscribe = async (data) => {
  const response = await api.post("/subscribe", data);
  return response.data;
};
