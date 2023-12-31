const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');

const { allProducts, productById } = require('../mocks/productsMock');

describe('Testa a camada service', function () {
  it('Testa se todos os produtos são exibidos', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(allProducts);

    const result = await productsService.findAllProducts();

    expect(result).to.deep.equal(allProducts);
  });

  it('Testa se é exibido o produto quando buscado pelo id', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(productById);

    const result = await productsService.getProductsById(1);

    expect(result).to.deep.equal(productById);
  });

  it('Testa se foi inserido um novo produto', async function () {
    const newProduct = {
      id: 4,
      name: 'Produto X',
    };

    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    sinon.stub(productsModel, 'insertProduct').resolves(newProduct);

    const insert = await productsService.insertProduct('Produto X');

    expect(insert).to.deep.equal(newProduct);
  });
  it('Testa se o produto foi atualizado', async function () {
    const output = {
      status: 200,
      message: {
        id: 1,
        name: 'Martelo do Batman',
    },
    };

    sinon.stub(productsModel, 'getProductsById').resolves({ id: 1, name: 'Martelo do Batman' });
    sinon.stub(productsModel, 'updateProduct').resolves(1);
    const result = await productsService.updateProduct('Martelo do Batman', '1');
    expect(result).to.deep.equal(output);
  });

  it('Testa se o produto não é atualizado caso o id seja inválido', async function () {
    const output = {
      status: 404,
      message: {
        message: 'Product not found',
      },
    };

    sinon.stub(productsModel, 'getProductsById').resolves(undefined);
    const result = await productsService.updateProduct('Martelo do Batman', '999');
    expect(result).to.deep.equal(output);
  });

  afterEach(sinon.restore);
});