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
    INSERT INTO StoreManager.sales () VALUES ()
    `);
  return insertId;
};

const insertSale = async (saleId, productId, quantity) => {
  const [result] = await conn.execute(`
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)
  `, [saleId, productId, quantity]);
  return camelize(result);
};

const selectProductId = async (id) => {
  const [result] = await conn.execute(`
  SELECT product_id FROM StoreManager.sale_products WHERE product_id = ?`, [id]);
  return result;
};

module.exports = {
  selectAll,
  selectById,
  creatSale,
  insertSale,
  selectProductId,
};