import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./components/page/Login.jsx";
import Home from "./components/page/Home.jsx";
import RegisterPage from "./components/page/CreateAccountForm.jsx";
import Admin from "./components/page/Admin.jsx";
import AccomplishmentLog from "./components/page/AccomplishmentLog/AccomplishmentLogLayout.jsx";
import LogTime from "./components/page/AccomplishmentLog/LogTime.jsx";
import AccomplishmentLogPage from "./components/page/AccomplishmentLog/AccomplishmentLogPage.jsx";
import AccomplishmentLogPageAdmin from "./components/page/Admin/AccomplishmentLogPageAdmin.jsx";

import App from "./App.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/RegisterPage", element: <RegisterPage /> },
  { path: "/Admin", element: <Admin /> },
  {
    path: "/AccomplishmentLog",
    element: <AccomplishmentLog />,
    children: [
      { path: "log-time", element: <LogTime /> },
      { path: "accomplishment-logs", element: <AccomplishmentLogPage /> },
    ],
  },
    {
    path: "/Admin/AccomplishmentLog",
    element: <AccomplishmentLog />,
    children: [
      {path: "log-time", element: <LogTime /> },
      {path: "accomplishment-logs", element: <AccomplishmentLogPageAdmin /> },
    ]
  }

]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
