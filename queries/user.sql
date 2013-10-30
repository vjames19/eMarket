-- GET
SELECT user_info.*, user_login_email
FROM user_info INNER JOIN user_account_status INNER JOIN user_login_info
ON (user_info.user_id=user_account_status.user_account_id AND user_id=user_login_id)
WHERE user_id = ? AND user_account_status=1
