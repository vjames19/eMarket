-- GET
SELECT product_drafts.*, product_specification.*
FROM product_drafts INNER JOIN product_specification
ON (product_drafts.product_draft_spec_id = product_specification.product_spec_id)
WHERE product_draft_user_id = ? AND product_draft_id = ?
ORDER BY product_draft_creation_date DESC
