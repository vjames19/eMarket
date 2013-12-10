INSERT INTO `payment_history`
(`payment_id`, `payment_sender_user_id`, `payment_recipient_user_id`, `payment_amount`, `payment_method`, `payment_card_id`, `payment_bank_id`, `payment_transaction_time`, `payment_is_finished`)
VALUES
(1, 1, 2, '8741.33', 'Bank', NULL, 1, CURRENT_TIMESTAMP, FALSE),
(2, 1, 11, '3276.50', 'Bank', NULL, 1, CURRENT_TIMESTAMP, FALSE),
(3, 1, 12, '5551.60', 'Bank', NULL, 1, CURRENT_TIMESTAMP, FALSE),
(4, 2, 1, '20235.60', 'Card', 7, NULL, CURRENT_TIMESTAMP, FALSE),
(5, 2, 11, '1953.40', 'Card', 7, NULL, CURRENT_TIMESTAMP, FALSE),
(6, 2, 12, '186.95', 'Card', 7, NULL, CURRENT_TIMESTAMP, FALSE),
(7, 2, 1, '963.60', 'Card', 7, NULL, CURRENT_TIMESTAMP, FALSE),
(8, 3, 1, '823.95', 'Bank', NULL, 9, CURRENT_TIMESTAMP, FALSE),
(9, 3, 11, '2081.60', 'Bank', NULL, 9, CURRENT_TIMESTAMP, FALSE),
(10, 3, 12, '27482.00', 'Bank', NULL, 9, CURRENT_TIMESTAMP, FALSE),
(11, 4, 11, '1914.27', 'Card', 13, NULL, CURRENT_TIMESTAMP, FALSE),
(12, 4, 12, '29.48', 'Card', 13, NULL, CURRENT_TIMESTAMP, FALSE),
(13, 5, 2, '6790.96', 'Bank', NULL, 18, CURRENT_TIMESTAMP, FALSE),
(14, 5, 10, '1961.40', 'Bank', NULL, 18, CURRENT_TIMESTAMP, FALSE),
(15, 5, 12, '997.74', 'Bank', NULL, 18, CURRENT_TIMESTAMP, FALSE),
(16, 6, 2, '12072.84', 'Card', 24, NULL, CURRENT_TIMESTAMP, FALSE),
(17, 6, 10, '23245.82', 'Card', 24, NULL, CURRENT_TIMESTAMP, FALSE),
(18, 6, 13, '3194.48', 'Card', 24, NULL, CURRENT_TIMESTAMP, FALSE),
(19, 7, 3, '1023.84', 'Bank', NULL, 26, CURRENT_TIMESTAMP, FALSE),
(20, 7, 10, '3085.60', 'Bank', NULL, 26, CURRENT_TIMESTAMP, FALSE),
(21, 7, 13, '11973.20', 'Bank', NULL, 26, CURRENT_TIMESTAMP, FALSE),
(22, 8, 3, '2301.35', 'Card', 31, NULL, CURRENT_TIMESTAMP, FALSE),
(23, 8, 10, '421.68', 'Card', 31, NULL, CURRENT_TIMESTAMP, FALSE),
(24, 8, 13, '5085.00', 'Card', 31, NULL, CURRENT_TIMESTAMP, FALSE),
(25, 9, 4, '4162.62', 'Bank', NULL, 33, CURRENT_TIMESTAMP, FALSE),
(26, 9, 10, '2476.76', 'Bank', NULL, 33, CURRENT_TIMESTAMP, FALSE),
(27, 9, 13, '29046.85', 'Bank', NULL, 33, CURRENT_TIMESTAMP, FALSE),
(28, 10, 4, '31468.48', 'Card', 37, NULL, CURRENT_TIMESTAMP, FALSE),
(29, 10, 11, '9444.00', 'Card', 37, NULL, CURRENT_TIMESTAMP, FALSE),
(30, 10, 13, '9310.10', 'Card', 37, NULL, CURRENT_TIMESTAMP, FALSE),
(31, 10, 14, '722.28', 'Card', 37, NULL, CURRENT_TIMESTAMP, FALSE),
(32, 11, 4, '270.45', 'Bank', NULL, 41, CURRENT_TIMESTAMP, FALSE),
(33, 11, 9, '605.18', 'Bank', NULL, 41, CURRENT_TIMESTAMP, FALSE),
(34, 11, 14, '13049.14', 'Bank', NULL, 41, CURRENT_TIMESTAMP, FALSE),
(35, 11, 14, '5119.74', 'Bank', NULL, 41, CURRENT_TIMESTAMP, FALSE),
(36, 13, 9, '201.12', 'Bank', NULL, 50, CURRENT_TIMESTAMP, FALSE),
(37, 13, 9, '9192.60', 'Bank', NULL, 50, CURRENT_TIMESTAMP, FALSE),
(38, 13, 14, '7679.25', 'Bank', NULL, 50, CURRENT_TIMESTAMP, FALSE),
(39, 14, 9, '2196.68', 'Card', 56, NULL, CURRENT_TIMESTAMP, FALSE),
(40, 14, 9, '375.73', 'Card', 56, NULL, CURRENT_TIMESTAMP, FALSE);