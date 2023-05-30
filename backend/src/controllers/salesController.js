const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const allSales = await salesService.getAllSales();

  return res.status(200).json(allSales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.getSalesById(id);

  return res.status(status).json(message);
};

module.exports = {
  getAllSales,
  getSalesById,
};