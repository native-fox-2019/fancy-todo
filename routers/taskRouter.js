"use strict"

const router = require('express').Router();
const ToDoController = require('../controllers/ToDoController');

router.get('/', ToDoController.getTodos);
router.post('/', ToDoController.addTodo);
router.get('/:id', ToDoController.getTodo);
router.put('/:id', ToDoController.updateTodo);
router.delete('/:id', ToDoController.deleteTodo);

module.exports = router;