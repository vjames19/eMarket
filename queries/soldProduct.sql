-- GET
SELECT product_info.*, product_specification.*, user_login_user_name, invoice_item_quantity, invoice_item_sold_price
FROM invoice_history INNER JOIN invoice_item_history INNER JOIN user_login_info
INNER JOIN product_info INNER JOIN product_specification
ON (invoice_id = invoice_item_invoice_id AND invoice_user_id = user_login_id
AND invoice_item_product_id = product_id AND product_info_spec_id = product_spec_id)
WHERE product_seller_id = ? AND product_id = ?
