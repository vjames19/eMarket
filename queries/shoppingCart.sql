-- GET
SELECT cart_id, cart_item_quantity, user_login_user_name, product_info.*, product_specification.*, product_spec_nonbid_price * cart_item_quantity AS product_total_price
FROM cart_history INNER JOIN cart_item_history INNER JOIN product_info INNER JOIN user_login_info INNER JOIN product_specification
ON (cart_id = cart_item_cart_id AND cart_item_product_id = product_id
AND product_seller_id = user_login_id AND product_info_spec_id = product_spec_id)
WHERE cart_user_id = ? AND cart_id = ?
