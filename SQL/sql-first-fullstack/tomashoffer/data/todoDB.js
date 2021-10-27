const mysql = require('mysql')

// poooling
const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  password        : 'river123',
  database        : 'myfirstdb'
});

const query = (queryText) => {
    return new Promise((resolve, reject)=> {
        pool.query(queryText, (error, results) =>{
            if(error){
                reject(error)
            }else{
                console.log('SOY LA BASE DE DATOS', results)
                resolve(results)
            }
        })    
    })
}

const getSQLTodos = async () => {
    const sqlQuery = 'SELECT * FROM todos'
    const getAllTodos = await query(sqlQuery)
    console.log('get todo')
    return getAllTodos
}

const addTodoSQL = async (todoText) => {
    const sqlQuery = `INSERT INTO todos (task) VALUES ('${todoText}')`
    const addTodo = await query(sqlQuery)
    console.log(addTodo)
    console.log(todoText)
    return addTodo
}

module.exports = { query, getSQLTodos, addTodoSQL }