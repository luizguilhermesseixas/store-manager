const { salesModel } = require('../models');
const { productsModel } = require('../models');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const getSalesById = async (id) => {
  const salesById = await salesModel.getSalesById(id);

  if (salesById.length === 0) {
    return {
      status: 404,
      message: {
      message: 'Sale not found',
    },
    };
  }

  return {
    status: 200,
    message: salesById,
  };
};

const validateIdOnDb = async (salesProducts) => {
 const result = await Promise.all(salesProducts
  .map((product) => productsModel.getProductsById(product.productId)));
  return result;
};

const createSalesObj = (salesProducts, saleId) => {
  const obj = salesProducts.map((product) => ({
    ...product,
    saleId,
  }));

  return obj;
};

const insertProducts = async (salesObj) => {
  await Promise.all(
    salesObj.map(async (product) => salesModel.insertSalesProducts(product)),
  );
};

const saleNotFound = {
  status: 404,
  message: {
    message: 'Sale not found',
  },
}; 

const insertSalesProducts = async (salesProducts) => {
  const saleId = await salesModel.insertSales();
  const salesObj = createSalesObj(salesProducts, saleId);
  const validatedId = await validateIdOnDb(salesProducts);
  const checkId = validatedId.some((product) => product === undefined);

  if (checkId) {
    return saleNotFound;
  }
  
  await insertProducts(salesObj);

  return {
    status: 201,
    message: {
      id: saleId,
      itemsSold: salesProducts,
    },
  };
};

module.exports = {
  getAllSales,
  getSalesById,
  insertSalesProducts,
};