import { useState, useEffect } from "react";
import { loginUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { getCookie, saveCookie } from "../utils/cookies";
import { getFromSession, saveToSession } from "../utils/session";
import { useAppDispatch } from "../redux/store";
import { login } from "../redux/features/userSlice";

interface LoginHookParams {
  email: string;
  password: string;
}

const useLogin = ({ email, password }: LoginHookParams) => {
  const [status, setStatus] = useState("");
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = getCookie("refreshToken");
    if (!user) {
      loginUser({
        email,
        password,
      })
        .then((result) => {
          setStatus(result.data);
          if (result.headers.refresh && !getCookie("refreshToken")) {
            saveCookie("refreshToken", result.headers.refresh);
          }
          if (result.headers.authorization && !getFromSession("accessToken")) {
            saveToSession("accessToken", result.headers.authorization);
            dispatch(
              login({
                isLoggedIn: true,
                accessToken: result.headers.authorization,
              })
            );
          }
          setTimeout(() => navigator("/web-app"), 2000);
        })
        .catch((error) => {
          setStatus(error.response.data);
        });
    } else {
      navigator("/web-app");
    }
  }, []);

  return { status };
};

export default useLogin;
