--getAll
SELECT bid_history.bid_id, bid_history.bid_amount, bid_history.bid_creation_date, products.seller_name
FROM bid_history INNER JOIN products
ON (bid_history.bid_product_id = products.product_id)
WHERE bid_history.bid_closed_date IS NULL AND products.product_id = ?
ORDER BY bid_amount DESC;

--get
SELECT bid_history.bid_id, bid_history.bid_amount, bid_history.bid_creation_date, products.seller_name
FROM bid_history INNER JOIN products
ON (bid_history.bid_product_id = products.product_id)
WHERE bid_history.bid_closed_date IS NULL AND products.product_id = ? AND bid_history.bid_id = ?
ORDER BY bid_amount DESC;
