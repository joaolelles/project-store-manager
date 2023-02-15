const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { products } = require('./mocks/product.service.mock');

describe('Verificando service dos produtos', function () {
  describe('listagem de os todos produtos', function () {
    it('recuperando todos produtos', async function () {
      // arrange
      sinon.stub(productModel, 'selectAll').resolves(products);  
      // act
      const result = await productService.selectAll();
      // assert
      expect(result.type).to.be.equal(result.null);
      expect(result.message).to.deep.equal([result.message][0]);
    });
    it('retorna os produtos por id', async function () {
      sinon.stub(productModel, 'selectById').resolves([products[1]]);

      const result = await productService.selectById(2);

      expect(result.type).to.be.equal(result.null);
      
      expect(result.message).to.deep.equal(result.message);
    });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });