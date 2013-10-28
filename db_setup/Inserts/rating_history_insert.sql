INSERT INTO `emarket_test`.`rating_history`
(`rating_rated_user_id`,`rating_rater_user_id`,`rating_value`)
VALUES

-- 1-6 Rated, Rater --

( 1, 1, 3),
( 1, 2, 0),
( 1, 3, 1),
( 1, 4, 0),
( 1, 5, 0),
( 1, 6, 0),
( 1, 7, 3),
( 1, 8, 4),
( 1, 9, 2),

( 2, 1, 4),
( 2, 2, 2),
( 2, 3, 2),
( 2, 4, 2),
( 2, 5, 4),
( 2, 6, 4),
( 2, 7, 4),
( 2, 8, 4),
( 2, 9, 2),

( 3, 1, 4),
( 3, 2, 0),
( 3, 3, 0),
( 3, 4, 3),
( 3, 5, 2),
( 3, 6, 0),
( 3, 7, 3),
( 3, 8, 1),
( 3, 9, 0),

( 4, 1, 4),
( 4, 2, 1),
( 4, 3, 1),
( 4, 4, 2),
( 4, 5, 1),
( 4, 6, 4),
( 4, 7, 0),
( 4, 8, 1),
( 4, 9, 4),

( 5, 1, 4),
( 5, 2, 4),
( 5, 3, 1),
( 5, 4, 1),
( 5, 5, 3),
( 5, 6, 4),
( 5, 7, 3),
( 5, 8, 1),
( 5, 9, 1),

( 6, 1, 2),
( 6, 2, 2),
( 6, 3, 4),
( 6, 4, 3),
( 6, 5, 2),
( 6, 6, 1),
( 6, 7, 2),
( 6, 8, 2),
( 6, 9, 3),

-- 7, 8, 9 Rated Only, therefore, not listed --

-- 10, 11, 12 Rater Only --

( 10, 1, 2),
( 10, 2, 4),
( 10, 3, 2),
( 10, 4, 4),
( 10, 5, 0),
( 10, 6, 4),
( 10, 7, 4),
( 10, 8, 0),
( 10, 9, 4),

( 11, 1, 1),
( 11, 2, 1),
( 11, 3, 0),
( 11, 4, 1),
( 11, 5, 0),
( 11, 6, 3),
( 11, 7, 4),
( 11, 8, 4),
( 11, 9, 2),

( 12, 1, 4),
( 12, 2, 3),
( 12, 3, 1),
( 12, 4, 3),
( 12, 5, 1),
( 12, 6, 4),
( 12, 7, 2),
( 12, 8, 4),
( 12, 9, 0);

-- 13, 14, 15 None, not rated, no rater --