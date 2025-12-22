import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import LogoSvg from "@/assets/logo/Logo";
import StatusUp1 from "@/assets/sideBar/StatusUp1";
import Doctor2 from "@/assets/sideBar/Doctor2";
import Sections3 from "@/assets/sideBar/Sections3";
import Services4 from "@/assets/sideBar/Services4";
import Offers5 from "@/assets/sideBar/Offers5";
import Photo6 from "@/assets/sideBar/Photo6";
import { NavLink } from "react-router-dom";

export default function Sidebar() {


  const navItemClass = ({ isActive }) =>
  `flex items-center gap-2 cursor-pointer border-l-4 pr-2 transition-colors
   ${
     isActive
       ? "text-primary border-primary font-bold"
       : "text-secondary2 border-transparent hover:text-primary"
   }`;

  return (
    <>
      <div className=" fixed hidden md:block pr-4 py-5 w-60 bg-sidebar h-[100vh]  ">
        <div className=" flex items-center gap-2 ">
          {/* <LogoSvg /> */}
          <img src="../../../../public/logo.webp" alt="" className="w-[40px]"/>

          <div className="">
            <h1 className="font-cairo text-lg font-bold md:text-2xl ">
              المركز الطبي
            </h1>
            <h2 className="font-cairo text-sm text-secondary2">
              {" "}
              رعاية صحية متكاملة
            </h2>
          </div>
        </div>
        <Separator className="w-[100%] my-7" />

        <div className="flex flex-col gap-8 text-secondary2">
          <NavLink
            to="/statistics"
           className={navItemClass}
          >
            <StatusUp1 />
            <p className="">الاحصائيات</p>
          </NavLink>

          <NavLink to="/doctors"
           className={navItemClass}

          >
            <Doctor2 />
            <p>الأطباء</p>
          </NavLink>

          <NavLink
            to="/sections"
            className={navItemClass}
          >
            <Sections3 />
            <p>التخصصات</p>
          </NavLink>
          <NavLink
            to="/services"
           className={navItemClass}
          >
            <Services4 />
            <p>الخدمات</p>
          </NavLink>
          <NavLink
            to="/offers"
           className={navItemClass}
          >
            <Offers5 />
            <p>العروض</p>
          </NavLink>
          <NavLink
            to="/panars"
           className={navItemClass}
          >
            <Photo6 />
            <p>البنرات الرئيسية</p>
          </NavLink>
        </div>

        {/* <Button>اضغط هنا</Button> */}
      </div>
    </>
  );
}
