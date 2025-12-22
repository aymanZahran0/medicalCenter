import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 



export default function NotFound_Page() {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    
  return (
    <>
      <section  className="container mx-auto px-4 text-center text-red-500 " >
        <div  className="flex justify-center items-center h-[70vh] mr-0 md:mr-64">
          <div>
            <h2 className=" md:text-[80px] sm:text-[60px] text-[40px]">
              404 Not Found
            </h2>
            <p variant="body1" my='20px' mb='50px'>
              Your visited page not found. You may go home page.
            </p>
            <div className="p-2 my-5 rounded bg-red-700 text-white hover:bg-red-800 w-[50%] m-auto">
            <Link to="/" >Back to home page</Link>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
