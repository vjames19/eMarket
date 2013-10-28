SELECT product_info.*, product_specification.*
FROM user_info INNER JOIN invoice_history INNER JOIN invoice_item_history INNER JOIN product_info INNER JOIN product_specification
ON (user_id=invoice_user_id 
AND invoice_item_invoice_id=invoice_id 
AND invoice_item_product_id=product_id 
AND product_info_spec_id=product_spec_id)
WHERE user_id=1
ORDER BY invoice_creation_date DESC
