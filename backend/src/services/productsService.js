const { productsModel } = require('../models');

const findAllProducts = async () => {
  const allProducts = await productsModel.findAllProducts();
  return allProducts;
};

const getProductsById = async (id) => {
  const result = await productsModel.getProductsById(id);
  return result;
};

const insertProduct = async (product) => {
  const result = await productsModel.insertProduct(product);
  return result;
};

module.exports = {
  findAllProducts,
  getProductsById,
  insertProduct,
};