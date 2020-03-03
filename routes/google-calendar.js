const router=require('express').Router();
const controller=require('../controllers/GoogleCallenderController');

router.get('/list',controller.list);
router.get('/re-auth',controller.reAuth);
router.post('/add',controller.addEvent);

module.exports=router;