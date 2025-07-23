import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from "./components/pageSetup/Home";
import Login from "./components/pageSetup/Login"
import RegisterPage from "./components/pageSetup/CreateAccountForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/SignUp" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;