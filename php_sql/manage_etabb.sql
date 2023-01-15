-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2022 at 07:39 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `manage_etabb`
--

-- --------------------------------------------------------

--
-- Table structure for table `etudiants`
--

CREATE TABLE `etudiants` (
  `id_et` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `img_et` longblob NOT NULL,
  `id` int(11) DEFAULT NULL,
  `id_grp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `etudiants`
--

INSERT INTO `etudiants` (`id_et`, `nom`, `prenom`, `img_et`, `id`, `id_grp`) VALUES

-- --------------------------------------------------------

--
-- Table structure for table `formateur`
--

CREATE TABLE `formateur` (
  `id_forma` int(11) NOT NULL,
  `matricule` int(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_nis` text NOT NULL,
  `date_Em` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `formateur`
--

INSERT INTO `formateur` (`id_forma`, `matricule`, `nom`, `prenom`, `date_nis`, `date_Em`) VALUES
(47, 14458, 'hakim', 'hizmi', '2001-12-01', '2020-12-15');

-- --------------------------------------------------------

--
-- Table structure for table `groupe`
--

CREATE TABLE `groupe` (
  `id_grp` int(11) NOT NULL,
  `nom_grp` varchar(50) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groupe`
--

INSERT INTO `groupe` (`id_grp`, `nom_grp`, `id`) VALUES
(15, 'dev101', 54);

-- --------------------------------------------------------

--
-- Table structure for table `salle`
--

CREATE TABLE `salle` (
  `id_sa` int(11) NOT NULL,
  `slag` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salle`
--

INSERT INTO `salle` (`id_sa`, `slag`, `description`) VALUES
(3, 'info2', 'salle inforsmtique');

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `filiere` varchar(50) NOT NULL,
  `niveau` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`id`, `filiere`, `niveau`) VALUES
(54, 'dev digtal', 'Technicien');

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `id_time` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `day` varchar(50) NOT NULL,
  `time_start` varchar(10) NOT NULL,
  `time_end` varchar(10) NOT NULL,
  `id_forma` int(11) NOT NULL,
  `id_grp` int(11) NOT NULL,
  `id_sa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timetable`
--

INSERT INTO `timetable` (`id_time`, `title`, `day`, `time_start`, `time_end`, `id_forma`, `id_grp`, `id_sa`) VALUES
(32, 'html css', 'Monday', '08:30', '13:30', 47, 15, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `etudiants`
--
ALTER TABLE `etudiants`
  ADD PRIMARY KEY (`id_et`),
  ADD KEY `id_grp` (`id_grp`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `formateur`
--
ALTER TABLE `formateur`
  ADD PRIMARY KEY (`id_forma`);

--
-- Indexes for table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`id_grp`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `salle`
--
ALTER TABLE `salle`
  ADD PRIMARY KEY (`id_sa`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`id_time`),
  ADD KEY `id_forma` (`id_forma`),
  ADD KEY `id_grp` (`id_grp`),
  ADD KEY `id_sa` (`id_sa`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `etudiants`
--
ALTER TABLE `etudiants`
  MODIFY `id_et` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `formateur`
--
ALTER TABLE `formateur`
  MODIFY `id_forma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `id_grp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `salle`
--
ALTER TABLE `salle`
  MODIFY `id_sa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `timetable`
--
ALTER TABLE `timetable`
  MODIFY `id_time` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `etudiants`
--
ALTER TABLE `etudiants`
  ADD CONSTRAINT `etudiants_ibfk_1` FOREIGN KEY (`id_grp`) REFERENCES `groupe` (`id_grp`) ON DELETE CASCADE,
  ADD CONSTRAINT `etudiants_ibfk_2` FOREIGN KEY (`id_grp`) REFERENCES `groupe` (`id_grp`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `etudiants_ibfk_3` FOREIGN KEY (`id`) REFERENCES `section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `groupe`
--
ALTER TABLE `groupe`
  ADD CONSTRAINT `groupe_ibfk_1` FOREIGN KEY (`id`) REFERENCES `section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `timetable`
--
ALTER TABLE `timetable`
  ADD CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`id_forma`) REFERENCES `formateur` (`id_forma`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `timetable_ibfk_2` FOREIGN KEY (`id_grp`) REFERENCES `groupe` (`id_grp`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `timetable_ibfk_3` FOREIGN KEY (`id_sa`) REFERENCES `salle` (`id_sa`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;