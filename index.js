require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/todoRouter')
const routerUser = require('./routes/userRouter')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/todos' , routes)
app.use('/users' , routerUser)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
