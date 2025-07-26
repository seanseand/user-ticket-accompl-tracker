import React from "react";
import { Timer, NotebookPen, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div>
      <aside
        id="default-sidebar"
        className="w-64 h-full flex flex-col justify-between transition-transform -translate-x-full sm:translate-x-0 shadow-xl"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 flex flex-col">
          <ul className="space-y-4 font-bold flex-1 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-[#1A3C70] rounded-lg hover:bg-[#3C5985] group"
              >
                <Timer className="text-[#1A3C70] group-hover:text-white" size={22} />
                <span className="ms-3 group-hover:text-white">Log Time</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-[#1A3C70] rounded-lg hover:bg-[#3C5985] group"
              >
                <NotebookPen className="text-[#1A3C70] group-hover:text-white" size={22} />
                <span className="ms-3 group-hover:text-white">Accomplishment Logs</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="px-3 py-4 bg-gray-50">
          <a
            href="#"
            className="flex items-center p-2 text-[#1A3C70] rounded-lg hover:bg-[#3C5985] group"
          >
            <LogOut className="text-[#1A3C70] group-hover:text-white" size={22} />
            <span className="ms-3 group-hover:text-white">Log out</span>
          </a>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
