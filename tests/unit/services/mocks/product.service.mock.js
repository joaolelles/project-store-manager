const products = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const validName = 'Escudo do Capitão América'

const productById = {
  id: 3,
  name: validName
}

const invalidName = 'esc';

module.exports = {
  products,
  productById,
  invalidName,
};