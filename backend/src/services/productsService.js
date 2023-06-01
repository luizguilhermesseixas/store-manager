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

const updateProduct = async (product, productId) => {
  const findProduct = await getProductsById(productId);
  if (!findProduct) {
    return {
      status: 404,
      message: {
        message: 'Product not found',
      },
    };
  }

  await productsModel.updateProduct(product, productId);

  return {
    status: 200,
    message: {
      id: Number(productId),
      name: product,
    },
  };
};

module.exports = {
  findAllProducts,
  getProductsById,
  insertProduct,
  updateProduct,
};