import { AiOutlineHome } from "react-icons/ai";
import { TbUserSearch } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineForum } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

export default function Sidebar() {
  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-dark-blue fixed">
      <div>
        <div className="inline-flex h-16 w-16 items-center justify-center">
          <a
            href="http://localhost:3000/profile"
            className="t group relative flex justify-center rounded px-2 py-1.5  text-white hover:bg-white hover:text-light-blue"
          >
            <span
              className="grid w-7 place-content-center rounded-lg"
            >
              L
            </span>
            <span
              className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible"
            >
              Profil
            </span>
          </a>
        </div>

        <div className="border-t border-white">
          <div className="px-2">
            <div className="py-4">
              <a
                href=""
                className="t group relative flex justify-center rounded px-2 py-1.5  text-white hover:bg-white hover:text-light-blue"
              >
                <AiOutlineHome />

                <span
                  className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible"
                >
                  Accueil
                </span>
              </a>
            </div>


            <ul className="space-y-1 border-t border-white pt-4">
              <li>
                <a
                  href="http://localhost:3000/users"
                  className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
                >
                  <TbUserSearch />

                  <span
                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible"
                  >
                    Recherche d'utilisateurs
                  </span>
                </a>
              </li>

              <li>
                <a
                  href=""
                  className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
                >
                  <HiOutlineUserGroup />

                  <span
                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible"
                  >
                    Groupes
                  </span>
                </a>
              </li>

              <li>
                <a
                  href=""
                  className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
                >
                  <FaHandshake />

                  <span
                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible"
                  >
                    Recommandations
                  </span>
                </a>
              </li>

              <li>
                <a
                  href=""
                  className="group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-white hover:text-light-blue"
                >
                  <MdOutlineForum />

                  <span
                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible"
                  >
                    Forum
                  </span>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-white bg-dark-blue p-2">
        <form action="/logout">
          <a
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-white hover:bg-white hover:text-light-blue"
              href = 'http://localhost:3000/'
            >
            <HiOutlineLogout />

            <span
              className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-black px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible"
            >
              Déconnexion
            </span>
          </a>
        </form>
      </div>
    </div>
  )
}