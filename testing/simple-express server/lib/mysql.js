const mysql = require('mysql');
const Postgrator = require('postgrator')
const path = require('path');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
exports.pool = pool;

const query = (sql) => new Promise((res, rej) => {
  pool.query(sql, (err, results) => {
    if (err) {
      rej(err);
    } else {
      res(results);
    }
  })
})
exports.query = query;

const postgrator = new Postgrator({
  migrationDirectory: path.resolve(__dirname, '../migrations'),
  driver: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  schemaTable: 'migrations',
});

exports.migrate = function () {
  return postgrator.migrate();
};