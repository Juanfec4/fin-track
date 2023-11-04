import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import { useUserStatus } from "../../../hooks/useUserStatus";

const WebAppLayout: FC = () => {
  const theme = useTheme();
  const isLoggedIn = useUserStatus();
  const navigator = useNavigate();

  //Redirect if user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigator("/auth/login");
    }
  }, []);

  return (
    <div className={theme.className}>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default WebAppLayout;
