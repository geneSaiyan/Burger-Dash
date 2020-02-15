DROP DATABASE IF EXISTS `burgers_db`;
CREATE DATABASE `burgers_db`;
USE `burgers_db`;


CREATE TABLE `burgers` (
	`id` Int AUTO_INCREMENT NOT NULL,
	`burger_name` VARCHAR( 255) NOT NULL,
	`devoured` VARCHAR( 255 ) NOT NULL,
	PRIMARY KEY ( `id` )
);
