const express = require('express')
const { postgrator } = require('./data/mysqldb')


const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

app.use(`/uploads`,express.static('uploads'))
app.use('/todos', require('./routes/todos'));
app.use('/users', require('./routes/users'));

const port = 5500
const host = 'localhost'


postgrator.migrate().then((result) =>{
    console.log('migaration completed')
    app.listen(port, host, () => {
        console.log(`server started http://${host}:${port}`)
    })
}).catch((error) => {
    console.log(error)
})




