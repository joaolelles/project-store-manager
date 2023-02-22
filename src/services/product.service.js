const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const selectAll = async () => {
  const products = await productModel.selectAll();
  return { products };
}; 

const productNotFound = 'Product not found';

const selectById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const productById = await productModel.selectById(id);
  if (!productById) return { type: 'INVALID_VALUE', message: productNotFound };
  return { productById };
};

const insertProduct = async (product) => {
  const addProductId = await productModel.insertProduct({ product });
  const addProduct = await productModel.selectById(addProductId);
  return { addProduct };
};

const updateById = async (name, id) => {
  const product = await productModel.selectById(id);
  if (!product) return { type: 404, message: productNotFound };
  const result = await productModel.updateById(name, id);
  return { type: null, message: result };
}; 

const deleteById = async (id) => {
  const product = await productModel.selectById(id);
  if (!product) return { type: 404, message: productNotFound };
  await productModel.deleteById(id);
  return { type: null, message: '' };
}; 

const selectByName = async (name) => {
  if (!name) { 
    const products = await productModel.selectAll();
    return { type: null, message: products };
  } 
  const product = await productModel.selectByName(name);
  return { type: null, message: product };
}; 

module.exports = {
  selectAll,
  selectById,
  insertProduct,
  updateById,
  deleteById,
  selectByName,
};
