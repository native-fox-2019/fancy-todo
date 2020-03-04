require('dotenv').config()
const cors = require(`cors`)
const express = require('express')
const app = express()
const port = process.env.DB_PORT

const router = require(`./routes`)
const errorHandling = require(`./middleware/errorHandler`)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.use(errorHandling)

app.listen(port, () => console.log(`listening on port ${port}!`))