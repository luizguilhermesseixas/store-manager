const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');

const { allProducts, productById } = require('../mocks/productsMock');

describe('Testa a camada model', function () {
  it('Testa se retorna todos os produtos', async function () {
    const products = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do Capitão América',
      },
    ];
    sinon.stub(connection, 'execute').resolves([allProducts]);
    
    const result = await productsModel.findAllProducts();

    expect(result).to.deep.equal(products);
  });

  it('Testa se retorna o produto correto a partir da busca pelo id', async function () {
    const product = {
      id: 1,
      name: 'Martelo de Thor',
    };

    sinon.stub(connection, 'execute').resolves([[productById]]);

    const result = await productsModel.getProductsById(1);
    expect(result).to.deep.equal(product);
  });

  afterEach(sinon.restore);
});