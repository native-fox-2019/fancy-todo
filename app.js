
const express = require('express')
const app = express()
const port = 3001
const Router = require('./router')
const ErrorHandle = require('./middlewares/errhandler')

const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/',Router)
app.use(ErrorHandle)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
