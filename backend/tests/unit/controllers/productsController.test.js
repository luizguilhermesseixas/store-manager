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

  it('Teste se não retorna os produtos buscados pelo id', async function () {
    const res = {};
    const req = {
      params: {
        id: 9999,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductsById').resolves(undefined);

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(undefined);
  });

  it('Testa se foi inserido um novo produto', async function () {
    const res = {};
    const req = {
      body: {
        name: 'Produto X',
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'insertProduct').resolves(productById);

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productById);
  });

  it('Testa se um produto foi atualizado', async function () {
    const res = {};
    const req = {
      body: {
        name: 'Martelo do Batman',
      },
      params: {
        id: '1',
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'updateProduct').resolves({
      status: 200,
      message: {
        id: 1,
        name: 'Martelo do Batman',
      },
    });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      id: 1,
      name: 'Martelo do Batman',
    });
  });

  afterEach(sinon.restore);
});