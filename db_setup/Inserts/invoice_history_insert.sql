INSERT INTO `emarket_test`.`invoice_history`
(`invoice_id`,`invoice_user_id`, `invoice_bank_id`, `invoice_card_id`, `invoice_creation_date`)
VALUES
( 1, 1, 1, NULL,    CURRENT_TIMESTAMP),
( 2, 2, NULL, 7,    CURRENT_TIMESTAMP),
( 3, 3, 9, NULL,    CURRENT_TIMESTAMP),
( 4, 4, NULL, 13,   CURRENT_TIMESTAMP),
( 5, 5, 18, NULL,   CURRENT_TIMESTAMP),
( 6, 6, NULL, 24,   CURRENT_TIMESTAMP),
( 7, 7, 26, NULL,   CURRENT_TIMESTAMP),
( 8, 8, NULL, 31,   CURRENT_TIMESTAMP),
( 9, 9, 33, NULL,   CURRENT_TIMESTAMP),
( 10, 10, NULL, 37, CURRENT_TIMESTAMP),
( 11, 11, 41, NULL, CURRENT_TIMESTAMP),
-- ( 12, 12, NULL, 47, CURRENT_TIMESTAMP), -- user 12 hasn't bought anything --
( 13, 13, 50, NULL, CURRENT_TIMESTAMP),
( 14, 14, NULL, 56, CURRENT_TIMESTAMP);
-- ( 15, 15, 58, NULL, CURRENT_TIMESTAMP); -- user 15 hasn't bought anything --
