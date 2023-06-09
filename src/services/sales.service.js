const { salesModel } = require('../models');
const { validateSales } = require('./validations/validationsInputValues');

const selectAll = async () => {
  const result = await salesModel.selectAll();
  console.log(result);
  return { result };
};

const saleNotFound = 'Sale not found';

const selectById = async (id) => {
  const result = await salesModel.selectById(id);
  if (result.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: saleNotFound };
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

const deleteById = async (id) => {
  const sale = await salesModel.selectProductId(id);
  if (!sale.length) return { type: 404, message: saleNotFound };
  await salesModel.deleteById(id);
  return { type: null, message: '' };
}; 

const verifySale = async (id) => { 
  const result = await salesModel.selectById(id);
  return result.length;
};

const updateById = async (id, sales) => {
  if (!await verifySale(id)) return { type: 404, message: 'Sale not found' };
  const errors = sales.map((sale) => validateSales(sale));
  const findError = errors.find((error) => error.type);
  if (findError) {
    if (findError.message.includes('must be greater than or equal to 1')) {
        return { type: 422, message: findError.message };
      }      
    return { type: 400, message: findError.message };
  }
  if (await verifyProductId(sales)) return { type: 404, message: 'Product not found' };
  await salesModel.deleteById(id); // deleta a venda que é editada
  // cria a nova venda
  const mapSales = sales.map((sale) => salesModel.insertSale(id, sale));
  const promiseSales = await Promise.all(mapSales);
  const result = {
   saleId: id,
   itemsUpdated: promiseSales,
  };
  return { type: null, message: result }; 
}; 

module.exports = {
  selectAll,
  selectById,
  verifyProductId,
  insertSale,
  deleteById,
  updateById,
};