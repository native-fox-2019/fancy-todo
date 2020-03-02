const express = require('express');
const route = express.Router();
const todosRoute = require('./todos.js');

route.use('/todos', todosRoute);

module.exports = route;