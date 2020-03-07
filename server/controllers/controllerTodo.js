'use strict'
const { Todo } = require('../models')

class ControllerTodo {

  static add(req, res, next) {
    const { title, description, due_date } = req.body
    Todo
      .create({
        title,
        description,
        status: 'Belum',
        due_date,
        UserId: req.user.id
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static readAll(req, res, next) {
    // res.status(200).json(req.user.id)
    Todo
      .findAll({
        where: {
          UserId: req.user.id
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static readOne(req, res, next) {
    Todo.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static destroy(req, res, next) {
    const destroyId = req.params.id

    const destroy = Todo.destroy({
      where: {
        id: destroyId
      }
    })
    const findOne = Todo.findOne({
      where: {
        id: destroyId
      }
    })
    Promise.all([destroy, findOne])
      .then(result => {
        res.status(200).json(result[1])
      })
      .catch(err => {
        next(err)
      })
  }

  static edit(req, res, next) {
    const { title, description, status, due_date } = req.body
    console.log(title, description, status, due_date, req.params.id);  
    Todo
      .update({
        title,
        description,
        status,
        due_date,
      }, {
        where: {
          id: req.params.id
        },
        returning: true
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
}


module.exports = ControllerTodo