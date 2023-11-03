import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";

const AuthLayout: FC = () => {
  const theme = useTheme();
  return (
    <div className={theme.className}>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
