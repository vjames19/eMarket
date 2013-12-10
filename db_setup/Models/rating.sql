-- GET
SELECT rating_id, user_login_user_name, rating_value
FROM rating_history INNER JOIN user_login_info
ON (rating_rater_user_id = user_login_info.user_login_id)
WHERE rating_rated_user_id = ? AND rating_id = ?
ORDER BY user_login_user_name

--getAvgRating
SELECT rating_rated_user_id, AVG(rating_value) AS rating_avg
FROM rating_history
WHERE rating_rated_user_id = 1
GROUP BY rating_rated_user_id
