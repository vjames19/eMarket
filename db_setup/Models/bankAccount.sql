--getAll
SELECT bank_id, bank_name, bank_account_owner_name, bank_account_type,
        bank_account_number, bank_routing_number, billing_address_id
        FROM bank_info INNER JOIN billing_info
        ON ( bank_info.bank_billing_address_id = billing_info.billing_id )
        WHERE bank_info.bank_user_id = ? AND bank_info.bank_status = 1
        ORDER BY bank_name;

--get
SELECT bank_id, bank_name, bank_account_owner_name, bank_account_type,
        bank_account_number, bank_routing_number, billing_address_id
        FROM bank_info INNER JOIN billing_info
        ON ( bank_info.bank_billing_address_id = billing_info.billing_id )
        WHERE bank_info.bank_user_id = ? AND bank_info.bank_status = 1 AND bank_info.bank_id = ?
        ORDER BY bank_name;
