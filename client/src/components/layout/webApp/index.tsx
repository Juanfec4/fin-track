import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import { useUserStatus } from "../../../hooks/useUserStatus";
import "./styles.scss";
import Footer from "../../ui/pageComponents/footer";
import Sidebar from "../../ui/navigation/sidebar";
import { IconHome } from "@tabler/icons-react";
import { IconDashboard } from "@tabler/icons-react";
import { IconBusinessplan } from "@tabler/icons-react";
import { IconArrowsRightLeft } from "@tabler/icons-react";

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
      <div className="web-app">
        <aside className="web-app__container--left">
          <Sidebar
            links={[
              { target: "/", text: "Home", icon: IconHome },
              { target: "/web-app/", text: "Dashboard", icon: IconDashboard },
              {
                target: "/web-app/budgets",
                text: "Budgets",
                icon: IconBusinessplan,
              },
              {
                target: "/web-app/transactions",
                text: "Transactions",
                icon: IconArrowsRightLeft,
              },
            ]}
          />
        </aside>
        <main className="web-app__container--right">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default WebAppLayout;
