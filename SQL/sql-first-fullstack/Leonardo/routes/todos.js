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

router.get("/", (req, res) => {
    const allTodos = getAllTodos();
    res.send(allTodos);
});

router.post("/", (req, res) => {
    const { text } = req.body;
    const addedTodo = addTodo(text);
    console.log(addedTodo);
    res.send("Todo Added");
});

module.exports = router;
