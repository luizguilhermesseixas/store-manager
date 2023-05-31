const dateSale1 = '2023-05-30T21:34:56.000Z';

const allSales = [
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

const saleById = [
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

module.exports = {
  allSales,
  saleById,
};