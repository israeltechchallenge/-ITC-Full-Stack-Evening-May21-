const fs = require('fs')
const util = require('util');

const path = './data/todos.json'
const getAllTodos = async () => {
    return new Promise((resolve, reject) =>{
        fs.readFile(path, (err,buffer) => {
            if(err) reject(err)
            else resolve(JSON.parse(buffer.toString()))
        })
    })
}

exports.getAllTodos = getAllTodos
const writeTodos = async (todos) => {
    return new Promise((resolve, reject) =>{
        fs.writeFile(path, JSON.stringify(todos), (err) => {
            if(err) reject(err)
            else resolve()
        })
    })
}
exports.writeTodos = writeTodos
const addTodo = async (todo) => {
    try {
        const todos =  getAllTodos()
        todos.push(todo)
        await writeTodos(todos)
    }
    catch (error) {
        console.log(error)
    }
}
exports.addTodo = addTodo
