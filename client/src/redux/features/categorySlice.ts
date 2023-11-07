import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategoriesForBudget } from "../../services/apiService";

export type Category = {
  id: number;
  category_name: string;
  budget_id: number;
  type: "income" | "expense" | "saving" | "investment";
  allocated_amount: number;
};

interface CategoryState {
  categories: Category[];
  status: string;
}

const initialState: CategoryState = {
  categories: [],
  status: "",
};

//Get budgets
export const fetchCategories = createAsyncThunk<
  Category[],
  { accessToken: string; budgetId: number }
>("category/fetchCategories", async ({ accessToken, budgetId }) => {
  try {
    const response = await getCategoriesForBudget(accessToken, budgetId);
    return response.data as Category[];
  } catch (error) {
    throw error;
  }
});

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = CategorySlice.actions;

export default CategorySlice.reducer;
