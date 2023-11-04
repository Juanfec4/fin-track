import axios, { AxiosRequestConfig } from "axios";
import { getFromSession } from "../utils/session";

const axiosBaseConfig: AxiosRequestConfig = {
  withCredentials: true,
};

//Models
interface RegisterUserPayload {
  username: string;
  email: string;
  password: string;
}

interface LoginUserPayload {
  email: string;
  password: string;
}

interface RefreshUserPayload {
  refreshToken: string;
}

//Custom config
const buildAxiosConfig = (accessToken: string): AxiosRequestConfig => {
  return {
    ...axiosBaseConfig,
    headers: {
      authorization: accessToken,
    },
  };
};

//Register
export const registerUser = async (payload: RegisterUserPayload) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/auth/register`;
  return axios.post(requestUrl, payload, { ...axiosBaseConfig });
};

//Login
export const loginUser = async (payload: LoginUserPayload) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/auth/login`;
  return axios.post(requestUrl, payload, { ...axiosBaseConfig });
};

//Refresh
export const refreshUser = async (payload: RefreshUserPayload) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/auth/refresh`;
  return axios.post(requestUrl, payload, { ...axiosBaseConfig });
};
