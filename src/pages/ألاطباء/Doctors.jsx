import React, { useEffect } from "react";
import DoctorTable from "@/components/ألاطباء/DoctorTable";


export default function Doctors() {

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="p-4  mr-0 md:mr-64">
        <DoctorTable />
      </div>
    </>
  );
}
