import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";

const WebAppLayout: FC = () => {
  const theme = useTheme();
  return (
    <div className={theme.className}>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default WebAppLayout;
