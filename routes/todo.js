const route = require('express').Router();
const TodoController = require('../controllers/todoController');

route.post('/', TodoController.addTodo);
route.get('/', TodoController.getTodo);
route.get('/:id', TodoController.findTodo);
route.put('/:id', TodoController.editTodo);
route.delete('/:id', TodoController.dropTodo);

module.exports = route;