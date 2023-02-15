const { salesModel } = require('../models');

const selectAll = async () => {
  const result = await salesModel.selectAll();
  return { result };
};

const selectById = async (id) => {
  const result = await salesModel.selectById(id);
  if (result.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: result };
};

module.exports = {
  selectAll,
  selectById,
};