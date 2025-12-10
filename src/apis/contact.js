import { api } from "../config/backend";

export const sendEmail = async (data) => {
  const response = await api.post("/contact/send", data);
  return response.data;
};

export const contactasinfluencer = async (data) => {
  const response = await api.post("/influencer/contact", data);
  return response.data;
};