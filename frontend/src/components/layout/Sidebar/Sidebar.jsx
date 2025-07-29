import React from "react";
import { Timer, NotebookPen, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import useMenuItems from "./MenuItems";

const Sidebar = () => {
  const menuItems = useMenuItems();
  const baseClass =
    "flex items-center p-2 text-[#1A3C70] rounded-lg group transition-colors";
  const activeClass = "bg-[#3C5985] text-white";
  const iconBase = "text-[#1A3C70] group-hover:text-white transition-colors";
  const iconActive = "text-white";

  const getIcon = (key) => {
    switch (key) {
      case "log-time":
        return Timer;
      case "accomplishment-logs":
        return NotebookPen;
      default:
        return null;
    }
  };

  return (
    <div className="h-full fixed top-[48px] bottom-0">
      <aside
        id="default-sidebar"
        className="w-64 h-full bg-gray-50 flex flex-col transition-transform -translate-x-full sm:translate-x-0 shadow-xl"
        aria-label="Sidebar"
      >
        <div className="flex-1 px-3 py-4">
          <ul className="space-y-4 font-bold font-medium">
            {menuItems.map((item) => {
              const Icon = getIcon(item.key);
              return (
                <li key={item.key}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${baseClass} hover:bg-[#3C5985] ${
                        isActive ? activeClass : ""
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`${iconBase} ${isActive ? iconActive : ""}`}
                          size={22}
                        />
                        <span
                          className={`ms-3 group-hover:text-white ${
                            isActive ? "text-white" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-auto px-3 py-4 border-t">
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