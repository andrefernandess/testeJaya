CREATE TABLE `testeJaya`.`bankslip` (
  `id` INT NOT NULL,
  `due_date` Date) NOT NULL,
  `total_in_cents` DECIMAL NOT NULL DEFAULT 0,
  `customer` TEXT(1000) NOT NULL,
  `status` TEXT(50),
  PRIMARY KEY (`id`));