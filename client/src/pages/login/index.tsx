import { FC, useEffect, useState } from "react";
import LoginForm from "../../components/ui/forms/loginForm";
import { useUserStatus } from "../../hooks/useUserStatus";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
const LoginPage: FC = () => {
  const [status, setStatus] = useState("");
  const isLoggedIn = useUserStatus();
  const navigator = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigator("/web-app");
  }, []);
  return (
    <div className="login-page">
      <LoginForm setStatusMessage={(message: string) => setStatus(message)} />
      {status || null}
    </div>
  );
};

export default LoginPage;
