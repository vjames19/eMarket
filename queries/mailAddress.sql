-- GET
SELECT mailing_id, mailing_recipient_name, mailing_telephone, mailing_is_primary, address_address, address_country, address_city, address_geographical_region, address_zipcode
FROM mailing_info INNER JOIN address_history INNER JOIN user_info
ON (mailing_info.mailing_address_id=address_history.address_id) AND (mailing_info.mailing_user_id=user_info.user_id)
WHERE user_info.user_id = ? AND mailing_info.mailing_status = 1 AND mailing_info.mailing_id = ?
ORDER BY address_geographical_region
