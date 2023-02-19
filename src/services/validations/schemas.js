const Joi = require('joi');

const idSchema = Joi.required();

const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().strict().integer().min(1)
.required(),
});

module.exports = {
  idSchema,
  saleSchema,
};
