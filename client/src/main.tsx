import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing";
import SalesPageLayout from "./components/layout/salesPage";
import WebAppLayout from "./components/layout/webApp";
import AuthLayout from "./components/layout/auth";

//Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <SalesPageLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/faq", element: <div>FAQ</div> },
    ],
  },
  { path: "/auth", element: <AuthLayout /> },
  {
    path: "/web-app",
    element: <WebAppLayout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="theme--blue">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
