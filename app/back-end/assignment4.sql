-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2023 at 05:44 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment4`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `user_id`) VALUES
(8, 'linkedIn notes', 'Turpis massa sed elementum tempus egestas sed sed. Sed velit dignissim sodales ut eu sem integer vitae justo. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Fermentum et sollicitudin ac orci phasellus. Tellus in metus vulputate eu scelerisque felis imperdiet. Mi proin sed libero enim. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Ornare arcu odio ut sem nulla pharetra. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Vel eros donec ac odio tempor. Viverra aliquet eget sit amet. Egestas dui id ornare arcu odio ut sem. Enim nulla aliquet porttitor lacus luctus accumsan. Turpis massa sed elementum tempus egestas sed sed risus pretium. Feugiat scelerisque varius morbi enim nunc faucibus a. Posuere sollicitudin aliquam ultrices sagittis orci a. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Sed risus ultricies tristique nulla.', 1),
(9, 'AhmeDDDD', 'asdfoiajehighapir aiughd ifughhgj hihfdighaiudf haaasefaegas asdfaef', 2),
(10, 'SADKIEQ', 'Eget egestas purus viverra accumsan in. Vivamus at augue eget arcu. Eget egestas purus viverra accumsan in nisl nisi. Aliquam etiam erat velit scelerisque in dictum. Eu non diam phasellus vestibulum lorem. Neque ornare aenean euismod elementum nisi quis. Mi bibendum neque egestas congue. Eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Volutpat consequat mauris nunc congue nisi vitae. Morbi tristique senectus et netus et malesuada fames ac. Non tellus orci ac auctor augue mauris augue neque.', 5),
(11, 'IEUIRIA', 'asdfoiajehighapir aiughd ifughhgj hihfdighaiudf haa', 1),
(13, 'AhmeDDDD', 'asdfoiajehighapir aiughd ifughhgj hihfdighaiudf haaasefaegas asdfaef', 2),
(14, 'Ahmeddd', 'asdfoiajehighapir aiughd ifughhgj hihfdighaiudf haaasefaegas asdfaef', 2),
(15, 'Ahmed WWE', 'asdfoiajehighapir aiughd ifughhgj hihfdighaiudf haaasefaegas asdfaef', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `age`) VALUES
(1, 'Mustafa', 'mustafa@route.com', 'asd234', 26),
(2, 'Ahmed', 'ahmed@route.com', 'aaaa123', 55),
(3, 'Fikry', 'fikry@route.com', 'asdfw123456', 89),
(4, 'Mahmoud', 'mahoud@gmail.com', 'asdfetasea', 22),
(5, 'Ziad', 'ziad@route.com', 'ziad89473984', 36);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_ID_FK` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `user_ID_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
