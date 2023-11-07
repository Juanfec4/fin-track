import { configureStore } from "@reduxjs/toolkit";
import { ThemeSlice } from "./features/themeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { UserSlice } from "./features/userSlice";
import { BudgetSlice } from "./features/budgetSlice";
import { CategorySlice } from "./features/categorySlice";

export const store = configureStore({
  reducer: {
    theme: ThemeSlice.reducer,
    user: UserSlice.reducer,
    budget: BudgetSlice.reducer,
    category: CategorySlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
