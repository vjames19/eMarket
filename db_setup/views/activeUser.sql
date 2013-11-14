DROP VIEW IF EXISTS `emarket_test`.`active_users`;

CREATE OR REPLACE VIEW emarket_test.active_users AS
SELECT user_info.*, user_login_user_name, user_login_email
FROM user_info INNER JOIN user_account_status INNER JOIN user_login_info
ON (user_info.user_id = user_account_status.user_account_id AND user_id = user_login_id)
WHERE user_account_status = 1;
