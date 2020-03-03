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
      //error validasi

      //error server
      res.status(500)
    })
  } 


  //read todo
  static getTodo(req, res){
    Todo.findAll()
    .then(todos => res.status(200).json(todos))
    .catch(err => res.status(500))
  }

  static getOneTodo(req, res){
    let id = Number(req.params.id)
    Todo.findOne({
      where: {
        id
      }
    })
    .then(todo => {
      
      if(todo === null){
        res.status(404).json({ message: 'Not found' })
      }else{
        res.status(200).json(todo)
      }
    })
    .catch(err => {
      res.status(500)
    })
  }

  static update(req, res){
    let id = Number(req.params.id)
    let {title, description, status, due_date} = req.body

    Todo.update({
      title,
      description,
      status,
      due_date
    }, {where: {id} })
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      //error validasi
      
      //error not found

      //error server
      res.status(500)
    })
  }

  static delete(req, res) {
    let id = Number(req.params.id)

    Todo.destroy({
      where: { id }
    })
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      //error not found

      //error server
      res.status(500)
    })
  }
}

module.exports = TodosController