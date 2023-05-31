const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');

const { expect } = chai;
chai.use(sinonChai);

const { allSales, saleById } = require('../mocks/salesMock');

describe('Testa a camada controller de sales', function () {
  it('Testa se retorna todas as vendas', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAllSales').resolves(allSales);

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });

  it('Teste se retorna as vendas buscadas pelo id', async function () {
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const { status, message } = sinon.stub(salesService, 'getSalesById').resolves(saleById);

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(status);
    expect(res.json).to.have.been.calledWith(message);
  });

  afterEach(sinon.restore);
});