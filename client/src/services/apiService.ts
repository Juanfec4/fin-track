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

interface NewCategoryPayload {
  budgetId: number;
  type: string;
  categoryName: string;
  allocatedAmount: number;
}

interface EditCategoryPayload {
  budgetId: number;
  categoryName: string;
  allocatedAmount?: number;
}

//Custom config
const buildAxiosConfig = (
  accessToken: string,
  customParams?: object
): AxiosRequestConfig => {
  return {
    ...axiosBaseConfig,
    headers: {
      Authorization: accessToken,
    },
    params: {
      ...customParams,
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

//Get all user budgets
export const getAllBudgets = async (accessToken: string) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/api/budgets`;
  return axios.get(requestUrl, buildAxiosConfig(accessToken));
};

//Get user budget by id
export const getBudgetById = async (accessToken: string, budgetId: number) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/api/budgets/${budgetId}`;
  return axios.get(requestUrl, buildAxiosConfig(accessToken));
};

//New budget
export const createBudget = async (
  payload: NewBudgetPayload,
  accessToken: string
) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/api/budgets`;
  return axios.post(requestUrl, payload, buildAxiosConfig(accessToken));
};

//Delete budget
export const deleteBudgetById = async (
  accessToken: string,
  budgetId: number
) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/api/budgets/${budgetId}`;
  return axios.delete(requestUrl, buildAxiosConfig(accessToken));
};

//Edit budget
export const editBudgetById = async (
  accessToken: string,
  budgetId: number,
  payload: NewBudgetPayload
) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/api/budgets/${budgetId}`;
  return axios.patch(
    requestUrl,
    { budget_name: payload.budgetName },
    buildAxiosConfig(accessToken)
  );
};

//CATEGORIES

//get all
export const getCategoriesForBudget = async (
  accessToken: string,
  budgetId: number
) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/api/categories/`;
  return axios.get(requestUrl, buildAxiosConfig(accessToken, { budgetId }));
};

//create new
export const createCategory = async (
  accessToken: string,
  payload: NewCategoryPayload
) => {
  const requestUrl = `${import.meta.env.VITE_API_BASE}/api/categories/`;
  return axios.post(requestUrl, payload, buildAxiosConfig(accessToken));
};

//delete
export const deleteCategory = async (
  accessToken: string,
  budgetId: number,
  categoryId: number
) => {
  const requestUrl = `${
    import.meta.env.VITE_API_BASE
  }/api/categories/${categoryId}`;
  return axios.delete(requestUrl, buildAxiosConfig(accessToken, { budgetId }));
};

//edit category
export const editCategory = async (
  accessToken: string,
  categoryId: number,
  payload: EditCategoryPayload
) => {
  const requestUrl = `${
    import.meta.env.VITE_API_BASE
  }/api/categories/${categoryId}`;
  return axios.patch(requestUrl, payload, buildAxiosConfig(accessToken));
};
