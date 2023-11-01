import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
