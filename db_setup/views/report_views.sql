DROP VIEW IF EXISTS `emarket_test`.`report_params`;
DROP VIEW IF EXISTS `emarket_test`.`report_items`;
DROP VIEW IF EXISTS `emarket_test`.`report_month`;
DROP VIEW IF EXISTS `emarket_test`.`report_week`;
DROP VIEW IF EXISTS `emarket_test`.`report_day`;

CREATE VIEW emarket_test.report_params AS
SELECT  5000 as operation_cost,
        0.05 as sales_fee_percent;

CREATE VIEW emarket_test.report_items AS
SELECT  category_info.category_id,
    category_info.category_name,
    invoice_history.invoice_creation_date,
    invoice_item_history.invoice_item_sold_price
FROM  invoice_history INNER JOIN invoice_item_history
    ON (invoice_history.invoice_id = invoice_item_history.invoice_item_invoice_id)
    INNER JOIN product_info
    ON (invoice_item_history.invoice_item_product_id = product_info.product_id)
    INNER JOIN product_specification
    ON (product_info.product_info_spec_id = product_specification.product_spec_id)
    INNER JOIN category_info
    ON (product_specification.product_spec_category_id = category_info.category_id)
WHERE
    product_specification.product_spec_is_draft = 0 AND
    category_info.category_status = 1;

CREATE VIEW emarket_test.report_month AS
SELECT  category_info.category_id,
    category_info.category_name,
    IFNULL(SUM(invoice_item_sold_price), 0) as category_sales,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price), 0) * (SELECT sales_fee_percent FROM report_params), 2) as category_profit,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price) * (SELECT sales_fee_percent FROM report_params) - (SELECT operation_cost/(SELECT COUNT(*) FROM category_info WHERE category_status = 1) FROM report_params), 0), 2) as category_revenue
FROM  report_items RIGHT OUTER JOIN category_info
    ON (report_items.category_id = category_info.category_id)
WHERE  category_info.category_status = 1 AND
    (
      report_items.invoice_creation_date IS NULL
      OR
      DATE(report_items.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 30 DAY) AND curdate()
    ) AND
    0 < (  SELECT COUNT(*)
        FROM report_items
        WHERE DATE(report_items.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 30 DAY) AND curdate()
      )
GROUP BY category_info.category_id, category_info.category_name;


CREATE VIEW emarket_test.report_week AS
SELECT  category_info.category_id,
    category_info.category_name,
    IFNULL(SUM(invoice_item_sold_price), 0) as category_sales,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price), 0) * (SELECT sales_fee_percent FROM report_params), 2) as category_profit,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price) * (SELECT sales_fee_percent FROM report_params) - (SELECT operation_cost/(SELECT COUNT(*) FROM category_info WHERE category_status = 1) FROM report_params), 0), 2) as category_revenue
FROM  report_items RIGHT OUTER JOIN category_info
    ON (report_items.category_id = category_info.category_id)
WHERE  category_info.category_status = 1 AND
    (
      report_items.invoice_creation_date IS NULL
      OR
      DATE(report_items.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 7 DAY) AND curdate()
    ) AND
    0 < (  SELECT COUNT(*)
        FROM report_items
        WHERE DATE(report_items.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 7 DAY) AND curdate()
      )
GROUP BY category_info.category_id, category_info.category_name;

CREATE VIEW emarket_test.report_day AS
SELECT  category_info.category_id,
    category_info.category_name,
    IFNULL(SUM(invoice_item_sold_price), 0) as category_sales,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price), 0) * (SELECT sales_fee_percent FROM report_params), 2) as category_profit,
    TRUNCATE (IFNULL(SUM(invoice_item_sold_price) * (SELECT sales_fee_percent FROM report_params) - (SELECT operation_cost/(SELECT COUNT(*) FROM category_info WHERE category_status = 1) FROM report_params), 0), 2) as category_revenue
FROM  report_items RIGHT OUTER JOIN category_info
    ON (report_items.category_id = category_info.category_id)
WHERE  category_info.category_status = 1 AND
    (
      report_items.invoice_creation_date IS NULL
      OR
      DATE(report_items.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 0 DAY) AND curdate()
    ) AND
    0 < (  SELECT COUNT(*)
        FROM report_items
        WHERE DATE(report_items.invoice_creation_date) BETWEEN DATE_SUB(curdate(), INTERVAL 0 DAY) AND curdate()
      )
GROUP BY category_info.category_id, category_info.category_name;
