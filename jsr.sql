-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2024 at 12:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jsr`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `st_address` varchar(30) NOT NULL,
  `landmark` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `postal_code` varchar(50) NOT NULL,
  `user_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `st_address`, `landmark`, `city`, `state`, `postal_code`, `user_id`) VALUES
(1, '123 Main Street', 'Near City Park', 'Cityville', 'Stateville', '12345', 101),
(2, '456 Oak Avenue', 'Next to Shopping Mall', 'Townsville', 'Stateville', '67890', 102),
(3, '789 Pine Road', 'Opposite Library', 'Villagetown', 'Stateville', '23456', 103),
(4, '101 Maple Lane', 'Close to Stadium', 'Fieldville', 'Stateville', '78901', 104);

-- --------------------------------------------------------

--
-- Table structure for table `catogeries`
--

CREATE TABLE `catogeries` (
  `catogery_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `catogeries`
--

INSERT INTO `catogeries` (`catogery_id`, `name`) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Home and Garden'),
(4, 'Sports and Outdoors');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`products`)),
  `total` int(11) NOT NULL,
  `date_sent` datetime NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `products`, `total`, `date_sent`, `user_id`) VALUES
(1, '{\"items\": [{\"product_id\": 1, \"quantity\": 2}, {\"product_id\": 3, \"quantity\": 1}]}', 500, '2024-01-22 00:00:00', 0),
(2, '{\"items\": [{\"product_id\": 2, \"quantity\": 1}, {\"product_id\": 4, \"quantity\": 3}]}', 300, '2024-01-24 00:00:00', 0),
(3, '{\"items\": [{\"product_id\": 5, \"quantity\": 2}, {\"product_id\": 1, \"quantity\": 1}]}', 800, '2024-01-26 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`products`)),
  `invoice_id` int(11) NOT NULL,
  `date_ordered` datetime NOT NULL,
  `date_delivered` datetime NOT NULL,
  `status_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `address_id`, `total`, `products`, `invoice_id`, `date_ordered`, `date_delivered`, `status_id`) VALUES
(1, 101, 201, 500, '{\"items\": [{\"product_id\": 1, \"quantity\": 2}, {\"product_id\": 3, \"quantity\": 1}]}', 0, '2024-01-18 00:00:00', '2024-01-22 00:00:00', 1),
(2, 102, 202, 300, '{\"items\": [{\"product_id\": 2, \"quantity\": 1}, {\"product_id\": 4, \"quantity\": 3}]}', 0, '2024-01-19 00:00:00', '2024-01-24 00:00:00', 2),
(3, 103, 203, 800, '{\"items\": [{\"product_id\": 5, \"quantity\": 2}, {\"product_id\": 1, \"quantity\": 1}]}', 0, '2024-01-20 00:00:00', '2024-01-26 00:00:00', 3),
(4, 1, 1, 150, '{\"product1\":1,\"product2\":3}', 1, '2024-01-20 00:00:00', '2024-01-25 00:00:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `model` varchar(30) NOT NULL,
  `description` varchar(200) NOT NULL,
  `category_id` int(11) NOT NULL,
  `search_tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`search_tags`)),
  `company_name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `model`, `description`, `category_id`, `search_tags`, `company_name`, `price`) VALUES
(1, 'Laptop', 'ABC123', 'Powerful laptop with high-performance specs', 1, '{\"tags\": [\"laptop\", \"computer\", \"tech\"]}', 'Tech Corp', 1000),
(2, 'Smartphone', 'XYZ456', 'Latest smartphone with advanced features', 2, '{\"tags\": [\"phone\", \"mobile\", \"gadget\"]}', 'Mobile Innovations', 600),
(3, 'Headphones', 'DEF789', 'Premium noise-canceling headphones for immersive audio', 3, '{\"tags\": [\"headphones\", \"audio\", \"music\"]}', 'AudioTech', 150),
(4, 'Digital Camera', 'PQR321', 'High-resolution camera for stunning photography', 4, '{\"tags\": [\"camera\", \"photography\", \"gadget\"]}', 'PhotoPro', 800),
(5, 'Smartwatch', 'LMN654', 'Feature-rich smartwatch with health tracking', 5, '{\"tags\": [\"smartwatch\", \"fitness\", \"wearable\"]}', 'Gadget Gear', 130),
(6, 'Laptop', 'ABC123', 'Powerful laptop with high-performance specs', 1, '[\"laptop\",\"computer\",\"tech\"]', 'Tech Corp', 1000),
(7, 'Product Name', 'Product Model', 'Product Description', 1, '{\"tag1\":\"value1\",\"tag2\":\"value2\"}', 'Example Inc.', 50);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int(11) NOT NULL,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `status`) VALUES
(1, 'ordered'),
(2, 'preparing'),
(3, 'recived'),
(6, 'New');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `phone_number` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `phone_number`, `email`, `password`, `slug`, `first_name`, `last_name`, `company_name`) VALUES
(1, 1234567890, 'john.doe@example.com', 'password123', 'john-doe', 'John', 'Doe', 'ABC Corporation'),
(2, 1234567890, 'john.doe@example.com', 'securepassword', 'john-doe', 'John', 'Doe', 'Example Company'),
(3, 1234567890, 'john.doe@example.com', 'secretpassword', 'john_doe', 'John', 'Doe', 'Example Inc.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `catogeries`
--
ALTER TABLE `catogeries`
  ADD PRIMARY KEY (`catogery_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `catogeries`
--
ALTER TABLE `catogeries`
  MODIFY `catogery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
