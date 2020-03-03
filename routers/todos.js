const router = require('express').Router();
const TodosController = require('../controllers/TodosController');


router.post('/', TodosController.createTodos);
router.get('/', TodosController.getTodos);
router.get('/:id', TodosController.getTodosId);
router.put('/:id', TodosController.updateTodos);
router.delete('/:id', TodosController.deleteTodos);


module.exports = router;