import React from "react";
import Sidebar from "../../layout/Sidebar";
import { Outlet } from "react-router";

const AccomplishmentLog = () => {
  return (
    <div className="flex flex-col h-screen">
      <nav className="nav">
        <div className="about">About</div>
      </nav>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-[#F0F3F8]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccomplishmentLog;
