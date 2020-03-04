const route = require('express').Router();
const TodoController = require('../controllers/todoController');
const Authorization = require('../middlewares/authorization');

route.post('/', TodoController.addTodo);
route.get('/', TodoController.getTodo);
route.get('/:id', Authorization, TodoController.findTodo);
route.put('/:id', Authorization, TodoController.editTodo);
route.delete('/:id', Authorization, TodoController.dropTodo);

module.exports = route;