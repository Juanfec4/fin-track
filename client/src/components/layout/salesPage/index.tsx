import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../ui/navigation/navbar";
import Footer from "../../ui/pageComponents/footer";

const SalesPageLayout: FC = () => {
  return (
    <>
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
      <Footer />
    </>
  );
};

export default SalesPageLayout;
