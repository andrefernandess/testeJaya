create database testeJaya;

CREATE TABLE `testeJaya`.`bankslip` (
  `id` TEXT NOT NULL,
  `customer_id` TEXT NOT NULL,
  `due_date` Date NOT NULL,
  `total_in_cents` DECIMAL NOT NULL DEFAULT 0,
  `customer` TEXT(1000) NOT NULL,
  `status` TEXT(50),
  PRIMARY KEY (`id`),
  FOREIGN KEY (customer_id) REFERENCES customer(id)
);

CREATE TABLE `testeJaya`.`customer` (
  `id` TEXT NOT NULL,
  `user_id` TEXT NOT NULL,
  `name` TEXT NOT NULL,
  `document` TEXT NOT NULL,
  `status` TEXT(50),
  PRIMARY KEY (`id`)
);

CREATE TABLE `testeJaya`.`user` (
  `id` TEXT NOT NULL,
  `customer_id` TEXT NOT NULL,
  `username` TEXT NOT NULL,
  `roles` TEXT NOT NULL,
  `active` boolean,
  PRIMARY KEY (`id`),
  FOREIGN KEY (customer_id) REFERENCES customer(id)
);