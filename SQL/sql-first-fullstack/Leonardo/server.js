const express = require('express');
const app = express();
const PORT = 3000;
const todosRoute = require('./routes/todos.js')
app.use(express.json())

app.use('/todos', todosRoute)

app.listen(PORT, () => {
    console.log('Listening')
})