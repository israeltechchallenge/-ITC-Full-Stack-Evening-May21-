const mysql = require('mysql');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "leodb"
});

const query = (queryText) => {
    return new Promise((resolve, reject) => {
      pool.query(queryText, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

  const getAllTodos = async () => {
    const allTodos = await query(`SELECT * FROM todos`);
    return allTodos;
  };
  
  const addTodo = async (todoText) => {
    const addedTodo = await query(`INSERT INTO todos (text) VALUES ('${todoText}')`);
    console.log(addedTodo);
    return addedTodo;
  };
  
  module.exports = { query, getAllTodos, addTodo };