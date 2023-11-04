import { FC, useState } from "react";
import RegisterForm from "../../components/ui/forms/registerForm";

const RegisterPage: FC = () => {
  const [status, setStatus] = useState("");
  return (
    <div className="register-page">
      <RegisterForm
        setStatusMessage={(message: string) => setStatus(message)}
      />
      {status || null}
    </div>
  );
};
export default RegisterPage;
