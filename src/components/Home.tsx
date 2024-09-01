"use client";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect } from "react";
import { MdGroups } from "react-icons/md";
import { FaUser,FaUserCheck } from "react-icons/fa6";
 
 
 
export default function Bento() {
    const [name, setName] = useState([]);
 
    const [ownUser, setOwnUser] = useState(false);
    
    useEffect(() => {
      localStorage.setItem("idTargetUser", localStorage.getItem("idActualUser") + "");

        if (
          localStorage.getItem("idActualUser") ==
          localStorage.getItem("idTargetUser")
        )
          setOwnUser(true);
    
        fetch(
          `${localStorage.getItem("api")}contacts/user/${localStorage.getItem(
            "idActualUser"
          )}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });

        fetch(
          `${localStorage.getItem("api")}users/id/${localStorage.getItem(
            "idActualUser"
          )}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setName(data[0].name);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
        fetch(`${localStorage.getItem("api")}sources`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      }, []);
    
      const features = [
        {
          Icon: MdGroups,
          name: "Groupes",
          description: "Groupes de partage de ressources",
          href: "/groups",
          cta: "Voir les groupes",
          background: "",
          className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 ",
        },
        {
          Icon: FaUserCheck,
          name: "Recommandations",
          description: "Voici les recommandations pour vous",
          href: "/recommendation",
          cta: "Voir les recommandations",
          background: "",
          className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
        },
        {
          Icon: FaUser,
          name: `${name}`,
          description: "Mon profil utilisateur",
          href: "/profile",
          cta: "Mon profil",
          background: "",
          className: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-1",
        },
      ];
      return (
        <div className="flex">
          <Sidebar />
          <div className="ml-16 flex-1 p-4">
            <BentoGrid className="lg:grid-cols-2">
              {features.map((feature, index) => (
                <BentoCard key={index} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </div>
      );
}
 