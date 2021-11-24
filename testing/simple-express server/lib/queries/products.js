const SQL = require('@nearform/sql');
const { query } = require('../mysql');
const uuid = require('uuid').v4;

const insertProduct = async (name, price) => {
  const id = uuid();
  await query(
    SQL`INSERT INTO products (id, name, price) 
        VALUES (${id}, ${name}, ${price})`
  );
  return id;
}
exports.insertProduct = insertProduct;

const getProducts = (isActive = true) => {
  return query(SQL`SELECT * FROM products WHERE is_active = ${isActive}`);
}
exports.getProducts = getProducts;
