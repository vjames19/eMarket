--get
SELECT user_info.*, user_login_email, user_login_user_name
        FROM user_info INNER JOIN user_account_status INNER JOIN user_login_info
        ON (user_info.user_id=user_account_status.user_account_id AND user_id=user_login_id)
        WHERE user_id = ? AND user_account_status=1;

--getAll
SELECT user_info.*, user_login_email, user_login_user_name
        FROM user_info INNER JOIN user_account_status INNER JOIN user_login_info
        ON user_info.user_id = user_account_status.user_account_id AND user_id = user_login_id
        WHERE user_account_status = 1 ;

--authenticate
SELECT user_id, user_login_user_name
        FROM user_login_info INNER JOIN user_info INNER JOIN user_account_status
        ON (user_login_id=user_id AND user_id=user_account_id)
        WHERE user_login_user_name = ? AND user_login_password = SHA1(?) AND user_account_status=1;
