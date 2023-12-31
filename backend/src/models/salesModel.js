const snakeize = require('snakeize');

const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(`
  SELECT
    saleProduct.sale_id AS saleId,
    sale.date,
    saleProduct.product_id AS productId,
    saleProduct.quantity
  FROM
    StoreManager.sales_products saleProduct
  INNER JOIN
    StoreManager.sales sale
  ON
    sale.id = saleProduct.sale_id
  ORDER BY
    saleProduct.sale_id;`);
  return result;
};

const getSalesById = async (id) => {
  const [result] = await connection.execute(`
  SELECT
    sale.date,
    saleProduct.product_id AS productId,
    saleProduct.quantity
  FROM StoreManager.sales_products saleProduct
  INNER JOIN StoreManager.sales sale
  ON
    sale.id = saleProduct.sale_id
  WHERE
    saleProduct.sale_id = ?
  ORDER BY
    saleProduct.sale_id;
`, [id]);
  return result;
};

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales() VALUE();',
  );
  return insertId;
};

const insertSalesProducts = async (salesProducts) => {
  const columns = Object.keys(snakeize(salesProducts))
    .map((eachKey) => `${eachKey}`)
    .join(', ');

  const columnValues = Object.keys(salesProducts)
    .map((_eachKey) => '?')
    .join(', ');

  await connection.execute(
    `
    INSERT INTO StoreManager.sales_products (${columns})
    VALUE (${columnValues});`,
    [...Object.values(salesProducts)],
  );
};

module.exports = {
  getAllSales,
  getSalesById,
  insertSales,
  insertSalesProducts,
};