require('dotenv').config()
const express = require('express')
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', require('./routers'))
app.use(require('./errorHandlers/errorHandler'))

app.listen(port, () => {
    console.log('Listening to port: ', port)
})