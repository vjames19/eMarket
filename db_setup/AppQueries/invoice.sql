-- GET
SELECT invoice_id, SUM(invoice_item_sold_price) AS total, invoice_creation_date
FROM invoice_history INNER JOIN user_info INNER JOIN invoice_item_history
ON (invoice_history.invoice_user_id=user_info.user_id AND invoice_id=invoice_item_id)
WHERE invoice_user_id = 1
GROUP BY invoice_item_invoice_id, invoice_creation_date
ORDER BY invoice_creation_date DESC
