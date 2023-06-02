const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');
const productsModel = require('../../../src/models/productsModel');

const { allSales, saleById } = require('../mocks/salesMock');
/* const connection = require('../../../src/models/connection');
 */
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

  it('Testa se as vendas são cadastradas com sucesso', async function () {
    const output = {
      status: 201,
      message: {
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
      },
    };
    
    sinon.stub(salesModel, 'insertSales').resolves(1);

    sinon.stub(productsModel, 'getProductsById')
    .onFirstCall().resolves({ id: 1, name: 'Martelo de Thor' })
    .onSecondCall()
    .resolves({ id: 2, name: 'Traje de encolhimento' });

    sinon.stub(salesModel, 'insertSalesProducts')
    .onFirstCall().resolves(undefined)
    .onSecondCall()
    .resolves(undefined);

    const result = await salesService.insertSalesProducts([
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ]);
    
    expect(result).to.deep.equal(output);
  });

  it('Testa se ao passar um id inválido as vendas não são cadastradas', async function () {
    const output = { status: 404, message: { message: 'Product not found' } };

    sinon.stub(salesModel, 'insertSales').resolves(100);

    sinon.stub(productsModel, 'getProductsById')
      .onFirstCall().resolves(undefined)
      .onSecondCall()
      .resolves(undefined);

    sinon.stub(salesModel, 'insertSalesProducts')
      .onFirstCall().resolves(undefined)
      .onSecondCall()
      .resolves(undefined);

    const result = await salesService.insertSalesProducts([
      {
        productId: 100,
        quantity: 1,
      },
      {
        productId: 100,
        quantity: 5,
      },
    ]);

    expect(result).to.deep.equal(output);
  });
  afterEach(sinon.restore);
});
