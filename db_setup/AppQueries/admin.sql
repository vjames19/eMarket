--getAll
SELECT admin_info.*
        FROM admin_info
        WHERE admin_account_status = 1;

--get
SELECT admin_info.*
        FROM admin_info
        WHERE admin_id = ? AND admin_account_status = 1;

--authenticate
SELECT admin_id, admin_user_name
        FROM admin_info
        WHERE admin_user_name = ? AND admin_password = SHA1(?) AND admin_account_status = 1;
