const Router = require ('express').Router()
const Controller = require('../controller/cont_todo')

Router.post('/',Controller.post_todos)
Router.get('/',Controller.getTodos)
Router.get('/:id',Controller.getTodosById)
Router.put('/:id',Controller.putTodos)
Router.delete('/:id',Controller.deleteTodos)


module.exports=Router