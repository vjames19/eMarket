INSERT INTO `cart_item_history`
(`cart_item_cart_id`, `cart_item_product_id`, `cart_item_quantity`, `cart_item_is_bid_item`, `cart_item_creation_date`, `cart_item_purchased_date`, `cart_item_closed_date`)
VALUES
-- user 1 products --
(5, 2, 5, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(3, 4, 11, FALSE, CURRENT_TIMESTAMP, NULL, NULL),

-- user 2 products --
(9, 6, 2, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(3, 10, 3, FALSE, CURRENT_TIMESTAMP, NULL, NULL),

-- user 3 products --
(1, 14, 1, FALSE, CURRENT_TIMESTAMP, NULL, NULL),

-- user 4 products --
(5, 18, 2, FALSE, CURRENT_TIMESTAMP, NULL, NULL),

-- user 9 products --
(3, 22, 7, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(15, 24, 1, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(7, 26, 10, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(1, 28, 3, FALSE, CURRENT_TIMESTAMP, NULL, NULL),

-- user 10 products --
(5, 30, 4, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(11, 32, 1, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(3, 34, 9, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(7, 36, 2, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(13, 38, 7, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(1, 40, 11, FALSE, CURRENT_TIMESTAMP, NULL, NULL),

-- user 11 products --
(15, 42, 1, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(1, 44, 13, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(7, 46, 1, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(3, 48, 6, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(13, 50, 7, FALSE, CURRENT_TIMESTAMP, NULL, NULL),

-- user 12 products --
(11, 52, 1, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(3, 56, 3, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(7, 58, 6, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(1, 60, 4, FALSE, CURRENT_TIMESTAMP, NULL, NULL),

-- user 13 products --
(9, 62, 9, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(5, 64, 4, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(11, 66, 7, FALSE, CURRENT_TIMESTAMP, NULL, NULL),

-- user 14 products --
(5, 70, 1, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(9, 72, 4, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(3, 74, 4, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(7, 76, 3, FALSE, CURRENT_TIMESTAMP, NULL, NULL),
(1, 80, 2, FALSE, CURRENT_TIMESTAMP, NULL, NULL);
