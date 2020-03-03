'use strict'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.port || 3000
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log('Listening to port', port)
})