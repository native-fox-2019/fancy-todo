const router = require('express').Router();
const todos = require('./todos');
const users = require('./users');
const authentication = require('../middlewares/authentication');



router.use('/todos', authentication, todos);
router.use('/users', users);


module.exports = router;