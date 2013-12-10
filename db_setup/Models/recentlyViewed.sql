-- GET
SELECT products.*
FROM recently_viewed_items INNER JOIN user_info INNER JOIN products
ON (user_id = recently_viewed_user_id AND product_id = recently_viewed_product_id)
WHERE user_id = ? AND recently_viewed_id = ?
ORDER BY recently_viewed_date DESC
LIMIT 0, 10
