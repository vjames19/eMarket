INSERT INTO `emarket_test`.`invoice_history`
(`invoice_id`,`invoice_user_id`, `invoice_bank_id`, `invoice_card_id`, `invoice_mail_id`, `invoice_creation_date`)
VALUES
( 1, 1, 1, NULL, 1,     CURRENT_TIMESTAMP),
( 2, 2, NULL, 7, 5,     CURRENT_TIMESTAMP),
( 3, 3, 9, NULL, 9,     CURRENT_TIMESTAMP),
( 4, 4, NULL, 13, 13,   CURRENT_TIMESTAMP),
( 5, 5, 18, NULL, 17,   CURRENT_TIMESTAMP),
( 6, 6, NULL, 24, 21,   CURRENT_TIMESTAMP),
( 7, 7, 26, NULL, 25,   CURRENT_TIMESTAMP),
( 8, 8, NULL, 31, 29,   CURRENT_TIMESTAMP),
( 9, 9, 33, NULL, 33,   CURRENT_TIMESTAMP),
( 10, 10, NULL, 37, 37, CURRENT_TIMESTAMP),
( 11, 11, 41, NULL, 41, CURRENT_TIMESTAMP),
-- ( 12, 12, NULL, 47, 45, CURRENT_TIMESTAMP), -- user 12 hasn't bought anything --
( 13, 13, 50, NULL, 49, CURRENT_TIMESTAMP),
( 14, 14, NULL, 56, 53, CURRENT_TIMESTAMP);
-- ( 15, 15, 58, NULL, 57, CURRENT_TIMESTAMP); -- user 15 hasn't bought anything --
