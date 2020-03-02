const route = require('express').Router();
const TodoController = require('../controllers/todoController')

route.get('/', TodoController.list)
route.post('/', TodoController.add);

route.get('/:id', TodoController.getOne);
route.put('/:id', TodoController.edit);
route.delete('/:id', TodoController.delete);


module.exports = route