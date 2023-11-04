import axios from "axios";

const axiosBaseConfig = {
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
