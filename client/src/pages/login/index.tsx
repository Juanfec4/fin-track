import { FC, useEffect, useState } from "react";
import LoginForm from "../../components/ui/forms/loginForm";
import { useUserStatus } from "../../hooks/useUserStatus";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import PopUpCard from "../../components/ui/cards/popUpCard";
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
      {status ? (
        <PopUpCard
          popUpMessage={status}
          handleClearMessage={() => setStatus("")}
        />
      ) : null}
    </div>
  );
};

export default LoginPage;
