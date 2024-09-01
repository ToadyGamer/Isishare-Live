"use client";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BellIcon, CalendarIcon, FileTextIcon, GlobeIcon, InputIcon } from "@radix-ui/react-icons";
import Sidebar from "@/components/Sidebar";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import Image from "next/image";


export default function BentoDemo() {

const [name, setName] = useState([]);

const [ownUser, setOwnUser] = useState(false);

useEffect(() => {
    if (
      localStorage.getItem("idActualUser") ==
      localStorage.getItem("idTargetUser")
    )
      setOwnUser(true);

    fetch(
      `${localStorage.getItem("api")}contacts/user/${localStorage.getItem(
        "idTargetUser"
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
        "idTargetUser"
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
      Icon: InputIcon,
      name: "test",
      description: "Profil partageant les mêmes buts",
      href: "/",
      cta: "Learn more",
      background: 
      <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
          )}
        />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-3",
    },
    {
      Icon: GlobeIcon,
      name: "test",
      description: "Top des utilisateurs avec le plus de points", 
      href: "/",
      cta: "Learn more",
      background:
      <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
          )}
        />,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-3",
    },
    {
      Icon: CalendarIcon,
      name: "test",
      description: "Utilisateur avec le plus de points",
      href: "/",
      cta: "Learn more",
      background:  
      <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
          )}
        />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: BellIcon,
      name: "test",
      description: "Profil correspondant aux mêmes buts",
      href: "/",
      cta: "Learn more",
      background: 
      <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
          )}
        />,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: FileTextIcon,
      name: `${name}`,
      description: "Mon profil",
      href: "/",
      cta: "Learn more",
      background:           
      <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
          )}
        />,
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
