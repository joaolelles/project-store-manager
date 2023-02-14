const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const selectAll = async () => {
  const products = await productModel.selectAll();
  return { products };
}; 

const selectById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const productById = await productModel.selectById(id);
  if (!productById) return { type: 'INVALID_VALUE', message: 'Product not found' };
  return { productById };
};

const insertProduct = async (product) => {
  const addProductId = await productModel.insertProduct({ product });
  const addProduct = await productModel.selectById(addProductId);
  return { addProduct };
};

module.exports = {
  selectAll,
  selectById,
  insertProduct,
};
