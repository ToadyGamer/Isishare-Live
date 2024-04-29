"use client";
import React, { useState, useEffect } from "react";
import { GoTrash } from "react-icons/go";
import Image from "next/image";

export default function Profile() {
  interface SourceInfo {
    id: string;
    icon: string;
    name: string;
  }

  interface ContactInfo {
    id: string;
    source_id: string;
    information: string;
  }

  //Inf
  const [name, setName] = useState([]);
  const [points, setPoints] = useState([]);

  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [sources, setSources] = useState<SourceInfo[]>([]);

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
      .then((data) => {
        setContacts(data);
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
        setPoints(data[0].points);
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
      .then((data) => {
        setSources(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  //#region DELETE
  const [showDelete, setShowDelete] = React.useState(false);
  const [idContact, setIdContact] = useState([]);

  const deleteContactTrigger = (idContact: any) => {
    setShowDelete(true);
    setIdContact(idContact);
  };
  const deleteContact = () => {
    fetch(`${localStorage.getItem("api")}contacts/delete/${idContact}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setShowDelete(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  //#endregion

  //#region ADD
  const [showAdd, setShowAdd] = React.useState(false);
  const [source, setSource] = useState<string>();
  const [info, setInfo] = useState<string>();

  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value);
  };

  const handlePseudoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(event.target.value);
  };

  const addContact = () => {
    fetch(
      `${localStorage.getItem(
        "api"
      )}contacts/insert/user_id,information,source_id/"${localStorage.getItem(
        "idTargetUser"
      )}","${info}","${source}"`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setShowAdd(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  //#endregion

  return (
    <div>
      <div className="ml-10 w-1/5 max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 float-right mr-10 mt-[88px]">
        <Image
          className="object-cover object-center w-full h-56"
          src=""
          // https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80
          width={300}
          height={300}
          alt="avatar"
        />
        <div className="flex items-center px-6 py-3 bg-dark-blue">
          <h1 className="mx-3 text-lg font-semibold text-white">
            NOM : {name}
          </h1>
          <br />
          <h1 className="mx-3 text-lg font-semibold text-white">
            POINTS : {points}
          </h1>
        </div>

        <div className="px-6 py-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between my-4">
              <div className="flex items-center">
                {sources.map((source, indexs) => (
                  <div key={indexs}>
                    {source.id == contact.source_id ? (
                      <Image
                        className="object-cover w-10 h-10"
                        src={"/" + source.icon}
                        width={100}
                        height={100}
                        alt="discord-logo"
                      />
                    ) : null}
                  </div>
                ))}
                <h1 className="px-2 text-sm text-black dark:text-white">
                  {contact.information}
                </h1>
              </div>
              {ownUser ? (
                <button
                  onClick={() => deleteContactTrigger(contact.id)}
                  className="flex items-center px-6 py-2 ml-4 tracking-wide text-black capitalize transition-scale duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                >
                  <GoTrash size={30} style={{ color: "red" }} />
                </button>
              ) : null}
            </div>
          ))}
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            {ownUser ? (
              <button
                onClick={() => setShowAdd(true)}
                className="px-6 py-2 mx-auto tracking-wide text-white  transition-colors duration-300 transform bg-dark-blue  rounded-md hover:bg-light-blue focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Ajouter un contact
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {showAdd ? (
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
                  Ajouter un contact
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Ajouter un moyen de contact à votre profile !
                </p>
                <form className="mt-4" action="#">
                  <label className="block mt-3">
                    <select
                      onChange={handleSourceChange}
                      name="sources"
                      id="sources"
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    >
                      <option value="">Sélectionner une source</option>
                      {sources.map((source, index) => (
                        <option key={source.id} value={source.id}>
                          {source.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block mt-3">
                    <input
                      onChange={handlePseudoChange}
                      type="text"
                      name="pseudo"
                      id="pseudo"
                      placeholder="Pseudo"
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                  </label>

                  <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAdd(false);
                      }}
                      className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    >
                      Retour
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        addContact();
                      }}
                      className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showDelete ? (
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
                  Suppression d&apos;un contact
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Êtes vous sure de vouloir supprimer ce contact ?
                </p>

                <form className="mt-4" action="#">
                  <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                    <button
                      type="button"
                      onClick={() => setShowDelete(false)}
                      className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    >
                      Non
                    </button>

                    <button
                      type="button"
                      onClick={deleteContact}
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
    </div>
  );
}
