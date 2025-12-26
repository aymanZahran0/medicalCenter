import Edit from "@/assets/table/Edit";
import Eye from "@/assets/table/Eye";
import Delete from "@/assets/table/Delete";
import { Button } from "@/components/ui/button";

export const columnsDoctor = (openDeleteDialog) => {
  return [
    {
      accessorKey: "name",
      header: "اسم الطبيب",
    },
    {
      accessorKey: "phone",
      header: "رقم الهاتف",
    },
    {
      accessorKey: "email",
      header: "البريد الالكتروني",
    },
    {
      accessorKey: "specialties",
      header: "التخصص",
      cell: ({ row, getValue }) => {
        return <p>{row.original.specialties[1].name}</p>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "تاريخ الانضمام",
    },
    {
      accessorKey: "isActive",
      header: "حالة الحساب",
      cell: ({ getValue }) => {
        const isActive = getValue();

        return (
          <>
            <div className="flex">
              {isActive ? (
                <p className=" text-green-500 px-3 py-1 rounded-3xl bg-green-50">
                  نشط
                </p>
              ) : (
                <p className="flex  text-red-500 px-3 py-1 rounded-3xl font bg-red-50">
                  غير نشط
                </p>
              )}
            </div>

            {/* </span> */}
          </>
        );
      },
    },

    {
      accessorKey: "section",
      header: "الإجرائات",
      cell: ({ row, getValue }) => {
        // console.log(row)
        return (
          <div className="flex gap-1 ">
            <Button variant="show" className="rounded-[100%] ">
              <Eye />
            </Button>
            <Button variant="update" className="rounded-[100%]">
              <Edit />
            </Button>
            <Button onClick={() => openDeleteDialog(row.original._id)} variant="delete" className="rounded-[100%] ">
              <Delete />
            </Button>
          </div>
        );
      },
    },
  ];
};
