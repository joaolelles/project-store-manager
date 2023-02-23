const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
const { salesService } = require('../../../src/services');
const { salesControler } = require('../../../src/controllers');
const { sales, saleById } = require('./mocks/sales.controller.mock');

describe('Teste de unidade do salesControler', function () {
  describe('Listando as sales', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'selectAll')
        .resolves({ sales });
      // act
      await salesControler.selectAll(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([sales][1]);
    });
    it('Retorna um id invalido', async function () {
      const res = {};
      const req = {
        params: { id: 4 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'selectById')
        .resolves({ type: 'INVALID_VALUE', message: 'Product not found' });

      await salesControler.selectById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    it('Retorna um id valido', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'selectById')
        .resolves(saleById);

      const result = await salesControler.selectById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(result);
    });
    it('Deleta uma sale pelo id', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'deleteById').resolves({ type: null, message: '' });

      await salesControler.deleteById(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});