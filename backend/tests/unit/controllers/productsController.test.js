const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');

const { expect } = chai;
chai.use(sinonChai);

const { allProducts, productById } = require('../mocks/productsMock');

describe('Testa a camada controller', function () {
  it('Testa se retorna todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findAllProducts').resolves(allProducts);

    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Teste se retorna os produtos buscados pelo id', async function () {
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductsById').resolves(productById);

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productById);
  });

  afterEach(sinon.restore);
});