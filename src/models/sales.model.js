const camelize = require('camelize');
const conn = require('./connection');

const selectAll = async () => {
  const [result] = await conn
    .execute(`SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON sp.sale_id = s.id`);
  return camelize(result);
};

const selectById = async (id) => {
  const [result] = await conn
    .execute(`SELECT s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales AS s 
    INNER JOIN StoreManager.sales_products AS sp
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id`, [id]);
  return camelize(result);
};

const creatSale = async () => {
  const [{ insertId }] = await conn
    .execute(`
    INSERT INTO StoreManager.sales (date) VALUES (default)
    `, []);
  return insertId;
};

const insertSale = async (saleId, { productId, quantity }) => {
  await conn.execute(
    `INSERT INTO StoreManager.sales_products
      (sale_id, product_id, quantity) VALUES(?, ?, ?)`,
    [saleId, productId, quantity],
  );
  return { productId, quantity };
};

const selectProductId = async (id) => {
  const [result] = await conn.execute(`
  SELECT product_id FROM StoreManager.sales_products WHERE product_id = ?`, [id]);
  return result;
};

const deleteById = async (id) => { 
  const [result] = await conn.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return result;
};

const updateById = async (id, { quantity, productId }) => { 
  await conn.execute(
    `UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ?
    AND productId = ?`,
    [id, quantity, productId],
  );
  return { quantity, id };
};

const selectSaleId = async (id) => {
  const [result] = await conn.execute(`
  SELECT sale_id FROM StoreManager.sales_products WHERE sale_id = ?`, [id]);
  return result;
};

module.exports = {
  selectAll,
  selectById,
  creatSale,
  insertSale,
  selectProductId,
  deleteById,
  updateById,
  selectSaleId,
};