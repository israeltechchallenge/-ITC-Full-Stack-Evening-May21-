const express = require("express");
const router = express.Router();
// IMPORT DATABASES
const { query } = require('../data/todoDB')
// IMPORT CONTROLLERS
const { getTodos, addTodo } = require("../controllers/todoCotrollers")

query(`CREATE TABLE IF NOT EXISTS todos(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(100) NOT NULL,
    created_at DATE DEFAULT (CURRENT_DATE) 
)`)
.then(() => console.log('Table Created'))
.catch((err) => console.log(err))

router.get('/', getTodos)
router.post('/', addTodo)


module.exports = router;