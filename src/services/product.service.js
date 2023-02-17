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
  // if (id === Number) return { type: 404, message: productNotFound };
  const product = await productModel.selectById(id);
  if (!product) return { type: 404, message: productNotFound };
  const result = await productModel.updateById(name, id);
  return { type: null, message: result };
}; 

// const deleteById = async (name, id) => {
//   // if (id === Number) return { type: 404, message: productNotFound };
//   const product = await productModel.selectById(id);
//   if (!product) return { type: 404, message: productNotFound };
//   const result = await productModel.deleteById(name, id);
//   return { type: null, message: result };
// }; 

module.exports = {
  selectAll,
  selectById,
  insertProduct,
  updateById,
  // deleteById,
};
