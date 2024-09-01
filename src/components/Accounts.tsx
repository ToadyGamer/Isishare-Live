"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MdOutlineRemoveModerator,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Accounts = () => {
  interface UserInfo {
    id: string;
    name: string;
    points: string;
    notation: string;
    email: string;
    admin: string;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [popupOpenAdmin, setPopupOpenAdmin] = useState(false);
  const [popupOpenMail, setPopupOpenMail] = useState(false);
  const [popupOpenDelete, setPopupOpenDelete] = useState(false);

  const [isAdminUserModification, setIsAdminUserModification] = useState("");
  const [mailSender, setMailSender] = useState<string>("");
  const [mailText, setMailText] = useState<string>("");
  const [mailReceiver, setMailReceiver] = useState<string>("");
  const [idUserModification, setIdUserModification] = useState("");
  const [nameUserModification, setNameUserModification] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch(
          `${localStorage.getItem("api")}users`
        );
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const usersIDResponse = await fetch(
          `${localStorage.getItem("api")}users/id/${localStorage.getItem(
            "idActualUser"
          )}`
        );
        const usersIDData = await usersIDResponse.json();
        setMailSender(usersIDData[0].email);

        const mailIDResponse = await fetch(
          `${localStorage.getItem("api")}users/id/-1`
        );
        const mailIDData = await mailIDResponse.json();
        localStorage.setItem("mailPassword", mailIDData[0].password);
        localStorage.setItem("mailMail", mailIDData[0].email);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filtrer les utilisateurs par connaissance et objectifs sélectionnée
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const usersGroup1 = filteredUsers.filter((user, index) => index % 2 === 0);
  const usersGroup2 = filteredUsers.filter((user, index) => index % 2 === 1);

  // Fonction pour rediriger vers une page spécifique lorsqu'une ligne est cliquée
  const setIdUser = (userId: string) => {
    localStorage.setItem("idTargetUser", userId);
    window.location.href = "/profile";
  };

  // Ouvre la popup pour les Admins
  const updateUserTrigger = (id: string, value: string, name: string) => {
    setIdUserModification(id);
    setIsAdminUserModification(value);
    setNameUserModification(name);
    setPopupOpenAdmin(!popupOpenAdmin);
  };

  const sendMailUserTrigger = (mail: string, name: string) => {
    setMailReceiver(mail);
    setNameUserModification(name);
    setPopupOpenMail(!popupOpenMail);
  };

  const deleteUserTrigger = (id: string, name: string) => {
    setIdUserModification(id);
    setNameUserModification(name);
    setPopupOpenDelete(!popupOpenDelete);
  };

  const handleMailTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMailText(event.target.value);
  };

  const updateUser = () => {
    fetch(
      `${localStorage.getItem(
        "api"
      )}users/update/${idUserModification}/admin/${isAdminUserModification}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        console.log("Notation modifiée !");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating notation:", error);
      });
  };

  const sendMailUser = async () => {
    // Récupérer les informations de localStorage ici
    const mailMail = localStorage.getItem("mailMail");
    const mailPassword = localStorage.getItem("mailPassword");

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mailMail,
          mailPassword,
          mailReceiver,
          mailText,
        }),
      });

      const data = await response.json();
      console.log(data.message);
      console.log("Response status:", response.status);
      if (response.ok) {
        toast.success("Email sent successfully");
      } else {
        console.log("Erreur ici");
        toast.error("Failed to send email: " + data.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email");
    }
  };

  const delteUser = async () => {
    fetch(`${localStorage.getItem("api")}users/delete/${idUserModification}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        toast.success("L'utilisateur à bien été supprimé !");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  if (window.innerWidth > 500) {
    return (
      <section className="container px-4 mx-auto ml-14 w-auto">
        <ToastContainer />
        <div>
          <br />
          <div className="flex justify-between items-center">
            {/* Conteneur pour la barre de recherche et le bouton de filtre */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Rechercher par nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="parentRecom ml-[5vw] gap-x-[10vw]">
            <div className="div1Recom">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <div className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-center -mt-16 md:justify-end">
                      <Image
                        className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full"
                        alt="Testimonial avatar"
                        src="/male-avatar.jpeg"
                        width={100}
                        height={100}
                      />
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />

                    <div className="flex justify-between mt-4">
                      <a href="#" className="text-lg font-medium" role="link">
                        Notation : ~
                      </a>

                      <a href="#" className="text-lg font-medium" role="link">
                        Points : ~
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="div2Recom">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <div className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-center -mt-16 md:justify-end">
                      <Image
                        className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full"
                        alt="Testimonial avatar"
                        src="/male-avatar.jpeg"
                        width={100}
                        height={100}
                      />
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />

                    <div className="flex justify-between mt-4">
                      <a href="#" className="text-lg font-medium" role="link">
                        Notation : ~
                      </a>

                      <a href="#" className="text-lg font-medium" role="link">
                        Points : ~
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="parentRecom ml-[5vw] gap-x-[10vw]">
            <div className="div1Recom">
              {usersGroup1.map((user, index) => (
                <div key={index}>
                  <div
                    className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg z-10"
                    onClick={() => setIdUser(user.id)}
                  >
                    <div className="flex justify-center -mt-16 md:justify-end">
                      <Image
                        className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full"
                        alt="Testimonial avatar"
                        src="/male-avatar.jpeg"
                        width={100}
                        height={100}
                      />
                    </div>

                    <h2 className="mt-2 text-xl font-semibold md:mt-0">
                      {user.name}
                    </h2>

                    <div className="flex justify-center items-center mt-4 z-20">
                      {user.admin == "0" ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateUserTrigger(user.id, "1", user.name);
                          }}
                          className="hover:bg-light-blue flex items-center px-6 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                        >
                          <MdOutlineAdminPanelSettings
                            size={30}
                            style={{ color: "green" }}
                          />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateUserTrigger(user.id, "-1", user.name);
                          }}
                          className="hover:bg-light-blue flex items-center px-6 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                        >
                          <MdOutlineRemoveModerator
                            size={30}
                            style={{ color: "red" }}
                          />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendMailUserTrigger(user.email, user.name);
                        }}
                        className="hover:bg-light-blue flex items-center px-6 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                      >
                        <IoMailOutline size={30} style={{ color: "blue" }} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUserTrigger(user.id, user.name);
                        }}
                        className="hover:bg-light-blue flex items-center px-6 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                      >
                        <GoTrash size={30} style={{ color: "red" }} />
                      </button>
                    </div>

                    <div className="flex justify-between mt-4">
                      <a href="#" className="text-lg font-medium" role="link">
                        Notation : {user.notation}
                      </a>

                      <a href="#" className="text-lg font-medium" role="link">
                        Points : {user.points}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="div2Recom">
              {usersGroup2.map((user, index) => (
                <div key={index}>
                  <div
                    className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg z-10"
                    onClick={() => setIdUser(user.id)}
                  >
                    <div className="flex justify-center -mt-16 md:justify-end">
                      <Image
                        className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full"
                        alt="Testimonial avatar"
                        src="/male-avatar.jpeg"
                        width={100}
                        height={100}
                      />
                    </div>

                    <h2 className="mt-2 text-xl font-semibold md:mt-0">
                      {user.name}
                    </h2>

                    <div className="flex justify-center items-center mt-4 z-20">
                      {user.admin == "0" ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateUserTrigger(user.id, "1", user.name);
                          }}
                          className="hover:bg-light-blue flex items-center px-6 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                        >
                          <MdOutlineAdminPanelSettings
                            size={30}
                            style={{ color: "green" }}
                          />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateUserTrigger(user.id, "-1", user.name);
                          }}
                          className="hover:bg-light-blue flex items-center px-6 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                        >
                          <MdOutlineRemoveModerator
                            size={30}
                            style={{ color: "red" }}
                          />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendMailUserTrigger(user.email, user.name);
                        }}
                        className="hover:bg-light-blue flex items-center px-6 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                      >
                        <IoMailOutline size={30} style={{ color: "blue" }} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUserTrigger(user.id, user.name);
                        }}
                        className="hover:bg-light-blue flex items-center px-6 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                      >
                        <GoTrash size={30} style={{ color: "red" }} />
                      </button>
                    </div>

                    <div className="flex justify-between mt-4">
                      <a href="#" className="text-lg font-medium" role="link">
                        Notation : {user.notation}
                      </a>

                      <a href="#" className="text-lg font-medium" role="link">
                        Points : {user.points}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <br />
        <br />
        <br />

        {popupOpenAdmin ? (
          <>
            <div
              className="fixed inset-0 z-10 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span
                  className="hidden sm:inline-block sm:h-screen sm:align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                    id="modal-title"
                  >
                    Changer l&apos;autorisation de {nameUserModification}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Êtes vous sur de vouloir modifier ce profil ?
                  </p>
                  <form className="mt-4" action="#">
                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                      <button
                        type="button"
                        onClick={() => {
                          updateUserTrigger("", "", "");
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Non
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          updateUser();
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Oui
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {popupOpenMail ? (
          <>
            <div
              className="fixed inset-0 z-10 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span
                  className="hidden sm:inline-block sm:h-screen sm:align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                    id="modal-title"
                  >
                    Envoyer un mail à {nameUserModification}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Êtes vous sur de vouloir envoyer un mail ?
                  </p>
                  <form className="mt-4" action="#">
                    <label className="block mt-3">
                      <textarea
                        onChange={handleMailTextChange}
                        name="mailText"
                        id="mailText"
                        placeholder="Contenu du mail"
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      />
                    </label>

                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                      <button
                        type="button"
                        onClick={() => {
                          sendMailUserTrigger("", "");
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Retour
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          sendMailUser();
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Envoyer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {popupOpenDelete ? (
          <>
            <div
              className="fixed inset-0 z-10 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span
                  className="hidden sm:inline-block sm:h-screen sm:align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                    id="modal-title"
                  >
                    Suppression du compte de {nameUserModification}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Êtes vous sur de vouloir supprimer ce profil ?
                  </p>
                  <form className="mt-4" action="#">
                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                      <button
                        type="button"
                        onClick={() => {
                          deleteUserTrigger("", "");
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Non
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          delteUser();
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Oui
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </section>
    );
  } else {
    return (
      <section>
        {/* #region blue spots */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-dark-blue to-light-blue opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-dark-blue to-light-blue opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        {/* #endregion */}

        <div className="ml-3">
          <br />
          <div className="flex justify-between items-center">
            {/* Conteneur pour la barre de recherche et le bouton de filtre */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Rechercher par nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="parentRecom flex w-full gap-x-[2vw]">
            <div className="div1Recom flex-grow w-[46vw] ml-[3vw]">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <div className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-center -mt-16 md:justify-end">
                      <Image
                        className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full"
                        alt="Testimonial avatar"
                        src="/male-avatar.jpeg"
                        width={100}
                        height={100}
                      />
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />

                    <div className=" mt-6">
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-base font-medium"
                          role="link"
                        >
                          Notation : ~
                        </a>
                      </div>
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-base font-medium"
                          role="link"
                        >
                          Points : ~
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="div2Recom flex-grow w-[46vw]">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <div className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-center -mt-16 md:justify-end">
                      <Image
                        className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full"
                        alt="Testimonial avatar"
                        src="/male-avatar.jpeg"
                        width={100}
                        height={100}
                      />
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />

                    <div className=" mt-6">
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-base font-medium"
                          role="link"
                        >
                          Notation : ~
                        </a>
                      </div>
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-base font-medium"
                          role="link"
                        >
                          Points : ~
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="parentRecom flex w-full gap-x-[2vw]">
            <div className="div1Recom flex-grow w-[46vw] ml-[3vw]">
              {usersGroup1.map((user, index) => (
                <div key={index}>
                  <div
                    className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg z-10"
                    onClick={() => setIdUser(user.id)}
                  >
                    <div className="flex justify-center -mt-16 md:justify-end">
                      <Image
                        className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full"
                        alt="Testimonial avatar"
                        src="/male-avatar.jpeg"
                        width={100}
                        height={100}
                      />
                    </div>

                    <h2 className="mt-2 text-base font-semibold md:mt-0">
                      {user.name}
                    </h2>

                    <div className="flex justify-center items-center mt-4 z-20">
                      {user.admin == "0" ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateUserTrigger(user.id, "1", user.name);
                          }}
                          className="hover:bg-light-blue flex items-center px-2 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                        >
                          <MdOutlineAdminPanelSettings
                            size={30}
                            style={{ color: "green" }}
                          />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateUserTrigger(user.id, "-1", user.name);
                          }}
                          className="hover:bg-light-blue flex items-center px-2 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                        >
                          <MdOutlineRemoveModerator
                            size={30}
                            style={{ color: "red" }}
                          />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendMailUserTrigger(user.email, user.name);
                        }}
                        className="hover:bg-light-blue flex items-center px-2 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                      >
                        <IoMailOutline size={30} style={{ color: "blue" }} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUserTrigger(user.id, user.name);
                        }}
                        className="hover:bg-light-blue flex items-center px-2 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                      >
                        <GoTrash size={30} style={{ color: "red" }} />
                      </button>
                    </div>

                    <div className=" mt-6">
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-base font-medium"
                          role="link"
                        >
                          Notation : {user.notation}
                        </a>
                      </div>
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-base font-medium"
                          role="link"
                        >
                          Points : {user.points}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="div2Recom flex-grow w-[46vw]">
              {usersGroup2.map((user, index) => (
                <div key={index}>
                  <div
                    className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg z-10"
                    onClick={() => setIdUser(user.id)}
                  >
                    <div className="flex justify-center -mt-16 md:justify-end">
                      <Image
                        className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full"
                        alt="Testimonial avatar"
                        src="/male-avatar.jpeg"
                        width={100}
                        height={100}
                      />
                    </div>

                    <h2 className="mt-2 text-base font-semibold md:mt-0">
                      {user.name}
                    </h2>

                    <div className="flex justify-center items-center mt-4 z-20">
                      {user.admin == "0" ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateUserTrigger(user.id, "1", user.name);
                          }}
                          className="hover:bg-light-blue flex items-center px-2 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                        >
                          <MdOutlineAdminPanelSettings
                            size={30}
                            style={{ color: "green" }}
                          />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateUserTrigger(user.id, "-1", user.name);
                          }}
                          className="hover:bg-light-blue flex items-center px-2 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                        >
                          <MdOutlineRemoveModerator
                            size={30}
                            style={{ color: "red" }}
                          />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendMailUserTrigger(user.email, user.name);
                        }}
                        className="hover:bg-light-blue flex items-center px-2 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                      >
                        <IoMailOutline size={30} style={{ color: "blue" }} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUserTrigger(user.id, user.name);
                        }}
                        className="hover:bg-light-blue flex items-center px-2 py-2 tracking-wide text-black capitalize transition-transform duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                      >
                        <GoTrash size={30} style={{ color: "red" }} />
                      </button>
                    </div>

                    <div className=" mt-6">
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-base font-medium"
                          role="link"
                        >
                          Notation : {user.notation}
                        </a>
                      </div>
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-base font-medium"
                          role="link"
                        >
                          Points : {user.points}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <br />
        <br />
        <br />

        {popupOpenAdmin ? (
          <>
            <div
              className="fixed inset-0 z-10 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span
                  className="hidden sm:inline-block sm:h-screen sm:align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                    id="modal-title"
                  >
                    Changer l&apos;autorisation de {nameUserModification}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Êtes vous sur de vouloir modifier ce profil ?
                  </p>
                  <form className="mt-4" action="#">
                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                      <button
                        type="button"
                        onClick={() => {
                          updateUserTrigger("", "", "");
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Non
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          updateUser();
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Oui
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {popupOpenMail ? (
          <>
            <div
              className="fixed inset-0 z-10 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span
                  className="hidden sm:inline-block sm:h-screen sm:align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                    id="modal-title"
                  >
                    Envoyer un mail à {nameUserModification}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Êtes vous sur de vouloir envoyer un mail ?
                  </p>
                  <form className="mt-4" action="#">
                    <label className="block mt-3">
                      <textarea
                        onChange={handleMailTextChange}
                        name="mailText"
                        id="mailText"
                        placeholder="Contenu du mail"
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      />
                    </label>

                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                      <button
                        type="button"
                        onClick={() => {
                          sendMailUserTrigger("", "");
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Retour
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          sendMailUser();
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Envoyer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {popupOpenDelete ? (
          <>
            <div
              className="fixed inset-0 z-10 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span
                  className="hidden sm:inline-block sm:h-screen sm:align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                    id="modal-title"
                  >
                    Suppression du compte de {nameUserModification}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Êtes vous sur de vouloir supprimer ce profil ?
                  </p>
                  <form className="mt-4" action="#">
                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                      <button
                        type="button"
                        onClick={() => {
                          deleteUserTrigger("", "");
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Non
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          delteUser();
                        }}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Oui
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </section>
    );
  }
};

export default Accounts;