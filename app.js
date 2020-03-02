"use strict"
const serverRouter = require('./routers/todoRouter')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/', serverRouter)







app.listen(port, () => { console.log('listening to port', port) })