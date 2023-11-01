import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../ui/navigation/navbar";

const SalesPageLayout: FC = () => {
  return (
    <div className="theme--blue">
      <Navbar
        links={[
          { target: "/", text: "Home" },
          { target: "/faq", text: "FAQ" },
          { target: "/web-app", text: "Web-app" },
        ]}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SalesPageLayout;
