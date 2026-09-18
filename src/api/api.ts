import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", withCredentials: true });
API.interceptors.request.use((config) => { const token = getCookie("accessToken"); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
API.interceptors.response.use(r => r, async error => { const original = error.config; if (error.response?.status === 401 && !original?._retry && !original?.url?.includes("/auth/")) { original._retry = true; try { const { data } = await API.post("/auth/refresh"); setCookie("accessToken", data.token); original.headers.Authorization = `Bearer ${data.token}`; return API(original); } catch { deleteCookie("accessToken"); deleteCookie("user"); if (typeof window !== "undefined") window.location.href = "/login"; } } return Promise.reject(error); });
export default API;
