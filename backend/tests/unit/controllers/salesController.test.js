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

  it('Testa se insere as vendas no banco de dados', async function () {
    const res = {};
    const req = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    const message = {
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'insertSalesProducts').resolves({
      status: 201,
      message,
    });

    await salesController.insertSalesProducts(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(message);
  });

  afterEach(sinon.restore);
});