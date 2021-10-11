const mysql = require('mysql')
const SQL = require('@nearform/sql')

const Postgrator = require('postgrator')
const postgrator = new Postgrator({
  migrationDirectory:  './migrations',
  driver: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'mydatabase2',
  username: 'root',
  password: 'idomellow99',
  schemaTable: 'migrations',
 });
 exports.postgrator = postgrator;






const pool = mysql.createPool(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'idomellow99',
        database: 'mydatabase2'
       }
)
const query = (queryText) => {
    return new Promise((resolve, reject) => {
        pool.query(queryText, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  exports.query = query
const addTodo = async (text) => {
    try {
        const queryResult = await query(SQL`INSERT INTO todos (text) VALUES (${text});`)
        console.log({queryResult})
        return queryResult
    }
    catch (error) {
        console.log(error)
    }
}
exports.addTodo = addTodo
const getAllTodos = async () => {
    try {
        const queryResult =  await query(SQL`SELECT * FROM todos ORDER BY id ASC `)
        return queryResult
    }
    catch (error) {
        console.log(error)
    }
}
exports.getAllTodos = getAllTodos


const addUser = async (email, password) => {
  try {
      const queryResult = await query(`INSERT INTO users
                                     (email, pass, role) VALUES
                                     ('${email}', '${password}', 'user');`)
      return {
        ok: true,
        user:queryResult[0]
      }
  }
  catch (error) {
      return {
        ok: false,
        error,
      }
  }
}
exports.addUser = addUser

const getLastUser = async () => {
      const queryResult = await query(SQL`SELECT * from users ORDER BY id DESC LIMIT 1;`)
      console.log(queryResult)
      return queryResult[0]
}
exports.getLastUser = getLastUser

const getUserByEmail = async (email) => {
  try {
      const queryResult = await query(SQL`SELECT * from users WHERE email = ${email}`)
      console.log({queryResult})
      return queryResult[0]
  }
  catch (error) {
      console.log(error)
  }
}
exports.getUserByEmail = getUserByEmail

const getUserById = async (id) => {
  try {
      const queryResult = await query(SQL`SELECT * from users WHERE id = ${id}`)
      return queryResult[0]
  }
  catch (error) {
      console.log(error)
  }
}
exports.getUserById = getUserById

const updateProfilePicture = async (userId, path) => {
  try {
      const queryResult = await query(SQL`UPDATE users SET pp_url = ${path} WHERE id = ${userId}`)
      return queryResult
  }
  catch (error) {
      console.log(error)
  }
}
exports.updateProfilePicture = updateProfilePicture

const updateTodoImg = async (todoId, path) => {
  try {
      const queryResult = await query(SQL`UPDATE todos SET img_url = ${path} WHERE id = ${todoId}`)
      return queryResult
  }
  catch (error) {
      console.log(error)
  }
}
exports.updateTodoImg = updateTodoImg