const conn = require('./connection');

const selectAll = async () => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products');
  return result;
};

const selectById = async (id) => {
  const [[product]] = await conn.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return product;
};

const insertProduct = async (product) => {
    const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?);',
    [...Object.values(product)],
    );
      return insertId;
};

const updateById = async (name, id) => { 
  const [result] = await conn.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return result;
};

module.exports = {
  selectAll,
  selectById,
  insertProduct,
  updateById,
};