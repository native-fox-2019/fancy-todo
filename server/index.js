require('dotenv').config()
const express = require('express')
const cors = require(`cors`)

const app = express()
const port = process.env.EX_PORT

const router = require(`./routes`)
const errorHandling = require(`./middleware/errorHandler`)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.use(errorHandling)

app.listen(port, () => console.log(`listening on port ${port}!`))