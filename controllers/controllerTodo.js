// const { Todo } = require('../models')
const Model = require('../models')
const Todo = Model.Todo
class ControllerTodo {

  static getAllTodo(req, res, next) {
    Todo.findAll()
      .then(result => {
        res.status(200).json(result, '<<<<<<<<<')
        console.log(result, '<<<<<< dari controller')
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = ControllerTodo