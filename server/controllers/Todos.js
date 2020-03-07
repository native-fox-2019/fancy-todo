const { Todo } = require('../models')
const decode = require('../helpers/decode')
class TodosController {

  //create todo
  static create(req, res, next){
    let {title, description, status, due_date} = req.body
    const userData = decode(req.headers.usertoken)
    Todo.create( {
      title,
      description,
      status,
      due_date,
      userId: userData.id
    })
    .then(todo => {
      res.type('application/json')
      res.status(200).json(todo)
    })
    .catch(err => {
      next(err)
    })
  } 


  //read todo
  static getTodo(req, res, next){
    const userData = decode(req.headers.usertoken)
    console.log(userData)
    
    Todo.findAll({
      where: {
        userId: Number(userData.id)
      }
    })
    .then(todos => {
      res.type('application/json')
      res.status(200).json(todos)
    })
    .catch(err => next(err))
  }

  static getOneTodo(req, res, next){
    let id = Number(req.params.id)
    Todo.findOne({
      where: {
        id
      }
    })
    .then(todo => {
      
      if(todo === null){
        res.status(404).json({ message: 'Todo Not found' })
      }else{
        res.status(200).json(todo)
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static update(req, res){
    const userData = decode(req.headers.usertoken)

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
      next(err)
    })
  }

  static delete(req, res) {
    let id = Number(req.params.id)

    Todo.destroy({
      where: { id }
    })
    .then(todo => {
      res.status(200).json({message: 'Has been delete'})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = TodosController