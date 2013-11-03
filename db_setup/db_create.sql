SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `emarket_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `emarket_test` ;

-- -----------------------------------------------------
-- Table `emarket_test`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`user_info` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_first_name` VARCHAR(45) NOT NULL,
  `user_middle_name` VARCHAR(45) NULL DEFAULT NULL,
  `user_last_name` VARCHAR(45) NOT NULL,
  `user_telephone` VARCHAR(15) NOT NULL,
  `user_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`));


-- -----------------------------------------------------
-- Table `emarket_test`.`user_login_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`user_login_info` (
  `user_login_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_login_user_name` VARCHAR(16) NOT NULL,
  `user_login_password` VARCHAR(40) NOT NULL,
  `user_login_email` VARCHAR(255) NOT NULL,
  UNIQUE INDEX `user_login_email_UNIQUE` (`user_login_email` ASC),
  UNIQUE INDEX `user_login_user_name_UNIQUE` (`user_login_user_name` ASC),
  PRIMARY KEY (`user_login_id`),
  CONSTRAINT `login_user_id`
    FOREIGN KEY (`user_login_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`address_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`address_history` (
  `address_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `address_address` VARCHAR(255) NOT NULL,
  `address_country` VARCHAR(45) NOT NULL,
  `address_city` VARCHAR(45) NOT NULL,
  `address_geographical_region` VARCHAR(45) NULL DEFAULT NULL,
  `address_zipcode` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`address_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`mailing_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`mailing_info` (
  `mailing_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mailing_user_id` INT UNSIGNED NOT NULL,
  `mailing_address_id` INT UNSIGNED NOT NULL,
  `mailing_recipient_name` VARCHAR(160) NOT NULL,
  `mailing_telephone` VARCHAR(15) NOT NULL,
  `mailing_is_primary` TINYINT(1) NOT NULL,
  `mailing_status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`mailing_id`),
  INDEX `mailing_user_id_idx` (`mailing_user_id` ASC),
  INDEX `mailing_address_id_idx` (`mailing_address_id` ASC),
  CONSTRAINT `mailing_user_id`
    FOREIGN KEY (`mailing_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `mailing_address_id`
    FOREIGN KEY (`mailing_address_id`)
    REFERENCES `emarket_test`.`address_history` (`address_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`billing_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`billing_info` (
  `billing_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `billing_user_id` INT UNSIGNED NOT NULL,
  `billing_address_id` INT UNSIGNED NOT NULL,
  `billing_recipient_name` VARCHAR(160) NOT NULL,
  `billing_telephone` VARCHAR(15) NOT NULL,
  `billing_status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`billing_id`),
  INDEX `billing_user_id_idx` (`billing_user_id` ASC),
  INDEX `billing_address_id_idx` (`billing_address_id` ASC),
  CONSTRAINT `billing_user_id`
    FOREIGN KEY (`billing_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `billing_address_id`
    FOREIGN KEY (`billing_address_id`)
    REFERENCES `emarket_test`.`address_history` (`address_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`credit_card_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`credit_card_info` (
  `credit_card_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `credit_card_user_id` INT UNSIGNED NOT NULL,
  `credit_card_billing_address_id` INT UNSIGNED NOT NULL,
  `credit_card_type` VARCHAR(45) NOT NULL,
  `credit_card_owner_name` VARCHAR(160) NOT NULL,
  `credit_card_expiration_date` DATE NOT NULL,
  `credit_card_number` VARCHAR(16) NOT NULL,
  `credit_card_csv` VARCHAR(4) NOT NULL,
  `credit_card_status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`credit_card_id`),
  INDEX `card_user_id_idx` (`credit_card_user_id` ASC),
  INDEX `card_billing_id_idx` (`credit_card_billing_address_id` ASC),
  CONSTRAINT `credit_user_id`
    FOREIGN KEY (`credit_card_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `credit_billing_id`
    FOREIGN KEY (`credit_card_billing_address_id`)
    REFERENCES `emarket_test`.`billing_info` (`billing_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`bank_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`bank_info` (
  `bank_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `bank_user_id` INT UNSIGNED NOT NULL,
  `bank_billing_address_id` INT UNSIGNED NOT NULL,
  `bank_name` VARCHAR(160) NOT NULL,
  `bank_account_owner_name` VARCHAR(160) NOT NULL,
  `bank_account_type` VARCHAR(45) NOT NULL,
  `bank_account_number` VARCHAR(17) NOT NULL,
  `bank_routing_number` VARCHAR(9) NOT NULL,
  `bank_status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`bank_id`),
  INDEX `bank_user_id_idx` (`bank_user_id` ASC),
  INDEX `bank_billing_id_idx` (`bank_billing_address_id` ASC),
  CONSTRAINT `bank_user_id`
    FOREIGN KEY (`bank_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `bank_billing_id`
    FOREIGN KEY (`bank_billing_address_id`)
    REFERENCES `emarket_test`.`billing_info` (`billing_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`category_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`category_info` (
  `category_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(45) NOT NULL,
  `category_parent_id` INT UNSIGNED NULL DEFAULT NULL,
  `category_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_status` TINYINT(1) NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`category_id`),
  INDEX `category_id_idx` (`category_parent_id` ASC),
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_parent_id`)
    REFERENCES `emarket_test`.`category_info` (`category_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`product_specification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`product_specification` (
  `product_spec_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_spec_category_id` INT UNSIGNED NOT NULL,
  `product_spec_name` VARCHAR(45) NOT NULL,
  `product_spec_nonbid_price` DECIMAL(13,2) NOT NULL,
  `product_spec_starting_bid_price` DECIMAL(13,2) NOT NULL,
  `product_spec_bid_end_date` TIMESTAMP NOT NULL,
  `product_spec_shipping_price` DECIMAL(13,2) NOT NULL,
  `product_spec_quantity` INT UNSIGNED NOT NULL,
  `product_spec_description` VARCHAR(255) NOT NULL,
  `product_spec_condition` ENUM('New','Used','Refurbished') NOT NULL,
  `product_spec_picture` VARCHAR(255) NOT NULL,
  `product_spec_brand` VARCHAR(45) NOT NULL,
  `product_spec_model` VARCHAR(45) NOT NULL,
  `product_spec_dimensions` VARCHAR(45) NOT NULL,
  `product_spec_is_draft` TINYINT(1) NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`product_spec_id`),
  INDEX `spec_category_id_idx` (`product_spec_category_id` ASC),
  CONSTRAINT `spec_category_id`
    FOREIGN KEY (`product_spec_category_id`)
    REFERENCES `emarket_test`.`category_info` (`category_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`product_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`product_info` (
  `product_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_seller_id` INT UNSIGNED NOT NULL,
  `product_info_spec_id` INT UNSIGNED NOT NULL,
  `product_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_depletion_date` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `product_user_id_idx` (`product_seller_id` ASC),
  INDEX `product_product_spec_id_idx` (`product_info_spec_id` ASC),
  CONSTRAINT `product_user_id`
    FOREIGN KEY (`product_seller_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `product_spec_id`
    FOREIGN KEY (`product_info_spec_id`)
    REFERENCES `emarket_test`.`product_specification` (`product_spec_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`bid_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`bid_history` (
  `bid_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `bid_user_id` INT UNSIGNED NOT NULL,
  `bid_product_id` INT UNSIGNED NOT NULL,
  `bid_amount` DECIMAL(13,2) NOT NULL,
  `bid_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bid_closed_date` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`bid_id`),
  INDEX `bid_user_id_idx` (`bid_user_id` ASC),
  INDEX `bid_product_id_idx` (`bid_product_id` ASC),
  CONSTRAINT `bid_user_id`
    FOREIGN KEY (`bid_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `bid_product_id`
    FOREIGN KEY (`bid_product_id`)
    REFERENCES `emarket_test`.`product_info` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`cart_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`cart_history` (
  `cart_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cart_user_id` INT UNSIGNED NOT NULL,
  `cart_closed_date` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  INDEX `cart_user_id_idx` (`cart_user_id` ASC),
  CONSTRAINT `cart_user_id`
    FOREIGN KEY (`cart_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`cart_item_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`cart_item_history` (
  `cart_item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cart_item_cart_id` INT UNSIGNED NOT NULL,
  `cart_item_product_id` INT UNSIGNED NOT NULL,
  `cart_item_quantity` INT UNSIGNED NOT NULL,
  `cart_item_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cart_item_closed_date` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`cart_item_id`),
  INDEX `cart_item_cart_id_idx` (`cart_item_cart_id` ASC),
  INDEX `cart_item_product_id_idx` (`cart_item_product_id` ASC),
  CONSTRAINT `cart_item_cart_id`
    FOREIGN KEY (`cart_item_cart_id`)
    REFERENCES `emarket_test`.`cart_history` (`cart_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `cart_item_product_id`
    FOREIGN KEY (`cart_item_product_id`)
    REFERENCES `emarket_test`.`product_info` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`invoice_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`invoice_history` (
  `invoice_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `invoice_user_id` INT UNSIGNED NOT NULL,
  `invoice_bank_id` INT UNSIGNED NULL,
  `invoice_card_id` INT UNSIGNED NULL,
  `invoice_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`invoice_id`),
  INDEX `invoice_user_id_idx` (`invoice_user_id` ASC),
  INDEX `invoice_card_id_idx` (`invoice_card_id` ASC),
  INDEX `invoice_bank_id_idx` (`invoice_bank_id` ASC),
  CONSTRAINT `invoice_user_id`
    FOREIGN KEY (`invoice_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `invoice_card_id`
    FOREIGN KEY (`invoice_card_id`)
    REFERENCES `emarket_test`.`credit_card_info` (`credit_card_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `invoice_bank_id`
    FOREIGN KEY (`invoice_bank_id`)
    REFERENCES `emarket_test`.`bank_info` (`bank_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`invoice_item_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`invoice_item_history` (
  `invoice_item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `invoice_item_invoice_id` INT UNSIGNED NOT NULL,
  `invoice_item_product_id` INT UNSIGNED NOT NULL,
  `invoice_item_quantity` INT UNSIGNED NOT NULL,
  `invoice_item_sold_price` DECIMAL(13,2) NOT NULL,
  PRIMARY KEY (`invoice_item_id`),
  INDEX `invoice_item_invoice_id_idx` (`invoice_item_invoice_id` ASC),
  INDEX `invoice_item_product_id_idx` (`invoice_item_product_id` ASC),
  CONSTRAINT `invoice_item_invoice_id`
    FOREIGN KEY (`invoice_item_invoice_id`)
    REFERENCES `emarket_test`.`invoice_history` (`invoice_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `invoice_item_product_id`
    FOREIGN KEY (`invoice_item_product_id`)
    REFERENCES `emarket_test`.`product_info` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`rating_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`rating_history` (
  `rating_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `rating_rated_user_id` INT UNSIGNED NOT NULL,
  `rating_rater_user_id` INT UNSIGNED NOT NULL,
  `rating_value` TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (`rating_id`),
  INDEX `rated_user_id_idx` (`rating_rated_user_id` ASC),
  INDEX `rater_user_id_idx` (`rating_rater_user_id` ASC),
  CONSTRAINT `rated_user_id`
    FOREIGN KEY (`rating_rated_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `rater_user_id`
    FOREIGN KEY (`rating_rater_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`admin_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`admin_info` (
  `admin_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_user_name` VARCHAR(16) NOT NULL,
  `admin_password` VARCHAR(40) NOT NULL,
  `admin_email` VARCHAR(255) NOT NULL,
  `admin_first_name` VARCHAR(45) NOT NULL,
  `admin_middle_name` VARCHAR(45) NULL DEFAULT NULL,
  `admin_last_name` VARCHAR(45) NOT NULL,
  `admin_telephone` VARCHAR(15) NOT NULL,
  `admin_is_root` TINYINT(1) NOT NULL DEFAULT FALSE,
  `admin_account_status` TINYINT(1) NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`admin_id`),
  UNIQUE INDEX `admin_user_name_UNIQUE` (`admin_user_name` ASC),
  UNIQUE INDEX `admin_email_UNIQUE` (`admin_email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`user_account_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`user_account_status` (
  `user_account_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_account_status` TINYINT(1) NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`user_account_id`),
  CONSTRAINT `account_user_id`
    FOREIGN KEY (`user_account_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`product_drafts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`product_drafts` (
  `product_draft_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_draft_user_id` INT UNSIGNED NOT NULL,
  `product_draft_spec_id` INT UNSIGNED NOT NULL,
  `product_draft_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_draft_update_date` TIMESTAMP NULL DEFAULT NULL,
  `product_draft_closed_date` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`product_draft_id`),
  INDEX `drafts_user_id_idx` (`product_draft_user_id` ASC),
  INDEX `drafts_product_spec_id_idx` (`product_draft_spec_id` ASC),
  CONSTRAINT `drafts_user_id`
    FOREIGN KEY (`product_draft_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `drafts_product_spec_id`
    FOREIGN KEY (`product_draft_spec_id`)
    REFERENCES `emarket_test`.`product_specification` (`product_spec_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`recently_viewed_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`recently_viewed_items` (
  `recently_viewed_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `recently_viewed_user_id` INT UNSIGNED NOT NULL,
  `recently_viewed_product_id` INT UNSIGNED NOT NULL,
  `recently_viewed_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `recently_viewed_status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`recently_viewed_id`),
  INDEX `recently_user_id_idx` (`recently_viewed_user_id` ASC),
  INDEX `recently_product_id_idx` (`recently_viewed_product_id` ASC),
  CONSTRAINT `recently_user_id`
    FOREIGN KEY (`recently_viewed_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `recently_product_id`
    FOREIGN KEY (`recently_viewed_product_id`)
    REFERENCES `emarket_test`.`product_info` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`notification_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`notification_history` (
  `notification_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `notification_user_id` INT UNSIGNED NOT NULL,
  `notification_message` TEXT NOT NULL,
  `notification_date` TIMESTAMP NOT NULL,
  `notification_is_read` TINYINT(1) NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`notification_id`),
  INDEX `notification_user_id_idx` (`notification_user_id` ASC),
  CONSTRAINT `notification_user_id`
    FOREIGN KEY (`notification_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`question_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`question_history` (
  `question_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_content` VARCHAR(160) NOT NULL,
  PRIMARY KEY (`question_id`),
  UNIQUE INDEX `question_content_UNIQUE` (`question_content` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`question_answer_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`question_answer_history` (
  `answer_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `answer_question_id` INT UNSIGNED NOT NULL,
  `answer_user_id` INT UNSIGNED NOT NULL,
  `answer_content` VARCHAR(45) NOT NULL,
  `answer_status` TINYINT(1) NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`answer_id`),
  INDEX `answer_user_id_idx` (`answer_user_id` ASC),
  INDEX `answer_question_id_idx` (`answer_question_id` ASC),
  CONSTRAINT `answer_user_id`
    FOREIGN KEY (`answer_user_id`)
    REFERENCES `emarket_test`.`user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `answer_question_id`
    FOREIGN KEY (`answer_question_id`)
    REFERENCES `emarket_test`.`question_history` (`question_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`product_quantity_record`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`product_quantity_record` (
  `product_quantity_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_quantity_spec_id` INT UNSIGNED NOT NULL,
  `product_quantity_remaining` INT UNSIGNED NOT NULL,
  INDEX `quantity_product_spec_id_idx` (`product_quantity_spec_id` ASC),
  UNIQUE INDEX `product_quantity_spec_id_UNIQUE` (`product_quantity_spec_id` ASC),
  PRIMARY KEY (`product_quantity_id`),
  CONSTRAINT `quantity_product_spec_id`
    FOREIGN KEY (`product_quantity_spec_id`)
    REFERENCES `emarket_test`.`product_specification` (`product_spec_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emarket_test`.`product_transaction_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`product_transaction_history` (
  `product_transaction_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_transaction_product_id` INT UNSIGNED NOT NULL,
  `product_transaction_quantity` INT UNSIGNED NOT NULL,
  `product_transaction_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_transaction_id`),
  INDEX `transaction_product_id_idx` (`product_transaction_product_id` ASC),
  CONSTRAINT `transaction_product_id`
    FOREIGN KEY (`product_transaction_product_id`)
    REFERENCES `emarket_test`.`product_info` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `emarket_test` ;

-- -----------------------------------------------------
-- Placeholder table for view `emarket_test`.`active_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`active_users` (`user_id` INT, `user_first_name` INT, `user_middle_name` INT, `user_last_name` INT, `user_telephone` INT, `user_creation_date` INT, `user_login_user_name` INT, `user_login_email` INT);

-- -----------------------------------------------------
-- Placeholder table for view `emarket_test`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emarket_test`.`products` (`product_id` INT, `product_seller_id` INT, `product_info_spec_id` INT, `product_creation_date` INT, `product_depletion_date` INT, `product_spec_id` INT, `product_spec_category_id` INT, `product_spec_name` INT, `product_spec_nonbid_price` INT, `product_spec_starting_bid_price` INT, `product_spec_bid_end_date` INT, `product_spec_shipping_price` INT, `product_spec_quantity` INT, `product_spec_description` INT, `product_spec_condition` INT, `product_spec_picture` INT, `product_spec_brand` INT, `product_spec_model` INT, `product_spec_dimensions` INT, `product_spec_is_draft` INT, `product_quantity_remaining` INT, `seller_name` INT, `category_id` INT, `category_name` INT, `current_bid` INT);

-- -----------------------------------------------------
-- View `emarket_test`.`active_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emarket_test`.`active_users`;
USE `emarket_test`;
CREATE  OR REPLACE VIEW active_users AS
SELECT user_info.*, user_login_user_name, user_login_email
FROM user_info INNER JOIN user_account_status INNER JOIN user_login_info
ON (user_info.user_id = user_account_status.user_account_id AND user_id = user_login_id)
WHERE user_account_status = 1;

-- -----------------------------------------------------
-- View `emarket_test`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emarket_test`.`products`;
USE `emarket_test`;
CREATE  OR REPLACE VIEW products AS
SELECT pi.*, ps.*, pq.product_quantity_remaining, au.user_login_user_name AS seller_name,
ci.category_id, ci.category_name,
(
  SELECT bid_amount
  FROM bid_history INNER JOIN product_info AS P
  ON(bid_product_id = P.product_id)
  WHERE P.product_id = pi.product_id
  ORDER BY bid_amount DESC
  LIMIT 0, 1
) AS current_bid
FROM product_info AS pi INNER JOIN product_specification AS ps INNER JOIN active_users AS au
INNER JOIN category_info AS ci INNER JOIN product_quantity_record as pq
ON (
    pi.product_info_spec_id = ps.product_spec_id
    AND au.user_id = pi.product_seller_id
    AND ci.category_id = ps.product_spec_category_id
    AND pq.product_quantity_spec_id = ps.product_spec_id
    )
WHERE ps.product_spec_is_draft = 0;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
