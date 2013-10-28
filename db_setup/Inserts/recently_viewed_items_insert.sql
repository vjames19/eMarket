INSERT INTO `emarket_test`.`recently_viewed_items`
(`recently_viewed_user_id`, `recently_viewed_product_id`, `recently_viewed_date`, `recently_viewed_status`)
VALUES
-- 1 - 5 --
( 1, 21, CURRENT_TIMESTAMP, TRUE),
( 1, 78, CURRENT_TIMESTAMP, TRUE),
( 1, 22, CURRENT_TIMESTAMP, TRUE),
( 1, 72, CURRENT_TIMESTAMP, FALSE),
( 1, 13, CURRENT_TIMESTAMP, FALSE),
-- 6 - 10 --
( 2, 73, CURRENT_TIMESTAMP, TRUE),
( 2, 72, CURRENT_TIMESTAMP, TRUE),
( 2, 21, CURRENT_TIMESTAMP, TRUE),
( 2, 62, CURRENT_TIMESTAMP, FALSE),
( 2, 36, CURRENT_TIMESTAMP, FALSE),
-- 11 - 15 --
( 3, 29, CURRENT_TIMESTAMP, TRUE),
( 3, 16, CURRENT_TIMESTAMP, TRUE),
( 3, 76, CURRENT_TIMESTAMP, TRUE),
( 3, 7,  CURRENT_TIMESTAMP, FALSE),
( 3, 40, CURRENT_TIMESTAMP, FALSE),
-- 16 - 20 --
( 4, 38, CURRENT_TIMESTAMP, TRUE),
( 4, 58, CURRENT_TIMESTAMP, TRUE),
( 4, 45, CURRENT_TIMESTAMP, TRUE),
( 4, 59, CURRENT_TIMESTAMP, FALSE),
( 4, 65, CURRENT_TIMESTAMP, FALSE),
-- 21, 23, 25, 27, 29 --
( 5, 62, CURRENT_TIMESTAMP, TRUE),
( 5, 19, CURRENT_TIMESTAMP, TRUE),
( 5, 79, CURRENT_TIMESTAMP, TRUE),
( 5, 37, CURRENT_TIMESTAMP, FALSE),
( 5, 17, CURRENT_TIMESTAMP, FALSE),
-- 31, 33, 35, 37, 39 --
( 6, 67, CURRENT_TIMESTAMP, TRUE),
( 6, 58, CURRENT_TIMESTAMP, TRUE),
( 6, 19, CURRENT_TIMESTAMP, TRUE),
( 6, 29, CURRENT_TIMESTAMP, FALSE),
( 6, 68, CURRENT_TIMESTAMP, FALSE),
-- 41, 43, 45, 47, 49 --
( 7, 39, CURRENT_TIMESTAMP, TRUE),
( 7, 38, CURRENT_TIMESTAMP, TRUE),
( 7, 50, CURRENT_TIMESTAMP, TRUE),
( 7, 21, CURRENT_TIMESTAMP, FALSE),
( 7, 74, CURRENT_TIMESTAMP, FALSE),
-- 51, 53, 55, 57, 59 --
( 8, 48, CURRENT_TIMESTAMP, TRUE),
( 8, 21, CURRENT_TIMESTAMP, TRUE),
( 8, 19, CURRENT_TIMESTAMP, TRUE),
( 8, 7,  CURRENT_TIMESTAMP, FALSE),
( 8, 68, CURRENT_TIMESTAMP, FALSE),
-- 22, 24, 26, 28, 30 --
( 9, 18, CURRENT_TIMESTAMP, TRUE),
( 9, 69, CURRENT_TIMESTAMP, TRUE),
( 9, 23, CURRENT_TIMESTAMP, TRUE),
( 9, 75, CURRENT_TIMESTAMP, FALSE),
( 9, 17, CURRENT_TIMESTAMP, FALSE),
-- 32, 34, 36, 38, 40 --
( 10, 39, CURRENT_TIMESTAMP, TRUE),
( 10, 51, CURRENT_TIMESTAMP, TRUE),
( 10, 66, CURRENT_TIMESTAMP, TRUE),
( 10, 37, CURRENT_TIMESTAMP, FALSE),
( 10, 20, CURRENT_TIMESTAMP, FALSE),
-- 42, 44, 46, 48, 50 --
( 11, 47, CURRENT_TIMESTAMP, TRUE),
( 11, 70, CURRENT_TIMESTAMP, TRUE),
( 11, 43, CURRENT_TIMESTAMP, TRUE),
( 11, 5,  CURRENT_TIMESTAMP, FALSE),
( 11, 28, CURRENT_TIMESTAMP, FALSE),
-- 52, 54, 56, 58, 60 --
( 12, 65, CURRENT_TIMESTAMP, TRUE),
( 12, 44, CURRENT_TIMESTAMP, TRUE),
( 12, 1,  CURRENT_TIMESTAMP, TRUE),
( 12, 48, CURRENT_TIMESTAMP, FALSE),
( 12, 42, CURRENT_TIMESTAMP, FALSE),
-- 61 - 70 --
( 13, 36, CURRENT_TIMESTAMP, TRUE),
( 13, 39, CURRENT_TIMESTAMP, TRUE),
( 13, 2,  CURRENT_TIMESTAMP, TRUE),
( 13, 4,  CURRENT_TIMESTAMP, FALSE),
( 13, 22, CURRENT_TIMESTAMP, FALSE),
-- 71 - 80 --
( 14, 57, CURRENT_TIMESTAMP, TRUE),
( 14, 7,  CURRENT_TIMESTAMP, TRUE),
( 14, 43, CURRENT_TIMESTAMP, TRUE),
( 14, 67, CURRENT_TIMESTAMP, FALSE),
( 14, 61, CURRENT_TIMESTAMP, FALSE);

-- user 15 hasn't browsed anything --
-- ( 15, 65, CURRENT_TIMESTAMP, TRUE),
-- ( 15, 55, CURRENT_TIMESTAMP, TRUE),
-- ( 15, 1,  CURRENT_TIMESTAMP, TRUE),
-- ( 15, 30, CURRENT_TIMESTAMP, FALSE),
-- ( 15, 42, CURRENT_TIMESTAMP, FALSE);