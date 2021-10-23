"use strict";

var mysql = require('mysql');

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "leodb"
});

var query = function query(queryText) {
  return new Promise(function (resolve, reject) {
    pool.query(queryText, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

var getAllTodos = function getAllTodos() {
  var allTodos;
  return regeneratorRuntime.async(function getAllTodos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(query("SELECT * FROM todos"));

        case 2:
          allTodos = _context.sent;
          return _context.abrupt("return", allTodos);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var addTodo = function addTodo(todoText) {
  var addedTodo;
  return regeneratorRuntime.async(function addTodo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(query("INSERT INTO todos (text) VALUES ('".concat(todoText, "')")));

        case 2:
          addedTodo = _context2.sent;
          console.log(addedTodo);
          return _context2.abrupt("return", addedTodo);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  query: query,
  getAllTodos: getAllTodos,
  addTodo: addTodo
};