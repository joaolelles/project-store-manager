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
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });