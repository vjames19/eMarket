INSERT INTO `emarket_test`.`bid_history`
(`bid_user_id`, `bid_product_id`, `bid_amount`, `bid_creation_date`, `bid_closed_date`)
VALUES

-- USER CANNOT BID ON ITS OWN PRODUCT (I'm comparing from other tables) --

-- some use cases --

-- users 3, 4, 5, 6 bid on product 2 from user 1 --
( 3, 2, 11.93, CURRENT_TIMESTAMP, NULL),
( 4, 2, 36.43, CURRENT_TIMESTAMP, NULL),
( 5, 2, 68.73, CURRENT_TIMESTAMP, NULL),
( 6, 2, 94.66, CURRENT_TIMESTAMP, NULL),

-- users 7, 8, 9 bid on product 4 from user 1 --
( 7, 4, 23.78, CURRENT_TIMESTAMP, NULL),
( 8, 4, 41.11, CURRENT_TIMESTAMP, NULL),
( 9, 4, 68.23, CURRENT_TIMESTAMP, NULL),

-- user 1 bids twice on product 6 from user 2 --
( 1, 6, 61.91, CURRENT_TIMESTAMP, NULL),
( 1, 6, 64.37, CURRENT_TIMESTAMP, NULL),

-- user 1 bids once and user 3 bids twice on product 8 from user 2 --
( 1, 8, 68.32, CURRENT_TIMESTAMP, NULL),
( 3, 8, 93.91, CURRENT_TIMESTAMP, NULL),
( 3, 8, 97.23, CURRENT_TIMESTAMP, NULL),

-- user 10 bids once on product 10 from user 2 --
( 10, 10, 11.77, CURRENT_TIMESTAMP, NULL),

-- users 2, 10 bid twice in competition on product 12 from user 3 --
( 2,  12, 38.47, CURRENT_TIMESTAMP, NULL),
( 10, 12, 51.00, CURRENT_TIMESTAMP, NULL),
( 2,  12, 74.56, CURRENT_TIMESTAMP, NULL),
( 10, 12, 89.99, CURRENT_TIMESTAMP, NULL),

-- users 1, 2, 4, 7, 8 bid in competition on product 14 from user 3 --
( 1, 14, 15.00, CURRENT_TIMESTAMP, NULL),
( 2, 14, 17.00, CURRENT_TIMESTAMP, NULL),
( 4, 14, 19.00, CURRENT_TIMESTAMP, NULL),
( 7, 14, 23.00, CURRENT_TIMESTAMP, NULL),
( 8, 14, 26.00, CURRENT_TIMESTAMP, NULL),
( 1, 14, 30.00, CURRENT_TIMESTAMP, NULL),
( 4, 14, 60.00, CURRENT_TIMESTAMP, NULL),
( 8, 14, 90.00, CURRENT_TIMESTAMP, NULL),

-- user 3 bids minimum in product 16 from user 4 -- 
( 3, 16, 2.62, CURRENT_TIMESTAMP, NULL),

-- general users bidding on products --
( 1, 18, 19.11, CURRENT_TIMESTAMP, NULL), -- user 4 --
( 1, 18, 65.46, CURRENT_TIMESTAMP, NULL),
( 2, 20, 39.39, CURRENT_TIMESTAMP, NULL), -- user 4 --
( 2, 20, 89.45, CURRENT_TIMESTAMP, NULL),
( 3, 22, 69.99, CURRENT_TIMESTAMP, NULL), -- user 9 --
( 4, 22, 97.21, CURRENT_TIMESTAMP, NULL),
( 5, 24, 75.23, CURRENT_TIMESTAMP, NULL), -- user 9 --
( 6, 24, 76.67, CURRENT_TIMESTAMP, NULL),
( 7, 26, 27.11, CURRENT_TIMESTAMP, NULL), -- user 9 --
( 8, 26, 95.06, CURRENT_TIMESTAMP, NULL),
( 10, 28, 11.28, CURRENT_TIMESTAMP, NULL), -- user 9 --
( 11, 28, 53.49, CURRENT_TIMESTAMP, NULL),
( 12, 30, 10.08, CURRENT_TIMESTAMP, NULL), -- user 9 --
( 13, 30, 77.45, CURRENT_TIMESTAMP, NULL),
( 13, 32, 34.64, CURRENT_TIMESTAMP, NULL), -- user 10 --
( 13, 32, 74.57, CURRENT_TIMESTAMP, NULL),
( 12, 34, 22.30, CURRENT_TIMESTAMP, NULL), -- user 10 --
( 12, 34, 65.47, CURRENT_TIMESTAMP, NULL),
( 11, 36, 29.44, CURRENT_TIMESTAMP, NULL), -- user 10 --
( 11, 36, 91.39, CURRENT_TIMESTAMP, NULL),
( 9, 38, 50.87, CURRENT_TIMESTAMP, NULL), -- user 10 --
( 8, 38, 59.26, CURRENT_TIMESTAMP, NULL),
( 7, 40, 32.62, CURRENT_TIMESTAMP, NULL), -- user 10 --
( 6, 40, 33.34, CURRENT_TIMESTAMP, NULL),
( 5, 42, 48.72, CURRENT_TIMESTAMP, NULL), -- user 11 --
( 4, 42, 99.60, CURRENT_TIMESTAMP, NULL),
( 3, 44, 15.95, CURRENT_TIMESTAMP, NULL), -- user 11 --
( 2, 44, 64.50, CURRENT_TIMESTAMP, NULL),
( 1, 46, 15.95, CURRENT_TIMESTAMP, NULL), -- user 11 --
( 2, 46, 34.51, CURRENT_TIMESTAMP, NULL),
( 3, 48, 30.79, CURRENT_TIMESTAMP, NULL), -- user 11 --
( 4, 48, 64.80, CURRENT_TIMESTAMP, NULL),
( 5, 50, 54.37, CURRENT_TIMESTAMP, NULL), -- user 11 --
( 6, 50, 54.75, CURRENT_TIMESTAMP, NULL),
( 7, 52, 12.63, CURRENT_TIMESTAMP, NULL), -- user 12 --
( 8, 52, 94.00, CURRENT_TIMESTAMP, NULL),
( 9, 54, 45.66, CURRENT_TIMESTAMP, NULL), -- user 12 --
( 10, 54, 49.20, CURRENT_TIMESTAMP, NULL),
( 11, 56, 61.90, CURRENT_TIMESTAMP, NULL), -- user 12 --
( 11, 56, 62.16, CURRENT_TIMESTAMP, NULL),

-- no bids on product 58,60 --
-- ( , 58, 36.50, CURRENT_TIMESTAMP, NULL), -- user 12 --
-- ( , 58, 77.59, CURRENT_TIMESTAMP, NULL), --
-- ( , 60, 36.32, CURRENT_TIMESTAMP, NULL), -- user 12 --
-- ( , 60, 85.81, CURRENT_TIMESTAMP, NULL), --

( 12, 62, 83.71, CURRENT_TIMESTAMP, NULL), -- user 13 --
( 12, 62, 94.65, CURRENT_TIMESTAMP, NULL),
( 11, 64, 15.85, CURRENT_TIMESTAMP, NULL), -- user 13 --
( 11, 64, 78.31, CURRENT_TIMESTAMP, NULL),
( 10, 66, 28.31, CURRENT_TIMESTAMP, NULL), -- user 13 --
( 10, 66, 82.83, CURRENT_TIMESTAMP, NULL),

-- no bids on product 68,70 --
-- ( , 68, 12.76, CURRENT_TIMESTAMP, NULL), -- user 13 --
-- ( , 68, 51.56, CURRENT_TIMESTAMP, NULL), --
-- ( , 70, 16.62, CURRENT_TIMESTAMP, NULL), -- user 13 --
-- ( , 70, 54.84, CURRENT_TIMESTAMP, NULL), --

( 13, 72, 59.49, CURRENT_TIMESTAMP, NULL), -- user 14 --
( 13, 72, 99.94, CURRENT_TIMESTAMP, NULL),
( 10, 74, 26.71, CURRENT_TIMESTAMP, NULL), -- user 14 --
( 11, 74, 67.81, CURRENT_TIMESTAMP, NULL),
( 12, 76, 75.26, CURRENT_TIMESTAMP, NULL), -- user 14 --
( 13, 76, 82.94, CURRENT_TIMESTAMP, NULL);

-- no bids on product 78,80 --
-- ( , 78, 18.09, CURRENT_TIMESTAMP, NULL), -- user 14 --
-- ( , 78, 65.94, CURRENT_TIMESTAMP, NULL), --
-- ( , 80, 51.72, CURRENT_TIMESTAMP, NULL), -- user 14 --
-- ( , 80, 65.48, CURRENT_TIMESTAMP, NULL); --

-- user 14 didn't do any bids --
-- user 15 is not selling any product nor doing bids --