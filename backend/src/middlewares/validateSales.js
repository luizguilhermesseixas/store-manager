const validateProductId = (req, res, next) => {
  const salesProducts = req.body;
  const productId = salesProducts.every((product) => product.productId);
  if (!productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();
};

const validateQuantity = (req, res, next) => {
  const salesProducts = req.body;
  const quantity = salesProducts.every((product) => product.quantity);
  const verifyQuantity = salesProducts.some((product) => product.quantity <= 0);
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (verifyQuantity) {
    return res.status(404).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  
  return next();
};

module.exports = {
  validateProductId,
  validateQuantity,
};