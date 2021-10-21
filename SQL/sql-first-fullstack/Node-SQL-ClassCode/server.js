const express = require('express');
const app = express();
const PORT = 8000;
const todosRoute = require('./routes/todosRoute.js')
app.use(express.json())


app.use('/todos', todosRoute)



app.listen(PORT, () => {
    console.log('Listening')
})