"use client";
import { useState, useEffect } from "react";
import Home from "@/components/Home";
import NotConnect from "@/components/not-connect";

export default function HomePage() {
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
    return <Home />;
  }
}
