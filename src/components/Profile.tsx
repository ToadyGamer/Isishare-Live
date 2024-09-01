"use client";
import React, { useState, useEffect } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Andy() {
  interface SourceInfo {
    id: string;
    icon: string;
    name: string;
    notation: string;
  }

  interface ContactInfo {
    id: string;
    source_id: string;
    information: string;
  }

  interface NotationsInfo {
    user_id_receiver: string;
    user_id_assessor: string;
  }

  interface InterestInfo {
    id: string;
    icon: string;
    name: string;
  }

  interface SkillInfo {
    id: string;
    interest_id: string;
    level: string;
    description: string;
    link: string;
  }
  interface WTLInfo {
    id: string;
    interest_id: string;
    description: string;
  }

  const [wantToLearns, setWantToLearn] = useState<WTLInfo[]>([]);
  const [skills, setSkills] = useState<SkillInfo[]>([]);
  const [interets, setInterets] = useState<InterestInfo[]>([]);
  const [name, setName] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [notation, setNotation] = useState<number>(0);
  const [admin, setAdmin] = useState<string>("0");
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [sources, setSources] = useState<SourceInfo[]>([]);
  const [ownUser, setOwnUser] = useState(false);
  const [notations, setNotations] = useState<NotationsInfo[]>([]);
  const [idActualUser, setIdActualUser] = useState("0");
  const [idTargetUser, setIdTargetUser] = useState("0");
  const [showDeleteContact, setShowDeleteContact] = useState(false);
  const [idContact, setIdContact] = useState<string>("");
  const [showAddContact, setShowAddContact] = useState(false);
  const [source, setSource] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [linkPicture, setLinkPicture] = useState<string>("");

  useEffect(() => {
    setAdmin(localStorage.getItem("isAdmin") + "");

    if (typeof window !== "undefined") {
      const actualUser = localStorage.getItem("idActualUser") || "0";
      const targetUser = localStorage.getItem("idTargetUser") || "0";
      setIdActualUser(actualUser);
      setIdTargetUser(targetUser);

      if (actualUser === targetUser) {
        setOwnUser(true);
      }

      const fetchSkills = fetch(
        `${localStorage.getItem("api")}knowledge/user/${localStorage.getItem(
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
          setSkills(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });

      const fetchInterets = fetch(`${localStorage.getItem("api")}interests`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setInterets(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });

      const fetchUserContact = fetch(
        `${localStorage.getItem("api")}contacts/user/${targetUser}`
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
          console.error("Error fetching contacts:", error);
        });

      const fetchUser = fetch(
        `${localStorage.getItem("api")}users/id/${targetUser}`
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
          setNotation(data[0].notation);
          if (data[0].picture == "")
            setLinkPicture("/male-avatar.jpeg");
          else setLinkPicture(data[0].picture);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      const fetchSources = fetch(`${localStorage.getItem("api")}sources`)
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
          console.error("Error fetching sources:", error);
        });

      const fetchNotations = fetch(`${localStorage.getItem("api")}notations`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setNotations(data);
        })
        .catch((error) => {
          console.error("Error fetching notations:", error);
        });

        const fetchWTL = fetch(`${localStorage.getItem("api")}objectifs/user/${localStorage.getItem("idTargetUser")}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setWantToLearn(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });

        Promise.all([fetchSources, fetchNotations, fetchUser, fetchUserContact, fetchSkills, fetchInterets, fetchWTL]).then(() => {
          console.log("all is loaded");
        });
      }
    }, []);
    
    //#region skills
      //#region DELETE SKILLS
      const [showDeleteSkills, setshowDeleteSkills] = React.useState(false);
      const [idConnaissance, setIdConnaissance] = useState([]);

      const deleteConnaissanceTrigger = (idConnaissance: any) => {
        setshowDeleteSkills(true);
        setIdConnaissance(idConnaissance);
      };
      const deleteConnaissance = () => {
        fetch(`${localStorage.getItem("api")}knowledge/delete/${idConnaissance}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setshowDeleteSkills(false);
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      };
      //#endregion

        //#region ADD SKILLS
        const [showAddSkills, setShowAddSkills] = React.useState(false);
        const [interet, setInteret] = useState<string>();
        const [lvl, setLvl] = useState<string>();
        const [description, setDescription] = useState<string>();
        const [link, setLink] = useState<string>();
      
        const handleInteretChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setInteret(event.target.value);
        };
      
        const handleLvlChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setLvl(event.target.value);
        };
      
        const handleDescriptionChange = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          setDescription(event.target.value);
        };
      
        const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setLink(event.target.value);
        };
      
        const addSkill = () => {
          fetch(
            `${localStorage.getItem(
              "api"
            )}knowledge/insert/user_id,interest_id,description,link,level/"${localStorage.getItem(
              "idTargetUser"
            )}","${interet}","${description}","${link}","${lvl}"`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
            setShowAddSkills(false);
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error fetching users:", error);
            });
        };
        //#endregion
    //#endregion

    //#region contact
          const deleteContactTrigger = (idContact: string) => {
            setShowDeleteContact(true);
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
                setShowDeleteContact(false);
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error deleting contact:", error);
              });
          };
        
          const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setSource(event.target.value);
          };
        
          const handlePseudoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInfo(event.target.value);
          };
        
          const addContact = () => {
            fetch(
              `${localStorage.getItem("api")}contacts/insert/user_id,information,source_id/"${idTargetUser}","${info}","${source}"`
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                setShowAddContact(false);
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error adding contact:", error);
              });
          };
    //#endregion
        
    //#region WTL
  //#region DELETE WTL
  const [showDeleteWTL, setShowDeleteWTL] = React.useState(false);
  const [idWTL, setIdWTL] = useState([]);

  const deleteWTLTrigger = (idWTL: any) => {
    setShowDeleteWTL(true);
    setIdWTL(idWTL);
  };
  const deleteWTL = () => {
    fetch(`${localStorage.getItem("api")}objectifs/delete/${idWTL}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setShowDeleteWTL(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  //#endregion

  //#region ADD WTL
  const [showAddWTL, setShowAddWTL] = React.useState(false);

  const addWTL = () => {
    fetch(`${localStorage.getItem("api")}objectifs/insert/user_id,interest_id,description/"${localStorage.getItem("idTargetUser")}","${interet}","${description}"`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setShowAddWTL(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  //#endregion 
//#endregion

      const changeNote = (value: any) => {
        console.log(notations);
        const alreadyNote = notations.some(notation =>
          notation.user_id_receiver == idTargetUser && notation.user_id_assessor == idActualUser
        );
    
        if (!alreadyNote) {
          fetch(
            `${localStorage.getItem("api")}users/update/${idTargetUser}/notation/${value}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(() => {
              console.log("Notation modifiée !");
            })
            .catch((error) => {
              console.error("Error updating notation:", error);
            });
    
          fetch(`${localStorage.getItem("api")}notations/insert/user_id_receiver,user_id_assessor/"${idTargetUser}","${idActualUser}"`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error inserting notation:", error);
            });
        } else {
          toast.error("Vous avez déjà voté.");
        }
      }

      const fileToBase64 = (file : any) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
      
      const handleFileChange = async (e: any) => {
        const selectedFile = e.target.files[0];
      
        if (!selectedFile) {
          return;
        }
      
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
        if (!validImageTypes.includes(selectedFile.type)) {
          toast.error("Veuillez choisir un fichier dans le bon format : JPEG, PNG, GIF, SVG.");
          return;
        }
      
        try {
          const userId = localStorage.getItem("idActualUser");
          const base64Image = await fileToBase64(selectedFile);
      
          const res = await fetch(`${localStorage.getItem("api")}pictures`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: userId,
              filePath: base64Image  // Assurez-vous que 'filePath' correspond à ce que votre API attend
            }),
          });
      
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
      
          const data = await res.json();
          console.log('Image uploaded successfully:', data.url);
      
          // Rafraîchir la page ou mettre à jour l'état pour refléter les changements
          window.location.reload();
        } catch (error) {
          console.error("Error uploading file or updating profile picture:", error);
        }
      };

    return (
        <>
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row p-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-1/4 lg:mr-6 lg:mb-0 mb-6">
      <div className="relative w-full group">
        <Image
          className="object-cover object-center w-full rounded-full"
          src={linkPicture}
          width={300}
          height={300}
          alt="avatar"
        />
        {idTargetUser == idActualUser && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full">
            <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 opacity-75">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange}/>
            </label>
          </div>
        )}
      </div>
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600">Points : {points}</p>
          {idTargetUser != idActualUser && (
            <div className="flex justify-center w-full">
                <button
                    key={0}
                    onClick={() => changeNote(-1)}
                    className={`mr-3 px-2 py-2 rounded text-white ease-in duration-300 ...`}
                >
                    <BiDislike className="text-red w-10 h-10"/>
                </button>

                <button
                    key={1}
                    onClick={() => changeNote(1)}
                    className={`px-2 py-2 rounded text-white ease-in duration-300 ...`}
                >
                    <BiLike className="text-dark-blue w-10 h-10"/>
                </button>
            </div>
              )}
              {admin == "1" && (
                  <div className="flex justify-center w-full">
                      <h1 className="mx-3 text-lg font-semibold">
                          NOTATION : {notation}
                      </h1>
                  </div>
              )}
        </div>
        <br/>
        <hr/>
        <div className="flex flex-col mt-4">

            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                  {ownUser ? (
                      <button
                          onClick={() => setShowAddContact(true)}
                          className="px-6 py-2 mx-auto tracking-wide text-white  transition-colors duration-300 transform bg-dark-blue  rounded-md hover:bg-light-blue focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                      >
                          Ajouter
                      </button>
                  ) : null}
            </div>

        {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between my-4">
                      <div className="flex items-center">
                          {sources.map((source, indexs) => (
                              <div key={indexs}>
                                  {source.id == contact.source_id ? (
                                      <div className="w-10 h-10">
                                          <Image
                                              className="object-cover w-10 h-10 float-right"
                                              src={"/" + source.icon}
                                              width={100}
                                              height={100}
                                              alt="discord-logo"
                                          />
                                      </div>
                                  ) : null}
                              </div>
                          ))}
                          <h1 className="px-2 text-sm text-black dark:text-white">
                              {contact.information}
                          </h1>
                      </div>
                      {ownUser || admin == "1" ? (
                          <button
                              onClick={() => deleteContactTrigger(contact.id)}
                              className="tracking-wide text-black capitalize transition-scale duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                          >
                              <GoTrash size={30} style={{ color: "red" }} />
                          </button>
                      ) : null}
                  </div>
              ))}
        </div>

        {showAddContact && (
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
                                  className="text-lg font-medium
                                  leading-6 text-gray-800 capitalize dark:text-white"
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
                                              setShowAddContact(false);
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
          )}
        {showDeleteContact && (
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
                                          onClick={() => setShowDeleteContact(false)}
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
        )}

        {showAddSkills && (
          <>
            <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                  <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Ajouter une compétence</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Ajouter une compétence pour étoffer votre profile !</p>
                  <form className="mt-4" action="#">
                    <label className="block mt-3">
                      <select onChange={handleInteretChange} name="interets" id="interets" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">
                        <option value="">Sélectionner un interet</option>
                        {interets.map((interet) => (
                          <option key={interet.id} value={interet.id}>{interet.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block mt-3">
                      <select onChange={handleLvlChange} name="lvl" id="lvl" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">
                        <option value="">Sélectionner votre niveau</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </label>
                    <label className="block mt-3">
                      <input onChange={handleDescriptionChange} type="text" name="description" id="description" placeholder="Description" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </label>
                    <label className="block mt-3">
                      <input onChange={handleLinkChange} type="text" name="lien" id="lien" placeholder="Lien" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </label>
                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                      <button type="button" onClick={() => setShowAddSkills(false)} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">Retour</button>
                      <button type="button" onClick={addSkill} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">Ajouter</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
        {showDeleteSkills && (
          <>
            <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                  <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Suppression d&apos;une compétence</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Êtes vous sure de vouloir supprimer cette compétence ?</p>
                  <form className="mt-4" action="#">
                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                      <button type="button" onClick={() => setshowDeleteSkills(false)} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">Non</button>
                      <button type="button" onClick={deleteConnaissance} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">Oui</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}

        {showAddWTL && (
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
                    Ajouter une WTL
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Ajouter une WTL pour étoffer votre profile !
                  </p>
  
                  <form className="mt-4" action="#">
                    <label className="block mt-3">
                      <select
                        onChange={handleInteretChange}
                        name="interets"
                        id="interets"
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      >
                        <option value="">Sélectionner un interet</option>
                        {interets.map((interet) => (
                          <option key={interet.id} value={interet.id}>
                            {interet.name}
                          </option>
                        ))}
                      </select>
                    </label>
  
                    <label className="block mt-3">
                      <input
                        onChange={handleDescriptionChange}
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      />
                    </label>
  
                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                      <button
                        type="button"
                        onClick={() => setShowAddWTL(false)}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Retour
                      </button>
  
                      <button
                        type="button"
                        onClick={addWTL}
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
        )}
        {showDeleteWTL && (
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
                    Suppression d&apos;un objectif
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Êtes vous sure de vouloir supprimer cet objectif ?
                  </p>
  
                  <form className="mt-4" action="#">
                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                      <button
                        type="button"
                        onClick={() => setShowDeleteWTL(false)}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Non
                      </button>
  
                      <button
                        type="button"
                        onClick={deleteWTL}
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
        )}
        
      </div>
      <div className="flex flex-col w-full lg:w-[calc(100%-4rem)] ">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 overflow-x-auto w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Mes compétences</h2>
            {ownUser ? (
              <button  onClick={() => setShowAddSkills(true)} className="bg-gray-200 py-1 px-3 rounded border bg-dark-blue text-white">Ajouter</button>
            ) : null}
          </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-dark-blue">
                <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-white uppercase tracking-wider">Connaissance</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-white uppercase tracking-wider">Niveau</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-white uppercase tracking-wider">Projet(s)</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-white uppercase tracking-wider">{ownUser || admin ? "Action" : ""}</th>
                    <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
                </thead>     
                    <tbody className="bg-white divide-y divide-gray-200">
                            {skills.map((skill, index) => (
                            <tr key={index}>
                                {interets.map((interest, indexbis) => {
                                if (interest.id === skill.interest_id) {
                                    return (
                                    <td key={indexbis} className="px-6 py-4 whitespace-nowrap">
                                        <Image
                                        className="object-cover w-10 h-10"
                                        src={"/" + interest.icon}
                                        width={100}
                                        height={100}
                                        alt="logo"
                                        />
                                    </td>
                                    );
                                }
                                return null;
                                })}
                                <td className="px-6 py-4 whitespace-nowrap">{skill.level}/5</td>
                                <td className="px-6 py-4">{skill.description}</td>
                                <td className="px-6 py-4">
                                <a href={skill.link} target="_blank" rel="noopener noreferrer">{skill.link}</a>
                                </td>
                                <td className="px-4 py-4 text-sm">
                                    <div className="flex items-center gap-x-6">
                                        {ownUser || admin === "1" ? (
                                        <button
                                            onClick={() => deleteConnaissanceTrigger(skill.id)}
                                            className="flex items-center px-6 py-2 ml-4 tracking-wide text-red capitalize transition-scale duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                                        >
                                            <GoTrash size={30} style={{ color: "red" }} />
                                        </button>
                                        ) : null}
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                
            </table>
        </div>

        {/* Bills Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Envie d&apos;apprendre</h2>
            {ownUser ? (
            <button onClick={() => setShowAddWTL(true)} className="bg-gray-200 py-1 px-3 rounded border bg-dark-blue text-white">Ajouter</button>
            ) : null}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-dark-blue">
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-white uppercase tracking-wider">Connaissance</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-white uppercase tracking-wider">{ownUser || admin ? "Action" : ""}</th>
              </tr>
            </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {wantToLearns.map((wtl, index) => (
                      <tr key={index}>
                        {interets.map((interest, indexbis) => {
                          if (interest.id === wtl.interest_id) {
                            return (
                              <td key={indexbis} className="px-6 py-4 whitespace-nowrap">
                                <Image
                                  className="object-cover w-10 h-10"
                                  src={"/" + interest.icon}
                                  width={100}
                                  height={100}
                                  alt="logo"
                                />
                              </td>
                            );
                          }
                          return null;
                        })}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {wtl.description}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex items-center gap-x-6">
                            {ownUser || admin == "1" ? (
                              <button
                                onClick={() => deleteWTLTrigger(wtl.id)}
                                className="flex items-center px-6 py-2 ml-4 tracking-wide text-red capitalize transition-scale duration-300 transform rounded-md hover:scale-110 focus:outline-none"
                              >
                                <GoTrash size={30} style={{ color: "red" }} />
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
    )
}

