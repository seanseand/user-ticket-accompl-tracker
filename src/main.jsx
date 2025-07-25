import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from "react";

import Login from "./components/page/Login.jsx";
import Home from "./components/page/Home.jsx";
import RegisterPage from './components/page/CreateAccountForm.jsx'
import Admin from './components/page/Admin.jsx'
import AccomplishmentLog from './components/page/AccomplishmentLog.jsx';

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/RegisterPage", element: <RegisterPage /> },
  { path: "/Admin", element: <Admin /> },
  { path: "/AccomplishmentLog", element: <AccomplishmentLog /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
