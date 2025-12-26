import React, { useEffect, useState } from "react";
import TablePage from "../common/table/Page";
import { Table_API } from "@/apis/Table_API";



export default function doctorTable() {

  useEffect(() => {
    localStorage.setItem(
      "userToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTQ5YmNiMDk2NGQxNzU5ZWEzOTlhN2UiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjY1NzM4MDgsImV4cCI6MTc5MjQ5MzgwOH0.6Lsls8oGyaPi4FjupjR9Po7keb7is2XFACVss37EOxY"
    );

    Table_API();
    // console.log(Table_API)
  }, []);

  return (
    <>
      <div className="bg-sidebar  px-5 rounded-xl">

        <TablePage/>

       {/* < CostumDialog/> */}

      </div>
    </>
  );
}
