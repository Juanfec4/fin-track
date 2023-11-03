import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum ThemeColor {
  Red = "red",
  Green = "green",
  Blue = "blue",
}
export enum ThemeClass {
  Red = "theme--red",
  Green = "theme--green",
  Blue = "theme--blue",
}

export interface Theme {
  color: ThemeColor;
  className: ThemeClass;
}

interface ThemeState {
  data: Theme;
}
const getInitialState = () => {
  const themeColor = window.localStorage.getItem("app-theme-color");
  const themeClass = window.localStorage.getItem("app-theme-class");

  if (themeClass === ThemeClass.Blue && themeColor === ThemeColor.Blue) {
    return { color: ThemeColor.Blue, className: ThemeClass.Blue };
  } else if (themeClass === ThemeClass.Red && themeColor === ThemeColor.Red) {
    return { color: ThemeColor.Red, className: ThemeClass.Red };
  } else {
    return {
      color: ThemeColor.Green,
      className: ThemeClass.Green,
    };
  }
};
const initialState: ThemeState = {
  data: getInitialState(),
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      state.data = action.payload;
      //Save theme to local storage
      window.localStorage.setItem("app-theme-color", action.payload.color);
      window.localStorage.setItem("app-theme-class", action.payload.className);
    },
  },
});

export const { changeTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
