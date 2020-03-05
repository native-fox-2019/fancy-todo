const express = require('express')
const app = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routers'))
app.use(require('./errorHandlers/errorHandler'))

app.listen(port, () => {
    console.log('This server is running on port: ', port)
})