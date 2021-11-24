const path = require('path')
const result = require('dotenv').config({
    path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)
})
if(result.error) {
    throw new Error(result.error)
}