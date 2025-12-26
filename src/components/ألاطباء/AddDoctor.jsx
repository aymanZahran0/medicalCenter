import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axiosInstance from "@/apis/axiosInstance";
import axios from "axios";



export default function AddDoctor() {
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [workingDays, setWorkingDays] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  // async function addDoctor(e) {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const formData = new FormData(formRef.current);
  //     formData.append("isActive", isActive);
  //     formData.append("workingDays", JSON.stringify(workingDays));

  //     await axiosInstance.post(
  //       "https://backend-badr.vercel.app/api/doctors",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function addDoctor(e) {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData(formRef.current);

    formData.append("isActive", isActive);
    formData.append("workingDays", JSON.stringify(workingDays));

    // working hours
    const from = formData.get("workingHours.from");
    const to = formData.get("workingHours.to");

    formData.delete("workingHours.from");
    formData.delete("workingHours.to");

    formData.append(
      "workingHours",
      JSON.stringify({ from, to })
    );

    // specialties
    const specialties = formData.get("specialties");
    if (specialties) {
      formData.set(
        "specialties",
        JSON.stringify(
          specialties.split(",").map(s => s.trim())
        )
      );
    }

    // DEBUG (KEEP TEMP)
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    await axiosInstance.post("https://backend-badr.vercel.app/api/doctors", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.error(err.response?.data || err);
  } finally {
    setLoading(false);
  }

  for (let pair of formData.entries()) {
   console.log(pair[0], pair[1]);
}
}

  return (
    <DialogContent className="md:max-w-[60vw] max-w-[98vw] rounded-xl">
      <form ref={formRef} onSubmit={addDoctor}>
        {/* HEADER */}
        <h5 className="text-sm lg:text-lg font-bold">اضافة طبيب جديد</h5>

        <div className="flex items-center gap-4 mt-4">
          {/* upload img */}
          <div className="relative w-16 h-16 mb-5">
            <Avatar className="w-16 h-16 bg-muted">
              <AvatarImage src={image} />
              <AvatarFallback className="bg-[#ECECEC]" />
            </Avatar>

            <Button
              type="button"
              size="icon"
              className="w-6 h-6 absolute bottom-[-4px] left-[-1px] rounded-full bg-orange-500"
              onClick={() => inputRef.current.click()}
            >
              <Pencil className="w-2 h-2 text-white" />
            </Button>

            <input
              ref={inputRef}
              type="file"
              name="profilePicture"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant={isActive ? "add" : "outline"}
              onClick={() => setIsActive(true)}
            >
              تنشيط
            </Button>

            <Button
              type="button"
              variant={!isActive ? "destructive" : "outline"}
              onClick={() => setIsActive(false)}
            >
              ايقاف
            </Button>
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="text-[#42526E] text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>إسم الطبيب</Label>
              <Input name="name" type="text" />
            </div>
            <div>
              <Label>رقم الهاتف</Label>
              <Input name="phone" type="text" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 my-4">
            <div>
              <Label> البريد الإلكتروني</Label>
              <Input name="email" />
            </div>
            <div>
              <Label> التخصصات</Label>
              <Input name="specialties" placeholder="cardiology, surgery" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-2 my-4">
            <div>
              <Label>سنوات الخبرة</Label>
              <Input name="yearsOfExperience" type="number" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label> سعر الكشف</Label>
                <Input name="examinationPrice" />
              </div>
              <div>
                <Label> سعر الاستشارة الهاتفية</Label>
                <Input name="phoneConsultationPrice" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 my-4">
            <Label> وصف الطبيب</Label>
            <Input name="description" />
          </div>

          <div className="grid grid-cols-1 gap-2 my-4">
            <Label> نبذة عن الطبيب</Label>
            <Input name="about" />
          </div>

          {/* WORKING DAYS & HOURS */}
          <div className="w-full bg-[#F8FEFF] rounded-xl border px-4 py-2">
            <div className="lg:flex items-end gap-2">
              <div className="flex flex-col gap-1 lg:flex-1">
                <Label>أيام العمل</Label>
                <Select
                  dir="rtl"
                  onValueChange={(v) =>
                    setWorkingDays((prev) =>
                      prev.includes(v)
                        ? prev.filter((d) => d !== v)
                        : [...prev, v]
                    )
                  }
                >
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="حدد أيام العمل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sat">السبت</SelectItem>
                    <SelectItem value="sun">الأحد</SelectItem>
                    <SelectItem value="mon">الإثنين</SelectItem>
                    <SelectItem value="tue">الثلاثاء</SelectItem>
                    <SelectItem value="wed">الأربعاء</SelectItem>
                    <SelectItem value="thu">الخميس</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div>
                  <span>من</span>
                  <Input
                    type="time"
                    name="workingHours.from"
                    defaultValue="08:00"
                  />
                </div>

                <span>—</span>

                <div>
                  <span>إلى</span>
                  <Input
                    type="time"
                    name="workingHours.to"
                    defaultValue="17:00"
                  />
                </div>

                <Button
                  type="button"
                  size="icon"
                  className="rounded-lg bg-teal-600"
                >
                  <Plus className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex gap-2">
          <Button type="submit" variant="add" disabled={loading}>
            {loading ? "جارٍ الإضافة..." : "إضافة"}
          </Button>

          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
}

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DialogClose,
//   DialogContent,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Plus } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Pencil } from "lucide-react";

// export default function AddDoctor() {
// const [message, setMessage] = useState(null)
// const [loading, setLoading] = useState(false)

//   async function addDoctor() {
//     try {
//       const { data } = await axiosInstance.post(
//         `https://backend-badr.vercel.app/api/doctors`
//       );
//       console.log(data);
//       setMessage(data.message);
//       setLoading(true)
//       return data;
//     } catch (err) {
//       setLoading(false)
//       return err;
//     }
//   }

