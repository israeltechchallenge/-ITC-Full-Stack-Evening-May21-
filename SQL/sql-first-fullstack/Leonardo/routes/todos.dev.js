"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../data/todosDb.js"),
    query = _require.query,
    getAllTodos = _require.getAllTodos,
    addTodo = _require.addTodo;

query("CREATE TABLE IF NOT EXISTS todos (\n    id      INT(200) AUTO_INCREMENT,\n    text    VARCHAR(255) NOT NULL,\n    created_date  DATE DEFAULT (CURRENT_DATE),\n    PRIMARY KEY(id))").then(function () {
  return console.log("Table Created");
})["catch"](function (err) {
  return console.log(err);
});
router.get("/", function _callee(req, res) {
  var allTodos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getAllTodos());

        case 2:
          allTodos = _context.sent;
          res.send(allTodos);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/", function _callee2(req, res) {
  var text, addedTodo;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          text = req.body.text;
          _context2.next = 3;
          return regeneratorRuntime.awrap(addTodo(text));

        case 3:
          addedTodo = _context2.sent;
          res.send("Todo Added");

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;