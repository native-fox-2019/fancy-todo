const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

const route = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);

app.listen(port, console.log('Localhost :', port));