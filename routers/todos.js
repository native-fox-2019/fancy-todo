const router = require('express').Router();
const TodosController = require('../controllers/TodosController');
const authorization = require('../middlewares/authorization');


router.post('/', TodosController.createTodos);
router.get('/', TodosController.getTodos);
router.use('/:id', authorization);
router.get('/:id', TodosController.getTodosId);
router.put('/:id', TodosController.updateTodos);
router.delete('/:id', TodosController.deleteTodos);


module.exports = router;