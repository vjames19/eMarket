-- GET
SELECT *
FROM product_info INNER JOIN product_specification
ON (product_info.product_info_spec_id=product_specification.product_spec_id)
WHERE product_specification.product_spec_is_draft=0 AND product_info.product_id = ?
