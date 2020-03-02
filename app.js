
const express = require('express')
const app = express()
const port = 3000

const RouterTodo = require('./router/router_todo')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => res.send('Jalanz!'))
app.use('/todos',RouterTodo)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
