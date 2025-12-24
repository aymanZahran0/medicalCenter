import Edit from "@/assets/table/Edit";
import Eye from "@/assets/table/Eye";
import Delete from "@/assets/table/Delete";
import { Button } from "@/components/ui/button";

export const columnsDoctor = () => {
  return [
    {
      accessorKey: "name",
      header: "اسم الطبيب",
    },
    {
      accessorKey: "phone",
      header: "رقم الهاتف",

      // cell: ({ row, getValue }) => { console.log( row)     // we don't need accessorKey when use cell
      //     return  <p>{row.original.name.fname +row.original.name.lname}</p>
      // }
    },
    {
      accessorKey: "email",
      header: "البريد الالكتروني",
    },
    {
      accessorKey: "specialties",
      header: "التخصص",
          cell: ({ row, getValue }) => { 
        return  <p>{row.original.specialties[1].name}</p>
    }
    },
    {
      accessorKey: "createdAt",
      header: "تاريخ الانضمام",
    },
    {
      accessorKey: "isActive",
      header: "حالة الحساب",
    },
    {
      accessorKey: "section",
      header: "التحكم",
      cell: ({ row, getValue }) => { 
        return (
          <div className="flex gap-1 ">
            <Button variant="show" className="rounded-[100%] ">
              <Eye />
            </Button>
            <Button variant="update" className="rounded-[100%]">
              <Edit />
            </Button>
            <Button variant="delete" className="rounded-[100%] ">
              <Delete />
            </Button>
          </div>
        );
      },
    },
  ];
};

