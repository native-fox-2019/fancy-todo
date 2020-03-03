const router = require('express').Router();
const UsersController = require('../controllers/UsersController');


router.post('/register', UsersController.register);
router.post('/login', UsersController.login);


module.exports = router;