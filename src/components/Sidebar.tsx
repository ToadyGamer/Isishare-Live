"use client";
import { AiOutlineHome } from "react-icons/ai";
import { TbUserSearch } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineForum } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useEffect, useState } from "react";

export default function Sidebar() {

  const [admin, setAdmin] = useState<string>("0");

  useEffect(() => {
    const fetchData = async () => {
      const usersIDResponse = await fetch(`${localStorage.getItem("api")}users/id/${localStorage.getItem("idActualUser")}`);
      const usersIDData = await usersIDResponse.json();
      setAdmin(usersIDData[0].admin);
    }

    fetchData();
  }, []);

  const setIdUser = () => {
    localStorage.setItem(
      "idTargetUser",
      localStorage.getItem("idActualUser") + ""
    );
    window.location.href = "/profile";
  };

  const signOut = () => {
    localStorage.setItem("idActualUser","0");
    localStorage.setItem("isAdmin", "0");
    window.location.href = "/";
  };

  if(window.innerWidth > 500){
    return (
      <div className="flex flex-col justify-between h-screen w-16 border-e bg-dark-blue fixed z-10">
        <div>
          <div className="inline-flex h-16 w-16 items-center justify-center">
            <a
              onClick={setIdUser}
              className="t group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
            >
              <span className="grid w-7 place-content-center rounded-lg">L</span>
              <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
                Profil
              </span>
            </a>
          </div>
  
          <div className="border-t border-white">
            <div className="px-2">
              <div className="py-4">
                <a
                  href="/home"
                  className="t group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
                >
                  <AiOutlineHome />
                  <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
                    Accueil
                  </span>
                </a>
              </div>
  
              <ul className="space-y-1 border-t border-white pt-4">
                <li>
                  <a
                    href="/users"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
                  >
                    <TbUserSearch />
                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
                      Recherche d&apos;utilisateurs
                    </span>
                  </a>
                </li>
  
                <li>
                  <a
                    href="/groups"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
                  >
                    <HiOutlineUserGroup />
                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
                      Groupes
                    </span>
                  </a>
                </li>
  
                <li>
                  <a
                    href="/recommendation"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
                  >
                    <FaHandshake />
                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
                      Recommandations
                    </span>
                  </a>
                </li>
  
                <li>
                  <a
                    href="/forum"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
                  >
                    <MdOutlineForum />
                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
                      Forum
                    </span>
                  </a>
                </li>

                {admin == "1" ? (
                  <li>
                  <a
                    href="/accounts"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
                  >
                    <MdAdminPanelSettings />
                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
                      Comptes Admin
                    </span>
                  </a>
                </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
  
        <div className="sticky inset-x-0 bottom-0 border-t border-white bg-dark-blue p-2">
          <form action="/logout">
            <a
              onClick={signOut}
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-white hover:bg-white hover:text-light-blue"
            >
              <HiOutlineLogout />
              <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
                Déconnexion
              </span>
            </a>
          </form>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="flex flex-col justify-between fixed bottom-0 left-0 h-15 w-full bg-dark-blue z-10">
        <div className="flex justify-between items-center px-2">
          <div className="flex justify-start items-center">
            <a
              onClick={setIdUser}
              className="t group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue border-r-2"
            >
              <span className="grid w-7 place-content-center rounded-lg">L</span>
            </a>
    
            <a
              href="/home"
              className="t group relative flex justify-center rounded px-3 py-1.5 text-white hover:bg-white hover:text-light-blue border-r-2"
            >
              <AiOutlineHome />
            </a>
    
            <a
              href="/users"
              className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
            >
              <TbUserSearch />
            </a>
    
            <a
              href=""
              className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
            >
              <HiOutlineUserGroup />
            </a>
    
            <a
              href="/recommendation"
              className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
            >
              <FaHandshake />
            </a>
    
            <a
              href="/forum"
              className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
            >
              <MdOutlineForum />
            </a>

            {admin == "1" ? (
              <a
                href="/accounts"
                className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue">
                <MdAdminPanelSettings />
              </a>
            ):null}
          </div>
    
          <div>
            <form action="/logout">
              <a
                onClick={signOut}
                className="group relative flex justify-center items-center rounded-lg px-2 py-1.5 text-sm text-white hover:bg-white hover:text-light-blue"
              >
                <HiOutlineLogout />
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
