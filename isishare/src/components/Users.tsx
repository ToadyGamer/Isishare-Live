'use client';
import React, { useState, useEffect } from 'react';
import { BsSortNumericDown, BsSortNumericUpAlt } from "react-icons/bs";
import { LuFilter } from "react-icons/lu";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [iconInteret, setIconInteret] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredUsers = users.filter(user =>
        user.nameUser.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [sortDirectionPoints, setSortDirectionPoints] = useState('asc'); // 'asc' pour trier par ordre croissant, 'desc' pour trier par ordre décroissant
    const [sortDirectionNotation, setSortDirectionNotation] = useState('asc');

    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    // Fonction pour trier la liste des utilisateurs en fonction du score des points
    const sortUsersByPoints = () => {
        const sortedUsers = [...users].sort((a, b) => {
            if (sortDirectionPoints === 'asc') {
                return a.pointsUser - b.pointsUser;
            } else {
                return b.pointsUser - a.pointsUser;
            }
        });
        setUsers(sortedUsers);
        setSortDirectionPoints(sortDirectionPoints === 'asc' ? 'desc' : 'asc'); // Inverse la direction du tri
    };

    const sortUsersByNotation = () => {
        const sortedUsers = [...users].sort((a, b) => {
            if (sortDirectionNotation === 'asc') {
                return a.notationUser - b.notationUser;
            } else {
                return b.notationUser - a.notationUser;
            }
        });
        setUsers(sortedUsers);
        setSortDirectionNotation(sortDirectionNotation === 'asc' ? 'desc' : 'asc'); // Inverse la direction du tri
    };

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
        
        fetch('http://localhost:3001/iconInteret')
            .then(response => response.json())
            .then(data => setIconInteret(data))
            .catch(error => console.error('Error fetching iconInteret:', error));
    }, []);

    const togglePopup = () => {
        setPopupOpen(!popupOpen);
    };

    const handleFilterSelection = (filter) => {
        // Logique pour ajouter ou supprimer un filtre de la liste des filtres sélectionnés
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(item => item !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const closePopup = () => {
        setPopupOpen(false);
        // Logique supplémentaire à exécuter après la fermeture de la popup, par exemple, appliquer les filtres sélectionnés
    };

    return (
        <section className="container px-4 mx-auto ml-14">
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
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }} />
            </div>
            {/* #endregion */}
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto">
                    <input
                        type="text"
                        placeholder="Rechercher par nom..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="ml-8 search-input"
                    />
                    <div className="inline-block py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-dark-gray md:rounded-lg table-width">
                            <table className="max-w-1xl divide-y divide-dark-gray td-width">
                                <thead className="bg-black">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white">
                                            <div className="flex items-center gap-x-3">
                                                <span>Name</span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white" title="Cette colonne vise à mettre en lumière les connaissances individuelles de chaque utilisateur. Si les connaissances de certains utilisateurs peuvent, vous aidez dans vos objectifs, n'hésitez pas à le contacter.">
                                            <button className="flex items-center gap-x-2">
                                                <span>Connaissances</span>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                </svg>
                                            </button>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white" title="Cette colonne vise à mettre en lumière les objectifs individuels de chaque utilisateur. Si vous partagez un objectif similaire, je vous encourage à vous entraider. Si vous possédez les compétences nécessaires, n'hésitez pas à contacter la personne pour l'assister dans la réalisation de son objectif.">
                                            <button className="flex items-center gap-x-2">
                                                <span>Objectifs</span>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                </svg>
                                            </button>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white" title="Plus l'utilisateur participe dans les forums et plus elle appartiens à de nombreux groupes, plus la personne aura de points.">
                                            <button className="flex items-center gap-x-2" onClick={sortUsersByPoints}>
                                                <span>Points</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                </svg>
                                                {sortDirectionPoints === 'desc' ? <BsSortNumericDown /> : <BsSortNumericUpAlt />}
                                            </button>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white" title="Elle correspond à la valeur moyenne de notes sur 5 fournis pas les autres utilisateurs.">
                                            <button className="flex items-center gap-x-2" onClick={sortUsersByNotation}>
                                                <span>Notation</span>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                </svg>
                                                {sortDirectionNotation === 'desc' ? <BsSortNumericDown /> : <BsSortNumericUpAlt />}
                                            </button>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white" title="Voici les groupes auxquels l'utilisateur appartient.">
                                            <button className="flex items-center gap-x-2">
                                                <span>Groups</span>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                </svg>
                                            </button>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right bg-dark-blue text-white">
                                            <button className="flex items-center gap-x-2" onClick={togglePopup}>
                                                <LuFilter />
                                            </button>
                                            {popupOpen && (
                                                <div className="absolute top-0 left-0 w-full h-full bg-gray-300 bg-opacity-75 flex justify-center items-center z-10">
                                                    <div className="bg-white text-black p-4 rounded shadow-lg">
                                                        {/* Structure de la popup avec les options de filtre */}
                                                        <h2>Sélectionnez vos filtres</h2>
                                                        <ul>
                                                            <li>
                                                                <label>
                                                                    <input type="checkbox" value="Filtre1" onChange={() => handleFilterSelection('Filtre1')} />
                                                                    Filtre 1
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label>
                                                                    <input type="checkbox" value="Filtre2" onChange={() => handleFilterSelection('Filtre2')} />
                                                                    Filtre 2
                                                                </label>
                                                            </li>
                                                            {/* Ajoutez d'autres options de filtre selon vos besoins */}
                                                        </ul>
                                                        <button onClick={closePopup}>Fermer</button>
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-light-gray bg-white text-black">
                                    {filteredUsers.map(user => (
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <div className="flex items-center gap-x-2">
                                                        <div>
                                                            <h2>{user.nameUser}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                {iconInteret.map(icon => (
                                                    user.interetConnaissance === icon.idInteret ? (
                                                        <img key={icon.idInteret} src={icon.iconInteret} alt="Icon" />
                                                    ) : null
                                                ))}
                                            </td> */}

                                            <td className="px-4 py-4 text-sm   whitespace-nowrap">{user.descriptionConnaissance}</td>
                                            <td className="px-4 py-4 text-sm   whitespace-nowrap">{user.descriptionObjectif}</td>
                                            <td className="px-4 py-4 text-sm   whitespace-nowrap">{user.pointsUser}</td>
                                            <td className="px-4 py-4 text-sm   whitespace-nowrap">{user.notationUser}</td>
                                            <td className="px-4 py-4 text-sm   whitespace-nowrap">{user.libelleGroupe}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}