-- GET
SELECT billing_id, billing_recipient_name, billing_telephone, address_address, address_country, address_city, address_geographical_region, address_zipcode
FROM billing_info INNER JOIN address_history INNER JOIN user_info
ON (billing_info.billing_address_id=address_history.address_id) AND (billing_info.billing_user_id=user_info.user_id)
WHERE user_info.user_id = ? AND billing_info.billing_status = 1 AND billing_info.billing_id = ?
ORDER BY address_geographical_region
