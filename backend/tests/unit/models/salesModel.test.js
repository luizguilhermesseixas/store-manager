const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');

const { allSales, saleById } = require('../mocks/salesMock');

describe('Testa a camada model de sales', function () {
  it('Testa se retorna todas as vendas', async function () {
    const dateSale1 = '2023-05-30T21:34:56.000Z';
    const sales = [
      {
        saleId: 1,
        date: dateSale1,
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: dateSale1,
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: '2023-05-30T21:34:56.000Z',
        productId: 3,
        quantity: 15,
      },
    ];

    sinon.stub(connection, 'execute').resolves([allSales]);

    const result = await salesModel.getAllSales();

    expect(result).to.deep.equal(sales);
  });

  it('Testa se retorna a venda correta a partir da busca pelo id', async function () {
    const sale = [
      {
        date: '2023-05-30T21:34:56.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2023-05-30T21:34:56.000Z',
        productId: 2,
        quantity: 10,
      },
    ];

    sinon.stub(connection, 'execute').resolves([saleById]);

    const result = await salesModel.getSalesById(1);
    expect(result).to.deep.equal(sale);
  });

  it('Testa se foi inserida uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);
    const result = await salesModel.insertSalesProducts([
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ]);
    expect(result).to.deep.equal(undefined);
  });

  it('Testa se retorna o id da venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await salesModel.insertSales();
    expect(result).to.deep.equal(1);
  });

  afterEach(sinon.restore);
});