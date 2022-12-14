GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' IDENTIFIED BY 'secret';
FLUSH PRIVILEGES;

create database if not exists `Employee Details`;

USE `Employee Details`;

SET NAMES utf8mb4;
CREATE TABLE IF NOT EXISTS `departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `employee_id` int(5)NOT NULL,
  `department_id` int(5) NOT NULL,
  `first_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_no` int(20) NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
);

ALTER TABLE employees
    ADD CONSTRAINT employees_department_id_fk FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`); 

