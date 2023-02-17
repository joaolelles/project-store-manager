const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const conn = require('../../../src/models/connection');
const { products, addProduct } = require('./mocks/product.model.mock');

describe('Testando a camada model de produtos', function () {
  it('recuperando todos produtos', async function () {
    // Arrange
    sinon.stub(conn, 'execute').resolves([products]);
    // Act
    const result = await productModel.selectAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });
  it('recuperando um produto pelo id', async function () {
    sinon.stub(conn, 'execute').resolves([[products[0]]]);
    const product = await productModel.selectById(1);

    expect(product).to.be.deep.equal(products[0]);
  });
  it('adicionando um produto pelo id', async function () {
    sinon.stub(conn, 'execute').resolves([{ insertId: 4}]);
    const product = await productModel.insertProduct(addProduct);

    expect(product).to.be.deep.equal(4);
  });

    afterEach(function () {
    sinon.restore();
  });
});