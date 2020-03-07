require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3002
const router = require('./routes')
const errorHandler = require ('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/',router)

app.use(errorHandler)

app.listen(port, () => console.log(`we are on port ${port}!`))