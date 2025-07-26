import React from "react";
import Sidebar from "../layout/Sidebar";

const AccomplishmentLog = () => {
  return (
    <div className="flex flex-col h-screen">
      <nav className="nav">
        <div className="about">About</div>
      </nav>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-[#F0F3F8]"></main>
      </div>
    </div>
  );
};

export default AccomplishmentLog;
