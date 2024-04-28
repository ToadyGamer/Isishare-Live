-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : sam. 03 fév. 2024 à 11:52
-- Version du serveur : 10.10.2-MariaDB
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `isishare_bdd`
--

-- --------------------------------------------------------

--
-- Structure de la table `connaissances`
--

DROP TABLE IF EXISTS `connaissances`;
CREATE TABLE IF NOT EXISTS `connaissances` (
  `idConnaissance` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `interet` int(11) NOT NULL,
  `descriptionConnaissance` varchar(255) NOT NULL,
  PRIMARY KEY (`idConnaissance`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `connaissances`
--

INSERT INTO `connaissances` (`idConnaissance`, `user`, `interet`, `descriptionConnaissance`) VALUES
(1, 1, 3, 'Je sais faire un \"hello world\"');

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts` (
  `idContact` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `informationContact` varchar(255) NOT NULL,
  `source` int(11) NOT NULL,
  PRIMARY KEY (`idContact`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`idContact`, `user`, `informationContact`, `source`) VALUES
(1, 1, 'Bob#1234', 1);

-- --------------------------------------------------------

--
-- Structure de la table `groupes`
--

DROP TABLE IF EXISTS `groupes`;
CREATE TABLE IF NOT EXISTS `groupes` (
  `idGroupe` int(11) NOT NULL AUTO_INCREMENT,
  `libelleGroupe` varchar(100) NOT NULL,
  `interet` int(11) NOT NULL,
  PRIMARY KEY (`idGroupe`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `groupes`
--

INSERT INTO `groupes` (`idGroupe`, `libelleGroupe`, `interet`) VALUES
(1, 'Les tuches', 3);

-- --------------------------------------------------------

--
-- Structure de la table `interets`
--

DROP TABLE IF EXISTS `interets`;
CREATE TABLE IF NOT EXISTS `interets` (
  `idInteret` int(11) NOT NULL AUTO_INCREMENT,
  `libelleInteret` varchar(255) NOT NULL,
  `iconInteret` varchar(255) NOT NULL,
  PRIMARY KEY (`idInteret`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `interets`
--

INSERT INTO `interets` (`idInteret`, `libelleInteret`, `iconInteret`) VALUES
(1, 'Autre', ''),
(2, 'C#', 'https://static-00.iconduck.com/assets.00/c-sharp-c-icon-1822x2048-wuf3ijab.png'),
(3, 'Python', 'https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png');

-- --------------------------------------------------------

--
-- Structure de la table `objectifs`
--

DROP TABLE IF EXISTS `objectifs`;
CREATE TABLE IF NOT EXISTS `objectifs` (
  `idObjectif` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `interet` int(11) NOT NULL,
  `descriptionObjectif` varchar(255) NOT NULL,
  PRIMARY KEY (`idObjectif`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `objectifs`
--

INSERT INTO `objectifs` (`idObjectif`, `user`, `interet`, `descriptionObjectif`) VALUES
(1, 1, 2, 'Je veux apprendre à faire un jeu');

-- --------------------------------------------------------

--
-- Structure de la table `sources`
--

DROP TABLE IF EXISTS `sources`;
CREATE TABLE IF NOT EXISTS `sources` (
  `idSource` int(11) NOT NULL AUTO_INCREMENT,
  `libelleSource` varchar(255) NOT NULL,
  `iconSource` varchar(255) NOT NULL,
  PRIMARY KEY (`idSource`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `sources`
--

INSERT INTO `sources` (`idSource`, `libelleSource`, `iconSource`) VALUES
(1, 'Discord', 'https://logowik.com/content/uploads/images/discord-icon9600.logowik.com.webp');

-- --------------------------------------------------------

--
-- Structure de la table `useringroupe`
--

DROP TABLE IF EXISTS `useringroupe`;
CREATE TABLE IF NOT EXISTS `useringroupe` (
  `idUserInGroupe` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `groupe` int(11) NOT NULL,
  PRIMARY KEY (`idUserInGroupe`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `useringroupe`
--

INSERT INTO `useringroupe` (`idUserInGroupe`, `user`, `groupe`) VALUES
(1, 1, 1),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `idMicrosoftUser` int(11) NOT NULL,
  `nameUser` varchar(255) NOT NULL,
  `notationUser` float NOT NULL,
  `pointsUser` float NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `idMicrosoftUser`, `nameUser`, `notationUser`, `pointsUser`) VALUES
(1, 0, 'Bob', 3, 4),
(2, 1111111, 'Billy', 2, 5);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
