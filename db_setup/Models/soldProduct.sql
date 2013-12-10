-- GET
SELECT products.*, user_login_user_name, invoice_item_quantity, invoice_item_sold_price
FROM invoice_history INNER JOIN invoice_item_history INNER JOIN user_login_info INNER JOIN products
ON (invoice_id = invoice_item_invoice_id AND invoice_user_id = user_login_id AND invoice_item_product_id = product_id)
WHERE product_seller_id = ? AND product_id = ?
