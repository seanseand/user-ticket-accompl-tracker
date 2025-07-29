import React from "react";
import Sidebar from "../../layout/Sidebar/Sidebar";
import { Outlet } from "react-router";

const AccomplishmentLog = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="nav fixed top-0 w-full z-50 bg-white">
        <div className="about">About</div>
      </nav>
      <div className="flex pt-[48px]"> {/* Adjust pt value to match your nav height */}
        <Sidebar />
        <main className="flex-1 ml-64 bg-[#F0F3F8] min-h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccomplishmentLog;
