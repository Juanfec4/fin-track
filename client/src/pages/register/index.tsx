import { FC } from "react";
import useRegister from "../../hooks/useRegister";

const RegisterPage: FC = () => {
  const { status } = useRegister({
    username: "juanfec4",
    email: "juanfelipecardenas4@gmail.com",
    password: "Manena01!",
  });

  return <div className="register-page">{status}</div>;
};
export default RegisterPage;
