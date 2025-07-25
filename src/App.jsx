import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from "./components/page/Home";
import Login from "./components/page/Login"
import RegisterPage from "./components/page/CreateAccountForm";
import Admin from "./components/page/Admin";
import AccomplishmentLog from "./components/page/AccomplishmentLog";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/SignUp" element={<RegisterPage />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/AccomplishmentLog" element={<AccomplishmentLog />} />
    </Routes>
  );
}

export default App;