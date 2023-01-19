GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' IDENTIFIED BY 'secret';
FLUSH PRIVILEGES;

create database if not exists `NewEmployees`;

USE `NewEmployees`;

CREATE TABLE IF NOT EXISTS `departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `departmentdetails_id` int NOT NULL,
  `department_name` varchar(255) NOT NULL UNIQUE,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `department_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL ,
  `min_income` int(20),
  `max_income` int(20),
  `introduced_date` varchar(33) ,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `employees` (
  `employee_id` int(5)NOT NULL AUTO_INCREMENT,
  `department_id` int(20) ,
  `first_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_no` int(20) NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
   PRIMARY KEY (`employee_id`)
);

ALTER TABLE employees
    ADD CONSTRAINT employees_department_id_fk FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`); 

ALTER TABLE departments
  ADD `department_details` varchar(255) NOT NULL ;

ALTER TABLE departments
  ADD CONSTRAINT departments_departmentDetails_id_fk FOREIGN KEY (`departmentDetails_id`) REFERENCES `department_details` (`id`);