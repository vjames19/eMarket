-- GET
SELECT bank_id, bank_name, bank_account_owner_name, bank_account_type, bank_account_number, bank_routing_number
FROM bank_info
WHERE bank_info.bank_user_id = ? AND bank_info.bank_status = 1 AND bank_info.bank_id = ?
ORDER BY bank_name
