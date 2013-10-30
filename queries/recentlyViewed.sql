-- GET
SELECT product_info.*, product_specification.*
FROM recently_viewed_items INNER JOIN user_info INNER JOIN product_info INNER JOIN product_specification
ON (user_id=recently_viewed_user_id AND product_id=recently_viewed_product_id
AND product_info_spec_id=product_spec_id)
WHERE user_id=? AND recently_viewed_id=? AND product_spec_is_draft=0
ORDER BY recently_viewed_date DESC
LIMIT 0, 10
