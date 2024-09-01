"use client";
import { useState, useEffect } from "react";
import NotConnect from "@/components/not-connect";
import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assumes mobile view for screens <= 768px
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
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
        <div className={isMobile ? "ml-[0vw]" : "ml-[4vw]"}>
          <Profile />
        </div>
      </>
    );
  }
}
