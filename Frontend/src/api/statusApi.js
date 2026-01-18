import { api } from "./base";

export const getSystemStatus = async () => {
  const response = await api.get("/api/status");
  return response.data;
};
