import React from "react";
import { Timer, NotebookPen, LogOut } from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = () => {
  const baseClass = "flex items-center p-2 text-[#1A3C70] rounded-lg group transition-colors";
  const activeClass = "bg-[#3C5985] text-white";
  const iconBase = "text-[#1A3C70] group-hover:text-white transition-colors";
  const iconActive = "text-white";

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
              <NavLink
                to="/AccomplishmentLog/log-time"
                className={({ isActive }) =>
                  `${baseClass} hover:bg-[#3C5985] ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Timer
                      className={`${iconBase} ${isActive ? iconActive : ""}`}
                      size={22}
                    />
                    <span
                      className={`ms-3 group-hover:text-white ${
                        isActive ? "text-white" : ""
                      }`}
                    >
                      Log Time
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/AccomplishmentLog/accomplishment-logs"
                className={({ isActive }) =>
                  `${baseClass} hover:bg-[#3C5985] ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <NotebookPen
                      className={`${iconBase} ${isActive ? iconActive : ""}`}
                      size={22}
                    />
                    <span
                      className={`ms-3 group-hover:text-white ${
                        isActive ? "text-white" : ""
                      }`}
                    >
                      Accomplishment Logs
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="px-3 py-4 bg-gray-50">
          <a href="#" className={baseClass + " hover:bg-[#3C5985]"}>
            <LogOut className={iconBase} size={22} />
            <span className="ms-3 group-hover:text-white">Log out</span>
          </a>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
