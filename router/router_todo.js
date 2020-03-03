const Router = require ('express').Router()
const Controller = require('../controller/cont_todo')
const autorize = require('../middlewares/authorization')

Router.post('/',Controller.post_todos)
Router.get('/',Controller.getTodos)
Router.get('/holidays',Controller.Holidays)
Router.get('/:id',autorize,Controller.getTodosById)
Router.put('/:id',autorize,Controller.putTodos)
Router.delete('/:id',autorize,Controller.deleteTodos)


module.exports=Router