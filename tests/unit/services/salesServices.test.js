const { expect } = require('chai');
const sinon = require('sinon');
const conn = require('../../../src/models/connection');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { sales,
  saleById,
  response,
  saleSucceeded,
  invalidProductId,
  quantityZero,
  quantityNull, } = require('./mocks/sales.service.mock');

describe('Verificando service de sales', function () {
  describe('listagem de as todas sales', function () {
    it('recuperando todas sales', async function () {
      // arrange
      sinon.stub(salesModel, 'selectAll').resolves(sales);
      // act
      const result = await salesService.selectAll();
      // assert
      expect(result.type).to.be.equal(result.null);
      expect(result.message).to.deep.equal([result.message][0]);
    });
    it('retorna as sales por id', async function () {
      sinon.stub(salesModel, 'selectById').resolves([saleById]);

      const result = await salesService.selectById(2);

      expect(result.type).to.be.equal(null);

      expect(result.message).to.deep.equal(result.message);
    });
    it('caso de sucesso: delete sale', async function () {
      sinon.stub(salesModel, 'selectById').resolves(sales[0]);
      sinon.stub(salesModel, 'deleteById').resolves(undefined)

      const result = await salesService.deleteById(1);

      expect(result).to.deep.equal({ type: null, message: '' });
    });
    it('caso de erro: delete sale', async function () {
      sinon.stub(salesModel, 'selectById').resolves([]);

      const result = await salesService.deleteById(20);

      expect(result).to.be.deep.equal({ type: 404, message: 'Sale not found' });
    });
    it('venda feito com sucesso', async function () {
      sinon.stub(conn, "execute").resolves([[sales[0]]]);

      const result = await salesService.insertSale([
        {
          productId: 1,
          quantity: 20,
        },
      ]);
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal({
        id: undefined,
        itemsSold: [
          {
            productId: 1,
            quantity: 20,
          },
        ],
      })
    });
    it('quantity será igual a 0', async function () {
      const responde = await salesService.insertSale(quantityZero)
      expect(responde.type).to.equal(422);
      expect(responde.message).to.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
    it('quantity será null', async function () {
      const responde = await salesService.insertSale(quantityNull)
      expect(responde.type).to.equal(400);
      expect(responde.message).to.equal(
        '"quantity" must be a number'
      );
    });
    it('ProductId inválido', async function () {
      const responde = await salesService.insertSale(invalidProductId)
      expect(responde.type).to.equal(404);
      expect(responde.message).to.equal(
        'Product not found'
      );
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});