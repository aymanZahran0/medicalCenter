import React, { useState } from "react";
import { Button } from "../ui/button";
import { DialogClose, DialogContent } from "../ui/dialog";
import axiosInstance from "@/apis/axiosInstance";

export default function DeleteDoctor({ id }) {
const [message, setMessage] = useState(null)
const [loading, setLoading] = useState(false)

  async function deletDoctor() {
    try {
      const { data } = await axiosInstance.delete(
        `https://backend-badr.vercel.app/api/doctors/${id}`
      );
      console.log(data);
      setMessage(data.message);
      setLoading(true)
      return data;
    } catch (err) {
      setLoading(false)
      return err;
    }
  }

  console.log(id);
  return (
    <>
      <DialogContent className="md:max-w-[40vw] max-w-[80vw] rounded-xl">
        
        <div className="flex justify-center items-center">
          <p className=""> هل انت متأكد انك تريد الحذف؟ </p>
        </div>

        <div>

          <Button onClick={deletDoctor} variant="delete" className="w-30">
            {loading===false?'حذف' : 'loading'}
          </Button>


          <DialogClose asChild className="w-30">
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </>
  );
}
