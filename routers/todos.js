const router = require('express').Router();
const TodosController = require('../controllers/TodosController');

router.post('/', TodosController.createTodos);
router.get('/', TodosController.getTodos);


module.exports = router;