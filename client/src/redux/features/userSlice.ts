import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookies";
import { saveToSession } from "../../utils/session";
import { refreshUser } from "../../services/apiService";

export interface LoginStatus {
  isLoggedIn: boolean;
  accessToken: string;
}

interface UserState {
  loginInformation: LoginStatus;
}
const getInitialState = async () => {
  const refreshToken = getCookie("refreshToken");
  let state: LoginStatus = { isLoggedIn: false, accessToken: "" };

  if (refreshToken) {
    try {
      const response = await refreshUser({ refreshToken });
      const accessToken = response.headers.authorization;
      saveToSession("accessToken", accessToken);
      state = { isLoggedIn: true, accessToken };
    } catch (error) {
      state = { isLoggedIn: false, accessToken: "" };
    }
  }

  return state;
};

const initialState: UserState = {
  loginInformation: await getInitialState(),
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginStatus>) => {
      state.loginInformation = action.payload;
    },
  },
});

export const { login } = UserSlice.actions;

export default UserSlice.reducer;
