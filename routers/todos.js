const router = require('express').Router();
const TodosController = require('../controllers/TodosController');
const authorization = require('../middlewares/authorization');


router.post('/', TodosController.createTodos);
router.get('/', TodosController.getTodos);
router.get('/:id', authorization, TodosController.getTodosId);
router.put('/:id', authorization, TodosController.updateTodos);
router.delete('/:id', authorization, TodosController.deleteTodos);


module.exports = router;