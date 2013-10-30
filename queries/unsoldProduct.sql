-- GET
SELECT product_info.*, product_specification.*
FROM product_info INNER JOIN product_specification
ON (product_info_spec_id = product_spec_id)
WHERE product_seller_id = ? AND product_spec_is_draft = 0 AND product_id NOT IN (
SELECT product_id
FROM invoice_history INNER JOIN invoice_item_history INNER JOIN user_login_info
INNER JOIN product_info INNER JOIN product_specification
ON (invoice_id = invoice_item_invoice_id AND invoice_user_id = user_login_id
AND invoice_item_product_id = product_id AND product_info_spec_id = product_spec_id)
WHERE product_seller_id = ? AND product_id = ?)
