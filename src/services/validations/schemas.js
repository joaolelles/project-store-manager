const Joi = require('joi');

const idSchema = Joi.required();

const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().strict().integer().min(1)
.required(),
});
// const productId = Joi.number().required();
// const quantityReq = Joi.required();
// const quantityMin = Joi.number().integer().min(1);

module.exports = {
  idSchema,
  saleSchema,
};
