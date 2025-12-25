import axios from "axios";
import axiosInstance from "./axiosInstance";

export async function  Table_API (){
   try {
      const {data} = await axiosInstance.get('https://backend-badr.vercel.app/api/doctors')
      console.log(data)
      return data;
    } catch (err) {
      return err
    }
}