//   // upload img
//   const inputRef = React.useRef(null);
//   const [image, setImage] = React.useState(null);

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => setImage(reader.result);
//     reader.readAsDataURL(file);
//   };
//   return (
//     <>
//       <DialogContent className="md:max-w-[60vw] max-w-[98vw] rounded-xl">
//         <div>
//           <div className="">
//             <h5 className="text-sm lg:text-lg font-bold">اضافة طبيب جديد</h5>

//             <div className="flex items-center gap-4">
//               {/* upload img */}
//               <div className="relative w-16 h-16 mb-5">
//                 {/* Avatar */}
//                 <Avatar className="w-16 h-16 bg-muted ">
//                   <AvatarImage src={image} />
//                   <AvatarFallback className="bg-[#ECECEC] " />
//                 </Avatar>

//                 {/* Upload Button */}
//                 <Button
//                   size="icon"
//                   className=" w-6 h-6 absolute bottom-[-4px] left-[-1px] rounded-full bg-orange-500 hover:bg-orange-600"
//                   onClick={() => inputRef.current.click()}
//                 >
//                   <Pencil className="w-2 h-2 text-white" />
//                 </Button>

//                 {/* Hidden Input */}
//                 <input
//                   ref={inputRef}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleUpload}
//                 />
//               </div>

//               <div>
//                 <Button variant="outline" className="text-xs ">
//                   ايقاف
//                 </Button>
//                 <Button variant="add" className="text-xs font-cairo">
//                   تنشيط
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <div className="text-[#42526E] text-xs">
//             {/* 1 */}
//             <div className="grid grid-cols-2 gap-2 ">
//               <div>
//                 <Label>إسم الطبيب</Label>
//                 <Input type="text" name='name'/>
//               </div>
//               <div>
//                 <Label>رقم الهاتف</Label>
//                 <Input type="number" name='phone'/>
//               </div>
//             </div>

//             {/* 2 */}
//             <div className="grid grid-cols-2 gap-2 my-4">
//               <div>
//                 <Label> البريد الإلكتروني</Label>
//                 <Input type="email" name='email'/>
//               </div>
//               <div>
//                 <Label> التخصصات</Label>
//                 <Input type="text" name='specialties'/>
//               </div>
//             </div>

//             {/* 3 */}
//             <div class="grid lg:grid-cols-2 gap-2 my-4">
//               <div>
//                 <Label>سنوات الخبرة</Label>
//                 <Input type="number" name='yearsOfExperience' />
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <Label> سعر الكشف</Label>
//                   <Input type="text" name='examinationPrice'/>
//                 </div>
//                 <div>
//                   <Label> سعر الاستشارة الهاتفية</Label>
//                   <Input type="text" name='phoneConsultationPrice'/>
//                 </div>
//               </div>
//             </div>

//             {/* 4 */}
//             <div className="grid grid-cols-1 gap-2 my-4">
//               <div>
//                 <Label> وصف الطبيب</Label>
//                 <Input type="text" name='description' />
//               </div>
//             </div>

//             {/* 5 */}
//             <div class="grid grid-cols-1 gap-2 my-4">
//               <div>
//                 <Label> نبذة عن الطبيب</Label>
//                 <Input type="text" name='about'/>
//               </div>
//             </div>

//             {/* 6 */}
//             <div
//               dir="rtl"
//               className="w-full bg-[#F8FEFF] rounded-xl border px-4 py-2"
//             >
//               <div className="lg:flex items-end gap-2">
//                 {/* Days select */}
//                 <div className="flex flex-col gap-1 lg:flex-1">
//                   <Label className="">أيام العمل</Label>
//                   <Select dir="rtl">
//                     <SelectTrigger className="w-full text-right">
//                       <SelectValue placeholder="حدد أيام العمل" />
//                     </SelectTrigger>
//                     <SelectContent dir="rtl">
//                       <SelectItem value="sat">السبت</SelectItem>
//                       <SelectItem value="sun">الأحد</SelectItem>
//                       <SelectItem value="mon">الإثنين</SelectItem>
//                       <SelectItem value="tue">الثلاثاء</SelectItem>
//                       <SelectItem value="wed">الأربعاء</SelectItem>
//                       <SelectItem value="thu">الخميس</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="flex items-end gap-1">
//                   {/* Time range */}
//                   <div className="flex items-center gap-1 lg:gap-3 text-sm">
//                     {/* From */}
//                     <div className="flex flex-col gap-1">
//                       <span className="text-muted-foreground">من</span>
//                       <div className="relative">
//                         <Input
//                           name=''
//                           type="time"
//                           defaultValue="08:00"
//                           className="text-center"
//                         />
//                       </div>
//                     </div>

//                     <span className="mt-6 text-muted-foreground">—</span>

//                     {/* To */}
//                     <div className="flex flex-col gap-1">
//                       <span className="text-muted-foreground">إلى</span>
//                       <div className="relative">
//                         <Input
//                           type="time"
//                           defaultValue="17:00"
//                           className=" text-center"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Add button */}
//                   <div className="">
//                     <Button
//                       size="icon"
//                       className="rounded-lg bg-teal-600 hover:bg-teal-700"
//                     >
//                       <Plus className="h-5 w-5 text-white" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-3 flex gap-2">
//             <Button variant="add" type="submit" className="w-40">
//               إضافة
//             </Button>
//             <DialogClose asChild className="w-40">
//               <Button variant="outline">إلغاء</Button>
//             </DialogClose>
//           </div>
//         </div>
//       </DialogContent>
//     </>
//   );
// }
