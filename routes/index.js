const express = require('express');
const route = express.Router();
const todosRoute = require('./todos.js');
const userRoute = require('./user.js');

route.use('/todos', todosRoute);
route.use('/user', userRoute);

module.exports = route;