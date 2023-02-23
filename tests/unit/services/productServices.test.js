const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { products, validName } = require('./mocks/product.service.mock');

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
    it('retorna erro com o id inexistente', async function () {
      sinon.stub(productModel, 'selectById').resolves(undefined);

      const result = await productService.selectById(20);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('Product not found');
    });
    it('deleta um produto', async function () {
      sinon.stub(productModel, 'selectById').resolves([products[0]]);
      sinon.stub(productModel, 'deleteById').resolves(undefined);

      const result = await productService.deleteById(1);

      expect(result).to.deep.equal({ type: null, message: '' });
    });

    it('retorna erro ao deletar um produto inexistente', async function () {

      const result = await productService.deleteById(20);

      expect(result).to.be.deep.equal({ type: 404, message: 'Product not found' });
    });
  });

  describe('Cadastrando um produto', function () {
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