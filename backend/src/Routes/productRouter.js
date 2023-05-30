const express = require('express');
const { productsController } = require('../controllers');
const { validateName } = require('../middlewares/validateProducts');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductsById);

router.post('/', validateName, productsController.insertProduct);

module.exports = router;