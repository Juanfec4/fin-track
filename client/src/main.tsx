import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LandingPage from "./pages/landing";
import SalesPageLayout from "./components/layout/salesPage";
import WebAppLayout from "./components/layout/webApp";
import AuthLayout from "./components/layout/auth";
import FaqPage from "./pages/faq";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import BudgetsPage from "./pages/budgets";
import DashboardPage from "./pages/dashboard";
import TransactionsPage from "./pages/transactions";
import NewBudgetPage from "./pages/newBudget";

//Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <SalesPageLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/faq", element: <FaqPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/web-app",
    element: <WebAppLayout />,
    children: [
      {
        path: "/web-app",
        element: <DashboardPage />,
      },
      {
        path: "/web-app/budgets",
        element: <BudgetsPage />,
      },
      {
        path: "/web-app/budgets/new",
        element: <NewBudgetPage />,
      },
      {
        path: "/web-app/transactions",
        element: <TransactionsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
