import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from "./components/pageSetup/Home";
import Login from "./components/pageSetup/Login"
import RegisterPage from "./components/pageSetup/CreateAccountForm";
import Admin from "./components/pageSetup/Admin";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/SignUp" element={<RegisterPage />} />
      <Route path="/Admin" element={<Admin />} />
    </Routes>
  );
}

export default App;