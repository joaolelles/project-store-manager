const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { sales, saleById } = require('./mocks/sales.service.mock');

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
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });