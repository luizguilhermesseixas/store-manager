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

module.exports = {
  getAllSales,
  getSalesById,
};