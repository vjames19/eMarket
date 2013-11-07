--getAll
SELECT bid_history.*
        FROM bid_history INNER JOIN product_info
        ON (bid_history.bid_product_id = product_info.product_id)
        INNER JOIN product_specification
        ON (product_info.product_info_spec_id = product_specification.product_spec_id)
        WHERE
        product_specification.product_spec_is_draft = FALSE
        AND
        product_specification.product_spec_id = ?
        ORDER BY bid_amount DESC;

--get
SELECT bid_history.*
        FROM bid_history INNER JOIN product_info
        ON (bid_history.bid_product_id = product_info.product_id)
        INNER JOIN product_specification
        ON (product_info.product_info_spec_id = product_specification.product_spec_id)
        WHERE
        product_specification.product_spec_is_draft = FALSE
        AND
        product_specification.product_spec_id = ?
        AND
        bid_history.bid_id = ?
        ORDER BY bid_amount DESC;
