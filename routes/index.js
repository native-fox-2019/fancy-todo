const router=require('express').Router();
const controller=require('../controllers/IndexController');

router.get('/t',controller.index);
router.get('/',controller.todo);


module.exports=router;