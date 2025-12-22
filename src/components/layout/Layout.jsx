import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../common/footer/Footer";
import Navbar from "../common/navbar/Navbar";
import Sidebar from "../common/navbar/Sidebar";




export default function Layout() {
  return (
    <>
     <Sidebar/>
     <Navbar/>
       <Outlet></Outlet>

      {/* <Footer /> */}
    </>
  );
}
