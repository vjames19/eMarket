-- GET ALL
SELECT * FROM notification_history WHERE notification_user_id = ?
ORDER BY notification_date DESC, notification_is_read ASC
