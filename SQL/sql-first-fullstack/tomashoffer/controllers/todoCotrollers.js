const { addTodoSQL, deleteTodo, getSQLTodos } = require('../data/todoDB')

async function getTodos (req, res) { 
    const getTodos = await getSQLTodos()
    res.send(getTodos)
}

async function addTodo(req, res) { 
    const {task} = req.body;
    const addTodo = await addTodoSQL(task);
    res.send(addTodo)
}

module.exports = { getTodos, addTodo }
