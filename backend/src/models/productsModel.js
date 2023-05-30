const connection = require('./connection');

const findAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products;');
  console.log(result);
  return result;
};

const getProductsById = async (id) => {
  const [[result]] = await 
  connection.execute(' SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id;', [id]);
  return result;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await 
  connection.execute('INSERT INTO StoreManager.products(name) VALUE(?);', [product]);

  const insertedProduct = await getProductsById(insertId);
  return insertedProduct;
};

module.exports = {
  findAllProducts,
  getProductsById,
  insertProduct,
};