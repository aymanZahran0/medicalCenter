import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";

export default function TablePage() {


  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columnsStudent} data={data} /> */}
      <DataTable />
    </div>
  );
}
