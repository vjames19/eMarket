-- GET
SELECT invoice_id, sum(invoice_item_quantity * invoice_item_sold_price) as total, invoice_creation_date
FROM invoice_history inner join user_info inner join invoice_item_history
ON (invoice_history.invoice_id=user_info.user_id AND invoice_id=invoice_item_id)
WHERE user_id = ?
GROUP BY invoice_id, invoice_creation_date
ORDER BY invoice_creation_date desc
