const router=require('express').Router();
const controller=require('../controllers/AuthController');

router.post('/login',controller.login);
router.post('/register',controller.register);
router.post('/login/google',controller.loginWithGoogle);
router.post('/check-google-auth',controller.checkGoogleAuth);

module.exports=router;