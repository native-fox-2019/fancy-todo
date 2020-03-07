const express = require('express');
const route = express.Router();
const Controller = require('../controllers/userController.js');

route.post('/register', Controller.register);
route.post('/login', Controller.login);
route.post('/googleLogin', Controller.googleLogin);

module.exports = route;