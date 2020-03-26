"use strict"
const router = require('express').Router();
const ToDoController = require('../controllers/ToDoController');
const Authorization = require("../middleware/Authorization.js");

router.get('/', ToDoController.getTodos);
router.post('/', ToDoController.addTodo);
router.get('/:id', Authorization, ToDoController.getTodo);
router.put('/:id', Authorization, ToDoController.updateTodo);
router.delete('/:id', Authorization, ToDoController.deleteTodo);

module.exports = router;