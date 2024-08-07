"use client";
import { useState, useEffect } from "react";
import NotConnect from "@/components/not-connect";
import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";

export default function Home() {
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
        <div className="ml-16">
          <Profile />
        </div>
      </>
    );
  }
}
