"use strict"

const express = require('express')
const app = express()
const port = process.env.port || 3001
// const morgan = require('morgan');
const router = require('./routers')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(router);
// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app