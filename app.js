const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

const todoRoute = require('./routes/todoRoutes');
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/todos', todoRoute)

app.listen(port, () => {
    console.log('listening on port: ', port)
})