import { FC } from "react";
import useLogin from "../../hooks/useLogin";

const LoginPage: FC = () => {
  const { status } = useLogin({
    email: "juanfelipecardenas4@gmail.com",
    password: "Manena01!",
  });
  return <div className="login-page">{status}</div>;
};

export default LoginPage;
