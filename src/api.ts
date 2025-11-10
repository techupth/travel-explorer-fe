import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL; // ดึงจาก .env

export const api = axios.create({
  baseURL,
});
