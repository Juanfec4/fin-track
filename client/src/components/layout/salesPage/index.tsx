import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../ui/navigation/navbar";
import Footer from "../../ui/pageComponents/footer";
import { useTheme } from "../../../hooks/useTheme";

const SalesPageLayout: FC = () => {
  const theme = useTheme();
  return (
    <div className={theme.className}>
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
    </div>
  );
};

export default SalesPageLayout;
