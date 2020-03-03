"use strict"

const router = require('express').Router();
const ToDoController = require('../controllers/UserController');

router.post('/register', ToDoController.register);
router.post('/login', ToDoController.login);

module.exports = router;