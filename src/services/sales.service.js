const { salesModel } = require('../models');
const { validateSales } = require('./validations/validationsInputValues');

const selectAll = async () => {
  const result = await salesModel.selectAll();
  return { result };
};

const selectById = async (id) => {
  const result = await salesModel.selectById(id);
  if (result.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: result };
};

const verifyProductId = async (sales) => { 
  const mapProductId = sales.map((element) => salesModel.selectProductId(element.productId));
  const result = await Promise.all(mapProductId);
  return result.some((productId) => !productId.length);
};

const insertSale = async (sales) => {
  const errors = sales.map((sale) => validateSales(sale));
  const findError = errors.find((error) => error.type);
  if (findError) {
    if (findError.message.includes('must be greater than or equal to 1')) {
        return { type: 422, message: findError.message };
      }      
    return { type: 400, message: findError.message };
  }
  if (await verifyProductId(sales)) return { type: 404, message: 'Product not found' };
  const insertId = await salesModel.creatSale();
  const mapSales = sales.map((sale) => salesModel.insertSale(insertId, sale));
  const promiseSales = await Promise.all(mapSales);
  const result = {
   id: insertId,
   itemsSold: promiseSales,
  };
  return { type: null, message: result }; 
};

module.exports = {
  selectAll,
  selectById,
  verifyProductId,
  insertSale,
};