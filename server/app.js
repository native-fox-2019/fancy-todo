require('dotenv').config()
const cors = require('cors')
const express = require('express')
const route = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', route)
app.use(errorHandler)

app.listen(port, console.log(`Running on port >>> ${port}`))

module.exports = app