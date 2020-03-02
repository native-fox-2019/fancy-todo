const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const todos = require('./router/todoRouter')

app.use(express.json())

/*-------------for routing-----------*/

app.use('/todos',todos)


app.listen(port,function(){
    console.log("listening to port " + port)
})

