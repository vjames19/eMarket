--getAll
SELECT credit_card_id, credit_card_type, credit_card_owner_name,
        credit_card_expiration_date, credit_card_number, credit_card_csv,
        billing_address_id
        FROM credit_card_info INNER JOIN billing_info
        ON ( credit_card_info.credit_card_billing_address_id = billing_info.billing_id )
        WHERE credit_card_info.credit_card_user_id = ? AND credit_card_info.credit_card_status = 1;

--get
SELECT credit_card_id, credit_card_type, credit_card_owner_name,
        credit_card_expiration_date, credit_card_number, credit_card_csv,
        billing_address_id
        FROM credit_card_info INNER JOIN billing_info
        ON ( credit_card_info.credit_card_billing_address_id = billing_info.billing_id )
        WHERE credit_card_info.credit_card_user_id = ? AND credit_card_info.credit_card_status = 1
        AND credit_card_info.credit_card_id = ?;
