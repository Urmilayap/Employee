GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' IDENTIFIED BY 'secret';
FLUSH PRIVILEGES;




create database if not exists `Employee Details`;

USE `Employee Details`;

CREATE TABLE IF NOT EXISTS `departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_details_id` int NOT NULL,
  `department_name` varchar(255) NOT NULL UNIQUE,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `deleted` int,
  PRIMARY KEY (`department_id`),
 CONSTRAINT departments_department_details_id_fk FOREIGN KEY (`department_details_id`) REFERENCES `department_details` (`department_details_id`)
) 

DELIMITER $$
DROP TRIGGER IF EXISTS departments_on_delete_trigger $$
CREATE
    TRIGGER departments_on_delete_trigger BEFORE UPDATE ON departments
    FOR EACH ROW BEGIN
	IF (NEW.deleted_at IS NULL) THEN SET NEW.deleted = 0; ELSE SET NEW.deleted = OLD.department_id; END IF;
END;
$$

CREATE TABLE IF NOT EXISTS `department_details` (
  `department_details_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL ,
  `min_income` int(20),
  `max_income` int(20),
  `introduced_date` varchar(33) ,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `deleted` int,
  PRIMARY KEY (`department_details_id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DELIMITER $$
DROP TRIGGER IF EXISTS department_details_on_delete_trigger $$
CREATE
    TRIGGER department_details_on_delete_trigger BEFORE UPDATE ON department_details
    FOR EACH ROW BEGIN
	IF (NEW.deleted_at IS NULL) THEN SET NEW.deleted = 0; ELSE SET NEW.deleted = OLD.department_details_id; END IF;
    END;
$$
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
  `deleted` int,
   PRIMARY KEY (`employee_id`),
  CONSTRAINT employees_department_id_fk FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`)
)
DELIMITER $$
DROP TRIGGER IF EXISTS employees_on_delete_trigger $$
CREATE
    TRIGGER employees_on_delete_trigger BEFORE UPDATE ON employees
    FOR EACH ROW BEGIN
	IF (NEW.deleted_at IS NULL) THEN SET NEW.deleted = 0; ELSE SET NEW.deleted = OLD.employee_id; END IF;
    END;
$$



