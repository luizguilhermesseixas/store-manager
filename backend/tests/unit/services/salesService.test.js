const { expect } = require('chai');
const sinon = require('sinon');

// const connection = require('../../../src/models/connection');
const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');

const { allSales, saleById } = require('../mocks/salesMock');

describe('Testa a camada service de sales', function () {
  it('Testa se todos as vendas são exibidas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSales);

    const result = await salesService.getAllSales();

    expect(result).to.deep.equal(allSales);
  });

  it('Testa se é exibida a venda quando buscada pelo id', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(saleById);

    const { message } = await salesService.getSalesById(1);

    expect(message).to.deep.equal(saleById);
  });

/*   it('Testa se retorna erro quando a busca pelas vendas não encontra nada', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([]);

    const result = await salesService.getSalesById(9999);

    expect(result).to.deep.equal([]);
  }); */
});