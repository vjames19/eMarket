SELECT products.*
FROM invoice_history INNER JOIN active_users INNER JOIN invoice_item_history INNER JOIN products
ON (invoice_history.invoice_id=user_id AND invoice_id=invoice_item_id AND products.product_id=invoice_item_product_id)
WHERE user_id = ? AND invoice_history.invoice_id = ?
