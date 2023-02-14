const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const conn = require('../../../src/models/connection');
const { products } = require('./mocks/product.model.mock');

describe('Testando a camada model de produtos', function () {
  it('recuperando todos produtos', async function () {
    // Arrange
    sinon.stub(conn, 'execute').resolves([products]);
    // Act
    const result = await productModel.selectAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });

    afterEach(function () {
    sinon.restore();
  });
});