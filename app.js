require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

const todoRoute = require('./routes/todoRoutes');
const userRoute = require('./routes/userRoute')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/todos', todoRoute)
app.use('/user', userRoute)
app.use(errorHandler)

app.listen(port, () => {
    console.log('listening on port: ', port)
})