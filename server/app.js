require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const indexRouter = require('./routes/indexRouter')
const errorHandling = require('./middlewares/errorHandling')

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/', indexRouter)

app.use(errorHandling)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app