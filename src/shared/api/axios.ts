import axios from "axios";

export const apiClient = axios.create({
  withCredentials: true,
  baseURL: new URL("api", import.meta.env.VITE_API_URL).toString(),
});
