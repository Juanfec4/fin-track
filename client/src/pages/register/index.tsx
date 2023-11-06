import { FC, useEffect, useState } from "react";
import RegisterForm from "../../components/ui/forms/registerForm";
import { useNavigate } from "react-router-dom";
import { useUserStatus } from "../../hooks/useUserStatus";

import "./styles.scss";
import PopUpCard from "../../components/ui/cards/popUpCard";

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
      {status ? (
        <PopUpCard
          popUpMessage={status}
          handleClearMessage={() => setStatus("")}
        />
      ) : null}
    </div>
  );
};
export default RegisterPage;
