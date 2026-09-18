import API from "@/api/api";
import { LoginPayload, SignupPayload } from "@/types/interfaces/auth.interface";
import { QueryClient } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";

export const login = async (data: LoginPayload) => {
  const res = await API.post(`/auth/login`, data);
  console.log("auth-login-data:", data);
  return res.data;
};
export const signup = async (data: SignupPayload) => {
  const res = await API.post(`/auth/register`, data);
  console.log("auth-login-data:", data);
  return res.data;
};

export const logout = async () => {
  
};
