const express = require('express')
const app = express()
const cors = require('cors')


const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());


const toDoRoute = require('./todosRoute')
app.use('/',toDoRoute);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})