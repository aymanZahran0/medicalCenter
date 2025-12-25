import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function CostumDialog({ open, setOpen,children,className }) {


  return (
    <>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <form>
            {/* <DialogContent className="md:max-w-[60vw] max-w-[98vw] rounded-xl"> */}
                {children}
            {/* </DialogContent> */}
          </form>
        </Dialog>
      </div>
    </>
  );
}
