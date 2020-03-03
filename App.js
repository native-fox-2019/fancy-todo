const express = require('express')
const routes = require('./routes')
require('dotenv').config()

const app = express()
const port =  process.env.PORT || 3000

app.use(express.json())
app.use( express.urlencoded( { extended: false } ))
app.use('/', routes)

app.listen(port, () => {
  console.log('Listening on Port ' + port)
})