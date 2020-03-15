const route = require('express').Router();
const UserRoute = require('./user');
const TodoRoute = require('./todo');
const Authentication = require('../middlewares/authentication');

route.use('/users',UserRoute);
route.use('/todos', Authentication, TodoRoute);

module.exports = route;