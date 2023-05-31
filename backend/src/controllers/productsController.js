const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const allProducts = await productsService.findAllProducts();

  return res.status(200).json(allProducts);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const productsById = await productsService.getProductsById(id);
  // console.log(productsById);
  if (!productsById) {
    res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(productsById);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const insertedProduct = await productsService.insertProduct(name);
  // console.log(insertedProduct);

  return res.status(201).json(insertedProduct);
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProduct,
};