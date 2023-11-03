import { configureStore } from "@reduxjs/toolkit";
import { ThemeSlice } from "./features/themeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    theme: ThemeSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
