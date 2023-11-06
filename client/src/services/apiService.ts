import axios, { AxiosRequestConfig } from "axios";

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

interface NewBudgetPayload {
  budgetName: string;
}

//Custom config
const buildAxiosConfig = (accessToken: string): AxiosRequestConfig => {
  return {
    ...axiosBaseConfig,
    headers: {
      Authorization: accessToken,
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

//BUDGETS

//New budget
export const createBudget = async (
  payload: NewBudgetPayload,
  accessToken: string
) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/api/budgets`;
  return axios.post(requestUrl, payload, buildAxiosConfig(accessToken));
};
