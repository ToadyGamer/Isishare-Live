"use client";
import NotConnect from "@/components/not-connect";
import Sidebar from "@/components/Sidebar";
import Recom from "@/components/Recommendation"

export default function Recommendation() {
  if(typeof window !== 'undefined'){
    if(localStorage.getItem("idActualUser") == "0") return(<NotConnect/>);
    else{
      return (
        <>
            <Sidebar />
            <Recom />
        </>
      )
    };
  }
}