"use client";
import React, { useState, useEffect } from "react";
import { BsSortNumericDown, BsSortNumericUpAlt } from "react-icons/bs";
import { LuFilter, LuKanbanSquare } from "react-icons/lu";
import { TbListTree } from "react-icons/tb";
import Image from "next/image";

const Users = () => {
  interface UserInfo {
    id: string;
    name: string;
    description: string;
    points: string;
    notation: string;
  }

  interface KnowledgInfo {
    user_id: string;
    interest_id: string;
  }

  interface GoalInfo {
    user_id: string;
    interest_id: string;
  }

  interface InterestInfo {
    id: string;
    name: string;
    icon: string;
  }

  const [users, setUsers] = useState<UserInfo[]>([]);
  const [knowledges, setknowledges] = useState<KnowledgInfo[]>([]);
  const [goals, setGoals] = useState<GoalInfo[]>([]);
  const [interests, setInterests] = useState<InterestInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("kanban");
  const [sortDirectionPoints, setSortDirectionPoints] = useState("asc");
  const [sortDirectionNotation, setSortDirectionNotation] = useState("asc");
  const [sortDirectionNom, setSortDirectionNom] = useState("desc");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedGoalFilters, setSelectedGoalFilters] = useState<string[]>([]);


  // Recupere les datas via l'api
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les utilisateurs
        const usersResponse = await fetch(`${localStorage.getItem("api")}users`);
        const usersData = await usersResponse.json();
        const sortedUsers = usersData.sort((a: any, b: any) => a.name.localeCompare(b.name));
        setUsers(sortedUsers);

        // Récupérer les connaissances
        const knowledgeResponse = await fetch(`${localStorage.getItem("api")}knowledge`);
        const knowledgeData = await knowledgeResponse.json();
        setknowledges(knowledgeData);

        // Récupérer les objectifs
        const goalsResponse = await fetch(`${localStorage.getItem("api")}objectifs`);
        const goalsData = await goalsResponse.json();
        setGoals(goalsData);

        // Récupérer les intérêts
        const interestsResponse = await fetch(`${localStorage.getItem("api")}interests`);
        const interestsData = await interestsResponse.json();
        setInterests(interestsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fonction pour trier les utilisateurs par nom
  const sortUsersByName = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortDirectionNom === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setUsers(sortedUsers);
    // Inverser la direction du tri
    setSortDirectionNom(sortDirectionNom === "asc" ? "desc" : "asc");
  };

  // Fonction pour trier la liste des utilisateurs en fonction du score des points
  const sortUsersByPoints = () => {
    const sortedUsers = [...users].sort((a: any, b: any) => {
      if (sortDirectionPoints === "asc") {
        return a.points - b.points;
      } else {
        return b.points - a.points;
      }
    });
    setUsers(sortedUsers);
    setSortDirectionPoints(sortDirectionPoints === "asc" ? "desc" : "asc"); // Inverse la direction du tri
  };

  // Fonction pour trier la liste des utilisateurs en fonction du score de note
  const sortUsersByNotation = () => {
    const sortedUsers = [...users].sort((a: any, b: any) => {
      if (sortDirectionNotation === "asc") {
        return a.notation - b.notation;
      } else {
        return b.notation - a.notation;
      }
    });
    setUsers(sortedUsers);
    setSortDirectionNotation(sortDirectionNotation === "asc" ? "desc" : "asc"); // Inverse la direction du tri
  };

  // Filtrer les utilisateurs par connaissance et objectifs sélectionnée
  const filteredUsers = users.filter((user) => {
    const userKnowledgeIds = knowledges
      .filter((knowledge) => knowledge.user_id === user.id)
      .map((knowledge) => knowledge.interest_id);
    const userGoalIds = goals
      .filter((goal) => goal.user_id === user.id)
      .map((goal) => goal.interest_id);

    const hasSelectedKnowledges = selectedFilters.every((filter) => userKnowledgeIds.includes(filter));
    const hasSelectedGoals = selectedGoalFilters.every((filter) => userGoalIds.includes(filter));

    return hasSelectedKnowledges && hasSelectedGoals;
  }).filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //fonction pour gérer la sélection des filtres d'objectifs
  const handleGoalFilterSelection = (filter: string) => {
    if (selectedGoalFilters.includes(filter)) {
      setSelectedGoalFilters(selectedGoalFilters.filter((item) => item !== filter));
    } else {
      setSelectedGoalFilters([...selectedGoalFilters, filter]);
    }
  };


  const usersGroup1 = filteredUsers.filter((user, index) => index % 3 === 0);
  const usersGroup2 = filteredUsers.filter((user, index) => index % 3 === 1);
  const usersGroup3 = filteredUsers.filter((user, index) => index % 3 === 2);

  // Ouvre la popup
  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };

  // Selection des filtres
  const handleFilterSelection = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  //Ferme la popup des filtres
  const closePopup = () => {
    setPopupOpen(false);
  };

  // Fonction pour rediriger vers une page spécifique lorsqu&apos;une ligne est cliquée
  const setIdUser = (userId: string) => {
    localStorage.setItem("idTargetUser", userId);
    window.location.href = "/profile";
  };

  return (
    
    <section className="container px-4 ml-14 mx-auto w-full">
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
      <div className="flex justify-between items-center mt-2 mb-4">
        <div>
          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-4 search-input"
          />
          {/* Bouton pour ouvrir la popup de filtres */}
          <button
            id="buttontogglePopup"
            onClick={togglePopup}
            className="px-4 py-2 bg-dark-blue text-white rounded-md ml-4"
          >
            <LuFilter />
          </button>
        </div>

        <div>
          {/* Bouton pour afficher la vue Kanban */}
          <button
            onClick={() => setView("kanban")}
            className="px-4 py-2 bg-dark-blue text-white rounded-md mr-4"
          >
            <LuKanbanSquare />
          </button>

          {/* Bouton pour afficher la vue Tree */}
          <button
            onClick={() => setView("tree")}
            className="px-4 py-2 bg-dark-blue text-white rounded-md mr-8"
          >
            <TbListTree />
          </button>

          {popupOpen && (
            <div className="overflow-auto fixed flex items-center justify-center inset-0 bg-light-gray-transparent bg-opacity-50">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-xl text-dark-blue font-bold mb-4">Filtres</h2>
                <div>
                  <h3 className="text-dark-blue font-bold mb-4">Connaissances</h3>
                  <div>
                    {interests
                      .filter((interest) => interest.name !== "Empty")
                      .map((interest) => (
                        <button
                          key={interest.id}
                          onClick={() => handleFilterSelection(interest.id)}
                          className={`mr-2 mb-2 px-4 py-2 rounded ${selectedFilters.includes(interest.id)
                            ? "bg-dark-blue text-white"
                            : "bg-gray-200 text-gray-800"
                            }`}
                        >
                          <Image
                            src={"/" + interest.icon}
                            alt="Icone"
                            width={20}
                            height={20}
                            className="icon"
                          />
                        </button>
                      ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-dark-blue font-bold mb-4">Objectifs</h3>
                  <div>
                    {interests
                      .filter((interest) => interest.name !== "Empty")
                      .map((interest) => (
                        <button
                          key={interest.id}
                          onClick={() => handleGoalFilterSelection(interest.id)}
                          className={`mr-2 mb-2 px-4 py-2 rounded ${selectedGoalFilters.includes(interest.id)
                            ? "bg-dark-blue text-white"
                            : "bg-gray-200 text-gray-800"
                            }`}
                        >
                          <Image
                            src={"/" + interest.icon}
                            alt="Icone"
                            width={20}
                            height={20}
                            className="icon"
                          />
                        </button>
                      ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 bg-dark-blue text-white rounded-md"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {view === "tree" ? ( // view tree
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto">
            <div className="inline-block py-2 align-middle md:px-6 lg:px-8 w-full">
              <div className="overflow-hidden border border-dark-gray md:rounded-lg">
                <table className="max-w-1xl divide-y divide-dark-gray td-width">
                  <thead className="bg-black">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white w-1/6"
                      >
                        <div className="flex items-center gap-x-3">
                          <span
                            className="cursor-pointer"
                            onClick={sortUsersByName}
                          >
                            Nom
                          </span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white w-1/6"
                        title="Cette colonne vise à mettre en lumière les connaissances individuelles de chaque utilisateur. Si les connaissances de certains utilisateurs peuvent, vous aidez dans vos objectifs, n'hésitez pas à le contacter."
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Connaissances</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                          </svg>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white w-1/6"
                        title="Cette colonne vise à mettre en lumière les objectifs individuels de chaque utilisateur. Si vous partagez un objectif similaire, je vous encourage à vous entraider. Si vous possédez les compétences nécessaires, n'hésitez pas à contacter la personne pour l'assister dans la réalisation de son objectif."
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Objectifs</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                          </svg>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white w-2/12"
                        title="Plus l'utilisateur participe dans les forums et plus elle appartiens à de nombreux groupes, plus la personne aura de points."
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={sortUsersByPoints}
                        >
                          <span>Points</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                          </svg>
                          {sortDirectionPoints === "desc" ? (
                            <BsSortNumericDown />
                          ) : (
                            <BsSortNumericUpAlt />
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white w-2/12"
                        title="Elle correspond à la valeur moyenne de notes sur 5 fournis pas les autres utilisateurs."
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={sortUsersByNotation}
                        >
                          <span>Notation</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                          </svg>
                          {sortDirectionNotation === "desc" ? (
                            <BsSortNumericDown />
                          ) : (
                            <BsSortNumericUpAlt />
                          )}
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white w-1/6"
                        title="Voici les groupes auxquels l'utilisateur appartient."
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Groups</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                          </svg>
                        </button>
                      </th>
                      <th className="bg-dark-blue"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-gray bg-white text-black ">
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={index}
                        className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300"
                        onClick={() => setIdUser(user.id)}
                      >
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-4 py-4 text-sm   whitespace-nowrap justify-center">
                          <div className="flex justify-center">
                            {knowledges
                              .filter(
                                (knowledge) => knowledge.user_id === user.id
                              )
                              .reduce((uniqueInterests, knowledge) => {
                                interests.forEach((interest) => {
                                  if (
                                    knowledge.interest_id === interest.id &&
                                    !uniqueInterests.includes(
                                      interest.id as never
                                    )
                                  ) {
                                    uniqueInterests.push(interest.id as never);
                                  }
                                });
                                return uniqueInterests;
                              }, [])
                              .map((uniqueInterestId) => (
                                <div key={uniqueInterestId} className="mx-2">
                                  <Image
                                    className="object-cover w-10 h-10"
                                    width={300}
                                    height={300}
                                    src={"/" +
                                      interests.find(
                                        (interest) =>
                                          interest.id === uniqueInterestId
                                      )?.icon || "Logo/Empty.png"
                                    }
                                    alt="logo"
                                  />
                                </div>
                              ))}
                            {/* Si aucun logo de connaissance n'est trouvé, affichez le logo correspondant à empty */}
                            {knowledges.filter(
                              (knowledge) => knowledge.user_id === user.id
                            ).length === 0 && (
                                <div className="mx-2">
                                  <Image
                                    className="object-cover w-10 h-10"
                                    width={300}
                                    height={300}
                                    src="/Logo/Empty.png"
                                    alt="logo"
                                  />
                                </div>
                              )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex justify-center">
                            {goals
                              .filter(
                                (goal) => goal.user_id === user.id
                              )
                              .reduce((uniqueInterests, goal) => {
                                interests.forEach((interest) => {
                                  if (
                                    goal.interest_id === interest.id &&
                                    !uniqueInterests.includes(
                                      interest.id as never
                                    )
                                  ) {
                                    uniqueInterests.push(interest.id as never);
                                  }
                                });
                                return uniqueInterests;
                              }, [])
                              .map((uniqueInterestId) => (
                                <div key={uniqueInterestId} className="mx-2">
                                  <Image
                                    className="object-cover w-10 h-10"
                                    width={300}
                                    height={300}
                                    src={"/" +
                                      interests.find(
                                        (interest) =>
                                          interest.id === uniqueInterestId
                                      )?.icon || "Logo/Empty.png"
                                    }
                                    alt="logo"
                                  />
                                </div>
                              ))}
                            {goals.filter(
                              (goal) => goal.user_id === user.id
                            ).length === 0 && (
                                <div className="mx-2">
                                  <Image
                                    className="object-cover w-10 h-10"
                                    width={300}
                                    height={300}
                                    src={"/Logo/Empty.png"
                                    }
                                    alt="logo"
                                  />
                                </div>
                              )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm   whitespace-nowrap">
                          {user.points}
                        </td>
                        <td className="px-4 py-4 text-sm   whitespace-nowrap">
                          {user.notation}
                        </td>
                        <td className="px-4 py-4 text-sm   whitespace-nowrap">
                          {user.name}
                        </td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // view kanban
        <div className="parent">
          <div className="div1">
            {usersGroup1.map((user, index) => (
              <div key={index}>
                <div
                  className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg"
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

                  <p className="mt-2 text-sm text-gray-600">
                    Connaissances :
                  </p>
                  <div className="flex flex-wrap justify-center mt-2">
                    {knowledges
                      .filter(
                        (knowledge) => knowledge.user_id === user.id
                      )
                      .reduce((uniqueInterests, knowledge) => {
                        interests.forEach((interest) => {
                          if (
                            knowledge.interest_id === interest.id &&
                            !uniqueInterests.includes(
                              interest.id as never
                            )
                          ) {
                            uniqueInterests.push(interest.id as never);
                          }
                        });
                        return uniqueInterests;
                      }, [])
                      .map((uniqueInterestId) => (
                        <div key={uniqueInterestId} className="mx-2">
                          <Image
                            className="object-cover w-10 h-10"
                            width={300}
                            height={300}
                            src={"/" +
                              interests.find(
                                (interest) =>
                                  interest.id === uniqueInterestId
                              )?.icon || "Logo/Empty.png"
                            }
                            alt="logo"
                          />
                        </div>
                      ))}
                    {/* Si aucun logo de connaissance n'est trouvé, affichez le logo correspondant à empty */}
                    {knowledges.filter(
                      (knowledge) => knowledge.user_id === user.id
                    ).length === 0 && (
                        <div className="mx-2">
                          <Image
                            className="object-cover w-10 h-10"
                            width={300}
                            height={300}
                            src={"/Logo/Empty.png"
                            }
                            alt="logo"
                          />
                        </div>
                      )}
                  </div>

                  <div className="flex justify-end mt-4">
                    <a href="#" className="text-lg font-medium" role="link">
                      Points : {user.points}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="div2">
            {usersGroup2.map((user, index) => (
              <div key={index}>
                <div
                  className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg"
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

                  <p className="mt-2 text-sm text-gray-600">
                    Connaissances :
                  </p>
                  <div className="flex flex-wrap justify-center mt-2">
                    {knowledges
                      .filter(
                        (knowledge) => knowledge.user_id === user.id
                      )
                      .reduce((uniqueInterests, knowledge) => {
                        interests.forEach((interest) => {
                          if (
                            knowledge.interest_id === interest.id &&
                            !uniqueInterests.includes(
                              interest.id as never
                            )
                          ) {
                            uniqueInterests.push(interest.id as never);
                          }
                        });
                        return uniqueInterests;
                      }, [])
                      .map((uniqueInterestId) => (
                        <div key={uniqueInterestId} className="mx-2">
                          <Image
                            className="object-cover w-10 h-10"
                            width={300}
                            height={300}
                            src={"/" +
                              interests.find(
                                (interest) =>
                                  interest.id === uniqueInterestId
                              )?.icon || "Logo/Empty.png"
                            }
                            alt="logo"
                          />
                        </div>
                      ))}
                    {/* Si aucun logo de connaissance n'est trouvé, affichez le logo correspondant à empty */}
                    {knowledges.filter(
                      (knowledge) => knowledge.user_id === user.id
                    ).length === 0 && (
                        <div className="mx-2">
                          <Image
                            className="object-cover w-10 h-10"
                            width={300}
                            height={300}
                            src={"/Logo/Empty.png"
                            }
                            alt="logo"
                          />
                        </div>
                      )}
                  </div>

                  <div className="flex justify-end mt-4">
                    <a href="#" className="text-lg font-medium" role="link">
                      Points : {user.points}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="div3">
            {usersGroup3.map((user, index) => (
              <div key={index}>
                <div
                  className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg"
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

                  <p className="mt-2 text-sm text-gray-600">
                    Connaissances :
                  </p>
                  <div className="flex flex-wrap justify-center mt-2">
                    {knowledges
                      .filter(
                        (knowledge) => knowledge.user_id === user.id
                      )
                      .reduce((uniqueInterests, knowledge) => {
                        interests.forEach((interest) => {
                          if (
                            knowledge.interest_id === interest.id &&
                            !uniqueInterests.includes(
                              interest.id as never
                            )
                          ) {
                            uniqueInterests.push(interest.id as never);
                          }
                        });
                        return uniqueInterests;
                      }, [])
                      .map((uniqueInterestId) => (
                        <div key={uniqueInterestId} className="mx-2">
                          <Image
                            className="object-cover w-10 h-10"
                            width={300}
                            height={300}
                            src={"/" +
                              interests.find(
                                (interest) =>
                                  interest.id === uniqueInterestId
                              )?.icon || "Logo/Empty.png"
                            }
                            alt="logo"
                          />
                        </div>
                      ))}
                    {/* Si aucun logo de connaissance n'est trouvé, affichez le logo correspondant à empty */}
                    {knowledges.filter(
                      (knowledge) => knowledge.user_id === user.id
                    ).length === 0 && (
                        <div className="mx-2">
                          <Image
                            className="object-cover w-10 h-10"
                            width={300}
                            height={300}
                            src={"/Logo/Empty.png"
                            }
                            alt="logo"
                          />
                        </div>
                      )}
                  </div>

                  <div className="flex justify-end mt-4">
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
    </section>
  );
};

export default Users;
