const { Todo } = require('../models')
// const { google } = require('googleapis')
// const { client, acctoken } = require('./UserController')
const credentials = require('../credentials')
const { authorize, insertEvents } = require('../googleCal')

class TodoController {
    static findAll = (req, res, next) => {
        Todo.findAll({ where: { UserId: req.userData.id, ProjectId: null }, order: [['id', 'ASC']] })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                next(err)
            })
    }

    static create = (req, res, next) => {
        let { title, description, status, due_date } = req.body
        let newTodo = {
            title,
            description,
            status,
            due_date,
            UserId: req.userData.id
        }
        
        Todo.create(newTodo)
            .then(todo => {
                let event = {
                    "summary": todo.title,
                    "description": todo.description,
                    "start": {
                        "dateTime" : new Date()
                    },
                    "end": {
                        "dateTime" : new Date(todo.due_date)
                    }
                }
                let result = authorize(credentials,event, insertEvents)
                res.status(201).json({ msg: "New Todo has been created", newTodo })
            })
            .catch(err => {
                if (err.errors) {
                    let msg = []
                    err.errors.forEach(error => {
                        msg.push(error.message)
                    })
                    next(
                        {
                            status: 400,
                            msg: msg
                        }
                    )
                } else {
                    next(err)
                }
            })
    } 

    static findById = (req, res, next) => {
        let id = req.params.id
        Todo.findByPk(id)
            .then(todo => {
                if (!todo) {
                    throw new Error("Todo not found")
                }
                res.status(200).json(todo)
            })
            .catch(err => {
                next(err)
            })
    }

    static update = (req, res, next) => {
        let { title, description, status, due_date } = req.body
        let editedTodo = {
            title,
            description,
            status,
            due_date
        }
        let id = req.params.id
        
        Todo.update(editedTodo, { where: { id } })
            .then(updated => {
                if (!updated[0]) {
                    next(
                        {
                            status: 404,
                            msg: 'Todo not found'
                        }
                    )
                }
                res.status(200).json({ msg: "Todo has been edited", editedTodo })
            })
            .catch(err => {
                if (err.errors) {
                    let msg = []
                    err.errors.forEach(error => {
                        msg.push(error.message)
                    })
                    next(
                        {
                            status: 400,
                            msg:msg
                        }
                    )
                } else {
                    next(err)
                }
            })
    }

    static delete = (req, res, next) => {
        let id = req.params.id
        let deleted
        Todo.findByPk(id)
            .then(todo => {
                if (!todo) {
                    res.status(404).json({ msg: "Todo not found" })
                }
                deleted = todo
                return Todo.destroy({ where: { id } })
            })
            .then(() => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = TodoController