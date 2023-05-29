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

module.exports = {
  findAllProducts,
  getProductsById,
};