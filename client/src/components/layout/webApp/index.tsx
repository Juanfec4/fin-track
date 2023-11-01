import { FC } from "react";
import { Outlet } from "react-router-dom";

const WebAppLayout: FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default WebAppLayout;
