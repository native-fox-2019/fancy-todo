const { Todo } = require('../models')
const createError = require('http-errors')

class ControllerTodo {

  static getAllTodo(req, res, next) {
    Todo.findAll()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static createTodo(req, res, next) {
    let { title, description, due_date } = req.body
    Todo
      .create({ title, description, due_date })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static putTodo(req, res, next) {
    let id = req.params.id
    let { title, description, status, due_date } = req.body
    Todo
      .update({ title, description, status, due_date }, { where: { id }, returning: true })
      .then(result => {
        if (result[0]) {
          res.status(201).json(result[1])
        } else {
          let err = createError(404, 'NotFound')
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTodo(req, res, next) {
    let id = req.params.id
    let value = null
    Todo
      .findOne({ where: { id } })
      .then(result => {
        value = result
        return Todo.destroy({ where: { id }, returning: true })
      })
      .then(resultDestroy => {
        if (resultDestroy) {
          res.status(200).json(value)
        } else {
          let err = createError(404, 'NotFound')
          next(err)
        }
      })
      .catch(err => {
        console.log(err)
        next(err)
      })

  }

}

module.exports = ControllerTodo