const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductsById);

router.post('/', productsController.insertProduct);

module.exports = router;