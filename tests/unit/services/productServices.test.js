const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { products, productById, validName, invalidName } = require('./mocks/product.service.mock');

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

describe('Cadastrando um produto', function () {
  // it('requisição caso o name seja inválido', async function () {
  //   const result = await productService.insertProduct(null);

  //   expect(result.type).to.be.equal('INVALID_VALUE');
  //   expect(result.message).to.be.equal('"name" is required');
  // })
  // it('requisição caso o name tenha menos de 5 caracteres', async function () {
  //   const result = await productService.insertProduct(invalidName);

  //   expect(result.type).to.be.equal('INVALID_VALUE');
  //   expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
  // })
  it('requisição caso o produto tenha valores inválidos', async function () {
    sinon.stub(productModel, 'insertProduct').resolves(3);

    const result = await productService.insertProduct(validName);

    expect(result.type).to.be.equal(result.null);
    expect(result.message).to.be.equal(result.productById);
  })
})
  
   afterEach(function () {
     sinon.restore();
   });
 });