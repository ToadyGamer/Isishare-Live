"use client";
import Home from "@/components/Home"
import NotConnect from "@/components/not-connect"

export default function home() {
  if(typeof window !== 'undefined'){
    if(localStorage.getItem("idActualUser") == "0") return(<NotConnect/>);
    else return(<Home/>);
  }
}