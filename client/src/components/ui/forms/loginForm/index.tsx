import { FC, FormEvent, useState } from "react";
import Input, { InputType } from "../../inputs/textInput";
import PrimaryButton from "../../buttons/primaryButton";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../../services/apiService";
import { saveCookie, getCookie } from "../../../../utils/cookies";
import { saveToSession, getFromSession } from "../../../../utils/session";
import { useAppDispatch } from "../../../../redux/store";
import { login } from "../../../../redux/features/userSlice";

interface FormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  setStatusMessage: (message: string) => void;
}

const LoginForm: FC<LoginFormProps> = ({ setStatusMessage }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await loginUser(formData);

      setStatusMessage(result.data);
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
    } catch (error: any) {
      setStatusMessage(error.response.data);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Input
        fieldName="email"
        placeholder="Email"
        label="Email"
        inputType={InputType.Text}
        value={formData.email}
        handleChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />
      <Input
        fieldName="password"
        placeholder="Password"
        label="Password"
        inputType={InputType.Password}
        value={formData.password}
        handleChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />
      <PrimaryButton text="Login" handleClick={() => ""} />
    </form>
  );
};

export default LoginForm;
