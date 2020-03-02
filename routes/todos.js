const express = require('express');
const route = express.Router();
const Controller = require('../controllers/todosController.js');

route.post('/', Controller.addData);
route.get('/', Controller.showData);
route.get('/:id', Controller.showDataById);
route.put('/:id', Controller.edit);
route.delete('/:id', Controller.deleteData);

module.exports = route;