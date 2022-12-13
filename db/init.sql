GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' IDENTIFIED BY 'secret';
FLUSH PRIVILEGES;

create database if not exists `employeeDetails`;

USE `employeeDetails`;

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(5)NOT NULL,
  `department_id` int(5)NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_no` int(20) NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  "department_id" INTEGER REFERENCES "departments" ("department_id") ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
 ALTER TABLE `employees` ADD `employee_id` int(10) NOT NULL ,
 ALTER TABLE `employees` ADD `department_id` int(10) NOT NULL ,
DELIMITER $$


create database if not exists `Employee Departments`;

USE `Employee Departments`;

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(5)NOT NULL,
  `department_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `employee_id` int,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DELIMITER $$

