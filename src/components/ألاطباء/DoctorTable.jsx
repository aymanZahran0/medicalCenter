import React, { useEffect, useState } from "react";
import { SearchInput } from "../common/SearchInput";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Filter from "@/assets/table/Filter";
import Delete from "@/assets/table/Delete";
import Edit from "@/assets/table/Edit";
import Eye from "@/assets/table/Eye";
import TablePage from "../common/table/Page";
import { Table_API } from "@/apis/Table_API";
import CostumDialog from "../common/table/CostumDialog";



export default function doctorTable() {

  useEffect(() => {
    localStorage.setItem(
      "userToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTQ5YmNiMDk2NGQxNzU5ZWEzOTlhN2UiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjY1NzM4MDgsImV4cCI6MTc5MjQ5MzgwOH0.6Lsls8oGyaPi4FjupjR9Po7keb7is2XFACVss37EOxY"
    );

    Table_API();
    console.log(Table_API)
  }, []);

  return (
    <>
      <div className="bg-sidebar  px-5 rounded-xl">

        <TablePage/>

       < CostumDialog/>

        {/* <div className="flex gap-2 ">
          <Button variant="delete" className="rounded-[100%] ">
            <Delete />
          </Button>
          <Button variant="show" className="rounded-[100%]">
            <Eye />
          </Button>
          <Button variant="update" className="rounded-[100%]">
            <Edit />
          </Button>
        </div> */}
      </div>
    </>
  );
}
