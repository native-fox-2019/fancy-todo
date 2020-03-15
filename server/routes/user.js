const route = require('express').Router();
const UserController = require('../controllers/userController');

route.post('/googleSignIn', UserController.googleSignIn);
route.post('/register', UserController.register);
route.post('/login', UserController.login);

module.exports = route;