require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

const TodoRouter = require('./routes/todoRouter')
const UserRouter = require('./routes/userRouter')
const ApiRouter = require('./routes/apiRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
 
app.use('', TodoRouter)
app.use('/user', UserRouter)
app.use('/api', ApiRouter)

app.listen(port,()=>console.log(`listening on post ${port}`))