const express=require('express');
const router=express.Router();
const controller=require('../controllers/TodoController');

router.use(require('../middleware/authentication'));

router.get('/',controller.index);
router.post('/',controller.create);
router.get('/:id',controller.fetchById);
router.put('/:id',controller.update);
router.delete('/:id',controller.delete);

module.exports=router;