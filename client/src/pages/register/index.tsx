import { FC, useEffect, useState } from "react";
import RegisterForm from "../../components/ui/forms/registerForm";
import { useNavigate } from "react-router-dom";
import { useUserStatus } from "../../hooks/useUserStatus";

import "./styles.scss";

const RegisterPage: FC = () => {
  const [status, setStatus] = useState("");
  const isLoggedIn = useUserStatus();
  const navigator = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigator("/web-app");
  }, []);
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
