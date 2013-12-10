-- GET
SELECT *,
(SELECT bid_amount
FROM bid_history INNER JOIN product_info as P
ON(bid_product_id=P.product_id)
WHERE P.product_id=pi.product_id
ORDER BY bid_creation_date DESC
LIMIT 0,1) as current_bid
FROM product_info AS pi INNER JOIN product_specification as ps
ON (pi.product_info_spec_id=ps.product_spec_id)
WHERE ps.product_spec_is_draft=0

