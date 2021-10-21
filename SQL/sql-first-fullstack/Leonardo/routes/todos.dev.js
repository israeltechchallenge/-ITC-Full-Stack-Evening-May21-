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
router.get("/", function (req, res) {
  var allTodos = getAllTodos();
  res.send(allTodos);
});
router.post("/", function (req, res) {
  var text = req.body.text;
  var addedTodo = addTodo(text);
  console.log(addedTodo);
  res.send("Todo Added");
});
module.exports = router;