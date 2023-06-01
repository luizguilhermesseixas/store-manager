const express = require('express');
const { salesController } = require('../controllers');
const { validateProductId, validateQuantity } = require('../middlewares/validateSales');

const router = express.Router();

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSalesById);

router.post('/', validateProductId, validateQuantity, salesController.insertSalesProducts);

module.exports = router;