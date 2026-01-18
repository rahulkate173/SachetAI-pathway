import { api } from "./base";

export const refreshSystemData = async () => {
  const response = await api.post("/api/refresh");
  return response.data;
};
