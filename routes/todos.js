const express = require('express');
const route = express.Router();
const Controller = require('../controllers/todosController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization');

route.post('/', authentication, Controller.addData);
route.get('/', Controller.showData);
route.get('/:id', Controller.showDataById);
route.put('/:id', authentication, authorization, Controller.edit);
route.delete('/:id', authentication, authorization, Controller.deleteData);

module.exports = route;