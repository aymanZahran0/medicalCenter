import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { columnsDoctor } from "./columns";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";
// import { Table_API } from "@/apis/Table_API";
import { SearchInput } from "@/components/common/SearchInput";
import Filter from "@/assets/table/Filter";
import CostumDialog from "./CostumDialog";
import AddDoctor from "@/components/ألاطباء/AddDoctor";
import DeleteDoctor from "@/components/ألاطباء/DeleteDoctor";

export function DataTable({}) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const rows = Number(searchParams.get("rows")) || 10;
  const curent = Number(searchParams.get("curent")) || 0;
  const [pagination, setPagination] = useState({
    pageIndex: curent,
    pageSize: rows,
  });
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  async function Table_API() {
    try {
      const { data } = await axiosInstance.get(
        "https://backend-badr.vercel.app/api/doctors"
      );
      console.log(data);
      setData(data.data);
      return data;
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    // api
    Table_API();
    setColumns(columnsDoctor(openDeleteDialog));
  }, []);

  function studentsTable() {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("table", "students");
      params.set("rows", 10);
      params.set("curent", 0);
      return params;
    });
    // localStorage.setItem("tableType", "students");
    console.info("students table");
  }

  function productsTable() {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("table", "products");
      params.set("rows", 10);
      params.set("curent", 0);
      return params;
    });
    console.info("products table");
  }

  function changeNumberRow(e) {
    const value = e.target.value;
    table.setPageSize(value);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("rows", value);
      params.set("curent", 0);
      return params;
    });
  }

  useEffect(() => {
    table.setPageSize(rows);
    table.setPageIndex(curent);
  }, [rows, curent]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      globalFilter,
      pagination,
    },
  });

  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pages = Array.from({ length: pageCount }, (_, i) => i);
  console.info(pageCount);
  console.info(pages);
  console.info(pageIndex);

  // dialog
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  // const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [idDoctor, setIdDoctor] = useState(null);

  const openDeleteDialog = (id) => {
    // setSelectedDoctor(doctor);
    setDialogType("delete");
    setIdDoctor(id);
    setOpen(true);

  };

  return (
    <>
      {/* custem dialog */}
      <CostumDialog open={open} setOpen={setOpen}>
        {dialogType === "add" && <AddDoctor />}
        {dialogType === "delete" && <DeleteDoctor id={idDoctor}/>}
      </CostumDialog>

      {/* head */}
      <div className=" md:flex items-center justify-between gap-5 mb-5">
        <h5 className="font-bold">الأطباء</h5>

        <div className="flex gap-1 md:gap-3">
          {/* search */}
          <SearchInput
            variant="searchTable"
            className=" lg:w-[350px]"
            onChange={
              (event) => setGlobalFilter(event.target.value)
              // table.getColumn(`name`)?.setFilterValue(event.target.value)
            }
          />

          <Button variant="outline">
            <Filter className="text-green-300" />
            تصنيف
          </Button>

          <Button
            variant="add"
            onClick={() => {
              setOpen(true);
              setDialogType("add");
            }}
          >
            + إضافة طبيب
          </Button>
          {/* Dialog */}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border flex flex-col justify-between pb-5 h-[65vh]">
        {/* table */}
        <Table>
          <TableHeader className="bg-secondary ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className=" text-default text-start px-5"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {data.length > 0 ? (
            <TableBody className="p-5">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className=""
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="  px-5 text-secondary2"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ) : (
            <TableCell colSpan={columns.length} className="h-24 text-center">
              loading..
            </TableCell>
          )}
        </Table>

        {/* pagination */}
        <div className="flex item justify-between  mt-2 mx-4">
          {/* 1 */}
          <div className="flex items-center gap-1">
            <p className="text-sm text-gray-400">out of {data?.length}</p>
            <select
              value={rows}
              onChange={changeNumberRow}
              className="border rounded py-1 text-xs bg-muted"
            >
              {[5, 10, 15, 20, 25, 30].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <p className="text-secondary2 text-sm">showing</p>
          </div>

          {/* 2 */}
          <div className="flex items-center  gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>

              <ChevronRight />
            </Button>

            {/* number of pages */}
            {pages.map((page) => (
              <Button
                key={page}
                size="icon"
                variant={page === pageIndex ? "default" : "outline"}
                className={`size-7 ${
                  page === pageIndex ? "bg-primary text-white" : "text-default"
                }`}
                onClick={() => {
                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set("curent", page);
                    return params;
                  });
                }}
              >
                {page + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronLeft />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
