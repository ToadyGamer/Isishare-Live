"use client";
import NotConnect from "@/components/not-connect";
import Chat from "@/components/Chat"
import Sidebar from "@/components/Sidebar";

export default function forum() {
  if(typeof window !== 'undefined'){
    if(localStorage.getItem("idActualUser") == "0") return(<NotConnect/>);
    else{
      return (
        <>
          <Sidebar />
          <div className="containerForum">
          <main className="mainForum">
            <h1 className="titleForum" id="title">Discute avec tout le monde !</h1>
            <Chat />
          </main>
        </div>
        </>
      ); 
    } 
  }
}