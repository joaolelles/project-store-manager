const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const conn = require('../../../src/models/connection');
const { sales, saleById, singleSale } = require('./mocks/sales.model.mock');

describe('Testando a camada model de sales', function () {
  it('recuperando todas sales', async function () {
    // Arrange
    sinon.stub(conn, 'execute').resolves([sales]);
    // Act
    const result = await salesModel.selectAll();
    // Assert
    expect(result).to.be.deep.equal(sales);
  });
  it('recuperando uma sale pelo id', async function () {
    sinon.stub(conn, 'execute').resolves([saleById]);
    const sale = await salesModel.selectById(1);

    expect(sale).to.be.deep.equal(saleById);
  });
  it('testa se deleta a venda', async function () {
    sinon.stub(conn, 'execute').resolves(undefined);

    const sale = await salesModel.deleteById(1);

    expect(sale).to.be.deep.equal(undefined);
  });
  it('testa a venda pelo id', async function () {
    sinon.stub(conn, 'execute').resolves([{ insertId: 1 }]);
    const sale = await salesModel.creatSale();

    expect(sale).to.be.deep.equal(1);
  });
  it('testa se a venda é adicionada', async function () {
    sinon.stub(conn, 'execute').resolves({ productId: 1, quantity: 5 });
    const sale = await salesModel.insertSale(1, singleSale);

    expect(sale).to.be.deep.equal({ productId: 1, quantity: 5 });
  });

  afterEach(function () {
    sinon.restore();
  });
});