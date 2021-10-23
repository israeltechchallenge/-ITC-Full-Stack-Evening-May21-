const express = require('express');
const app = express()
const PORT = process.env.PORT || 8000 
const cors = require("cors");

app.use(express.json());
app.use(cors());


// IMPORT ROUTES FILES
const todoRoute = require('./routes/todoRoutes');

// ROUTES
app.use('/', todoRoute);


app.listen(PORT,  () =>{
    console.log('Conected on port 8000')
})