"use strict"
const indexRouter = require('./routers/index')
const handlingError = require('./middleware/errorHendling')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/', indexRouter)
    .use(handlingError)







app.listen(port, () => { console.log('listening to port', port) })