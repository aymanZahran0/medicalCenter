import React from "react";
import { SearchInput } from "../SearchInput";
import Notifications from "@/assets/navbar/Notifications";
import Moon from "@/assets/navbar/Moon";
import Info from "@/assets/navbar/Info";
import { Sun } from "lucide-react";
import useDarkMode from "@/hooks/useDarkMode";
import { Input } from "../../ui/input";


export default function Navbar() {
  // dark mode
  const { theme, toggleTheme } = useDarkMode();

  return (
    <>
      <div className="px-4 mr-0 md:mr-64 fixed mt-4 w-full md:w-[calc(98%-240px)]">
        <nav className="flex justify-between items-center gap-3 p-2  bg-sidebar rounded-3xl">
          <div>
            <h2 className="text-lg font-bold">الأطباء</h2>
          </div>

          <div className="flex items-center gap-5">
            <SearchInput className=""/>
            {/* <Input variant="error"/> */}
            <Notifications />
            <div onClick={toggleTheme}>
              {theme === "dark" ? <Sun className= "text-secondary2" /> : <Moon />}
            </div>
            <Info />
          </div>
        </nav>
      </div>
      <div className="pb-20"></div>
    </>
  );
}
