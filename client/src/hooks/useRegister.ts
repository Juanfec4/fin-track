import { useState, useEffect } from "react";
import { registerUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";

interface RegisterHookParams {
  username: string;
  email: string;
  password: string;
}

const useRegister = ({ username, email, password }: RegisterHookParams) => {
  const [status, setStatus] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    registerUser({ username, email, password })
      .then((result) => {
        setStatus(result.data);
        setTimeout(() => navigator("/auth/login"), 2000);
      })
      .catch((error) => {
        setStatus(error.response.data);
      });
  }, []);

  return { status };
};

export default useRegister;
