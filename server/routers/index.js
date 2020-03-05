const router = require('express').Router();
const todos = require('./todos');
const users = require('./users');
const authentication = require('../middlewares/authentication');
const UsersController = require('../controllers/UsersController');

router.post('/googlelogin', UsersController.googleLogin);
router.use('/users', users);
router.use('/todos', authentication, todos);


module.exports = router;