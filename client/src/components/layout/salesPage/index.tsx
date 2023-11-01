import { FC } from "react";
import { Outlet } from "react-router-dom";

const SalesPageLayout: FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default SalesPageLayout;
