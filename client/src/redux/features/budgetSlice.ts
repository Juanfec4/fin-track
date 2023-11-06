import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBudgets } from "../../services/apiService";

export type Budget = {
  budget_name: string;
  id: number;
  uuid: string;
};

interface BudgetState {
  budgets: Budget[];
  activeId: number | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: BudgetState = {
  budgets: [],
  activeId: undefined,
  status: "idle",
};

//Get budgets
export const fetchBudgets = createAsyncThunk(
  "budget/fetchBudgets",
  async (accessToken: string) => {
    try {
      const response = await getAllBudgets(accessToken);
      return response.data as Budget[];
    } catch (error) {
      throw error;
    }
  }
);

export const BudgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setActiveBudgetId: (state, action: PayloadAction<number>) => {
      state.activeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.budgets = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setActiveBudgetId } = BudgetSlice.actions;

export default BudgetSlice.reducer;
