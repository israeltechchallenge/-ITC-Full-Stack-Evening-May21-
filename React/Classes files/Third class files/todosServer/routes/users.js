const express = require('express')
const { validationMid } = require('../middlewares/validation.js')
const router = express.Router()
const S = require('fluent-json-schema');
const { addUser, getLastUser, getUserByEmail, updateProfilePicture } = require('../data/mysqldb')
const bcrypt = require('bcrypt');
const  { sign }  = require('../lib/auth');
const fs = require('fs')
const { upload } = require('../lib/uploadFiles')
const  authenticate  = require('../middlewares/authentication.js')
const { uploadToCloudinary } = require('../lib/cloudinary')

const usersSchema = S.object()
.prop('email', S.string().required())
.prop('password', S.string().minLength(6).maxLength(20).required())
.valueOf()
router.post('/', validationMid(usersSchema), async (req, res, next) => {
    try {
        
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const User = await addUser(req.body.email, passwordHash)
        console.log('##############',User)
        if(!User.ok) throw (User.error)
        const newUser =  await getLastUser()
        res.send({newUser})
    }
    catch (error){
        console.log(error)
        next(error)
    }
}

)
router.post('/login', validationMid(usersSchema), async (req, res, next) => {
    try {
        let user = null
        user = await getUserByEmail(req.body.email)
        if(!user) {
            res.status(401).send('we didnt find this user',)
            return
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.pass)
        if(!isPasswordMatch) {
            res.status(401).send('incorrect password')
            return
        }
        //continue login process
        const token = sign({appUserId:user.id})
        res.send({text:'valid login input',token})
    }
    catch (error) {
        console.log(error)
        next(error)
    }
})
router.put('/profilePic',authenticate(), upload.single('img'),async (req, res, next) => {
    try {
        const result = await uploadToCloudinary(req.file.path);
        const fileUrl = result.secure_url;
        fs.unlinkSync(req.file.path); // remove file from disk
        await updateProfilePicture(req.decoded.appUserId, fileUrl)
        res.send({ fileUrl,
        message: 'file is saved successfully'
        });
    }
    catch (error) {
        console.log(error)
        next(error)
    }
   
})
module.exports = router
