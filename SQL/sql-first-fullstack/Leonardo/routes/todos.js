const express = require("express");
const router = express.Router();
const { query, getAllTodos, addTodo } = require("../data/todosDb.js");

query(
  `CREATE TABLE IF NOT EXISTS todos (
    id      INT(200) AUTO_INCREMENT,
    text    VARCHAR(255) NOT NULL,
    created_date  DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY(id))`
)
  .then(() => console.log("Table Created"))
  .catch((err) => console.log(err));

router.get("/", async (req, res) => {
  const allTodos = await getAllTodos();
  res.send(allTodos);
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  const addedTodo = await addTodo(text);
  res.send("Todo Added");
});

module.exports = router;
