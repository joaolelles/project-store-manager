const { salesService } = require('../services');

const selectAll = async (_req, res) => {
  const { result } = await salesService.selectAll();
  return res.status(200).json(result);
};

const selectById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.selectById(id);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

const insertSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.insertSale(sales);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(201).json(message);
};

const deleteById = async (req, res) => { 
  const { id } = req.params;
  const { type, message } = await salesService.deleteById(id);
  if (type) return res.status(type).json({ message });
  return res.status(204).json(message);
};

module.exports = {
  selectAll,
  selectById,
  insertSale,
  deleteById,
};