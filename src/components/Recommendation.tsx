"use client";
import React, { useState, useEffect } from "react";
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

  interface InterestInfo {
    id: string;
    icon: string;
  }

  interface ObjectifsInfo {
    user_id: string;
    interest_id: string;
  }

  const [users, setUsers] = useState<UserInfo[]>([]);
  const [knowledges, setKnowledges] = useState<KnowledgInfo[]>([]);
  const [interests, setInterests] = useState<InterestInfo[]>([]);
  const [objectifs, setObjectifs] = useState<ObjectifsInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("kanban");

  const [myKnowledges, setMyKnowledges] = useState<KnowledgInfo[]>([]);
  const [myObjectifs, setMyObjectifs] = useState<ObjectifsInfo[]>([]);

  // Récupération des données via l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch(`${localStorage.getItem("api")}users`);
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const knowledgeResponse = await fetch(`${localStorage.getItem("api")}knowledge`);
        const knowledgeData = await knowledgeResponse.json();
        setKnowledges(knowledgeData);

        const interestsResponse = await fetch(`${localStorage.getItem("api")}interests`);
        const interestsData = await interestsResponse.json();
        setInterests(interestsData);

        const objectifResponse = await fetch(`${localStorage.getItem("api")}objectifs`);
        const objectifData = await objectifResponse.json();
        setObjectifs(objectifData);

        const myKnowledgeResponse = await fetch(`${localStorage.getItem("api")}knowledge/user/${localStorage.getItem("idActualUser")}`);
        const myKnowledgeData = await myKnowledgeResponse.json();
        setMyKnowledges(myKnowledgeData);

        const myObjectifResponse = await fetch(`${localStorage.getItem("api")}objectifs/user/${localStorage.getItem("idActualUser")}`);
        const myObjectifData = await myObjectifResponse.json();
        setMyObjectifs(myObjectifData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fonction pour filtrer les utilisateurs qui complètent mes connaissances
  const getUsersWhoCompleteMyKnowledges = () => {
    const myKnowledgeInterestIds = new Set(myKnowledges.map(knowledge => knowledge.interest_id));

    const completingUsers = users.filter(user => {
      return objectifs.some(objectif => 
        objectif.user_id === user.id && localStorage.getItem("idActualUser") != user.id && myKnowledgeInterestIds.has(objectif.interest_id)
      );
    });

    return completingUsers;
  };

  // Fonction pour filtrer les utilisateurs qui complètent mes objectifs
  const getUsersWhoCompleteMyObjectifs = () => {
    const myObjectifInterestIds = new Set(myObjectifs.map(objectif => objectif.interest_id));

    const completingUsers = users.filter(user => {
      return knowledges.some(knowledge => 
        knowledge.user_id === user.id && localStorage.getItem("idActualUser") != user.id && myObjectifInterestIds.has(knowledge.interest_id)
      );
    });

    return completingUsers;
  };

  const usersGroup1 = getUsersWhoCompleteMyKnowledges();
  const usersGroup2 = getUsersWhoCompleteMyObjectifs();

  // Fonction pour rediriger vers une page spécifique lorsqu&apos;une ligne est cliquée
  const setIdUser = (userId: string) => {
    localStorage.setItem("idTargetUser", userId);
    window.location.href = "/profile";
  };

  return (
    <section className="container px-4 mx-auto ml-14 w-auto">
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
    <div className="parentRecom">
      <div className="div1Recom">
        <h1 className="text-center text-6xl font-bold my-14 h-26" id="title">Les Apprentis Curieux</h1>
        <h2 className="text-center">Personnes qui veulent apprendre par rapport à vos connaissances.</h2>
        {usersGroup1.map((user, index) => (
          <div key={index}>
            <div
              className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg"
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

              <p className="mt-2 text-sm text-gray-600">Connaissances :</p>
              <div className="flex flex-wrap justify-center mt-2">
                {knowledges
                  .filter((knowledge) => knowledge.user_id === user.id)
                  .map((knowledge, index) => (
                    <div key={index} className="mx-2">
                      <Image
                        className="object-cover w-10 h-10"
                        width={300}
                        height={300}
                        src=
                        {"/" + 
                          interests.find(
                            (interest) => interest.id === knowledge.interest_id
                          )?.icon || "/Logo/Other.svg"
                        }
                        alt="logo"
                      />
                    </div>
                  ))}
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

              <p className="mt-2 text-sm text-gray-600">Envie d&apos;apprendre :</p>
              <div className="flex flex-wrap justify-center mt-2">
                {objectifs
                  .filter((objectif) => objectif.user_id === user.id)
                  .map((objectif, index) => (
                    <div key={index} className="mx-2">
                      <Image
                        className="object-cover w-10 h-10"
                        width={300}
                        height={300}
                        src=
                        {"/" + 
                          interests.find(
                            (interest) => interest.id === objectif.interest_id
                          )?.icon || "/Logo/Other.svg"
                        }
                        alt="logo"
                      />
                    </div>
                  ))}
                  {objectifs.filter(
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

              <div className="flex justify-end mt-4">
                <a href="#" className="text-lg font-medium" role="link">
                  Points : {user.points}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="div2Recom">
      <h1 className="text-center text-6xl font-bold my-14 h-26" id="title">Les Experts du Savoir</h1>
      <h2 className="text-center">Personnes qui ont déjà fais des projets sur ce que vous voulez apprendre.</h2>
        {usersGroup2.map((user, index) => (
          <div key={index}>
            <div
              className="hover:bg-light-blue-transparent hover:text-white cursor-pointer transition duration-300 w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg"
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

              <p className="mt-2 text-sm text-gray-600">Connaissances :</p>
              <div className="flex flex-wrap justify-center mt-2">
                {knowledges
                  .filter((knowledge) => knowledge.user_id === user.id)
                  .map((knowledge, index) => (
                    <div key={index} className="mx-2">
                      <Image
                        className="object-cover w-10 h-10"
                        width={300}
                        height={300}
                        src=
                        {"/" + 
                          interests.find(
                            (interest) => interest.id === knowledge.interest_id
                          )?.icon || "/Logo/Other.svg"
                        }
                        alt="logo"
                      />
                    </div>
                  ))}
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

              <p className="mt-2 text-sm text-gray-600">Envie d&apos;apprendre :</p>
              <div className="flex flex-wrap justify-center mt-2">
                {objectifs
                  .filter((objectif) => objectif.user_id === user.id)
                  .map((objectif, index) => (
                    <div key={index} className="mx-2">
                      <Image
                        className="object-cover w-10 h-10"
                        width={300}
                        height={300}
                        src=
                        {"/" + 
                          interests.find(
                            (interest) => interest.id === objectif.interest_id
                          )?.icon || "/Logo/Other.svg"
                        }
                        alt="logo"
                      />
                    </div>
                  ))}
                  {objectifs.filter(
                          (objectif) => objectif.user_id === user.id
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
  </section>
  );
};

export default Users;
