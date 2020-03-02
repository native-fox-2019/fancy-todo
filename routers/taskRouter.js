"use strict"

const router = require('express').Router();
const ToDoController = require('../controllers/ToDoController');

router.get('/', ToDoController.show);
router.post('/', ToDoController.add);
router.put('/:id', ToDoController.edit);
router.delete('/:id', ToDoController.delete);

module.exports = router;