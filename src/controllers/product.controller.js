const { productService } = require('../services');

const selectAll = async (_req, res) => {
  const { products } = await productService.selectAll();
  return res.status(200).json(products);
};

const selectById = async (req, res) => {
  const { id } = req.params;
  const { type, message, productById } = await productService.selectById(id);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(productById);
};

module.exports = { selectAll, selectById };