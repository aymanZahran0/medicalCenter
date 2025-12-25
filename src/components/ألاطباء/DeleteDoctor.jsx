import React from "react";
import { Button } from "../ui/button";
import { DialogClose, DialogContent } from "../ui/dialog";

export default function DeleteDoctor() {
  return (
    <>
      <DialogContent className="md:max-w-[40vw] max-w-[80vw] rounded-xl">
        <div className="flex justify-center items-center">
          <p className=""> هل انت متأكد انك تريد الحذف؟ </p>
        </div>

        <div>
          <Button variant="delete" className="w-30">
            حذف
          </Button>
          <DialogClose asChild className="w-30">
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </>
  );
}
