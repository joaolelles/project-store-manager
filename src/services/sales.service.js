const { salesModel } = require('../models');
// const { validateSale } = require('./validations/validationsInputValues');

const selectAll = async () => {
  const result = await salesModel.selectAll();
  return { result };
};

const selectById = async (id) => {
  const result = await salesModel.selectById(id);
  if (result.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: result };
};

// const insertSale = async (sales) => {
//   // validações
//   const errors = sales.map((sale) => validateSale(sale));
//   const findError = errors.find((error) => error.type);
//   if (findError) return findError;
//   // checando banco de dados do product_id
//   const mapProductId = sales.map((sale) => salesModel.selectProductId(sale.productId));
//   const verifyProductId = mapProductId.some((value) => typeof value === 'object');
//   if (verifyProductId === false) return 'Product no found';
//   // a inserÇão de fato 
//   const [insertId] = await salesModel.creatSale();
//   const promiseCreat = sales.map((sale) => salesModel
//     .insertSale(insertId, sale.productId, sale.quantity));
//   const result = await Promise.all(promiseCreat);
//   return result;
// };

module.exports = {
  selectAll,
  selectById,
  // insertSale,
};