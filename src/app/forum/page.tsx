"use client";
import { useState, useEffect } from "react";
import NotConnect from "@/components/not-connect";
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";

export default function ForumPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Rendu côté serveur ou initialisation du composant côté client
    return null; // Ou un autre rendu initial statique
  }

  if (localStorage.getItem("idActualUser") === "0") {
    return <NotConnect />;
  } else {
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
