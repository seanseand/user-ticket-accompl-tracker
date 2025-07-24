import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from "react";

import Login from "./components/pageSetup/Login";
import Home from "./components/pageSetup/Home";
import RegisterPage from './components/pageSetup/CreateAccountForm.jsx'
import Admin from './components/pageSetup/Admin.jsx'

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/RegisterPage", element: <RegisterPage /> },
  { path: "/Admin", element: <Admin /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
