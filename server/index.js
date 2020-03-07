require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const routes = require('./routes/todoRouter')
const routerUser = require('./routes/userRouter')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/todos' , routes)
app.use('/users' , routerUser)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
