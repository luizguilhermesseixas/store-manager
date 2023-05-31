const { salesModel } = require('../models');

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

const mapSales = (message) => {
  const itemsSold = message.map((sale) => {
    const eachSale = sale;
    delete eachSale.date;
    return eachSale;
  });
  return itemsSold;
};

const insertSalesProducts = async (salesProducts) => {
  const saleId = await salesModel.insertSales();
  const salesObj = salesProducts.map((product) => ({
    ...product,
    saleId,
  }));
  await Promise.all(
    salesObj.map(async (product) => salesModel.insertSalesProducts(product)),
  );
  
  const { message } = await getSalesById(saleId);

  const itemsSold = mapSales(message);
  return {
    status: 201,
    message: {
      id: saleId,
      itemsSold,
    },
  };
};

module.exports = {
  getAllSales,
  getSalesById,
  insertSalesProducts,
};