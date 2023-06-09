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
  await conn.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { name, id };
};

const deleteById = async (id) => { 
  const [result] = await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const selectByName = async (name) => { 
  const [result] = await conn.execute(
    `SELECT * FROM StoreManager.products WHERE name LIKE '%${name}%'`,
    [name],
  );
  return result;
};

module.exports = {
  selectAll,
  selectById,
  insertProduct,
  updateById,
  deleteById,
  selectByName,
};