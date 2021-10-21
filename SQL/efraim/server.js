const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());


const notesRoute = require('./routes/notesRoute');


app.use('/notes', notesRoute);


app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})