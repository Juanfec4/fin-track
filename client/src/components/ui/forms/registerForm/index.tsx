import { FC, FormEvent, useState } from "react";
import Input, { InputType } from "../../inputs/textInput";
import PrimaryButton from "../../buttons/primaryButton";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../../services/apiService";

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface RegisterFormProps {
  setStatusMessage: (message: string) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ setStatusMessage }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const navigator = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      setStatusMessage("Password and confirmation do not match.");
      return;
    }

    try {
      const result = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setStatusMessage(result.data);
      setTimeout(() => navigator("/auth/login"), 2000);
    } catch (error: any) {
      setStatusMessage(error.response.data);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <Input
        fieldName="username"
        placeholder="username"
        label="Username"
        inputType={InputType.Text}
        value={formData.username}
        handleChange={(e) =>
          setFormData({ ...formData, username: e.target.value })
        }
      />
      <Input
        fieldName="email"
        placeholder="email"
        label="Email"
        inputType={InputType.Text}
        value={formData.email}
        handleChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />
      <Input
        fieldName="password"
        placeholder="password"
        label="Password"
        inputType={InputType.Password}
        value={formData.password}
        handleChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />
      <Input
        fieldName="confirm-password"
        placeholder="password"
        label="Confirm password"
        inputType={InputType.Password}
        value={formData.passwordConfirmation}
        handleChange={(e) =>
          setFormData({ ...formData, passwordConfirmation: e.target.value })
        }
      />
      <PrimaryButton text="Register" handleClick={() => ""} />
    </form>
  );
};

export default RegisterForm;
