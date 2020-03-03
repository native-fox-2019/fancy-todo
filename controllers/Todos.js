const { Todo } = require('../models')

class TodosController {

  //create todo
  static create(req, res){
    let {title, description, status, due_date} = req.body
    Todo.create( {
      title,
      description,
      status,
      due_date
    })
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      res.send(err)
    })
  } 

  //read todo
  static getTodo(req, res){
    Todo.findAll()
    .then(todos => res.status(200).json(todos))
    .catch(err => res.status(400).json(err))
  }
}

module.exports = TodosController