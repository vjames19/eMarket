-- GET
SELECT products.*
FROM user_info INNER JOIN invoice_history INNER JOIN invoice_item_history INNER JOIN products
ON (user_id=invoice_user_id
AND invoice_item_invoice_id=invoice_id
AND invoice_item_product_id=product_id)
WHERE user_id=?
ORDER BY invoice_creation_date DESC


