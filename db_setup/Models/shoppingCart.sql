-- GET
SELECT cart_id, cart_item_quantity, product_spec_nonbid_price * cart_item_quantity AS product_total_price, products.*
FROM cart_history INNER JOIN cart_item_history INNER JOIN products
ON (cart_id = cart_item_cart_id AND cart_item_product_id = product_id)
WHERE cart_user_id = ? and cart_id = ?
