SELECT bid_history.*, MAX(bid_amount) AS highest_bid, products.*
FROM bid_history INNER JOIN active_users INNER JOIN products
ON (bid_user_id = user_id AND bid_product_id = product_id)
WHERE user_id = ? AND bid_id = ?
GROUP BY bid_product_id
ORDER BY bid_creation_date DESC
