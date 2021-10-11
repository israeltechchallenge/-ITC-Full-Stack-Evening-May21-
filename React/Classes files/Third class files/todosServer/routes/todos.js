const express = require('express')
const { validationMid } = require('../middlewares/validation.js')
const  authenticate  = require('../middlewares/authentication.js')
const { upload } = require('../lib/uploadFiles')
const { uploadToCloudinary } = require('../lib/cloudinary')
const path = require('path')
const { updateTodoImg } = require('../data/mysqldb')
const fs = require('fs')

const filepath = path.resolve(__dirname, '/data/mysqldb')
console.log({
    filepath,
    __dirname
})
const router = express.Router()
const S = require('fluent-json-schema');
const { query, addTodo, getAllTodos, getUserById } = require('../data/mysqldb')

router.get('/', async (req, res, next) => {
    //Send list of all todos to the client
    
    try {
        //res.setHeader('Set-Cookie: sessionId=38afes7a8')
        const todosList = await getAllTodos()
        res.send(todosList)
    }
    catch(error) {
        next(error)
    }
})
const todosSchema = S.object()
.prop('text', S.string().required())

router.post('/',validationMid(todosSchema.valueOf()), async(req, res, next) => {
   /*
    const user = await getUserById(req.decoded.appUserId)
    if(user.role !== 'user') {
        res.status(403).send('you are not suposed to be here: Forbiden accses ')
        return
    }
    */

    //Add a new todo to our database
    console.log('we are here')
    try {
        //validation is needed
        
       const queryResult =  await addTodo(req.body.text)
       const newTodo = await query('SELECT * FROM todos ORDER BY id DESC LIMIT 1;')
       console.log(newTodo[0])
        res.send(newTodo[0])
    }
    catch (error) {
        next(error)
    }
})
router.put(`/:id/updateImg`, upload.single('image'), async(req, res, next) => {
    try {
        const result = await uploadToCloudinary(req.file.path)
        const fileUrl = result.secure_url
        fs.unlinkSync(req.file.path) // remove file from disk
        await updateTodoImg(req.params.id, fileUrl)
        res.send({
            imageUrl: result.secure_url
        })
    }
    catch (error) {
        console.log(error)
        next(error)
    }
})
module.exports = router
