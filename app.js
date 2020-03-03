const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
require('dotenv').config();

const route = require('./routes');
const errorHandler = require('./middlewares/errorHandler.js');

app.use('/', route);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
})

module.exports = app;