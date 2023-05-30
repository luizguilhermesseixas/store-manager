const { productsModel } = require('../models');

const findAllProducts = async () => {
  const allProducts = await productsModel.findAllProducts();
  return allProducts;
};

const getProductsById = async (id) => {
  const result = await productsModel.getProductsById(id);
  return result;
};

module.exports = {
  findAllProducts,
  getProductsById,
};