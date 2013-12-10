SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


-- -----------------------------------------------------
-- Table `user_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_info` ;

CREATE TABLE IF NOT EXISTS `user_info` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_first_name` VARCHAR(45) NOT NULL,
  `user_middle_name` VARCHAR(45) NULL DEFAULT NULL,
  `user_last_name` VARCHAR(45) NOT NULL,
  `user_telephone` VARCHAR(15) NOT NULL,
  `user_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`));


-- -----------------------------------------------------
-- Table `user_login_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_login_info` ;

CREATE TABLE IF NOT EXISTS `user_login_info` (
  `user_login_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_login_user_name` VARCHAR(16) NOT NULL,
  `user_login_password` VARCHAR(40) NOT NULL,
  `user_login_email` VARCHAR(255) NOT NULL,
  UNIQUE INDEX `user_login_email_UNIQUE` (`user_login_email` ASC),
  UNIQUE INDEX `user_login_user_name_UNIQUE` (`user_login_user_name` ASC),
  PRIMARY KEY (`user_login_id`),
  CONSTRAINT `login_user_id`
    FOREIGN KEY (`user_login_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `address_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address_history` ;

CREATE TABLE IF NOT EXISTS `address_history` (
  `address_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `address_address` VARCHAR(255) NOT NULL,
  `address_country` VARCHAR(45) NOT NULL,
  `address_city` VARCHAR(45) NOT NULL,
  `address_geographical_region` VARCHAR(45) NULL DEFAULT NULL,
  `address_zipcode` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`address_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mailing_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mailing_info` ;

CREATE TABLE IF NOT EXISTS `mailing_info` (
  `mailing_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mailing_user_id` INT UNSIGNED NOT NULL,
  `mailing_address_id` INT UNSIGNED NOT NULL,
  `mailing_recipient_name` VARCHAR(160) NOT NULL,
  `mailing_telephone` VARCHAR(15) NOT NULL,
  `mailing_is_primary` TINYINT(1) NOT NULL DEFAULT FALSE,
  `mailing_status` TINYINT(1) NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`mailing_id`),
  INDEX `mailing_user_id_idx` (`mailing_user_id` ASC),
  INDEX `mailing_address_id_idx` (`mailing_address_id` ASC),
  CONSTRAINT `mailing_user_id`
    FOREIGN KEY (`mailing_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `mailing_address_id`
    FOREIGN KEY (`mailing_address_id`)
    REFERENCES `address_history` (`address_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `billing_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `billing_info` ;

CREATE TABLE IF NOT EXISTS `billing_info` (
  `billing_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `billing_user_id` INT UNSIGNED NOT NULL,
  `billing_address_id` INT UNSIGNED NOT NULL,
  `billing_recipient_name` VARCHAR(160) NOT NULL,
  `billing_telephone` VARCHAR(15) NOT NULL,
  `billing_status` TINYINT(1) NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`billing_id`),
  INDEX `billing_user_id_idx` (`billing_user_id` ASC),
  INDEX `billing_address_id_idx` (`billing_address_id` ASC),
  CONSTRAINT `billing_user_id`
    FOREIGN KEY (`billing_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `billing_address_id`
    FOREIGN KEY (`billing_address_id`)
    REFERENCES `address_history` (`address_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `credit_card_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `credit_card_info` ;

CREATE TABLE IF NOT EXISTS `credit_card_info` (
  `credit_card_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `credit_card_user_id` INT UNSIGNED NOT NULL,
  `credit_card_billing_address_id` INT UNSIGNED NOT NULL,
  `credit_card_type` VARCHAR(45) NOT NULL,
  `credit_card_owner_name` VARCHAR(160) NOT NULL,
  `credit_card_expiration_date` DATE NOT NULL,
  `credit_card_number` VARCHAR(16) NOT NULL,
  `credit_card_csv` VARCHAR(4) NOT NULL,
  `credit_card_status` TINYINT(1) NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`credit_card_id`),
  INDEX `card_user_id_idx` (`credit_card_user_id` ASC),
  INDEX `card_billing_id_idx` (`credit_card_billing_address_id` ASC),
  CONSTRAINT `credit_user_id`
    FOREIGN KEY (`credit_card_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `credit_billing_id`
    FOREIGN KEY (`credit_card_billing_address_id`)
    REFERENCES `billing_info` (`billing_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bank_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bank_info` ;

CREATE TABLE IF NOT EXISTS `bank_info` (
  `bank_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `bank_user_id` INT UNSIGNED NOT NULL,
  `bank_billing_address_id` INT UNSIGNED NOT NULL,
  `bank_name` VARCHAR(160) NOT NULL,
  `bank_account_owner_name` VARCHAR(160) NOT NULL,
  `bank_account_type` VARCHAR(45) NOT NULL,
  `bank_account_number` VARCHAR(17) NOT NULL,
  `bank_routing_number` VARCHAR(9) NOT NULL,
  `bank_status` TINYINT(1) NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`bank_id`),
  INDEX `bank_user_id_idx` (`bank_user_id` ASC),
  INDEX `bank_billing_id_idx` (`bank_billing_address_id` ASC),
  CONSTRAINT `bank_user_id`
    FOREIGN KEY (`bank_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `bank_billing_id`
    FOREIGN KEY (`bank_billing_address_id`)
    REFERENCES `billing_info` (`billing_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category_info` ;

CREATE TABLE IF NOT EXISTS `category_info` (
  `category_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(45) NOT NULL,
  `category_parent_id` INT UNSIGNED NULL DEFAULT NULL,
  `category_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_status` TINYINT(1) NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`category_id`),
  INDEX `category_id_idx` (`category_parent_id` ASC),
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_parent_id`)
    REFERENCES `category_info` (`category_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `product_specification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `product_specification` ;

CREATE TABLE IF NOT EXISTS `product_specification` (
  `product_spec_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_spec_category_id` INT UNSIGNED NOT NULL,
  `product_spec_name` VARCHAR(160) NOT NULL,
  `product_spec_nonbid_price` DECIMAL(13,2) NOT NULL,
  `product_spec_starting_bid_price` DECIMAL(13,2) NOT NULL,
  `product_spec_bid_end_date` DATETIME NOT NULL,
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
  INDEX `spec_name_idx` (`product_spec_name` ASC),
  INDEX `spec_description_idx` (`product_spec_description` ASC),
  INDEX `spec_brand_idx` (`product_spec_brand` ASC),
  INDEX `spec_model_idx` (`product_spec_model` ASC),
  CONSTRAINT `spec_category_id`
    FOREIGN KEY (`product_spec_category_id`)
    REFERENCES `category_info` (`category_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `product_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `product_info` ;

CREATE TABLE IF NOT EXISTS `product_info` (
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
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `product_spec_id`
    FOREIGN KEY (`product_info_spec_id`)
    REFERENCES `product_specification` (`product_spec_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bid_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bid_history` ;

CREATE TABLE IF NOT EXISTS `bid_history` (
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
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `bid_product_id`
    FOREIGN KEY (`bid_product_id`)
    REFERENCES `product_info` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cart_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cart_history` ;

CREATE TABLE IF NOT EXISTS `cart_history` (
  `cart_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cart_user_id` INT UNSIGNED NOT NULL,
  `cart_closed_date` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  INDEX `cart_user_id_idx` (`cart_user_id` ASC),
  CONSTRAINT `cart_user_id`
    FOREIGN KEY (`cart_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cart_item_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cart_item_history` ;

CREATE TABLE IF NOT EXISTS `cart_item_history` (
  `cart_item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cart_item_cart_id` INT UNSIGNED NOT NULL,
  `cart_item_product_id` INT UNSIGNED NOT NULL,
  `cart_item_quantity` INT UNSIGNED NOT NULL,
  `cart_item_is_bid_Item` TINYINT(1) NOT NULL DEFAULT FALSE,
  `cart_item_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cart_item_purchased_date` TIMESTAMP NULL DEFAULT NULL,
  `cart_item_closed_date` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`cart_item_id`),
  INDEX `cart_item_cart_id_idx` (`cart_item_cart_id` ASC),
  INDEX `cart_item_product_id_idx` (`cart_item_product_id` ASC),
  CONSTRAINT `cart_item_cart_id`
    FOREIGN KEY (`cart_item_cart_id`)
    REFERENCES `cart_history` (`cart_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `cart_item_product_id`
    FOREIGN KEY (`cart_item_product_id`)
    REFERENCES `product_info` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `invoice_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `invoice_history` ;

CREATE TABLE IF NOT EXISTS `invoice_history` (
  `invoice_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `invoice_user_id` INT UNSIGNED NOT NULL,
  `invoice_bank_id` INT UNSIGNED NULL,
  `invoice_card_id` INT UNSIGNED NULL,
  `invoice_mail_id` INT UNSIGNED NOT NULL,
  `invoice_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`invoice_id`),
  INDEX `invoice_user_id_idx` (`invoice_user_id` ASC),
  INDEX `invoice_card_id_idx` (`invoice_card_id` ASC),
  INDEX `invoice_bank_id_idx` (`invoice_bank_id` ASC),
  INDEX `invoice_mail_id_idx` (`invoice_mail_id` ASC),
  CONSTRAINT `invoice_user_id`
    FOREIGN KEY (`invoice_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `invoice_card_id`
    FOREIGN KEY (`invoice_card_id`)
    REFERENCES `credit_card_info` (`credit_card_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `invoice_bank_id`
    FOREIGN KEY (`invoice_bank_id`)
    REFERENCES `bank_info` (`bank_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `invoice_mail_id`
    FOREIGN KEY (`invoice_mail_id`)
    REFERENCES `mailing_info` (`mailing_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `invoice_item_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `invoice_item_history` ;

CREATE TABLE IF NOT EXISTS `invoice_item_history` (
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
    REFERENCES `invoice_history` (`invoice_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `invoice_item_product_id`
    FOREIGN KEY (`invoice_item_product_id`)
    REFERENCES `product_info` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_ratings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_ratings` ;

CREATE TABLE IF NOT EXISTS `user_ratings` (
  `rating_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `rating_rated_user_id` INT UNSIGNED NOT NULL,
  `rating_rater_user_id` INT UNSIGNED NOT NULL,
  `rating_value` TINYINT UNSIGNED NOT NULL,
  `rating_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rating_id`),
  INDEX `rated_user_id_idx` (`rating_rated_user_id` ASC),
  INDEX `rater_user_id_idx` (`rating_rater_user_id` ASC),
  CONSTRAINT `rated_user_id`
    FOREIGN KEY (`rating_rated_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `rater_user_id`
    FOREIGN KEY (`rating_rater_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `admin_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admin_info` ;

CREATE TABLE IF NOT EXISTS `admin_info` (
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
-- Table `user_account_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_account_status` ;

CREATE TABLE IF NOT EXISTS `user_account_status` (
  `user_account_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_account_status` TINYINT(1) NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`user_account_id`),
  CONSTRAINT `account_user_id`
    FOREIGN KEY (`user_account_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `product_drafts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `product_drafts` ;

CREATE TABLE IF NOT EXISTS `product_drafts` (
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
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `drafts_product_spec_id`
    FOREIGN KEY (`product_draft_spec_id`)
    REFERENCES `product_specification` (`product_spec_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recently_viewed_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `recently_viewed_items` ;

CREATE TABLE IF NOT EXISTS `recently_viewed_items` (
  `recently_viewed_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `recently_viewed_user_id` INT UNSIGNED NOT NULL,
  `recently_viewed_product_id` INT UNSIGNED NOT NULL,
  `recently_viewed_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`recently_viewed_id`),
  INDEX `recently_user_id_idx` (`recently_viewed_user_id` ASC),
  INDEX `recently_product_id_idx` (`recently_viewed_product_id` ASC),
  CONSTRAINT `recently_user_id`
    FOREIGN KEY (`recently_viewed_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `recently_product_id`
    FOREIGN KEY (`recently_viewed_product_id`)
    REFERENCES `product_info` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `notification_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `notification_history` ;

CREATE TABLE IF NOT EXISTS `notification_history` (
  `notification_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `notification_user_id` INT UNSIGNED NOT NULL,
  `notification_message` TEXT NOT NULL,
  `notification_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notification_is_read` TINYINT(1) NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`notification_id`),
  INDEX `notification_user_id_idx` (`notification_user_id` ASC),
  CONSTRAINT `notification_user_id`
    FOREIGN KEY (`notification_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `question_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `question_history` ;

CREATE TABLE IF NOT EXISTS `question_history` (
  `question_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_content` VARCHAR(160) NOT NULL,
  PRIMARY KEY (`question_id`),
  UNIQUE INDEX `question_content_UNIQUE` (`question_content` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `question_answer_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `question_answer_history` ;

CREATE TABLE IF NOT EXISTS `question_answer_history` (
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
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `answer_question_id`
    FOREIGN KEY (`answer_question_id`)
    REFERENCES `question_history` (`question_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `product_quantity_record`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `product_quantity_record` ;

CREATE TABLE IF NOT EXISTS `product_quantity_record` (
  `product_quantity_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_quantity_spec_id` INT UNSIGNED NOT NULL,
  `product_quantity_remaining` INT UNSIGNED NOT NULL,
  INDEX `quantity_product_spec_id_idx` (`product_quantity_spec_id` ASC),
  UNIQUE INDEX `product_quantity_spec_id_UNIQUE` (`product_quantity_spec_id` ASC),
  PRIMARY KEY (`product_quantity_id`),
  CONSTRAINT `quantity_product_spec_id`
    FOREIGN KEY (`product_quantity_spec_id`)
    REFERENCES `product_specification` (`product_spec_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `product_transaction_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `product_transaction_history` ;

CREATE TABLE IF NOT EXISTS `product_transaction_history` (
  `product_transaction_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_transaction_product_id` INT UNSIGNED NOT NULL,
  `product_transaction_quantity` INT UNSIGNED NOT NULL,
  `product_transaction_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_transaction_id`),
  INDEX `transaction_product_id_idx` (`product_transaction_product_id` ASC),
  CONSTRAINT `transaction_product_id`
    FOREIGN KEY (`product_transaction_product_id`)
    REFERENCES `product_info` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `payment_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `payment_history` ;

CREATE TABLE IF NOT EXISTS `payment_history` (
  `payment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `payment_sender_user_id` INT UNSIGNED NOT NULL,
  `payment_recipient_user_id` INT UNSIGNED NOT NULL,
  `payment_amount` DECIMAL(13,2) NOT NULL,
  `payment_method` ENUM('Bank','Card') NOT NULL,
  `payment_card_id` INT UNSIGNED NULL,
  `payment_bank_id` INT UNSIGNED NULL,
  `payment_transaction_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_is_finished` TINYINT(1) NOT NULL DEFAULT FALSE,
  INDEX `payment_sender_user_id_idx` (`payment_sender_user_id` ASC),
  INDEX `payment_recipient_user_id_idx` (`payment_recipient_user_id` ASC),
  INDEX `payment_card_id_idx` (`payment_card_id` ASC),
  INDEX `payment_bank_id_idx` (`payment_bank_id` ASC),
  PRIMARY KEY (`payment_id`),
  CONSTRAINT `payment_sender_user_id`
    FOREIGN KEY (`payment_sender_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `payment_recipient_user_id`
    FOREIGN KEY (`payment_recipient_user_id`)
    REFERENCES `user_info` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `payment_card_id`
    FOREIGN KEY (`payment_card_id`)
    REFERENCES `credit_card_info` (`credit_card_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `payment_bank_id`
    FOREIGN KEY (`payment_bank_id`)
    REFERENCES `bank_info` (`bank_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Placeholder table for view `active_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `active_users` (`user_id` INT, `user_first_name` INT, `user_middle_name` INT, `user_last_name` INT, `user_telephone` INT, `user_creation_date` INT, `user_login_user_name` INT, `user_login_email` INT);

-- -----------------------------------------------------
-- Placeholder table for view `products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (`product_id` INT, `product_seller_id` INT, `product_info_spec_id` INT, `product_creation_date` INT, `product_depletion_date` INT, `product_spec_id` INT, `product_spec_category_id` INT, `product_spec_name` INT, `product_spec_nonbid_price` INT, `product_spec_starting_bid_price` INT, `product_spec_bid_end_date` INT, `product_spec_shipping_price` INT, `product_spec_quantity` INT, `product_spec_description` INT, `product_spec_condition` INT, `product_spec_picture` INT, `product_spec_brand` INT, `product_spec_model` INT, `product_spec_dimensions` INT, `product_spec_is_draft` INT, `product_quantity_remaining` INT, `seller_name` INT, `category_id` INT, `category_name` INT, `current_bid` INT);

-- -----------------------------------------------------
-- Placeholder table for view `report_constants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `report_constants` (`operation_cost` INT, `sales_fee_percent` INT, `active_category_count` INT, `operation_cost_per_category` INT);

-- -----------------------------------------------------
-- Placeholder table for view `report_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `report_data` (`category_id` INT, `category_name` INT, `invoice_creation_date` INT, `invoice_item_sold_price` INT);

-- -----------------------------------------------------
-- Placeholder table for view `report_month`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `report_month` (`category_id` INT, `category_name` INT, `category_sales` INT, `category_profit` INT, `category_revenue` INT);

-- -----------------------------------------------------
-- Placeholder table for view `report_week`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `report_week` (`category_id` INT, `category_name` INT, `category_sales` INT, `category_profit` INT, `category_revenue` INT);

-- -----------------------------------------------------
-- Placeholder table for view `report_day`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `report_day` (`category_id` INT, `category_name` INT, `category_sales` INT, `category_profit` INT, `category_revenue` INT);

-- -----------------------------------------------------
-- View `active_users`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `active_users` ;
DROP TABLE IF EXISTS `active_users`;
CREATE OR REPLACE VIEW active_users AS
SELECT user_info.*, user_login_user_name, user_login_email
FROM user_info INNER JOIN user_account_status INNER JOIN user_login_info
ON (user_info.user_id = user_account_status.user_account_id AND user_id = user_login_id)
WHERE user_account_status = 1;


-- -----------------------------------------------------
-- View `products`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `products` ;
DROP TABLE IF EXISTS `products`;
CREATE OR REPLACE VIEW products AS
SELECT pi.*, ps.*, pq.product_quantity_remaining, au.user_login_user_name AS seller_name,
ci.category_id, ci.category_name,
(
  SELECT bid_amount
  FROM bid_history INNER JOIN product_info AS P
  ON(bid_product_id = P.product_id)
  WHERE P.product_id = pi.product_id
  ORDER BY bid_amount DESC
  LIMIT 0,1
) AS current_bid
FROM product_info AS pi INNER JOIN product_specification AS ps INNER JOIN active_users AS au
INNER JOIN category_info AS ci INNER JOIN product_quantity_record as pq
ON (
    pi.product_info_spec_id = ps.product_spec_id
    AND au.user_id = pi.product_seller_id
    AND ci.category_id = ps.product_spec_category_id
    AND pq.product_quantity_spec_id = ps.product_spec_id
    )
WHERE ps.product_spec_is_draft = 0 AND pi.product_depletion_date IS NULL;

-- -----------------------------------------------------
-- View `report_constants`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `report_constants` ;
DROP TABLE IF EXISTS `report_constants`;
CREATE OR REPLACE VIEW report_constants AS
SELECT  5000 as operation_cost,
        0.05 as sales_fee_percent,
        (SELECT COUNT(*) FROM category_info WHERE category_status = 1) as active_category_count,
        TRUNCATE(((SELECT operation_cost)/(SELECT active_category_count)), 2) as operation_cost_per_category;

-- -----------------------------------------------------
-- View `report_data`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `report_data` ;
DROP TABLE IF EXISTS `report_data`;
CREATE OR REPLACE VIEW report_data AS
SELECT  category_info.category_id,
    category_info.category_name,
    invoice_history.invoice_creation_date,
    invoice_item_history.invoice_item_sold_price
FROM  invoice_history INNER JOIN invoice_item_history
    ON (invoice_history.invoice_id = invoice_item_history.invoice_item_invoice_id)
    INNER JOIN product_info
    ON (invoice_item_history.invoice_item_product_id = product_info.product_id)
    INNER JOIN product_specification
    ON (product_info.product_info_spec_id = product_specification.product_spec_id)
    INNER JOIN category_info
    ON (product_specification.product_spec_category_id = category_info.category_id)
WHERE
    product_specification.product_spec_is_draft = 0 AND
    category_info.category_status = 1;

-- -----------------------------------------------------
-- View `report_month`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `report_month` ;
DROP TABLE IF EXISTS `report_month`;
CREATE OR REPLACE VIEW report_month AS
SELECT  category_info.category_id,
    category_info.category_name,
    IFNULL(SUM(invoice_item_sold_price), 0) as category_sales,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price), 0) * (SELECT sales_fee_percent FROM report_constants), 2) as category_profit,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price) * (SELECT sales_fee_percent FROM report_constants) - (SELECT operation_cost_per_category FROM report_constants), 0), 2) as category_revenue
FROM  report_data RIGHT OUTER JOIN category_info
    ON (report_data.category_id = category_info.category_id)
WHERE  category_info.category_status = 1 AND
    (
      report_data.invoice_creation_date IS NULL
      OR
      DATE(report_data.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 30 DAY) AND curdate()
    ) AND
    0 < (  SELECT COUNT(*)
        FROM report_data
        WHERE DATE(report_data.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 30 DAY) AND curdate()
      )
GROUP BY category_info.category_id, category_info.category_name;

-- -----------------------------------------------------
-- View `report_week`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `report_week` ;
DROP TABLE IF EXISTS `report_week`;
CREATE OR REPLACE VIEW report_week AS
SELECT  category_info.category_id,
    category_info.category_name,
    IFNULL(SUM(invoice_item_sold_price), 0) as category_sales,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price), 0) * (SELECT sales_fee_percent FROM report_constants), 2) as category_profit,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price) * (SELECT sales_fee_percent FROM report_constants) - (SELECT operation_cost_per_category FROM report_constants), 0), 2) as category_revenue
FROM  report_data RIGHT OUTER JOIN category_info
    ON (report_data.category_id = category_info.category_id)
WHERE  category_info.category_status = 1 AND
    (
      report_data.invoice_creation_date IS NULL
      OR
      DATE(report_data.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 7 DAY) AND curdate()
    ) AND
    0 < (  SELECT COUNT(*)
        FROM report_data
        WHERE DATE(report_data.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 7 DAY) AND curdate()
      )
GROUP BY category_info.category_id, category_info.category_name;

-- -----------------------------------------------------
-- View `report_day`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `report_day` ;
DROP TABLE IF EXISTS `report_day`;
CREATE OR REPLACE VIEW report_day AS
SELECT  category_info.category_id,
    category_info.category_name,
    IFNULL(SUM(invoice_item_sold_price), 0) as category_sales,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price), 0) * (SELECT sales_fee_percent FROM report_constants), 2) as category_profit,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price) * (SELECT sales_fee_percent FROM report_constants) - (SELECT operation_cost_per_category FROM report_constants), 0), 2) as category_revenue
FROM  report_data RIGHT OUTER JOIN category_info
    ON (report_data.category_id = category_info.category_id)
WHERE  category_info.category_status = 1 AND
    (
      report_data.invoice_creation_date IS NULL
      OR
      DATE(report_data.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 0 DAY) AND curdate()
    ) AND
    0 < (  SELECT COUNT(*)
        FROM report_data
        WHERE DATE(report_data.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 0 DAY) AND curdate()
      )
GROUP BY category_info.category_id, category_info.category_name;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
