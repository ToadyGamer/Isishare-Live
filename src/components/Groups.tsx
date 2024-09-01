"use client";
import React, { useState, useEffect } from "react";
import { LuFilter, LuKanbanSquare } from "react-icons/lu";
import { TbListTree } from "react-icons/tb";
import Image from "next/image";
import { HiMiniUserGroup } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Groups = () => {
  interface GroupInfo {
    id: string;
    name: string;
    interest: string;
  }

  interface InterestInfo {
    id: string;
    name: string;
    icon: string;
  }

  interface User_groupInfo {
    group_id: string;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<GroupInfo[]>([]);
  const [user_group, setUser_group] = useState<User_groupInfo[]>([]);
  const [interests, setInterests] = useState<InterestInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("kanban");
  const [sortDirectionNom, setSortDirectionNom] = useState("desc");
  const [popupFilters, setPopupFilters] = useState(false);
  const [popupCreateGroup, setPopupCreateGroup] = useState(false);
  const [selectedGoalFilters, setSelectedGoalFilters] = useState<string[]>([]);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [groupName, setGroupName] = useState("");

  // Recupere les datas via l'api
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les groups
        const groupsResponse = await fetch(
          `${localStorage.getItem("api")}groups`
        );
        const groupsData = await groupsResponse.json();
        const sortedGroups = groupsData.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
        setGroups(sortedGroups);

        // Récupérer les intérêts
        const interestsResponse = await fetch(
          `${localStorage.getItem("api")}interests`
        );
        const interestsData = await interestsResponse.json();
        setInterests(interestsData);

        // Récupérer les user_group
        const user_groupResponse = await fetch(
          `${localStorage.getItem("api")}user_group`
        );
        const user_groupData = await user_groupResponse.json();
        setUser_group(user_groupData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getInterestIcon = (interestId: any) => {
    const interest = interests.find((i) => i.id === interestId);
    return interest ? interest.icon : "";
  };

  const getMemberCount = (groupId: any) => {
    return user_group.filter((userGroup) => userGroup.group_id === groupId)
      .length;
  };

  // Fonction pour trier les utilisateurs par nom
  const sortGroupsByName = () => {
    const sortedGroups = [...groups].sort((a, b) => {
      if (sortDirectionNom === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setGroups(sortedGroups);
    // Inverser la direction du tri
    setSortDirectionNom(sortDirectionNom === "asc" ? "desc" : "asc");
  };

  // Filtrer les groupes par objectifs sélectionnés et par nom
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGoalFilters.length === 0 ||
        selectedGoalFilters.includes(group.interest))
  );

  //Fonction pour gérer la sélection des filtres d'objectifs
  const handleGoalFilterSelection = (filter: string) => {
    if (selectedGoalFilters.includes(filter)) {
      setSelectedGoalFilters(
        selectedGoalFilters.filter((item) => item !== filter)
      );
    } else {
      setSelectedGoalFilters([...selectedGoalFilters, filter]);
    }
  };

  // Ouvre la popup
  const togglePopupFilters = () => {
    setPopupFilters(!popupFilters);
  };
  const togglePopupCreateGroup = () => {
    setPopupCreateGroup(!popupCreateGroup);
  };

  //Ferme la popup des filtres
  const closePopupFilters = () => {
    setPopupFilters(false);
  };

  const closePopupCreateGroup = () => {
    setPopupCreateGroup(false);
  };

  const handleInterestClick = (interest: any) => {
    setSelectedInterest(interest.id); // Mise à jour de l'état avec l'intérêt sélectionné
  };

  // Fonction pour rediriger vers une page spécifique lorsqu'une ligne est cliquée
  const setIdGroup = (groupsId: string) => {
    localStorage.setItem("idTargetGroup", groupsId);
    window.location.href = "/usersGroup";
  };

  const generateGroup = async () => {
    // Crée le groupe si le nom du groupe est fourni
    const createResponse = await fetch(
      `${localStorage.getItem(
        "api"
      )}groups/insert/name,interest/"${groupName}","${selectedInterest}"`
    );

    if (!createResponse.ok) {
      throw new Error("Network response was not ok during group creation");
    }
  };
  const CreateGroup = async () => {
    try {
      if (groupName && selectedInterest) {
        await generateGroup();

        const getGroupResponse = await fetch(
          `${localStorage.getItem("api")}groups`
        );

        // Extraire les groupes en tant que JSON
        const groups = await getGroupResponse.json();

        // Filtrer les groupes pour trouver celui qui a le nom spécifié
        const group = groups.find((g: any) => g.name === groupName);

        // Étape 3 : Associer l'utilisateur au groupe
        const userId = localStorage.getItem("idActualUser");
        const userGroup = await fetch(
          `${localStorage.getItem(
            "api"
          )}user_group/insert/user_id,group_id/"${userId}","${group.id}"`
        );
        toast.success("Le groupe a bien été créé !");
        closePopupCreateGroup();
        window.location.reload();
      } else {
        toast.error(
          "Le nom et l'intérêt du groupe sont requis. Veuillez les renseigner."
        );
      }
    } catch (error) {
      console.error("Error creating group or adding user to group:", error);
    }
  };

  const groupsGroup1 = filteredGroups.filter(
    (groups, index) => index % 3 === 0
  );
  const groupsGroup2 = filteredGroups.filter(
    (groups, index) => index % 3 === 1
  );
  const groupsGroup3 = filteredGroups.filter(
    (groups, index) => index % 3 === 2
  );

  return (
    <section className="container px-4">
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

      <div className="ml-14">
        <ToastContainer />
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
            <button
              onClick={togglePopupFilters}
              className="px-4 py-2 bg-dark-blue text-white rounded-md ml-4"
            >
              <LuFilter />
            </button>
          </div>
          {/* Conteneur pour les boutons de changement de vue */}
          <div className="flex items-center">
            <button
              onClick={togglePopupCreateGroup}
              className="px-4 py-2 bg-dark-blue text-white rounded-md mr-4"
              title="Permet de créer un groupe"
            >
              <HiMiniUserGroup />
            </button>
            <button
              onClick={() => setView("kanban")}
              className="px-4 py-2 bg-dark-blue text-white rounded-md mr-4"
            >
              <LuKanbanSquare />
            </button>
            <button
              onClick={() => setView("tree")}
              className="px-4 py-2 bg-dark-blue text-white rounded-md mr-8"
            >
              <TbListTree />
            </button>
          </div>
        </div>
        {popupFilters && (
          <div className="fixed inset-0 flex items-center justify-center bg-light-gray-transparent bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-[65vw] h-[40vw] overflow-auto">
              <h2 className="text-xl text-dark-blue font-bold mb-4">Filtres</h2>
              <div>
                <h3 className="text-dark-blue font-bold mb-4">Intérêt</h3>
                <div>
                  {interests
                    .filter((interest) => interest.name !== "Empty")
                    .map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => handleGoalFilterSelection(interest.id)}
                        className={`mr-2 mb-2 px-4 py-2 rounded ${
                          selectedGoalFilters.includes(interest.id)
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
                  onClick={closePopupFilters}
                  className="px-4 py-2 bg-dark-blue text-white rounded-md"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
        {popupCreateGroup && (
          <div className="fixed inset-0 flex items-center justify-center bg-light-gray-transparent bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-[65vw] h-[40vw] overflow-auto">
              <h2 className="text-xl text-dark-blue font-bold mb-4">
                Créer un groupe
              </h2>
              <div>
                <h3 className="text-dark-blue font-bold mb-4">Nom du groupe</h3>
                <div>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Nom du groupe"
                    className="search-input px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-dark-blue font-bold mb-4 mt-4">
                  Objectifs
                </h3>
                <div>
                  {interests
                    .filter((interest) => interest.name !== "Empty")
                    .map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => handleInterestClick(interest)}
                        className={`mr-2 mb-2 px-4 py-2 rounded ${
                          selectedInterest === interest.id
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
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => CreateGroup()}
                  className="px-4 py-2 bg-dark-blue text-white rounded-md"
                >
                  Créer
                </button>
                <button
                  onClick={closePopupCreateGroup}
                  className="px-4 py-2 bg-dark-blue text-white rounded-md"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
      {view === "tree" ? ( // view tree
        <div className="flex flex-col mt-6 ml-14">
          <div className="-mx-4 -my-2 overflow-x-auto">
            <div className="inline-block py-2 align-middle px-7 w-full">
              <div className="overflow-x-auto border border-dark-gray md:rounded-lg">
                <table className="min-w-full divide-y divide-dark-gray td-width">
                  <thead className="bg-black">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white w-1/6"
                      >
                        <div className="flex items-center gap-x-3">
                          <span
                            className="cursor-pointer"
                            onClick={sortGroupsByName}
                          >
                            Nom
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white w-1/6"
                        title="Indication du nombre de membres que contient le groupe."
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Membre</span>

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
                        title="Cette colonne vise à mettre en lumière le langage utilisé par le groupe."
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Intérêt</span>

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
                    {filteredGroups.map((group, index) => (
                      <tr
                        key={index}
                        className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300"
                        onClick={() => setIdGroup(group.id)}
                      >
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          {group.name}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap flex">
                          {getMemberCount(group.id)}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div key={group.id} className="flex justify-center">
                            <a href="#" role="link">
                              <Image
                                src={"/" + getInterestIcon(group.interest)}
                                alt="Icone de l'intérêt"
                                className="small-icon-tree"
                                width={200}
                                height={200}
                              />
                            </a>
                          </div>
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
        <>
          {isLoading ? (
            <div className="parent ml-14">
              <div className="div1">
                {[...Array(3)].map((_, index) => (
                  <div key={index}>
                    <div className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg">
                      <p className="mt-2 text-sm text-gray-600">Nom</p>
                      <div className="flex flex-wrap justify-center mt-2"></div>
                      <div className="flex justify-between mt-6">
                        <div className="flex-1 text-right">
                          <a
                            href="#"
                            className="text-lg font-medium"
                            role="link"
                          >
                            Intérêt : ~
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="div2">
                {[...Array(3)].map((_, index) => (
                  <div key={index}>
                    <div className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg">
                      <p className="mt-2 text-sm text-gray-600">Nom</p>
                      <div className="flex flex-wrap justify-center mt-2"></div>
                      <div className="flex justify-between mt-6">
                        <div className="flex-1 text-right">
                          <a
                            href="#"
                            className="text-lg font-medium"
                            role="link"
                          >
                            Intérêt : ~
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="div3">
                {[...Array(3)].map((_, index) => (
                  <div key={index}>
                    <div className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg">
                      <p className="mt-2 text-sm text-gray-600">Nom</p>
                      <div className="flex flex-wrap justify-center mt-2"></div>
                      <div className="flex justify-between mt-6">
                        <div className="flex-1 text-right">
                          <a
                            href="#"
                            className="text-lg font-medium"
                            role="link"
                          >
                            Intérêt : ~
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="parent ml-14">
              <div className="div1">
                {groupsGroup1.map((group, index) => (
                  <div key={index}>
                    <div
                      className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg"
                      onClick={() => setIdGroup(group.id)}
                    >
                      <h2 className="mt-2 text-xl font-semibold md:mt-0">
                        {group.name}
                      </h2>
                      <div className="flex justify-between mt-6">
                        <div className="flex-1">
                          <a
                            href="#"
                            className="text-lg font-medium"
                            role="link"
                          >
                            Membre : {getMemberCount(group.id)}
                          </a>
                        </div>
                        <div key={group.id} className="flex-1 min-h-7">
                          <a href="#" role="link">
                            <Image
                              src={"/" + getInterestIcon(group.interest)}
                              alt="Icone de l'intérêt"
                              className="small-icon-kanban"
                              width={200}
                              height={200}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="div2">
                {groupsGroup2.map((group, index) => (
                  <div key={index}>
                    <div
                      className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg"
                      onClick={() => setIdGroup(group.id)}
                    >
                      <h2 className="mt-2 text-xl font-semibold md:mt-0">
                        {group.name}
                      </h2>
                      <div className="flex justify-between mt-6">
                        <div className="flex-1">
                          <a
                            href="#"
                            className="text-lg font-medium"
                            role="link"
                          >
                            Membre : {getMemberCount(group.id)}
                          </a>
                        </div>
                        <div key={group.id} className="flex-1 min-h-7">
                          <a href="#" role="link">
                            <Image
                              src={"/" + getInterestIcon(group.interest)}
                              alt="Icone de l'intérêt"
                              className="small-icon-kanban"
                              width={20}
                              height={20}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="div3">
                {groupsGroup3.map((group, index) => (
                  <div key={index}>
                    <div
                      className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg"
                      onClick={() => setIdGroup(group.id)}
                    >
                      <h2 className="mt-2 text-xl font-semibold md:mt-0">
                        {group.name}
                      </h2>
                      <div className="flex justify-between mt-6">
                        <div className="flex-1">
                          <a
                            href="#"
                            className="text-lg font-medium"
                            role="link"
                          >
                            Membre : {getMemberCount(group.id)}
                          </a>
                        </div>
                        <div key={group.id} className="flex-1 min-h-7">
                          <a href="#" role="link">
                            <Image
                              src={"/" + getInterestIcon(group.interest)}
                              alt="Icone de l'intérêt"
                              className="small-icon-kanban"
                              width={20}
                              height={20}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Groups;