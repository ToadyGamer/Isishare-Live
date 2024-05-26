"use client";
import NotConnect from "@/components/not-connect";
import Sidebar from "@/components/Sidebar"
import Users from "@/components/Users"

export default function Home() {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem("idActualUser") == "0") return(<NotConnect/>);
        return (
            <>
                <Sidebar />
                <Users />
            </>
        )
    }
}