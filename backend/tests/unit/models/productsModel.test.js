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

  it('Testa se um novo produto é inserido', async function () {
    const newProduct = {
      id: 5,
      name: 'ProdutoX',
    };

    sinon.stub(connection, 'execute')
    .onFirstCall().resolves([{ insertId: 5 }])
    .onSecondCall()
    .resolves([[newProduct]]);

    sinon.stub(productsModel, 'getProductsById').resolves([[newProduct]]);

    const result = await productsModel.insertProduct('ProdutoX');
    expect(result).to.deep.equal(newProduct);
  });

  it('Testa se um produto é atualizado', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productsModel.updateProduct('Martelo do Batman', '1');
    expect(result).to.equal(1);
  });

  afterEach(sinon.restore);
});