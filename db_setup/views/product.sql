DROP TABLE IF EXISTS `products`;
DROP VIEW IF EXISTS `products`;

CREATE OR REPLACE VIEW products AS
SELECT pi.*, ps.*, pq.product_quantity_remaining, au.user_login_user_name AS seller_name,
ci.category_id, ci.category_name,
(
  SELECT bid_amount
  FROM bid_history INNER JOIN product_info AS P
  ON(bid_product_id = P.product_id)
  WHERE P.product_id = pi.product_id
  ORDER BY bid_amount DESC
  LIMIT 0,1
) AS current_bid
FROM product_info AS pi INNER JOIN product_specification AS ps INNER JOIN active_users AS au
INNER JOIN category_info AS ci INNER JOIN product_quantity_record as pq
ON (
    pi.product_info_spec_id = ps.product_spec_id
    AND au.user_id = pi.product_seller_id
    AND ci.category_id = ps.product_spec_category_id
    AND pq.product_quantity_spec_id = ps.product_spec_id
    )
WHERE ps.product_spec_is_draft = 0 AND pi.product_depletion_date IS NULL;
