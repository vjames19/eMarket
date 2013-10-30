CREATE VIEW products AS
SELECT pi.*, ps.*, au.user_login_user_name AS seller_name, ci.category_name,
(SELECT bid_amount
FROM bid_history INNER JOIN product_info AS P
ON(bid_product_id=P.product_id)
WHERE P.product_id=pi.product_id
ORDER BY bid_creation_date DESC
LIMIT 0,1) AS current_bid
FROM product_info AS pi INNER JOIN product_specification AS ps INNER JOIN active_users AS au
INNER JOIN category_info AS ci
ON (pi.product_info_spec_id=ps.product_spec_id AND au.user_id=pi.product_seller_id
AND ci.category_id=ps.product_spec_category_id)
WHERE ps.product_spec_is_draft=0
