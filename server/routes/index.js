const router=require('express').Router();
const controller=require('../controllers/IndexController');

router.get('/',controller.todo);


module.exports=router;