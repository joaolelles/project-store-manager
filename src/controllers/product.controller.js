const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

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

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message, addProduct } = await productService.insertProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(201).json(addProduct);
};

module.exports = {
  selectAll,
  selectById,
  insertProduct,
};