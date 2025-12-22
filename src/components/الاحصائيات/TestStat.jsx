import { decrement, increment } from "@/redux/testSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";

export default function Test() {
  const count = useSelector((state) => state.counter.value);
  console.info(count);
  const dispatch = useDispatch();

  return (
    <>
      <div className="p-4  mr-0 md:mr-64">
        <h2 className="bg-red-300">الاحصائيات</h2>

        <div className="flex gap-4 my-5">
          <Button variant="add">+ اضافة طبيب</Button>
          <Button variant="delete">حذف</Button>
          <Button variant="update">تعديل</Button>
          <Button variant="show">اظهار</Button>
        </div>

        <div className="text-center flex flex-col justify-center  items-center h-[50vh]">
          <h3>redux</h3>
          <h3 className="">{count}</h3>
          <div className="flex justify-center ">
            <button
              onClick={() => {
                dispatch(increment());
              }}
              className="bg-green-300 px-3 rounded mx-4"
            >
              +
            </button>
            <button
              onClick={() => {
                dispatch(decrement());
              }}
              className="bg-red-300 px-3 rounded mx-4"
            >
              -
            </button>
          </div>
        </div>
      </div>

      {/* counter */}
    </>
  );
}
