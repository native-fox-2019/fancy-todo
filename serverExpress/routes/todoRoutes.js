const route = require('express').Router();
const TodoController = require('../controllers/todoController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

route.get('/', authentication, TodoController.list)
route.post('/', authentication, TodoController.add);

route.get('/:id', authentication, authorization, TodoController.getOne);
route.put('/:id', authentication, authorization, TodoController.edit);
route.delete('/:id', authentication, authorization, TodoController.delete);


module.exports = route