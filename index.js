//require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

const TodoRouter = require('./routes/todoRouter')
const UserRouter = require('./routes/userRouter')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', TodoRouter)
app.use('/user', UserRouter)

app.listen(port,()=>console.log(`listening on post ${port}`))