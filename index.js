"use strict"

require('dotenv').config()
const errorHandler = require('./middlewares/errorHandler.js')
const routes = require('./routers')

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(PORT, console.log(`Listening to port ${PORT}!`))

module.exports = app