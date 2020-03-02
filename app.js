const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const route = require('./routes');

app.use('/', route);

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
})

module.exports = app;