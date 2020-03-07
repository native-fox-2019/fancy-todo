const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const todos = require('./router/todoRouter')
const user = require('./router/userRouter')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))


/*-------------for routing-----------*/

app.use('/todos',todos)
app.use('/user',user)
app.use(errorHandler)


app.listen(port,function(){
    console.log("listening to port " + port)
})

